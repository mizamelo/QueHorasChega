import { createAppContainer, createStackNavigator } from "react-navigation";
import { colors } from "./styles";

import LoadingPage from "./pages/LoadingPage";
import Login from "./pages/login";
import Mapa from "./pages/mapa";

const Routes = createAppContainer(
  createStackNavigator(
    {
      LoadingPage: { screen: LoadingPage },
      Login: { screen: Login },
      Mapa: { screen: Mapa }
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: colors.secundary,
          borderBottomWidth: 0
        },
        headerTintColor: colors.white,
        headerBackTitle: null
      }
    }
  )
);

export default Routes;
