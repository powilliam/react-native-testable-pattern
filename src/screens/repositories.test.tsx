import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import RepositoriesScreen from './repositories';
import {Repository} from '../entities/repository';
import {Organization} from '../entities/organization';

describe('RepositoriesScreen', () => {
  const mockRepositoriesState = {
    states: {isLoadingRepositories: false, repositories: []},
    callbacks: {onFetchRepositories: jest.fn()},
  };
  const mockOrganizationState = {
    states: {isLoadingOrganization: false, organization: null},
    callbacks: {onFetchOrganization: jest.fn()},
  };
  const onNavigateToOrganization = jest.fn();
  const onNavigateToRepository = jest.fn();

  it('should be able to render an empty message', async () => {
    const {findByText} = render(
      <RepositoriesScreen
        repositoriesState={mockRepositoriesState}
        organizationState={mockOrganizationState}
        onNavigateToOrganization={onNavigateToOrganization}
        onNavigateToRepository={onNavigateToRepository}
      />,
    );
    expect(await findByText('Empty')).toBeDefined();
  });

  it('should be able to call `onFetchRepositories` and `onFetchOrganization`', () => {
    const {getByText} = render(
      <RepositoriesScreen
        organizationState={mockOrganizationState}
        repositoriesState={mockRepositoriesState}
        onNavigateToOrganization={onNavigateToOrganization}
        onNavigateToRepository={onNavigateToRepository}
      />,
    );
    fireEvent.press(getByText('Fetch'));
    expect(
      mockOrganizationState.callbacks.onFetchOrganization,
    ).toHaveBeenCalled();
    expect(
      mockRepositoriesState.callbacks.onFetchRepositories,
    ).toHaveBeenCalled();
  });

  it('should be able to display a loading text if `isLoadingOrganization` state is true', async () => {
    const {findByText} = render(
      <RepositoriesScreen
        repositoriesState={mockRepositoriesState}
        organizationState={{
          ...mockOrganizationState,
          states: {
            ...mockOrganizationState.states,
            isLoadingOrganization: true,
          },
        }}
        onNavigateToOrganization={onNavigateToOrganization}
        onNavigateToRepository={onNavigateToRepository}
      />,
    );
    expect(await findByText('loading...')).toBeDefined();
  });

  it('should be able to display a loading text if `isLoadingRepositories` state is true', async () => {
    const {findByText} = render(
      <RepositoriesScreen
        organizationState={mockOrganizationState}
        repositoriesState={{
          ...mockRepositoriesState,
          states: {
            ...mockRepositoriesState.states,
            isLoadingRepositories: true,
          },
        }}
        onNavigateToOrganization={onNavigateToOrganization}
        onNavigateToRepository={onNavigateToRepository}
      />,
    );
    expect(await findByText('loading...')).toBeDefined();
  });

  it('should be able to display an empty list but with an organization', async () => {
    const {findByText} = render(
      <RepositoriesScreen
        repositoriesState={mockRepositoriesState}
        organizationState={{
          ...mockOrganizationState,
          states: {
            ...mockOrganizationState.states,
            organization: {
              login: 'naveteam',
              name: 'Nave',
            } as Organization,
          },
        }}
        onNavigateToOrganization={onNavigateToOrganization}
        onNavigateToRepository={onNavigateToRepository}
      />,
    );
    expect(await findByText('Login: naveteam')).toBeDefined();
    expect(await findByText('Name: Nave')).toBeDefined();
  });

  it('should be able to display a list of repositories without organization', async () => {
    const {findByText} = render(
      <RepositoriesScreen
        organizationState={mockOrganizationState}
        repositoriesState={{
          ...mockRepositoriesState,
          states: {
            ...mockRepositoriesState.states,
            repositories: [
              {node_id: '1', name: 'react-native-template-typescript'},
              {node_id: '2', name: 'flutter-boilerplate'},
            ] as Repository[],
          },
        }}
        onNavigateToOrganization={onNavigateToOrganization}
        onNavigateToRepository={onNavigateToRepository}
      />,
    );
    expect(await findByText('react-native-template-typescript')).toBeDefined();
    expect(await findByText('flutter-boilerplate')).toBeDefined();
  });

  it('should be able to display a list of repositories with organization', async () => {
    const {findByText} = render(
      <RepositoriesScreen
        organizationState={{
          ...mockOrganizationState,
          states: {
            ...mockOrganizationState.states,
            organization: {
              login: 'naveteam',
              name: 'Nave',
            } as Organization,
          },
        }}
        repositoriesState={{
          ...mockRepositoriesState,
          states: {
            ...mockRepositoriesState.states,
            repositories: [
              {node_id: '1', name: 'react-native-template-typescript'},
              {node_id: '2', name: 'flutter-boilerplate'},
            ] as Repository[],
          },
        }}
        onNavigateToOrganization={onNavigateToOrganization}
        onNavigateToRepository={onNavigateToRepository}
      />,
    );
    expect(await findByText('Login: naveteam')).toBeDefined();
    expect(await findByText('Name: Nave')).toBeDefined();
    expect(await findByText('react-native-template-typescript')).toBeDefined();
    expect(await findByText('flutter-boilerplate')).toBeDefined();
  });

  it('should be able to call `onNavigateToOrganization`', () => {
    const {getByTestId} = render(
      <RepositoriesScreen
        organizationState={{
          ...mockOrganizationState,
          states: {
            ...mockOrganizationState.states,
            organization: {name: 'Nave'} as Organization,
          },
        }}
        repositoriesState={mockRepositoriesState}
        onNavigateToOrganization={onNavigateToOrganization}
        onNavigateToRepository={onNavigateToRepository}
      />,
    );
    fireEvent.press(getByTestId('nave-avatar'));
    expect(onNavigateToOrganization).toHaveBeenCalled();
  });
});
