import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../common/auth.guard";
import { AuthService } from "../services/auth.service";

type RequestWithUser = {
  user: { id: string };
};

@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post("login")
  login(@Body() payload: unknown) {
    return this.auth.login(payload);
  }

  @Get("me")
  @UseGuards(AuthGuard)
  me(@Req() request: RequestWithUser) {
    return this.auth.me(request.user.id);
  }
}
