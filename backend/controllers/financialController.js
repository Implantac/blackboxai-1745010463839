const Transacao = require('../models/Transacao');

// Get all transactions
exports.getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transacao.find().sort({ data: -1 });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

// Create new transaction
exports.createTransaction = async (req, res, next) => {
  try {
    const { tipo, valor, descricao, metodoPagamento, referenciaTEF } = req.body;
    const transaction = new Transacao({ tipo, valor, descricao, metodoPagamento, referenciaTEF });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

// Get cash flow summary
exports.getCashFlow = async (req, res, next) => {
  try {
    const entradas = await Transacao.aggregate([
      { $match: { tipo: 'entrada' } },
      { $group: { _id: null, total: { $sum: '$valor' } } }
    ]);
    const saidas = await Transacao.aggregate([
      { $match: { tipo: 'saida' } },
      { $group: { _id: null, total: { $sum: '$valor' } } }
    ]);
    res.json({
      totalEntrada: entradas[0] ? entradas[0].total : 0,
      totalSaida: saidas[0] ? saidas[0].total : 0,
      saldo: (entradas[0] ? entradas[0].total : 0) - (saidas[0] ? saidas[0].total : 0)
    });
  } catch (error) {
    next(error);
  }
};

// TEF payment processing (stub)
exports.processTefPayment = async (req, res, next) => {
  try {
    // This is a stub for TEF integration
    const { valor, cartao, parcelas } = req.body;
    // Simulate processing delay
    setTimeout(() => {
      res.json({ success: true, message: 'Pagamento TEF processado com sucesso', transactionId: 'TEF123456' });
    }, 1000);
  } catch (error) {
    next(error);
  }
};
