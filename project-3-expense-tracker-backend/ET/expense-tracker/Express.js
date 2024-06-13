const express = require('express');
const mongoose= require('mongoose');
const app = express();
const port = 3000;
const cors=require('cors');
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/expense-tracker');
const expenseSchema=mongoose.Schema({
  description:String,
  amount:Number
})

const Expense=mongoose.model('Expense',expenseSchema);

app.use(express.json());
app.use(express.static('public'));

let expenses = [];

app.get('/api/expenses', async (req, res) => {
  const expenses= await Expense.find();
  res.json(expenses);
});

app.post('/api/expenses', async (req, res) => {

  const newExpense = new Expense(req.body)
  await newExpense.save();
  res.status(201).json(newExpense);
});

app.put('/api/expenses/:id',async (req,res)=>{
  const {id} =req.params;
  const updateExpense= await Expense.findByIdAndUpdate(id,req.body,res.json(updateExpense));
});

app.delete('/api/expenses/:id',async (req,res)=>{
  const {id} =req.params;

  await Expense.findByIdAndDelete(id);
  res.sendStatus(204);
  
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});