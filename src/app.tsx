import React from 'react';

import RepositoriesScreen from './screens/repositories';

import {Browsable} from './entities/browsable';

import {useRepositoriesScreenState} from './states/repositories';
import {useOrganizationScreenState} from './states/organization';

/**
 * Em algum momento, vamos precisar juntar tudo e esse é o momento.
 * Se cada estado, tela e componente estão bem testados unitariamente,
 * não precisamos nos preocupar em testar esse carinha.
 *
 * Nesse caso, o componente abaixo utiliza do `Container Pattern`, servindo apenas
 * para acoplarmos propositalmente nossos states com nossa tela
 *
 * https://reactpatterns.com/#container-component
 *
 * Containers devem estar sujeitos apenas a testes instrumentados (e2e)
 * pois estão extremamente acoplados aos estados, impedindo o teste unitário,
 * uma vez que os estados dependem da implementação de um serviço HTTP
 */
export default function OrganizationAndRepositoriesScreenContainer() {
  // const navigation = useNavigation()

  const repositoriesState = useRepositoriesScreenState();
  const organizationState = useOrganizationScreenState();

  function onNavigate<E extends Browsable>(entity?: E) {
    if (!entity) {
      return;
    }
    // return window.location.assign(entity.html_url);
  }

  return (
    <RepositoriesScreen
      repositoriesState={repositoriesState}
      organizationState={organizationState}
      onNavigateToOrganization={onNavigate}
      onNavigateToRepository={onNavigate}
    />
  );
}
