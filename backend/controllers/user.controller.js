const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { userService } = require("../services");
const config = require("../config/config");
/**
 * Get user details
 *  - Use service layer to get User data
 * 
 *  - Return the whole user object fetched from Mongo
 *  - If data exists for the provided "userId", return 200 status code and the object
 *  - If data doesn't exist, throw an error using `ApiError` class
 *    - Status code should be "404 NOT FOUND"
 *    - Error message, "User not found"
 *  - If the user whose token is provided and user whose data to be fetched don't match, throw `ApiError`
 *    - Status code should be "403 FORBIDDEN"
 *    - Error message, "User not found"

 * Request url - <localhost>:8082/v1/users/6010008e6d3477697e8eaba3
 
 * @returns {User}
 *
 */
const getUser = catchAsync(async (req, res) => {
  let { userId } = req.params;
  console.log("uc=>",req.params);
  // console.log("uc=>getUser>:", userId);
  if (req.headers.authorization.split(" ")[0] === "Bearer") {
    console.log("checking");
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      config.jwt.secret,
      {},
      async (err, payload) => {
        console.log(payload);
        // let loggedInUser = await userService.getUserById(payload.sub);
        // console.log(loggedInUser);
        
        if (userId === payload.sub) {
          const user = await userService.getUserById(userId);
          console.log(user)
          res.status(200).json(user);
        } else {
          res.status(403).json("Not authorized");
        }
      }
    );
  }
});

module.exports = {
  getUser,
};
