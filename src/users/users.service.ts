import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCreateDto } from './user-create.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Partial<User>[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<Partial<User> | null> {
    return await this.userRepository.findOneBy({ id });
  }
  async findByName(nickname: string): Promise<Partial<User> | null> {
    return await this.userRepository.findOneBy({ nickname });
  }

  async findForAuth(nickname: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { nickname },
      select: ['id', 'nickname', 'password'],
    });
  }

  async create(userData: UserCreateDto): Promise<User | null> {
    console.log('user dto vamo ver o qe acontece aqui', userData);
    return null;
  }
}
