// seedDatabase.js
const mongoose = require('mongoose');
const TransactionModel = require('../models/TransactionModel');

async function seedDatabase() {
  try {
    // Connect to the MongoDB database
    await mongoose.connect('mongodb://localhost:27017/controle-financeiro', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    // Create a new transaction
    const newTransaction = new TransactionModel({
      description: 'Compra de mantimentos',
      amount: -50,
      type: 'despesa',
    });

    // Save the transaction to the database
    await newTransaction.save();
    
    console.log('Transação salva com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ou salvar transação:', error);
  } finally {
    // Disconnect from the database after completion
    await mongoose.disconnect();
  }
}

// Execute the function to populate the database
seedDatabase();
