import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import {Organization} from '../entities/organization';

import {OrganizationDetails} from './organization';

describe('OrganizationDetails', () => {
  const onNavigateToOrganization = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not be able to display', async () => {
    const {queryByText} = render(
      <OrganizationDetails
        organization={null}
        onNavigateToOrganization={onNavigateToOrganization}
      />,
    );
    expect(queryByText('Login: naveteam')).toBeNull();
    expect(queryByText('Name: Nave')).toBeNull();
  });

  it('should be able to display without description', async () => {
    const {queryByText} = render(
      <OrganizationDetails
        organization={
          {
            login: 'naveteam',
            name: 'Nave',
          } as Organization
        }
        onNavigateToOrganization={onNavigateToOrganization}
      />,
    );
    expect(queryByText('Login: naveteam')).not.toBeNull();
    expect(queryByText('Name: Nave')).not.toBeNull();
    expect(queryByText('A Software House based on Brazil')).toBeNull();
  });

  it('should be able to display with description', async () => {
    const {queryByText} = render(
      <OrganizationDetails
        organization={
          {
            login: 'naveteam',
            name: 'Nave',
            description: 'A Software House based on Brazil',
          } as Organization
        }
        onNavigateToOrganization={onNavigateToOrganization}
      />,
    );
    expect(queryByText('Login: naveteam')).not.toBeNull();
    expect(queryByText('Name: Nave')).not.toBeNull();
    expect(queryByText('A Software House based on Brazil')).not.toBeNull();
  });

  it('should be able to call `onNavigateToOrganization`', async () => {
    const {getByTestId} = render(
      <OrganizationDetails
        organization={
          {
            login: 'naveteam',
            name: 'Nave',
          } as Organization
        }
        onNavigateToOrganization={onNavigateToOrganization}
      />,
    );
    fireEvent.press(getByTestId('nave-avatar'));
    expect(onNavigateToOrganization).toHaveBeenCalled();
  });
});
