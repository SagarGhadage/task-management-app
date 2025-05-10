const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService } = require("../services");
const ApiError = require("../utils/ApiError");


const register = catchAsync(async (req, res) => {
  const user=await userService.createUser(req.body)
  // console.log(user)
  const tokens=await tokenService.generateAuthTokens(user)
  res.status(httpStatus.CREATED).send({user,tokens})
});


const login = catchAsync(async (req, res) => {
  console.log(req.body)

  let user=await authService.loginUserWithEmailAndPassword(req.body.email,req.body.password)
  if(user){
    const tokens=await tokenService.generateAuthTokens(user)
    res.status(httpStatus.OK).send({user,tokens}) 
  }else{
    new ApiError(httpStatus.UNAUTHORIZED,'invalid credentials ')
  }
});

module.exports = {
  register,
  login,
};



const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash });
  res.json({ user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  const isValid = user && await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: 'Invalid' });
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token });
};
