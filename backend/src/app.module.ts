import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { ProposalsModule } from './proposals/proposals.module';
import { ContractsModule } from './contracts/contracts.module';
import { PaymentsModule } from './payments/payments.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [UsersModule, AuthModule, ProjectsModule, ProposalsModule, ContractsModule, PaymentsModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
