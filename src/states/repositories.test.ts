import {renderHook, act} from '@testing-library/react-hooks/native/pure';

import {useRepositoriesScreenState} from './repositories';

describe('useRepositoriesScreenState', () => {
  const mockGithubRepositorySevice = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to initialize', () => {
    const {result} = renderHook(() =>
      useRepositoriesScreenState(mockGithubRepositorySevice()),
    );
    expect(result.current.states.isLoadingRepositories).toBeDefined();
    expect(result.current.states.repositories).toBeDefined();
  });

  it('should be able to retrieve a few repositories', async () => {
    mockGithubRepositorySevice.mockReturnValueOnce({
      async repositories() {
        return [
          {name: 'react-native-template-typescript'},
          {name: 'flutter-boilerplate'},
        ];
      },
    });
    const {result} = renderHook(() =>
      useRepositoriesScreenState(mockGithubRepositorySevice()),
    );
    expect(result.current.states.repositories).toMatchObject([]);
    await act(async () => result.current.callbacks.onFetchRepositories());
    expect(result.current.states.repositories).toMatchObject([
      {name: 'react-native-template-typescript'},
      {name: 'flutter-boilerplate'},
    ]);
  });

  it('should not be able o set repositories state when service throws an expcetion', async () => {
    mockGithubRepositorySevice.mockReturnValueOnce({
      async repositories() {
        throw Error('Bad Gateway');
      },
    });
    const {result} = renderHook(() =>
      useRepositoriesScreenState(mockGithubRepositorySevice()),
    );
    expect(result.current.states.repositories).toMatchObject([]);
    await act(async () => result.current.callbacks.onFetchRepositories());
    expect(result.current.states.repositories).toMatchObject([]);
  });
});
