const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register new user (admin only)
exports.registerUser = async (req, res, next) => {
  try {
    const { nome, email, senha, papel } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }
    const hashedPassword = await bcrypt.hash(senha, 10);
    const user = new User({ nome, email, senha: hashedPassword, papel });
    await user.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    next(error);
  }
};

// User login
exports.loginUser = async (req, res, next) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    const token = jwt.sign(
      { id: user._id, nome: user.nome, email: user.email, role: user.papel },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '8h' }
    );
    res.json({ token, user: { id: user._id, nome: user.nome, email: user.email, papel: user.papel } });
  } catch (error) {
    next(error);
  }
};

// Get all users (admin only)
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-senha').sort({ nome: 1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Get user by id (admin only)
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-senha');
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Update user (admin only)
exports.updateUser = async (req, res, next) => {
  try {
    const { nome, email, papel, status, senha } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    user.nome = nome || user.nome;
    user.email = email || user.email;
    user.papel = papel || user.papel;
    user.status = status || user.status;
    if (senha) {
      user.senha = await bcrypt.hash(senha, 10);
    }
    await user.save();
    res.json({ message: 'Usuário atualizado com sucesso' });
  } catch (error) {
    next(error);
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    await user.remove();
    res.json({ message: 'Usuário removido com sucesso' });
  } catch (error) {
    next(error);
  }
};
