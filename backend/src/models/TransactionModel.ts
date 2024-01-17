import mongoose, { Document, Schema } from 'mongoose';

interface ITransaction extends Document {
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

const transactionSchema = new Schema<ITransaction>({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
});

const TransactionModel = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default TransactionModel;