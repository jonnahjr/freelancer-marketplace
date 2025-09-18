import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  private projects = [];

  async create(data: any) {
    const p = { id: String(Date.now()), ...data };
    this.projects.push(p);
    return p;
  }

  async findAll() {
    return this.projects;
  }

  async findById(id: string) {
    return this.projects.find((p) => p.id === id) || null;
  }
}
