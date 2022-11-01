const Expense = require('../models/expense');

exports.getExpenses = async (req,res,next)=>{
    const {eamount,edescription,category}= req.body;
   try
   {
        let data = await  req.user.getExpenses()
        res.status(200).json({data});

        
        
   }
   catch(error){
    console.log(error);
    res.status(500).json({error:error});
   }

};


exports.addExpenses = async (req,res,next)=>{
    const {eamount,edescription,category}= req.body;
   
    try{

        if(!eamount || !edescription || !category){
            return res.status(400).json({message: 'no fields can be empty'})
        }
        const data = await req.user.createExpense({
            eamount,
            edescription,
            category
        })
        //magic funcs of seq for associations
        res.status(201).json({newExpenseDetail: data})

       // const eamount = req.body.eamount;
       // const edescription = req.body.edescription;
       // const category = req.body.category;

       /* const data = await Expense.create({
            eamount: eamount,
            edescription: edescription,
            category: category,
        })
        res.status(201).json({newExpenseDetail: data});*/
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:error});
      }

};

exports.deleteExpenses = async (req,res,next)=>{
    try{
        let userId = req.params.userId;
        if(!userId)
        {
            res.status(400).json({error:'id missing'});
        }
        //await Expense.destroy({where:{id:userId}});
        //res.sendStatus(200);
        await req.user.getExpenses({where:{id:userId}}).then(expense=>{
            let findExpenses = expense[0];
            findExpenses.destroy();
            res.sendStatus(200);
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json('error occured');
      };

};