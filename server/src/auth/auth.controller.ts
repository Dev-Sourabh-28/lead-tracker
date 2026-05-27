import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    register(@Body() body: RegisterDto){
        return this.authService.register(body);
    }

    @Post('login')
    async login(
        @Body() body: LoginDto,
        @Res({ passthrough: true}) res: Response,
    ){

        const result = await this.authService.login(body);

        res.cookie('token', result.access_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return {
            message: 'Login successful',
            access_token: result.access_token,
            user: result.user,
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req){
        return req.user;
    }
}
