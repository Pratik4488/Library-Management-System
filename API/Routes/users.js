const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");





// //validation

// const Joi = require("@hapi/joi");
// const schema = {
//     name : Joi.string().min(6).required(),
//     email: Joi.string().min(6).required()
// }



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
        if(user== null){
            return res.status(400).json("Can not find the user");
        }

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
            res.status(200).json("Account has been updated...");
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


// issue a book---------------------------------------------------------------------------------------------------------------------


router.put("/:id/issue", async (req, res) =>{
    try{

        const book= await Book.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);

        if(!currentUser.issued.includes(book._id)){
            await currentUser.updateOne({$push: {issued: book._id}});
            await book.updateOne({$set: { isIssued: true}});
            res.status(200).json("User issued a book....");
        }

    }catch(err){
        res.status(500).json(err);
    }
})


// return a book -----------------------------------------------------------------------------------------------------------

router.put("/:id/return", async (req, res) =>{
    try{
        const book= await Book.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);

        if(currentUser.issued.includes(book._id)){
            await currentUser.updateOne({$pull: {issued: book._id}});
            await currentUser.updateOne({$push: {returned: book._id}});
            await book.updateOne({$set: { isIssued: false}});
            res.status(200).json("User returned a book....");
        }else{
            return res.status(404).json("No book found to return.....")
        }

    }catch(err){
        res.status(500).json(err);
    }
})


// reserve a book ------------------------------------------------------------------------------------------------------------------



router.put("/:id/reserve", async (req, res) =>{
    try{

        const book= await Book.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);

        if(!currentUser.issued.includes(book._id)){
            await currentUser.updateOne({$push: {reservation: book._id}});
            await book.updateOne({$set: { isReserved: true}});
            res.status(200).json("User reserved a book....");
        }

    }catch(err){
        res.status(500).json(err);
    }
})




module.exports= router;