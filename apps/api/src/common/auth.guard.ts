import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import jwt from "jsonwebtoken";

type RequestWithUser = {
  headers: Record<string, string | undefined>;
  user?: { id: string; email: string; role: string };
};

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const header = request.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : undefined;

    if (!token) {
      throw new UnauthorizedException("Token ausente");
    }

    try {
      request.user = jwt.verify(token, process.env.JWT_SECRET ?? "change-me") as RequestWithUser["user"];
      return true;
    } catch {
      throw new UnauthorizedException("Token invalido");
    }
  }
}
