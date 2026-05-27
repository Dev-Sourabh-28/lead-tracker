// import { 
//     Body,
//     Controller,
//     Get,
//     Post,
//     Request,
//     UseGuards,
//     Delete,
//     Query
// } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { LeadsService } from './leads.service';
// import { CreateLeadDto } from 'src/auth/dto/create-lead.dto';
// import {Patch, Param} from '@nestjs/common';
// import { LeadStatus } from '@prisma/client';

// @Controller('leads')
// @UseGuards(AuthGuard('jwt'))
// export class LeadsController {
//     constructor(private leadService: LeadsService){}

//     @Post()
//     createLead(@Request() req, @Body() body: CreateLeadDto){
//         return this.leadService.createLead(req.user.userId, body);
//     }

//     @Get()
//     getLeads(
//         @Request() req, 
//         @Query('status') status?: LeadStatus,
//     ){
//         return this.leadService.getLeads(
//             req.user.userId,
//             status,
//         );
//     }

//     @Patch(':id')
//     updateLead(
//         @Request() req,
//         @Param('id') id: string,
//         @Body() body: CreateLeadDto, 
//     ){
//         return this.leadService.updateLead(
//             req.user.userId,
//             id,
//             body,
//         );
//     }

//     @Patch(':id/status')
//     updateStatus(
//         @Request() req,
//         @Param('id') id: string,
//         @Body('status') status: LeadStatus,
//     ){
//         return this.leadService.updateLeadStatus(
//             req.user.userId,
//             id,
//             status,
//         )
//     }

//     @Delete(':id')
//     deleteLead(
//         @Request() req, 
//         @Param('id') id: string
//     ){
//         return this.leadService.deleteLead(
//             req.user.userId, 
//             id,
//         );
//     }

//     // @Patch(':id/status')
//     // updateStatus(
//     //     @Request() req,
//     //     @Param('id') id: string,
//     //     @Body('status') status: LeadStatus,
//     // ){
//     //     return this.leadService.updateLeadStatus(req.user.userId, id, status)
//     // }
// }
