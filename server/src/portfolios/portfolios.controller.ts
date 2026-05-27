import { 
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
    Param,
    Patch
     } from '@nestjs/common';

import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guards';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';     
import { PortfoliosService } from './portfolios.service';

@Controller('portfolios')
export class PortfoliosController {
    constructor(private portfoliosService: PortfoliosService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    create (@Req() req, @Body() dto: CreatePortfolioDto){
        return this.portfoliosService.create(req.user.userId, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Req() req) {
        return this.portfoliosService.findAll(req.user.userId);
    }

    @Get(':slug')
    findBySlug(@Param('slug') slug: string){
        return this.portfoliosService.findBySlug(slug)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: CreatePortfolioDto,
    ){
        return this.portfoliosService.update(id,dto)
    }
}
