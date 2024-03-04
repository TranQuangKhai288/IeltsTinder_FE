import Stack from "./src/navigation/Stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
