import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';

@Injectable()
export class PortfoliosService {
    constructor(private prisma: PrismaService){}

    async create(userId: string, dto: CreatePortfolioDto){
        return this.prisma.portfolio.create({
            data: {
                ...dto,
                userId,
            },
        });
    }

    async findAll(userId: string){
        return this.prisma.portfolio.findMany({
            where: {
                userId,
            },
        });
    }

    async findBySlug(slug: string) {
        return this.prisma.portfolio.findUnique({
            where: {
                slug,
            },
            include: {
                projects: true,
            }
        })
    }

    async update(id: string, dto: any) {
        return this.prisma.portfolio.update({
            where: {
                id,
            },
            data: dto,
        })
    }
}
