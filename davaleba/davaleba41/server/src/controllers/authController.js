const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');

// დამხმარე ფუნქცია JWT ტოკენის გენერაციისთვის
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '7d' }
  );
};

// @desc    რეგისტრაცია
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'გთხოვთ მიუთითოთ ელ-ფოსტა და პაროლი'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს'
      });
    }

    // ვამოწმებთ არსებობს თუ არა მომხმარებელი
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'აღნიშნული ელ-ფოსტით მომხმარებელი უკვე რეგისტრირებულია'
      });
    }

    // პაროლის ჰეშირება
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // მომხმარებლის შექმნა
    const user = await prisma.user.create({
      data: {
        name: name ? name.trim() : null,
        email: email.toLowerCase().trim(),
        password: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      message: 'რეგისტრაცია წარმატებით დასრულდა',
      token,
      user
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'სერვერის შეცდომა რეგისტრაციისას'
    });
  }
};

// @desc    ავტორიზაცია (Login)
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'გთხოვთ შეიყვანოთ ელ-ფოსტა და პაროლი'
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'ელ-ფოსტა ან პაროლი არასწორია'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'ელ-ფოსტა ან პაროლი არასწორია'
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: 'ავტორიზაცია წარმატებულია',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'სერვერის შეცდომა ავტორიზაციისას'
    });
  }
};

// @desc    მიმდინარე ავტორიზებული მომხმარებლის მიღება
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'მომხმარებელი ვერ მოიძებნა'
      });
    }

    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('GetMe error:', error);
    return res.status(500).json({
      success: false,
      message: 'სერვერის შეცდომა მომხმარებლის მონაცემების მიღებისას'
    });
  }
};
