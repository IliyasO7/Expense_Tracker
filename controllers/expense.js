const Expense = require('../models/expense');

const User = require('../models/user')


exports.getAllUsers = async(req,res,next)=>{
    try {

        if(req.user.ispremiumuser){
            console.log("into getall Users");
            let leaderboard = [];
            let users = await User.findAll({attributes: ['id', 'username', 'email']})

            console.log(users);

            for(let i = 0 ;i<users.length ; i++){
                let expenses = await  users[i].getExpenses() ;

                console.log(users[i]);
                console.log(expenses);
                let totalExpense = 0;
                for(let j = 0 ;j<expenses.length ; j++){
                    totalExpense += expenses[j].eamount

                }
                console.log(totalExpense);
                let userObj = {
                    user:users[i],
                    expenses,
                    totalExpense
                }
                leaderboard.push(userObj);
            }
           return res.status(200).json({success : true, data : leaderboard});
        }

        return res.status(400).json({message : 'user is not premium user' });

    } catch (error) {
        res.status(500).json({success : false, data : error});
    }
}


exports.getLeaderBoardUser = async(req,res,next)=>{
    
    try{
        if(req.user.ispremiumuser){
            const userId = req.params.loadUserId;
            const user = await User.findOne({where:{id: userId}})
    
            const expenses = await user.getExpenses();
            return res.status(200).json({success:true , data: expenses })
        }

    }
    catch(error){
        return res.status(500).json({success : false, data : error});
    }
    

}

/*
exports.getAllUsers = async (req,res,next)=>{
    try{
        if(req.user.ispremiumuser){
            let leaderboard = [];
            const users = await User.findAll({
                attributes:['id','username','email']
            })
    
            
    
            for(let i=0;i<users.length;i++){
                let allUserExpenses = await users[i].getExpenses();
                let totalExpense = 0;
    
                for(let j=0;i<allUserExpenses.length;j++){
                    totalExpense += allUserExpenses[j].eamount;
                }
    
                let userObj = {
                    user: users[i],
                    allUserExpenses,
                    totalExpense
                }
    
                leaderboard.push(userObj);
                
            }
            return res.status(200).json({success : true, data : leaderboard});
        }
        return res.status(400).json({message : 'user is not premium user' });

    }
    catch(error){
        res.status(500).json({success : false, data : error});
    }


    

}*/

exports.getExpenses = async (req,res,next)=>{
   // const {eamount,edescription,category}= req.body;
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