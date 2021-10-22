const Users = require("./../../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../../config");
const { UserInputError } = require("apollo-server");

SECRET_KEY = config.jwt.secretKey;

module.exports = {
  Mutation: {
    async register(
      _,
      {
        registerInput: {
          firstName,
          lastName,
          username,
          password,
          confirmPassword,
          email,
        },
      },
      context,
      info
    ) {
      //TODO: Validate data.
      const userObject = await Users.findOne({ username });
      if (userObject) {
        throw new UserInputError("Username is already taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      password = await bcrypt.hash(password, 12);
      const newUser = new Users({
        username,
        password,
        email,
        firstName,
        lastName,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();
      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,
        { expiresIn: `4h` }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
