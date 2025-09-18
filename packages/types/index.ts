// Shared types for freelancer marketplace

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'freelancer';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  clientId: string;
}

export interface Proposal {
  id: string;
  projectId: string;
  freelancerId: string;
  price: number;
  status: 'pending' | 'accepted' | 'rejected';
}
