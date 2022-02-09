import {AxiosInstance} from 'axios';

import {Organization} from '../entities/organization';

export interface GitHubOrganizationService {
  organization(org: string): Promise<Organization>;
}

/**
 * Esperamos receber uma instância de um `client`,
 * pois dessa forma conseguimos reduzir o acoplamento
 * de código, tornando mais fàcil a implementação
 * de testes unitários ou de integrações, tendo em vista
 * que um teste NUNCA deve depender de uma conexāo com a API.
 */
export function githubOrganizationServiceFactory(
  client: AxiosInstance,
): GitHubOrganizationService {
  return {
    async organization(org) {
      const {data} = await client.get<Organization>(`orgs/${org}`);
      return data || ({} as Organization);
    },
  };
}
