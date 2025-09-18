import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('initiate')
  async initiate(@Body() body: any) {
    return this.paymentsService.initiate(body.provider, body.amount, body.metadata || {});
  }

  @Post('confirm')
  async confirm(@Body() body: any) {
    return this.paymentsService.confirm(body.providerRef);
  }
}
