import { Reports } from '../../administration/@types/reports';

export interface Scripts {
  name: string;
  version: string;
  creator: string;
  repositoryLink: string;
  reports: Reports[];
  createdAt?: string;
  updatedAt?: string;
}
