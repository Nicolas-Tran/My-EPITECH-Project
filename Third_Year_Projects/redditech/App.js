import HomeScreen from "./screens/HomeScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import LoggedInScreen from "./screens/LoggedInScreen.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title : "Welcome" }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          title="Login Screen"
        />
        <Stack.Screen
           name="LoggedInScreen"
           component={LoggedInScreen}
           options={{ title : "Redditech - Code into anything" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}