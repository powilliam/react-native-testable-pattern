import React from 'react';
import {render} from '@testing-library/react-native';

import {Repository} from '../entities/repository';

import {RepositoriesList} from './repositories';

describe('ReppositoriesList', () => {
  const onNavigateToRepository = jest.fn();

  it('should be able to display an empty message', async () => {
    const {findByText} = render(
      <RepositoriesList
        repositories={[]}
        onNavigateToRepository={onNavigateToRepository}
      />,
    );
    expect(await findByText('Empty')).toBeDefined();
  });

  it('should be able to display a list of repositories', async () => {
    const {findByText} = render(
      <RepositoriesList
        repositories={
          [
            {node_id: '1', name: 'react-native-template-typescript'},
            {node_id: '2', name: 'flutter-boilerplate'},
          ] as Repository[]
        }
        onNavigateToRepository={onNavigateToRepository}
      />,
    );
    expect(await findByText('react-native-template-typescript')).toBeDefined();
    expect(await findByText('flutter-boilerplate')).toBeDefined();
  });
});
