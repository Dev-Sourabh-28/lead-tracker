import { Test, TestingModule } from '@nestjs/testing';
import { LeadsService } from './leads.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('LeadsService', () => {
	let service: LeadsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				LeadsService,
				{ provide: PrismaService, useValue: {} },
			],
		}).compile();

		service = module.get<LeadsService>(LeadsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
