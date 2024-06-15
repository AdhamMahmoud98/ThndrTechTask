import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../config/colors"; // Adjust the path as needed

interface ExploreCardItemProps {
  ticker: string;
  name: string;
}

const ExploreCardItem: React.FC<ExploreCardItemProps> = ({ ticker, name }) => {
  return (
    <View style={styles.card}>
      <View style={styles.tickerContainer}>
        <Text style={styles.ticker}>{ticker}</Text>
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    margin: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  tickerContainer: {
    marginBottom: 10,
    backgroundColor: colors.background,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  ticker: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  name: {
    fontSize: 16,
    color: colors.textPrimary,
    marginTop: 5,
  },
});

export { ExploreCardItem };
