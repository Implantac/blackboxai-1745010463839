const Room = require('../models/Room');

// Get all rooms
exports.getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find().sort({ numero: 1 });
    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

// Get room by id
exports.getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Quarto não encontrado' });
    }
    res.json(room);
  } catch (error) {
    next(error);
  }
};

// Create new room
exports.createRoom = async (req, res, next) => {
  try {
    const { numero, status, observacoes } = req.body;
    const existingRoom = await Room.findOne({ numero });
    if (existingRoom) {
      return res.status(400).json({ message: 'Número do quarto já existe' });
    }
    const room = new Room({ numero, status, observacoes });
    await room.save();

    // Emit update to clients
    req.io.emit('roomUpdated', room);

    res.status(201).json(room);
  } catch (error) {
    next(error);
  }
};

// Update room
exports.updateRoom = async (req, res, next) => {
  try {
    const { numero, status, observacoes } = req.body;
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Quarto não encontrado' });
    }
    room.numero = numero || room.numero;
    room.status = status || room.status;
    room.observacoes = observacoes || room.observacoes;
    await room.save();

    // Emit update to clients
    req.io.emit('roomUpdated', room);

    res.json(room);
  } catch (error) {
    next(error);
  }
};

// Delete room
exports.deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Quarto não encontrado' });
    }
    await room.remove();

    // Emit update to clients
    req.io.emit('roomDeleted', room._id);

    res.json({ message: 'Quarto removido com sucesso' });
  } catch (error) {
    next(error);
  }
};
