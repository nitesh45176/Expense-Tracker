const Expense = require("../models/Expense")
const xlsx = require('xlsx')
const asyncHandler = require("express-async-handler")
//Add Expense category
 const addExpense = async(req, res) => {
   const userId = req.user.id;

   try {
    const {icon, category, amount, date} = req.body;

    //Validation:check for missing details
    if(!category || !amount || !date) {
        return res.status(400).json({error: "Please fill in all fields."});
    }

    const newExpense = new Expense({
        userId,
        icon,
        category,
        amount,
        date:new Date(date)

    })

    await newExpense.save();
    res.status(200).json(newExpense)
   } catch (error) {
     console.error(error);
     res.status(500).json({error: "Failed to add Expense category."})
   }
}

//get all Expense category
const getAllExpense = async(req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({userId}).sort({date:-1})
        res.json(expense)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Server error"})
    }
}

//delete Expense category
const deleteExpense = async(req, res) => { 
  const userId = req.user.id;
  try { 
    const expense = await Expense.findOne({_id: req.params.id, userId});
    
    if (!expense) {
      return res.status(404).json({message: "Expense category not found or unauthorized"});
    }
    
    await Expense.findByIdAndDelete(req.params.id); 
    res.json({message: "Expense category deleted successfully."}) 
  } catch (error) { 
     console.error(error) 
     res.status(500).json({message:"Server error"}) 
  } 
}

//Download Excel

const downloadExpenseExcel = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const expenses = await Expense.find({ user: userId });

  const formattedData = expenses.map((txn) => ({
    Category: txn.category,
    Amount: txn.amount,
    Date: txn.date.toISOString().split("T")[0], // format date
    CreatedAt: txn.createdAt.toISOString().split("T")[0],
  }));

  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(formattedData);
  xlsx.utils.book_append_sheet(wb, ws, "Expense");

  // ✅ Generate Excel file in memory and send as response
  const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

  res.setHeader("Content-Disposition", "attachment; filename=expense_report.xlsx");
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.send(buffer);
});



module.exports = {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel
};