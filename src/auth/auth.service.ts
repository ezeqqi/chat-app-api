import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    nickname: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findForAuth(nickname);
    console.log('user sing in', user);
    if (!user) {
      throw new NotFoundException();
    }
    const correctPassword = await user.comparePassword(password);
    if (!correctPassword) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      nickname: user.nickname,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
