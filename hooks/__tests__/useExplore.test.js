import { renderHook } from '@testing-library/react-hooks';
import {useExplore} from '../useExplore';
import { useLazyGetTickersQuery } from '../../state/services/explore/exploreApi';


jest.mock('../../state/services/explore/exploreApi', () => ({
  useLazyGetTickersQuery: jest.fn(),
}));

test('fetches initial tickers on mount', () => {
  renderHook(() => useExplore());
  const getTickersListMock = jest.mocked(useLazyGetTickersQuery);

  expect(getTickersListMock).toHaveBeenCalledTimes(1);
});



