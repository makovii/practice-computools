import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from 'src/user/user.module';
import { Request } from './request.model';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { TeamModule } from 'src/team/team.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() =>UserModule), TeamModule, AuthModule, SequelizeModule.forFeature([Request])],
  providers: [RequestService],
  exports: [RequestService],
  controllers: [RequestController]
})
export class RequestModule {}