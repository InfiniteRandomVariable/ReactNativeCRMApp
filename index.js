import { AppRegistry } from "react-native";
import App from "./App";
import Amplify from "aws-amplify";
import config from "./src/aws-exports";


Amplify.configure(config);

AppRegistry.registerComponent("AllyticApp", () => App);

// import { Navigation } from "react-native-navigation";
// import { registerScreens } from "./src/nav/screens";
// import { registerSideMenu } from "./src/nav/navigation";
//
// import Amplify from "aws-amplify";
// import config from "./src/aws-exports";
// Amplify.configure(config);
//
//
// registerScreens();
// registerSideMenu();

// Navigation.events().registerAppLaunchedListener(() => {
//   Navigation.setRoot({
//     root: {
//       component: {
//         name: "Initializing"
//       }
//     }
//   });
// });
