// @format
// @flow

import React from 'react';
import {
  Content, Button, Text,
} from 'native-base';
import { NavigationScreenProps } from 'react-navigation';
import DrawerTouchableOpacity from '../../../components/UI/DrawerTouchableOpacity';

type Props = NavigationScreenProps;

class ConfirmUploadItemScreen extends React.Component<Props> {
  static navigationOptions: NavigationStackScreenOptions = ({ navigation }) => ({
    title: navigation.getParam('title', 'Confirmation'),
    headerLeft: (
      <DrawerTouchableOpacity onPress={() => navigation.openDrawer()} />
    ),
  });

  forSalesOnly: boolean;

  handleDoneClick: function;

  handleAddAnotherClick: function;


  constructor(props: Props) {
    super(props);
    const { navigation } = props;
    this.forSalesOnly = navigation.getParam('forSalesOnly', false);
    const pcv = navigation.getParam('productCodeValue', '');
    console.log(`PCV: ${pcv.toString()}`);
    this.handleDoneClick = this.handleDoneClick.bind(this);
    this.handleAddAnotherClick = this.handleAddAnotherClick.bind(this);
  }

  handleAddAnotherClick() {


  }

  handleDoneClick() {

    // this.props.navigation.goBack();
  }

  render() {
    return (
      <Content>
        <Button
          block
          style={{ margin: 15, marginTop: 10 }}
          onPress={this.handleDoneClick
          }
        >
          <Text>Done</Text>
        </Button>

        <Button
          block
          style={{ margin: 15, marginTop: 10 }}
          onPress={this.handleAddAnotherClick
          }
        >
          <Text>Add Another</Text>
        </Button>
      </Content>
    );
  }
}


export default ConfirmUploadItemScreen;
