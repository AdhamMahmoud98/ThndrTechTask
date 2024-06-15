import { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import {
  useLazyGetTickersQuery,
  useLazyGetNextPageTickersQuery,
  useLazyGetSearchedTickersQuery,
} from "../state/services/explore/exploreApi";
import { Ticker } from "../types/types";
import { useToast } from "react-native-toast-notifications";

const useExplore = () => {
  const [data, setData] = useState<Ticker[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [initialApiCalled, setInitialApiCalled] = useState<boolean>(false);
  const [initialNextPageCalled, setInitialNextPageCalled] =
    useState<boolean>(false);

  const toast = useToast();

  const [
    getTickersList,
    {
      data: initialTickers,
      isLoading: isInitialTickersLoading,
      isFetching,
      isError: getInitialTickersError,
    },
  ] = useLazyGetTickersQuery();
  const [
    getNextPageTickers,
    {
      data: nextPageTickers,
      isFetching: nextPageLoading,
      isError: getNextPageTickersError,
    },
  ] = useLazyGetNextPageTickersQuery();

  const [
    getSearchedTickers,
    { data: searchedData, isError: getSearchedTickersError, isFetching: isSearching },
  ] = useLazyGetSearchedTickersQuery();

  useEffect(() => {
    getTickersList("");
  }, []);

  useEffect(() => {
    if (initialTickers && !initialApiCalled) {
      setData(initialTickers.results);
      setInitialApiCalled(true);
    }
  }, [initialTickers, initialApiCalled]);

  useEffect(() => {
    if (initialApiCalled && nextPageTickers) {
      setData((prevData) => [...prevData, ...nextPageTickers.results]);
    }
  }, [initialApiCalled, nextPageTickers]);

  useEffect(() => {
    if (getInitialTickersError || getNextPageTickersError || getSearchedTickersError) {
      toast.show("You've reached the maximum requests per minute !", {
        type: "danger",
      });
    }
  }, [getInitialTickersError, getNextPageTickersError]);

  const debouncedGetTickersList = useCallback(
    debounce((query) => getSearchedTickers(query), 1500),
    []
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if(query) debouncedGetTickersList(query ? "&search=" + query : "");
  };

  const onRefresh = () => {
    setInitialApiCalled(false);
    getTickersList("");
    setData([]);
  };

  const loadMoreData = () => {
    // we ignore the next page if we are searching for an exact stock as mentioned in the requirements
    if (searchQuery) return;
    const nextPageUrl = initialNextPageCalled
      ? nextPageTickers?.next_url
      : initialTickers?.next_url;
    getNextPageTickers(nextPageUrl);
    if (!initialNextPageCalled) setInitialNextPageCalled(true);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return {
    data,
    searchedData: searchedData?.results,
    searchQuery,
    isInitialTickersLoading,
    isSearching,
    isFetching,
    nextPageLoading,
    handleSearch,
    onRefresh,
    loadMoreData,
    clearSearch,
  };
};

export { useExplore };
