import { Injectable } from '@nestjs/common';

@Injectable()
export class ProposalsService {
  private proposals = [];

  async create(data: any) {
    const p = { id: String(Date.now()), ...data };
    this.proposals.push(p);
    return p;
  }

  async findByProject(projectId: string) {
    return this.proposals.filter((p) => p.projectId === projectId);
  }
}
