const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UsersRepository = require("./users.repository");

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

class UserService {
  //register new user
  static async registerUser({ email, password, role }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await UsersRepository.createUser({
      email,
      password: hashedPassword,
      role,
    });
  }

  //login user and generate token
  static async loginUser({ email, password }) {
    const user = await UsersRepository.findUserByEmail(email);
    if (!user) throw new Error("User Not Found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid Credentials");

    const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY);
    return { token, user };
  }
}

module.exports = UserService;
