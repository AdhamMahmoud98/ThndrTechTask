import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ExploreCardItem } from "../components/exploreCardItem";
import { useExplore } from "../hooks/useExplore";
import colors from "../config/colors"; // Adjust the path as needed

const ExploreScreen: React.FC = () => {
  const {
    data,
    searchedData,
    searchQuery,
    isInitialTickersLoading,
    isSearching,
    isFetching,
    nextPageLoading,
    handleSearch,
    onRefresh,
    loadMoreData,
    clearSearch,
  } = useExplore();

  const renderItem = ({ item }) => {
    if (item) return <ExploreCardItem name={item.name} ticker={item.ticker} />;
  };

  const renderFooter = () => {
    return nextPageLoading ? (
      <View style={{...styles.loading, paddingVertical: 50}}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    ) : null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for stocks"
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor={colors.textSecondary}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
      {isInitialTickersLoading || isSearching ? (
        <View style={{...styles.loading, paddingVertical: '50%'}}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlashList
          data={searchQuery.length > 0 ? searchedData : data}
          renderItem={renderItem}
          numColumns={2}
          onEndReached={loadMoreData}
          ListFooterComponent={renderFooter}
          refreshing={isFetching && searchQuery?.length === 0}
          estimatedItemSize={10}
          showsVerticalScrollIndicator={false}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    padding: 5,
  },
  searchBar: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderColor: colors.primary,
    borderWidth: 1,
    backgroundColor: colors.white,
  },
  clearButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  clearButtonText: {
    color: colors.white,
  },
  loading: {
    alignItems: "center",
    alignSelf: 'center'
  },
});

export { ExploreScreen };
