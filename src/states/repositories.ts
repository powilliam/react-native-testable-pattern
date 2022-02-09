import {useState} from 'react';

import {ComponentState} from './state';

import {Repository} from '../entities/repository';
import {
  GitHubRepositoryService,
  githubRepositoryServiceFactory,
} from '../services/repositories';
import githubClient from '../clients/github';

interface RepositoriesScreenStates {
  readonly isLoadingRepositories: boolean;
  readonly repositories: Repository[];
}

interface RepositoriesScreenCallbacks {
  onFetchRepositories(): Promise<void>;
}

/**
 * Exportamos apenas esse `type` para facilitar a tipagem do mesmo
 * em cada tela ou componente que o for utilizar,
 * não precisando repetir essa tipagem exaustiva de `ComponentState<blablabla, blablabla>`
 */
export type RepositoriesScreenComponentState = ComponentState<
  RepositoriesScreenStates,
  RepositoriesScreenCallbacks
>;

/**
 * Criamos um hook responsável por separar os estados, suas manipulações,
 * assim como comportamentos atrelados aos ciclos de vidas, da interface em sí.
 *
 * Passamos via parâmetro todas as dependências, segregadas por uma interface.
 * Podemos utilizar os `default parameters de uma função` para não nos preocuparmos em prover
 * tais instâncias, apenas na hora de implementar os testes.
 */
export function useRepositoriesScreenState(
  githubRepositoryService: GitHubRepositoryService = githubRepositoryServiceFactory(
    githubClient,
  ),
): RepositoriesScreenComponentState {
  const [isLoadingRepositories, setIsLoadingRepositories] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);

  /**
   * Chamamos nossos `useEffect's` aqui. Só está comentado para evitar atingir
   * o `rate limit` da API do GitHub, pois o codesandbox restarta o browser a cada
   * edição de código.
   *
   *  useEffect(() => {
   *     onFetchRepositories()
   *  }, []);
   */

  async function onFetchRepositories() {
    setIsLoadingRepositories(true);
    try {
      const repos = await githubRepositoryService.repositories('naveteam');
      setRepositories(repos);
    } catch (error) {
    } finally {
      setIsLoadingRepositories(false);
    }
  }

  return {
    states: {
      isLoadingRepositories,
      repositories,
    },
    callbacks: {
      onFetchRepositories,
    },
  };
}
