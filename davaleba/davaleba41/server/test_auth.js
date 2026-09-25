const http = require('http');

const request = (path, method = 'GET', data = null, headers = {}) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '127.0.0.1',
      port: 5000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
};

async function runTests() {
  console.log('🧪 ტესტების დაწყება...\n');

  try {
    // 1. Health check
    console.log('1. GET /health...');
    const health = await request('/health');
    console.log('Status:', health.status, 'Body:', health.data);
    if (health.status !== 200 || health.data.status !== 'ok') {
      throw new Error('Health check failed');
    }

    // 2. Register
    const testEmail = `test_${Date.now()}@example.com`;
    console.log(`\n2. POST /api/auth/register (${testEmail})...`);
    const reg = await request('/api/auth/register', 'POST', {
      name: 'ტესტ მომხმარებელი',
      email: testEmail,
      password: 'Password123!'
    });
    console.log('Status:', reg.status, 'Message:', reg.data.message);
    if (reg.status !== 201 || !reg.data.token) {
      throw new Error('Registration failed');
    }

    const token = reg.data.token;

    // 3. Login
    console.log('\n3. POST /api/auth/login...');
    const login = await request('/api/auth/login', 'POST', {
      email: testEmail,
      password: 'Password123!'
    });
    console.log('Status:', login.status, 'User:', login.data.user);
    if (login.status !== 200 || !login.data.token) {
      throw new Error('Login failed');
    }

    // 4. Login with Wrong Password
    console.log('\n4. POST /api/auth/login (Wrong Password)...');
    const wrongLogin = await request('/api/auth/login', 'POST', {
      email: testEmail,
      password: 'WrongPassword!'
    });
    console.log('Status:', wrongLogin.status, 'Message:', wrongLogin.data.message);
    if (wrongLogin.status !== 401) {
      throw new Error('Wrong password test failed');
    }

    // 5. Protected Route GET /api/auth/me with Token
    console.log('\n5. GET /api/auth/me (With valid Bearer Token)...');
    const me = await request('/api/auth/me', 'GET', null, {
      Authorization: `Bearer ${token}`
    });
    console.log('Status:', me.status, 'Current User:', me.data.user);
    if (me.status !== 200 || me.data.user.email !== testEmail) {
      throw new Error('GetMe failed');
    }

    // 6. Protected Route GET /api/auth/me without Token
    console.log('\n6. GET /api/auth/me (Without Token - Expect 401)...');
    const unauthorizedMe = await request('/api/auth/me', 'GET');
    console.log('Status:', unauthorizedMe.status, 'Message:', unauthorizedMe.data.message);
    if (unauthorizedMe.status !== 401) {
      throw new Error('Unauthorized check failed');
    }

    console.log('\n✅ ყველა ტესტი წარმატებით დასრულდა!');
    process.exit(0);
  } catch (error) {
    console.error('❌ ტესტის შეცდომა:', error);
    process.exit(1);
  }
}

runTests();
