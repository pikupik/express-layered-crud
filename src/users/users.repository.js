const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UsersRepository {
  static async createUser({ email, password, role }) {
    return await prisma.user.create({
      data: {
        email,
        password,
        role,
      },
    });
  }

  static async findUserByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
}

module.exports = UsersRepository;
