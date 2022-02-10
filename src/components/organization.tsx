import React, {Fragment} from 'react';
import {Image, TouchableWithoutFeedback} from 'react-native';

import {Text} from './text';

import {Organization} from '../entities/organization';

const imageStyle = {
  width: 48,
  height: 48,
  borderRadius: 12,
};

export interface OrganizationDetailsProps {
  readonly organization?: Organization | null;
  onNavigateToOrganization(organization?: Organization): void;
}

export function OrganizationDetails({
  organization,
  onNavigateToOrganization,
}: OrganizationDetailsProps) {
  const hasOrganization = !!organization;
  const hasDescription = hasOrganization && !!organization?.description;

  return (
    <Fragment>
      {hasOrganization && (
        <Fragment>
          <TouchableWithoutFeedback
            testID={`${organization.name.toLocaleLowerCase()}-avatar`}
            onPress={() => onNavigateToOrganization(organization)}>
            <Image source={{uri: organization.avatar_url}} style={imageStyle} />
          </TouchableWithoutFeedback>
          <Text>Login: {organization.login}</Text>
          <Text>Name: {organization.name}</Text>
          {hasDescription && <Text>{organization.description}</Text>}
        </Fragment>
      )}
    </Fragment>
  );
}
