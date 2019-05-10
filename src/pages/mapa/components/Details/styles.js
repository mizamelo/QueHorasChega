import { StyleSheet } from "react-native";

import { colors, metrics } from "../../../../styles";

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 100,
    marginHorizontal: metrics.baseMargin * 2,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  marca: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.dark,
    marginBottom: metrics.baseMargin - 2
  },
  endereco: {
    fontSize: 14,
    fontWeight: "400",
    paddingHorizontal: metrics.basePadding,
    textAlign: "center",
    color: "#999",
    marginBottom: metrics.baseMargin - 2
  },
  data: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#999"
  }
});

export default styles;
