import { Injectable, Inject, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { mergeWith, Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate {
constructor (private JwtService : JwtService){}

canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthorizedException('no token provided');
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = this.JwtService.verify(token);
        request.user = payload;
        return true;
    } catch {
        throw new UnauthorizedException('token has been expired or revoked')
    }
}
}