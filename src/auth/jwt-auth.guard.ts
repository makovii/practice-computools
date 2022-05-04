import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { NOT_AUTHORIZED, NO_ACCESS, ROLE } from '../constants';
import { ROLE_KEY } from './checkRole.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    //try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0].toLowerCase();
      const token = authHeader.split(' ')[1];

      if (bearer !== 'bearer' || !token) {
        throw new UnauthorizedException(NOT_AUTHORIZED);
      }
      const user = this.jwtService.verify(token);
      req.user = user;

      //check on role
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLE_KEY, [
        context.getHandler(),
        context.getClass(),
      ])
      if (!requiredRoles) {
        return true
      }

      if (!requiredRoles.includes(ROLE[req.user.roleId])){
        throw new HttpException(NO_ACCESS, HttpStatus.FORBIDDEN);
      }
      
      return true;
    // } catch (e) {
    //   console.log(e);
    //   return false
    //   //throw new UnauthorizedException(NOT_AUTHORIZED);
    // }
  }
}
