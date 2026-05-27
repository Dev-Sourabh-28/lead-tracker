import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ){}

    async register(data: RegisterDto){
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            },
        });

        return{
            message: 'User registered successfully',
            user,
        }
    }

    async login(data: LoginDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if(!user){
            throw new UnauthorizedException('Invalid Credentials');
        }

        const isPasswordMatched = await bcrypt.compare(
            data.password,
            user.password
        );

        if(!isPasswordMatched){
            throw new UnauthorizedException('Incorrect Password');
        }

        const token = this.jwtService.sign({
            userId: user.id,
            email: user.email,
        });

        return{
            message: 'Login succesfull',
            access_token: token,
            user,
        };
    }


}
