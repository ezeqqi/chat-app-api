import {
  Controller,
  Request,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@/auth/auth.guard';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  register(@Request() req: any) {
    return this.usersService.create(req);
  }
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get()
  getAll(): Promise<any> {
    return this.usersService.findAll();
  }
}
