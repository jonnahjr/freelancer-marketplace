import { Injectable } from '@nestjs/common';

type Contract = any;

@Injectable()
export class ContractsService {
  private contracts: Contract[] = [];

  async create(data: any) {
    const c = { id: String(Date.now()), status: 'PENDING', escrow: 0, ...data };
    this.contracts.push(c);
    return c;
  }

  async fund(contractId: string, amount: number) {
    const c = this.contracts.find((x) => x.id === contractId);
    if (!c) throw new Error('Not found');
    c.escrow = (c.escrow || 0) + amount;
    c.status = 'ACTIVE';
    return c;
  }

  async release(contractId: string) {
    const c = this.contracts.find((x) => x.id === contractId);
    if (!c) throw new Error('Not found');
    c.escrow = 0;
    c.status = 'COMPLETED';
    return c;
  }
}
