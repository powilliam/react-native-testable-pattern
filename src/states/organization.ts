import {useState} from 'react';

import {Organization} from '../entities/organization';

import {ComponentState} from './state';

import {
  GitHubOrganizationService,
  githubOrganizationServiceFactory,
} from '../services/organizations';

import githubClient from '../clients/github';

interface OrganizationStates {
  readonly isLoadingOrganization: boolean;
  readonly organization: Organization | null;
}

interface OrganizationCallbacks {
  onFetchOrganization(): Promise<void>;
}

export type OrganizationScreenComponentState = ComponentState<
  OrganizationStates,
  OrganizationCallbacks
>;

/**
 * Criamos um hook responsável por separar os estados, suas manipulações,
 * assim como comportamentos atrelados aos ciclos de vidas, da interface em sí.
 *
 * Passamos via parâmetro todas as dependências, segregadas por uma interface.
 * Podemos utilizar os `default parameters de uma função` para não nos preocuparmos em prover
 * tais instâncias, apenas na hora de implementar os testes.
 */
export function useOrganizationScreenState(
  githubOrganizationsService: GitHubOrganizationService = githubOrganizationServiceFactory(
    githubClient,
  ),
): OrganizationScreenComponentState {
  const [isLoadingOrganization, setIsLoadingOrganization] = useState(false);
  const [organization, setOrganization] = useState<Organization | null>(null);

  /**
   * Chamamos nossos `useEffect's` aqui. Só está comentado para evitar atingir
   * o `rate limit` da API do GitHub, pois o codesandbox restarta o browser a cada
   * edição de código.
   *
   *  useEffect(() => {
   *     onFetchOrganization()
   *  }, []);
   */

  async function onFetchOrganization() {
    setIsLoadingOrganization(true);
    try {
      const org = await githubOrganizationsService.organization('naveteam');
      setOrganization(org);
    } catch (error) {
    } finally {
      setIsLoadingOrganization(false);
    }
  }

  return {
    states: {
      isLoadingOrganization,
      organization,
    },
    callbacks: {
      onFetchOrganization,
    },
  };
}
