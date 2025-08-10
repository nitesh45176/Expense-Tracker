const Income = require("../models/Income")
const xlsx = require('xlsx')

//Add income source
 const addIncome = async(req, res) => {
   const userId = req.user.id;

   try {
    const {icon, source, amount, date} = req.body;

    //Validation:check for missing details
    if(!source || !amount || !date) {
        return res.status(400).json({error: "Please fill in all fields."});
    }

    const newIncome = new Income({
        userId,
        icon,
        source,
        amount,
        date:new Date(date)

    })

    await newIncome.save();
    res.status(200).json(newIncome)
   } catch (error) {
     console.error(error);
     res.status(500).json({error: "Failed to add income source."})
   }
}

//get all income source
const getAllIncome = async(req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({userId}).sort({date:-1})
        res.json(income)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Server error"})
    }
}

//delete income source
const deleteIncome = async(req, res) => { 
  const userId = req.user.id;
  try { 
    const income = await Income.findOne({_id: req.params.id, userId});
    
    if (!income) {
      return res.status(404).json({message: "Income source not found or unauthorized"});
    }
    
    await Income.findByIdAndDelete(req.params.id); 
    res.json({message: "Income source deleted successfully."}) 
  } catch (error) { 
     console.error(error) 
     res.status(500).json({message:"Server error"}) 
  } 
}

//Download Excel
const downloadIncomeExcel = async(req, res) => {
   const userId = req.user.id;
   try {
      const income = await Income.find({userId}).sort({date:-1})

      //Prepare data for excel
      const data = income.map((item) => ({
        Source:item.source,
        Amount:item.amount,
        Date:item.date
      }));

      const wb = xlsx.utils.book_new();
      const ws = xlsx.utils.json_to_sheet(data);
      xlsx.utils.book_append_sheet(wb, ws, 'Income');
      xlsx.writeFile(wb, 'income_details.xlsx')
      res.download('income_details.xlsx')
   } catch (error) {
     console.error(error)
      res.status(500).json({message:"Server error"}) 
   }
}



module.exports = {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel
};