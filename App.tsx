if (__DEV__) {
  require("./ReactotronConfig");
}
import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ExploreScreen } from "./screens/exploreScreen";
import { store } from "./state/store";
import { ToastProvider } from "react-native-toast-notifications";
import { HeaderView } from "./components/headerView";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <ToastProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={ExploreScreen}
              options={{
                headerLeft: () => <HeaderView />,
                headerTitle: ''
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ToastProvider>
  );
}
