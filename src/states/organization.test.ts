import {renderHook, act} from '@testing-library/react-hooks/native/pure';

import {useOrganizationScreenState} from './organization';

describe('useOrganizationScreenState', () => {
  const mockGithubOrganizationsService = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to initialize', () => {
    const {result} = renderHook(() =>
      useOrganizationScreenState(mockGithubOrganizationsService()),
    );
    expect(result.current.states.isLoadingOrganization).toBeDefined();
    expect(result.current.states.organization).toBeDefined();
    expect(typeof result.current.callbacks.onFetchOrganization).toBe(
      'function',
    );
  });

  it('should be able to retrieve an organization', async () => {
    const organization = {
      login: 'naveteam',
      name: 'Nave',
      email: 'tech@nave.rs',
    };
    mockGithubOrganizationsService.mockReturnValueOnce({
      async organization() {
        return organization;
      },
    });
    const {result} = renderHook(() =>
      useOrganizationScreenState(mockGithubOrganizationsService()),
    );
    expect(result.current.states.organization).toBeNull();
    await act(async () => result.current.callbacks.onFetchOrganization());
    expect(result.current.states.organization).toMatchObject(organization);
  });

  it('should not be able to set organization state when service throws an expcetion', async () => {
    mockGithubOrganizationsService.mockReturnValueOnce({
      async organization() {
        throw Error('Bad Gateway');
      },
    });
    const {result} = renderHook(() =>
      useOrganizationScreenState(mockGithubOrganizationsService()),
    );
    expect(result.current.states.organization).toBeNull();
    await act(async () => result.current.callbacks.onFetchOrganization());
    expect(result.current.states.organization).toBeNull();
  });
});
