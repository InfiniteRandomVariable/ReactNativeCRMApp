// @format
// @flow

import React from "react";
import {
  Content, Button, ListItem, Text, Separator,
} from 'native-base';
import { NavigationScreenProps, NavigationStackScreenOptions } from 'react-navigation';
import DrawerTouchableOpacity from '../../../components/UI/DrawerTouchableOpacity';

type Props = NavigationScreenProps & {
  productCode: string,
  salesPrice: string,
  cost: string,
  quantity: string,
  restockingReminder: string
};

type State = {
  productCodeValue: string,
  costValue: string,
  salesPriceValue: string,
  quantityValue: string,
  restockingValue: string
};

class ReviewItemScreen extends React.Component<Props, State> {
  static navigationOptions: NavigationStackScreenOptions = ({ navigation }) =>
  //  const { params } = navigation.state;

    ({
      title: navigation.getParam('title', 'Review Item'),
      headerLeft: (
        <DrawerTouchableOpacity onPress={() => navigation.openDrawer()} />
      ),
    })
  ;

  forSalesOnly: boolean;

  handleBackClick: function;

  handleUploadClick: function;


  constructor(props: Props) {
    super(props);
    const { navigation } = props;
    this.forSalesOnly = navigation.getParam('forSalesOnly', false);
    const pcv = navigation.getParam('productCodeValue', '');
    console.log(`PCV: ${pcv.toString()}`);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);

    this.state = {
      productCodeValue: navigation.getParam('productCodeValue', ''),
      costValue: navigation.getParam('costValue', ''),
      salesPriceValue: navigation.getParam('salesPriceValue', ''),
      quantityValue: navigation.getParam('quantityValue', ''),
      restockingValue: navigation.getParam('restockingValue', ''),
    };
  }


  handleUploadClick() {
    const { navigation } = this.props;
    navigation.navigate('ConfirmUploadItem', {
      ...this.state,
      title: 'Upload Successfully',
      forSalesOnly: this.forSalesOnly,
    });
  }


  handleBackClick() {
    const { navigation } = this.props;
    this.props.navigation.goBack();
  }


  render() {
    return (
      <Content>
        <Separator bordered>
          <Text> Product Code</Text>
        </Separator>

        <ListItem>
          <Text>
            {' '}
            { this.state.productCodeValue.toString() }
            {' '}
          </Text>
        </ListItem>

        <Separator bordered>
          <Text> Cost </Text>
        </Separator>
        <ListItem>
          <Text>
            {' '}
            { this.state.costValue.toString() }
            {' '}
          </Text>
        </ListItem>

        <Separator bordered>
          <Text> Sales Price </Text>
        </Separator>
        <ListItem>
          <Text>
            {' '}
            { this.state.salesPriceValue.toString() }
            {' '}
          </Text>
        </ListItem>
        <Separator bordered>
          <Text> Quantity </Text>
        </Separator>
        <ListItem>
          <Text>
            {' '}
            { this.state.quantityValue.toString() }
            {' '}
          </Text>
        </ListItem>
        {this.forSalesOnly === true ? null : (
          <React.Fragment>
            <Separator bordered>
              <Text> Restocking Reminder</Text>
            </Separator>
            <ListItem>
              <Text>
                {' '}
                { this.state.restockingValue.toString() }
                {' '}
              </Text>
            </ListItem>
          </React.Fragment>
        )}

        <Button
          block
          style={{ margin: 15, marginTop: 10 }}
          onPress={this.handleUploadClick}
        >
          <Text>Confirm</Text>
        </Button>

        <Button
          block
          style={{ margin: 15, marginTop: 10 }}
          onPress={this.handleBackClick
          }
        >
          <Text>Back</Text>
        </Button>
      </Content>
    );
  }
}


export default ReviewItemScreen;
