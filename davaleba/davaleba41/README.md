# 🔐 Full-Stack Auth სისტემა (Vercel & Render დეფლოიმენთით)

სრულყოფილი, უსაფრთხო **Full-Stack Authentication** სისტემა, რომელიც შედგება:
- **Frontend (`client/`)**: React + Vite + Tailwind CSS + Lucide Icons (განკუთვნილი **Vercel**-ისთვის).
- **Backend (`server/`)**: Node.js + Express + JWT + Bcrypt + Prisma ORM (განკუთვნილი **Render**-ისთვის).

---

## 📁 პროექტის სტრუქტურა

```text
fullstack-auth/
├── render.yaml                # Render Blueprint (ავტომატური Web Service დეფლოი)
├── package.json               # Monorepo სკრიპტები
├── .gitignore
├── client/                    # Frontend აპლიკაცია (Vercel)
│   ├── vercel.json            # Vercel SPA Routing & Security Headers
│   ├── vite.config.js
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── api/auth.js        # API კლიენტი და ტოკენების მართვა
│       ├── context/AuthContext.jsx # Auth Context Provider & Hook
│       ├── components/        # Navbar, ProtectedRoute
│       └── pages/             # Home, Login, Register, Dashboard
└── server/                    # Backend API სერვერი (Render)
    ├── Dockerfile             # Docker მხარდაჭერა Render-ზე
    ├── package.json
    ├── .env.example
    ├── prisma/
    │   └── schema.prisma      # User მოდელი (SQLite/PostgreSQL)
    ├── test_auth.js           # ავტომატური ინტეგრაციული ტესტები
    └── src/
        ├── controllers/       # authController (register, login, me)
        ├── middleware/        # authMiddleware (JWT Verification)
        ├── routes/            # authRoutes
        └── server.js          # Express App + CORS + Health Check
```

---

## 💻 ლოკალური გაშვება (Local Development)

### 1. Backend-ის გაშვება:
```bash
cd server
npm install
npx prisma db push
npm run dev
```
*Backend ხელმისაწვდომი იქნება მისამართზე: `http://localhost:5000`*  
*Health Check შემოწმება: `http://localhost:5000/health`*

### 2. Frontend-ის გაშვება:
```bash
cd client
npm install
npm run dev
```
*Frontend ხელმისაწვდომი იქნება მისამართზე: `http://localhost:5173`*

### 3. ავტომატური ტესტების გაშვება:
```bash
cd server
node test_auth.js
```

---

## 🚀 1. დეფლოიმენთი RENDER-ზე (Backend API)

Backend სერვისი იდეალურად თავსებადია Render-ის Web Service-თან.

### ვარიანტი A: Render Dashboard-ის მეშვეობით (რეკომენდებული)
1. შედით [Render Dashboard](https://dashboard.render.com/)-ზე.
2. დააჭირეთ **New +** -> **Web Service**.
3. დააკავშირეთ თქვენი Git რეპოზიტორია (ან GitHub).
4. შეავსეთ პარამეტრები:
   - **Name**: `fullstack-auth-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npx prisma generate && npx prisma db push`
   - **Start Command**: `npm run start`
   - **Plan**: `Free`
5. დაამატეთ **Environment Variables** (გარემოს ცვლადები):
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: `[შეიყვანეთ რაიმე უსაფრთხო საიდუმლო ტექსტი ან დააგენერირეთ]`
   - `DATABASE_URL`: `"file:./dev.db"` *(ან Render-ის უფასო PostgreSQL-ის კავშირის სტრინგი)*
   - `CLIENT_URL`: `[თქვენი Vercel-ის ფრონტენდის დომენი, მაგ: https://your-project.vercel.app]`
6. **Advanced Settings**:
   - **Health Check Path**: `/health`
7. დააჭირეთ **Create Web Service**.

> Render მოგცემთ თქვენს საჯარო API ლინკს (მაგ: `https://fullstack-auth-api.onrender.com`).  
> დააკოპირეთ ეს ლინკი, რადგან დაგჭირდებათ Vercel-ის კონფიგურაციაში!

---

## ⚡ 2. დეფლოიმენთი VERCEL-ზე (Frontend React App)

Frontend აპლიკაციაში უკვე ჩაშენებულია `client/vercel.json`, რომელიც უზრუნველყოფს SPA მარშრუტების (client-side routing) სწორ მუშაობას.

### ვარიანტი A: Vercel Web Dashboard-ის მეშვეობით
1. შედით [Vercel Dashboard](https://vercel.com/dashboard)-ზე.
2. დააჭირეთ **Add New...** -> **Project**.
3. აირჩიეთ თქვენი Git რეპოზიტორია.
4. **Project Settings**-ში:
   - **Root Directory**: დააჭირეთ **Edit** და მიუთითეთ: `client`
   - **Framework Preset**: `Vite` (Vercel ავტომატურად ამოიცნობს)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Environment Variables**:
   - დაამატეთ ცვლადი:
     - **Name**: `VITE_API_BASE_URL`
     - **Value**: `https://your-api.onrender.com` *(თქვენი Render-ის Backend მისამართი)*
6. დააჭირეთ **Deploy**!

### ვარიანტი B: Vercel CLI-ის მეშვეობით
ტერმინალში:
```bash
cd client
npx vercel
```
- მიჰყევით CLI-ის კითხვებს (Login, Link Project).
- Vercel მოგცემთ Production URL-ს!

---

## 📡 API ენდფოინთების დოკუმენტაცია

| მეთოდი | ენდფოინთი | აღწერა | წვდომა |
|---|---|---|---|
| `GET` | `/health` | სერვერის მონიტორინგი და სტატუსი | Public |
| `POST` | `/api/auth/register` | ახალი მომხმარებლის რეგისტრაცია (სახელი, ელ-ფოსტა, პაროლი) | Public |
| `POST` | `/api/auth/login` | ავტორიზაცია და JWT ტოკენის გაცემა | Public |
| `GET` | `/api/auth/me` | მიმდინარე მომხმარებლის პროფილი (`Authorization: Bearer <token>`) | Protected |

---

## 🛡️ უსაფრთხოების მახასიათებლები
- **Bcryptjs Salting**: პაროლები ბაზაში არასდროს ინახება ღია სახით.
- **JWT Authentication**: დაცული ტოკენები ვადის გასვლით (7 დღე).
- **CORS Protection**: სერვერი დაცულია უცხო დომენებიდან არასასურველი მოთხოვნებისგან.
- **XSS & Sniff Headers**: Vercel-ზე ჩართულია `X-Frame-Options` და `X-Content-Type-Options: nosniff`.
