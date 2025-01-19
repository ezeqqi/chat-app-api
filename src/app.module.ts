import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { User } from './users/user.entity';
import { ChatRoom } from './chat-room/chat-room.entity';
import { Message } from './messages/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      database: 'chat_db',
      username: 'postgres',
      password: 'postgres',
      entities: [User, ChatRoom, Message],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    MessagesModule,
    ChatRoomModule,
    // TypeOrmModule.forFeature([__dirname + '/**/*.entity{.ts,.js}']),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
