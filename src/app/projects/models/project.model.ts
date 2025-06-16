export interface Project {
  id: number;
  name: string;
  description: string;
  projectType: 'GROUP' | 'OPEN_SOURCE';
  ownerUserId: number;
  license: string | null;
  sendbirdChannelId: string;
  createdAt: string;
  updatedAt: string;
}
