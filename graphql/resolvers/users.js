const Users = require("./../../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../../config");
const { UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../helpers/validators");
const { getAccessToken } = require("../../helpers/jwt");

SECRET_KEY = config.jwt.secretKey;

module.exports = {
  Mutation: {
    async login(_, { username, password }, context, info) {
      const { valid, error } = validateLoginInput(username, password);

      if (!valid) {
        throw UserInputError("Please enter username/password", { error });
      }

      const userObject = await Users.findOne({ username });

      if (!userObject) {
        error.generic = "User not found";
        throw new UserInputError("User not found", { error });
      }

      const match = await bcrypt.compare(password, userObject.password);
      if (!match) {
        error.generic = "Wrong credentials";
        throw new UserInputError("Wrong credential", { error });
      }

      const token = getAccessToken(userObject);

      return {
        ...userObject._doc,
        id: userObject._id,
        token,
      };
    },
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
      //Validate data.
      const { error, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { error });
      }

      // Check if user already exists
      const userObject = await Users.findOne({ username });
      if (userObject) {
        throw new UserInputError("Username is already taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      // Hash password and store data.
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

      // Generate JWT Token
      const token = getAccessToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
