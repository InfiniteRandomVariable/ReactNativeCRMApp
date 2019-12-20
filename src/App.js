

import React from 'react';
// import Button from "native-base";
// import { Root } from "native-base";
// import { StackNavigator, DrawerNavigator } from "react-navigation";
import {
  createSwitchNavigator,
  createDrawerNavigator,
  createStackNavigator,
  DrawerItems,
  createAppContainer
} from 'react-navigation';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image
} from 'react-native';
import DrawerTouchableOpacity from './components/UI/DrawerTouchableOpacity';
import HomeScreen from './screens/general/HomeScreen';
import SignInScreen from './screens/auth/SignInScreen';
import SignUpScreen from './screens/auth/SignUpScreen';
import SideBar from './screens/sidebar';
// import MainDrawer from "./nav/MainDrawer";
import CreateItemScreen from './screens/inventory/createItem';
import ReviewItemScreen from './screens/saleAndInventory/ReviewItem';
import ConfirmUploadItemScreen from './screens/saleAndInventory/ConfirmUploadItem';
import AddItemScreen from './screens/sale/addItem';
import AddItemInventoryScreen from './screens/sale/addItemInventory';
import ReportSalesScreen from './screens/sale/ReportSales';
import screenMapping from './nav/ScreenMapping';

//import IconText from "./screens/footer/iconText";
import AuthLoadingScreen from './screens/auth/AuthLoadingScreen';

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// const Drawer = createDrawerNavigator(
//   {
//     Home: { screen: HomeScreen }
//   },
//   {
//     initialRouteName: "Home",
//     contentOptions: {
//       activeTintColor: "#e91e63"
//     },
//     contentComponent: props => <SideBar {...props} />
//   }
// );

// class DrawerTouchableOpacity extends React.Component {
//   render() {
//     return (
//       <TouchableOpacity onPress={this.props.onPress}>
//         <Image
//           source={require("./assets/images/signin.png")}
//           style={{ width: 20, height: 20 }}
//         />
//       </TouchableOpacity>
//     );
//   }
// }

// navigationOptions: ({ navigation }) => ({
//   headerStyle: { backgroundColor: "#FFFFFF" },
//   title: "createStackNavigator!",
//   headerLeft: <DrawerTouchableOpacity onPress={() =>
//     navigation.openDrawer()} />
// }),


const Drawer = createDrawerNavigator(
  {
    Home: { screen: HomeScreen },
    ...screenMapping,
  },
  {
    contentComponent: props => <SideBar {...props} />,
    drawerWidth: 200,
  },
);

// const Drawer = createDrawerNavigator(
//   {
//     HomeScreen: { screen: HomeScreen }
//   },
//   {
//     initialRouteName: "HomeScreen",
//     contentOptions: {
//       activeTintColor: "#e91e63"
//     },
//     contentComponent: props => <SideBar {...props} />
//   }
// );

// navigationOptions: ({ navigation }) => ({
//   headerStyle: { backgroundColor: "#FFFFFF" },
//   title: "createStackNavigator!",
//   headerLeft: <DrawerTouchableOpacity onPress={() =>
//     navigation.openDrawer()} />
// })

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
  },
  {
    initialRouteName: 'SignIn',
  },
);

// const AppStack = createStackNavigator(
//   {
//     Drawer: { screen: Drawer },
//     Home: { screen: HomeScreen },
//     AddItem: { screen: AddItemScreen }
//   },
//   {
//     initialRouteName: "Drawer",
//     headerMode: "none"
//
//   }
// );

const RootStackNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    AddItem: { screen: AddItemScreen },
    CreateItem: { screen: CreateItemScreen },
    ReviewItem: ReviewItemScreen,
    AddItemInventory: AddItemInventoryScreen,
    ReportSales: ReportSalesScreen,
    ConfirmUploadItem: ConfirmUploadItemScreen,
  },
  {
    initialRouteName: 'ReportSales',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

const hiddenDrawerItems = ['RootStackNavigator'];

const AppDrawerNavigator = createDrawerNavigator(
  {
    RootStackNavigator,
    Home: { screen: HomeScreen },
    AddItem: { screen: AddItemScreen },
    CreateItem: { screen: CreateItemScreen },
  },
  {
    contentComponent: (props) => {
      const clonedProps = {
        ...props,
        items: props.items.filter(item => !hiddenDrawerItems.includes(item.key)),
      };
      return <CustomDrawerContentComponent {...clonedProps} />;
    },
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

const AppNavigator = createStackNavigator(
  {
    AppDrawerNavigator: { screen: AppDrawerNavigator },
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    headerMode: 'none',
  },
);

const AppStack = createStackNavigator(
  {
    AppDrawerNavigator: { screen: AppDrawerNavigator },
  },
  {
    headerMode: 'none',
  },
);


const AppContainer = createAppContainer(AppNavigator);

// const AppContainer = createAppContainer(
//   createSwitchNavigator(
//     {
//       AuthLoading: AuthLoadingScreen,
//       App: AppDrawer,
//       Auth: AuthStack
//     },
//     {
//       initialRouteName: "AuthLoading"
//     }
//   )
// );

export default () => <AppContainer />;
