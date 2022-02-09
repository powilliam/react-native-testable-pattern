import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';

import {OrganizationScreenComponentState} from '../states/organization';
import {RepositoriesScreenComponentState} from '../states/repositories';

import {
  OrganizationDetails,
  OrganizationDetailsProps,
} from '../components/organization';
import {
  RepositoriesList,
  RepositoriesListProps,
} from '../components/repositories';

interface RepositoriesScreenProps
  extends Omit<OrganizationDetailsProps, 'organization'>,
    Omit<RepositoriesListProps, 'repositories'> {
  readonly repositoriesState: RepositoriesScreenComponentState;
  readonly organizationState: OrganizationScreenComponentState;
}

const css: StyleProp<ViewStyle> = {
  flex: 1,
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center',
};

/**
 * Nossa tela, assim como nossos componentes, apenas recebem via props
 * os nossos estados. Dessa forma fazemos com que isso seja um componente puro,
 * que recebe um input e retorna um output, sem efeitos coláterais, se tornando
 * mais previsível e testável.
 *
 * Além disso, o componente torna-se mais optimizável através React.memo, uma vez que
 * seus re-renders dependem exclusivamente de suas props e não de estados internos.
 *
 * Lembrando que uma tela pode receber VÁRIOS estados!
 *
 * UI = F(State) :)
 */
export default function RepositoriesScreen({
  repositoriesState: {
    states: {isLoadingRepositories, repositories},
    callbacks: {onFetchRepositories},
  },
  organizationState: {
    states: {isLoadingOrganization, organization},
    callbacks: {onFetchOrganization},
  },
  onNavigateToOrganization,
  onNavigateToRepository,
}: RepositoriesScreenProps) {
  const isLoading = isLoadingOrganization || isLoadingRepositories;

  return (
    <SafeAreaView style={css}>
      <View>
        <TouchableOpacity
          onPress={() =>
            Promise.all([onFetchOrganization(), onFetchRepositories()])
          }>
          <Text>Fetch</Text>
        </TouchableOpacity>
        {isLoading ? (
          <Text>loading...</Text>
        ) : (
          <React.Fragment>
            <OrganizationDetails
              organization={organization}
              onNavigateToOrganization={onNavigateToOrganization}
            />
            <RepositoriesList
              repositories={repositories}
              onNavigateToRepository={onNavigateToRepository}
            />
          </React.Fragment>
        )}
      </View>
    </SafeAreaView>
  );
}
