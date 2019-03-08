import { StyleSheet } from "react-native";

import { metrics } from "../../styles";

const styles = StyleSheet.create({
  geral: {
    flex: 1
  },
  background: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  loading: {
    marginBottom: metrics.baseMargin
  },
  info: {
    fontSize: 15,
    fontWeight: "bold"
  }
});

export default styles;
