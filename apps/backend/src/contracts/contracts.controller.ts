import { Controller, Post, Body, Param } from '@nestjs/common';
import { ContractsService } from './contracts.service';

@Controller('contracts')
export class ContractsController {
  constructor(private contractsService: ContractsService) {}

  @Post()
  async create(@Body() body: any) {
    return this.contractsService.create(body);
  }

  @Post(':id/fund')
  async fund(@Param('id') id: string, @Body() body: any) {
    return this.contractsService.fund(id, body.amount);
  }

  @Post(':id/release')
  async release(@Param('id') id: string) {
    return this.contractsService.release(id);
  }
}
