const User = require('../models/User')
const Food = require('../models/Food')

const bcrypt = require('bcrypt');
const salt = 10;

const jwt = require('jsonwebtoken');

async function createUser(req, res){
    try{
            if(Object.keys(req.body).length === 6){
                let hashedPassword = bcrypt.hashSync(req.body.password, salt)
                const newUser = await User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hashedPassword,
                    role: req.body.role,
                    mobile: req.body.mobile
                })
                res.json(newUser);
            } else{
                res.status(400).send({message:'All Fields Are Required!'})
                return;
            }
    }catch (err){
        res.json(err)
    }
}

async function getUserById(req, res){
    try{
        const user = await User.findById(req.params.userId)
        await user.populate('foods')
        res.json(user)
    }catch (err){
        res.json(err);
    }
}

async function updateUser(req, res){
    try{
        const filter = {_id: req.params.userId};
        const update = req.body;
        const updatedUser = await User.findOneAndUpdate(filter, update);
        res.json(updatedUser);
    }catch (err){
        res.json(err);
    }
}

async function getUsersDonates(req, res){
    console.log('user',req.user.id)
    try{
       const user = await User.findById(mongoose.Types.ObjectId(req.user.id))
       await user.populate('foods')
       res.json(user)
        // console.log('user',user)

    }catch (err){
        res.json(err);
    }
}

async function auth_signin(req, res){
    let {email, password} = req.body;
    try{
        let user = await User.findOne({email});

        if(!user){
            return res.json({message: "User not found"}).status(400);
        }

        const isMatch = await bcrypt.compareSync(password, user.password);

        if(!isMatch){
            return res.json({message: "Password not matched!"}).status(401);
        }

        const payload = {
            user: {
                id: user._id,
                // name: `${user.firstName} ${user.lastName}`,
                // firstName: user.firstName,
                // lastName: user.lastName
            }
        }

        jwt.sign(
            payload,
            process.env.SECRET,
            {expiresIn: 36000000},
            (err ,token) => {
                if(err) throw err;
                //returns token as an object >>>>  {token : <token value>}
                res.json({token}).status(200)
            }
        )

        // req.user = payload;

    } catch (err){
        res.json({message: "You are not loggedin, please try again later!"}).status(400);
    }
}




module.exports = {
    createUser,
    auth_signin,
    getUserById,
    updateUser,
    getUsersDonates
}