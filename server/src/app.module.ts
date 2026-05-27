import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
// import { LeadsModule } from './leads/leads.module';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [AuthModule, PrismaModule, PortfoliosModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
