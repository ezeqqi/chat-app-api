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
    const user = await this.usersService.findByName(nickname);
    console.log('user', user);
    if (!user) {
      throw new NotFoundException();
    }
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    // const { password, ...result } = user;
    // console.log('password', password);
    // TODO: Generate a JWT and return it here
    // instead of the user object
    const payload = {
      sub: user.id,
      nickname: user.nickname,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
