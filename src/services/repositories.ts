import {AxiosInstance} from 'axios';

import {Repository} from '../entities/repository';

export interface GitHubRepositoryService {
  repositories(org: string): Promise<Repository[]>;
}

/**
 * Esperamos receber uma instância de um `client`,
 * pois dessa forma conseguimos reduzir o acoplamento
 * de código, tornando mais fàcil a implementação
 * de testes unitários ou de integrações, tendo em vista
 * que um teste NUNCA deve depender de uma conexāo com a API.
 */
export function githubRepositoryServiceFactory(
  client: AxiosInstance,
): GitHubRepositoryService {
  return {
    async repositories(org) {
      const {data} = await client.get<Repository[]>(`/orgs/${org}/repos`);
      return data || [];
    },
  };
}
