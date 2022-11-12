const User = require('../models/User')

const bcrypt = require('bcrypt');
const salt = 10;

const jwt = require('jsonwebtoken');

async function createUser(req, res){
    try{
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
    }catch (err){
        res.json(err)
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
                name: `${user.firstName} ${user.lastName}`
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

    } catch (err){
        res.json({message: "You are not loggedin, please try again later!"}).status(400);
    }
}




module.exports = {
    createUser,
    auth_signin
}