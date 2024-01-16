// seedDatabase.ts
import mongoose from 'mongoose';
import TransactionModel from 'src/models/TransactionModel'; // Certifique-se de ter o caminho correto

async function seedDatabase() {
  try {
    // Conecte-se ao banco de dados MongoDB
    await mongoose.connect('mongodb://localhost:27017/controle-financeiro', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    // Crie uma nova transação
    const newTransaction = new TransactionModel({
      description: 'Compra de mantimentos',
      amount: -50,
      type: 'despesa',
    });

    // Salve a transação no banco de dados
    await newTransaction.save();
    
    console.log('Transação salva com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ou salvar transação:', error);
  } finally {
    // Desconecte-se do banco de dados após a conclusão
    await mongoose.disconnect();
  }
}

// Execute a função para popular o banco de dados
seedDatabase();
