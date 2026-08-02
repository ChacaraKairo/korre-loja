import { Injectable, UnauthorizedException } from "@nestjs/common";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { PrismaService } from "./prisma.service";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(payload: unknown) {
    const input = loginSchema.parse(payload);
    const user = await this.prisma.adminUser.findUnique({ where: { email: input.email } });

    if (!user || !user.active) {
      throw new UnauthorizedException("Credenciais invalidas");
    }

    const validPassword = await bcrypt.compare(input.password, user.passwordHash);

    if (!validPassword) {
      throw new UnauthorizedException("Credenciais invalidas");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET ?? "change-me",
      { expiresIn: "8h" }
    );

    await this.prisma.auditLog.create({
      data: {
        adminUserId: user.id,
        action: "auth.login",
        entity: "AdminUser",
        entityId: user.id
      }
    });

    return {
      token,
      user: this.sanitizeUser(user)
    };
  }

  async me(userId: string) {
    const user = await this.prisma.adminUser.findUnique({ where: { id: userId } });

    if (!user || !user.active) {
      throw new UnauthorizedException("Usuario invalido");
    }

    return this.sanitizeUser(user);
  }

  private sanitizeUser(user: { id: string; name: string; email: string; role: string }) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
  }
}
