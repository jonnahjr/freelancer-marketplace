import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  // Mock payment initiation for Telebirr/Chapa
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async initiate(provider: 'telebirr' | 'chapa', amount: number, _metadata: any) {
    // Return a mock provider reference
    return { provider, providerRef: `mock-${provider}-${Date.now()}`, amount, status: 'PENDING' };
  }

  async confirm(providerRef: string) {
    // Mock confirm
    return { providerRef, status: 'COMPLETED' };
  }
}
