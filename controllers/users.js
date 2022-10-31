const User = require('../models/user');





exports.signup = async(req ,res,next)=>{

    try {
        const {username, email, password} = req.body ;

        if(!username || !email || !password){
            return res.status(400).json({message:'add all fields'})
        }

        const user = await User.findAll({where:{email}});
        if(user.length>0){
            return res.status(207).json({message:'user already exist'})
        }
        await User.create({ username , email ,password})
        return res.status(201).json({message:'successfully created new user'})

    } catch (err) {
        res.status(500).json(err);
    }

}



/*
exports.signup = async (req,res,next)=>{
  console.log("hey into signup");

  try
  {
   /* User.findByPk(req.body.email).then(userEmail=>{
      if(userEmail){
        const email = req.body.email
        
        const data = {
          email: email
        }
        res.status(207).json({newUserDetail: data})
      }*/
      /*
     const findingEmail = await User.findByPk(req.body.email)
     if(findingEmail !== null){
        res.status(207).json({newUserDetail: 'Already Exists'})
     }
     if(findingEmail ==null)    
      {
        const username = req.body.username;
        const email = req.body.email
        const password = req.body.password;

        if(!password){
          throw new Error('please enter password');
        }

        const signedUserData =  User.create({

          username : username,
          email : email,
          password : password

        })

        res.status(201).json({newUserDetail: 'signup success'});

     }
  }

  catch(error){
    console.log(error);
    res.status(500).json({error:error});

  }


}*/


exports.getUsers = async (req,res,next)=>{
    console.log("Getting users");

    try{
      
     const data =  await User.findAll()
     res.status(201).json(data);
    }
    catch(error) {
      console.log(error);
      res.status(500).json({error:error});
    }
    
   
}

exports.postAddUser = async(req, res, next) => {
  console.log('adding a user');
  try{
    const name = req.body.name;
    const email = req.body.email;
    const phoneNo = req.body.phoneNo;

    if(!phoneNo){
      throw new Error('please enter phone number');
    }

    const data = await User.create({
      name: name,
      email: email,
      phoneNo: phoneNo,
    })
    res.status(201).json({newUserDetail: data});
  }
  catch(error){
    console.log(error);
    res.status(500).json({error:error});
  }
}


exports.deleteUser = async (req,res,next)=>{
  
  try{
    let userId = req.params.userId;
    if(!userId){
      res.status(400).json({error:'id missing'});
    }
    await User.destroy({where:{id:userId}});
    res.sendStatus(200);
    
  }
  catch(error){
    console.log(error);
    res.status(500).json('error occured');
  };



}
















    
  //left side  titlebelongs to db attribute and right side belongs to const
  

  /*
router.post('/user/add-user', async (req,res,next)=>{
    console.log('hi');
    const name = req.body.name;
    const email = req.body.email;
    const phoneNo = req.body.number;

    const data = await User.create( {name:name, email:email, phoneNo:phoneNo});
    res.status(201).json({newUserDetail: data});
});

router.get('/user/get-user', async (req,res,next)=>{
    console.log("hi");
    const users = await User.findAll();
    res.status(200).json({allUsers: users});
});
*/