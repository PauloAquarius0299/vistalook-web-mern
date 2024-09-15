const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require('jsonwebtoken');

//cadastro 
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
  
    try {
      const checkUser = await User.findOne({ email });
      if (checkUser)
        return res.json({
          success: false,
          message: "O usuário já existe com o mesmo email! Por favor, tente novamente",
        });
  
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        userName,
        email,
        password: hashPassword,
      });
  
      await newUser.save();
      res.status(200).json({
        success: true,
        message: "Cadastro efetuado",
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Algo deu errado em cadastro",
      });
    }
  };
  
//Acesso 
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const checkUser = await User.findOne({email});
        if(!checkUser)
            return res.json({
              success: false,
              message: 'Usuario não existe! Por Favor tente de novo ou se cadastre',
        });

        const checkPasswordMatch = await bcrypt.compare(
            password,
            checkUser.password
        );
        if(!checkPasswordMatch)
            return res.status(401).json({
             success: false,
             message: 'Senha incorreta! Tente novamente',
        });

        const token = jwt.sign(
            {
                id: checkUser._id,
                role: checkUser.role,
                email: checkUser.email,
                userName: checkUser.userName,
            },
            'CLIENT_SECRET_KEY',
            {expiresIn: '60m'}
        );

        res.cookie('token', token, {
            httpOnly: true, 
            secure: false,
            sameSite: "strict"
        })
            .json({
            success: true,
            message: 'Logado com sucesso!',
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser.id,
                userName: checkUser.userName,
            },
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Algo deu errado em acesso',
        });
    }
}

//logout 

const logoutUser = (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: 'Logout efetuado!',
    });
};

//auth middleware 

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token)
        return res.status(401).json({
          success: false,
          message: 'Unauthorized user!',
    });

    try {
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Unauthorized user!'
        })
    }
}



module.exports = {registerUser, loginUser, logoutUser, authMiddleware}; 