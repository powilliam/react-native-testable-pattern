import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
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
import {Button} from '../components/button';
import {Text} from '../components/text';

import {withSystemColors} from '../hocs';

import {Colors} from '../themes';

interface RepositoriesScreenProps
  extends Omit<OrganizationDetailsProps, 'organization'>,
    Omit<RepositoriesListProps, 'repositories'> {
  readonly repositoriesState: RepositoriesScreenComponentState;
  readonly organizationState: OrganizationScreenComponentState;
  readonly colors: Colors;
}

const css: StyleProp<ViewStyle> = {
  flex: 1,
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
function RepositoriesScreen({
  colors,
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
  const styles = makeStyles(colors);
  const isLoading = isLoadingOrganization || isLoadingRepositories;

  return (
    <SafeAreaView style={[css, styles.safeArea]}>
      <View style={styles.listContainer}>
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
      <View style={styles.buttonContainer}>
        <Button
          onPress={() =>
            Promise.all([onFetchOrganization(), onFetchRepositories()])
          }>
          Fetch
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default withSystemColors(RepositoriesScreen);

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: colors.surface,
    },
    listContainer: {
      flex: 3,
      backgroundColor: colors.primaryContainer,
      borderRadius: 12,
      margin: 16,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    buttonContainer: {
      flex: 1,
      margin: 16,
      justifyContent: 'flex-end',
    },
    text: {
      color: colors.onSurface,
      fontSize: 16,
    },
  });
