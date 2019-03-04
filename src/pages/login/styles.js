import { StyleSheet } from "react-native";
import { colors, metrics } from "../../styles";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  content: {
    height: "100%",
    width: "100%"
  },

  box: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.darkTransparent
  },
  alertError: {
    fontSize: 16,
    color: colors.danger,
    fontWeight: "bold",
    marginTop: metrics.baseMargin
  },
  input: {
    backgroundColor: colors.darkTransparent,
    borderRadius: metrics.baseRadius,
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
    height: 42,
    width: "80%",
    marginTop: metrics.baseMargin * 2,
    paddingHorizontal: metrics.basePadding,
    borderWidth: 1,
    borderColor: colors.whiteTransparent
  },
  disabledButton: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.whiteTransparent,
    backgroundColor: colors.greenDark,
    borderRadius: metrics.baseRadius,
    color: colors.white,
    width: "80%",
    marginTop: metrics.baseMargin * 2,
    height: 42
  },

  btnLogin: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.whiteTransparent,
    backgroundColor: colors.green,
    borderRadius: metrics.baseRadius,
    color: colors.white,
    width: "80%",
    marginTop: metrics.baseMargin * 2,
    height: 42
  },
  textLogin: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "bold"
  },
  passwordContainer: {
    flexDirection: "row"
  },
  passIcon: {
    marginTop: metrics.baseMargin * 3.5,
    position: "absolute",
    right: 20
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.white,
    marginTop: metrics.baseMargin * 2
  }
});

export default styles;
