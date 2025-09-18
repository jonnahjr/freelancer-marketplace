import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProposalsService } from './proposals.service';

@Controller('proposals')
export class ProposalsController {
  constructor(private proposalsService: ProposalsService) {}

  @Post()
  async create(@Body() body: any) {
    return this.proposalsService.create(body);
  }

  @Get('project/:projectId')
  async findByProject(@Param('projectId') projectId: string) {
    return this.proposalsService.findByProject(projectId);
  }
}
