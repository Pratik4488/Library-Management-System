const router = require("express").Router();
const User = require("../models/user");

// register a new user --------------------------------------



router.post("/register", async (req, res) => {
    try {

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            category: req.body.category,
            collegeId: req.body.collegeId,
            branch: req.body.branch,
        });


        // save user and return res

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
})


// Login user -------------------------------------------------------


router.post("/login/", async (req, res)=>{
    try{
        const user = await User.findOne({username: req.body.username});

        !user && res.status(404).json("user not found!!!!")

        if(user.password !== req.body.password){
            res.status(404).json("wrong Password!!!");
        }else{
            if(user.category !== req.body.category){
                res.status(404).json("user not found !");
            }
            res.status(200).json(user);
        }

    }catch(err){
        res.status(500).json(err);
    }
})



// update user -------------------------------------------------------------


router.put("/:id", async (req, res)=>{
    if(req.body.userId == req.params.id || req.body.isAdmin){
        
        try{

            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated...")
        }catch(err){
            res.status(500).json(err);
        }


    }else{
        return res.status(404).json("You can update your account only...");
    }
});


// delete user -----------------------------------------------------

router.delete('/:id', async (req, res) =>{
    if(req.body.userId == req.params.id || req.body.isAdmin){

        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been Deleted!!!")
        }catch(error){
            res.status(500).json(error);
        }
    }else{
        return res.status(404).json("You can delete only your account!")
    }
})


// get a user ------------------------------------------------

router.get("/", async (req, res) =>{
    const userId = req.query.userId;
    const name = req.query.name;
    try{
        const user =userId
         ? await User.findById(req.query.userId)
        : await User.findOne({name: name});

        // This is how we can filter data to be viwed form mongodb document.
        const {password, updatedAt, createdAt, isAdmin, ...other}= user._doc;
        res.status(200).json(user);

    }catch(error){
        res.status(500).json(error)
    }
})





module.exports= router;