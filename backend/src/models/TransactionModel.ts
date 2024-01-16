// TransactionModel.ts
import { Schema, model, Document } from 'mongoose';

// Defina a interface para o documento de transação
interface ITransaction extends Document {
  description: string;
  amount: number;
  date: Date;
  type: string; // Adicione o tipo de transação (receita ou despesa)
}

// Defina o esquema do modelo
const transactionSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ['receita', 'despesa'], // Defina os possíveis valores para o tipo
    required: true,
  },
});

// Crie e exporte o modelo
const TransactionModel = model<ITransaction>('Transaction', transactionSchema);

export default TransactionModel;
