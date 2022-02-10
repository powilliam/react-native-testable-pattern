import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';

import {Text} from './text';

import {Repository} from '../entities/repository';

export interface RepositoriesListProps {
  readonly repositories: Repository[];
  onNavigateToRepository(repository?: Repository): void;
}

export function RepositoriesList({
  repositories,
  onNavigateToRepository,
}: RepositoriesListProps) {
  const isEmpty = repositories.length === 0;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {isEmpty ? (
        <Text>Empty</Text>
      ) : (
        repositories.map(repository => (
          <TouchableOpacity
            key={repository.node_id}
            onPress={() => onNavigateToRepository(repository)}>
            <Text>{repository.name}</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}
