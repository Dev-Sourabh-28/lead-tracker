import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from '../auth/dto/create-lead.dto';
import { LeadStatus } from '@prisma/client';

@Injectable()
export class LeadsService {
	constructor(private prisma: PrismaService) {}

	async createLead(userId: string, data: CreateLeadDto) {
		return this.prisma.lead.create({
			data: {
				...data,
				userId,
			},
		});
	}

	async getLeads(userId: string, status?: LeadStatus) {
		return this.prisma.lead.findMany({
			where: {
				userId,
				...(status ? { status } : {}),
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	async updateLead(userId: string, leadId: string, data: any) {
		return this.prisma.lead.updateMany({
			where: {
				id: leadId,
				userId: userId,
			},
			data,
		});
	}

	async updateLeadStatus(userId: string, leadId: string, status: LeadStatus) {
		return this.prisma.lead.updateMany({
			where: {
				id: leadId,
				userId,
			},
			data: {
				status,
			},
		});
	}

	async deleteLead(userId: string, leadId: string) {
		return this.prisma.lead.deleteMany({
			where: {
				id: leadId,
				userId,
			},
		});
	}
}
