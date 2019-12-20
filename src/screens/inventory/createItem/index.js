// @format
// @flow


/*
UI DESIGN
Title (Create a new product)
Text Field.
Unit Price Cost
Unit Sale Price
Total QTY


State:
IsForInventory?
Can't select both.

If it's for sales, require to check the box, agreeing add a new inventory item and are being sold.
//Next page add photo.
*/

import React from 'react';
import {
  Alert,
} from 'react-native';

import {
  Content, Form, Item, Input, Button, Text,
} from 'native-base';

import { NavigationScreenProps, NavigationStackScreenOption } from 'react-navigation';
import DrawerTouchableOpacity from '../../../components/UI/DrawerTouchableOpacity';
import { helpers } from '../../../flow/exports';

type Props = NavigationScreenProps & {};
type State = {
  productCodeValue: string,
  costValue: string,
  salesPriceValue: string,
  quantityValue: string,
  restockingValue: string
};

type InputItem = { type: string, strValue: string };

class CreateItemScreen extends React.PureComponent<Props, State> {
  static navigationOptions: NavigationStackScreenOption = ({ navigation }) =>
  //  const { params } = navigation.state;
    ({
      title: navigation.getParam('title', 'Create Item'),
      headerLeft: (
        <DrawerTouchableOpacity onPress={() => navigation.openDrawer()} />
      ),
    })
  ;

  forSalesOnly: boolean;

  handleClick: function;

  handleClearClick: function;

  alertHandler: function;

  baseState: State = {
    productCodeValue: '',
    costValue: '',
    salesPriceValue: '',
    quantityValue: '',
    restockingValue: '',
  };

  constructor(props: Props) {
    super(props);

    this.forSalesOnly = false;
    this.handleClick = this.handleClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    // this.forSalesOnly = true;
    this.state = this.baseState;
  }

    getInvalidState = (state: State, callBack: function): string => {
      // var message = ""
      if (state.productCodeValue.toString().length < 3) {
        return `Prodct code field requires at least 3 charater: ${state.productCodeValue.toString()}`;
      } if (state.costValue.toString().length === 0) {
        return `Cost field requires at least 1 charater: ${state.costValue.toString()}`;
      } if (!callBack(state.costValue.toString())) {
        return `Cost field requires a number ${state.costValue.toString()}`;
      } if (state.salesPriceValue.toString().length === 0) {
        return "Sales price field can't be empty";
      } if (!callBack(state.salesPriceValue.toString())) {
        return 'Sales price field requires a number';
      } if (state.quantityValue.toString().length === 0) {
        return "Quantity can't be empty";
      } if (!callBack(state.quantityValue.toString())) {
        return 'Quantity field requires a number';
      } if (state.restockingValue.toString().length > 0
       && !callBack(state.restockingValue.toString())) {
        return 'Restocking field requires a number';
      }

      return '';
    }

    handleClearClick() {
      this.setState(this.baseState);
    }

    alertHandler(err: Error) {
      Alert.alert(
        'Alert',
        ((typeof err !== 'undefined') ? err.message : err),
        [
          {
            text: 'OK',
            onPress: () => helpers.consoleLog('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    }

    handleClick() {
      const { navigation } = this.props;
      const theTitle: string = 'Review Inventory Item';
      const errorStateMessage = this.getInvalidState(this.state, helpers.isValidNumber);
      //  let currentState = {...this.state};
      const didPass = helpers.didFillAllExcept({ ...this.state }, ['restockingValue']);
      if (!didPass) return;
      if (errorStateMessage.length === 0) {
        navigation.navigate('ReviewItem', {
          ...this.state,
          title: theTitle,
          forSalesOnly: this.forSalesOnly,
        });
      } else {
        this.alertHandler(Error(errorStateMessage));
        helpers.consoleLog(`ERROR: ${errorStateMessage}`);
      }
    }

  updateStateValue = (item: InputItem) => {
    if (item.strValue === undefined) {
      return;
    }

    switch (item.type) {
      case 'Cost':
        if (helpers.isValidNumber(item.strValue)) {
          this.setState({ costValue: item.strValue });
        } else {
          this.setState({ costValue: '' });
        }

        return;
      case 'ProductCode':
        helpers.consoleLog(`Updating Product Code: ${item.strValue}`);
        this.setState(() => ({ productCodeValue: item.strValue }));
        return;
      case 'SalesPrice': {
        if (helpers.isValidNumber(item.strValue)) {
          this.setState(() => ({ salesPriceValue: item.strValue }));
        } else {
          this.setState({ salesPriceValue: '' });

        }


        return;
      }
      case 'Quantity': {
        const v: number = parseInt(item.strValue);

        if (helpers.isValidNumber(`${v}`) && v > 0) {
          this.setState({ quantityValue: `${v}` });

        } else {
          this.setState({ quantityValue: '' });

        }
        return;
      }
      case 'RestockingReminder': {
        const rv: number = parseInt(item.strValue);
        if (helpers.isValidNumber(`${rv}`) && rv > 0) {
          this.setState({ restockingValue: `${rv}` });
        } else {
          this.setState({ restockingValue: '' });

        }

        return;
      }
      default:
        helpers.consoleLog("Can't find the case createItem");
    }
  };

  render() {
    const unitPriceTitle = this.forSalesOnly === true ? 'Sales Unit Price' : 'Unit Price';
    const theState = this.state;

    return (
      <Content>
        <Form>
          <Item>
            <Input
              onChangeText={text => this.updateStateValue({ type: 'ProductCode', strValue: text })
              } // <-- Here
              placeholder="Product Code"
              value={theState.productCodeValue}
            />
          </Item>
          <Item>
            <Input
              onChangeText={text => this.updateStateValue({ type: 'Cost', strValue: text })
              } // <-- Here
              placeholder="Cost"
              value={theState.costValue}
            />
          </Item>

          <Item>
            <Input
              onChangeText={text => this.updateStateValue({ type: 'SalesPrice', strValue: text })
              } // <-- Here
              placeholder={unitPriceTitle}
              value={theState.salesPriceValue}
            />
          </Item>
          <Item>
            <Input
              onChangeText={text => this.updateStateValue({ type: 'Quantity', strValue: text })
              } // <-- Here
              placeholder="Quantity"
              value={theState.quantityValue}
            />
          </Item>
          <Item>
            <Input
              onChangeText={text => this.updateStateValue({
                type: 'RestockingReminder',
                strValue: text,
              })
              } // <-- Here
              placeholder="Restocking Reminder"
              value={theState.restockingValue}
            />
          </Item>
        </Form>
        <Button
          block
          style={{ margin: 15, marginTop: 50 }}
          onPress={this.handleClick}
        >
          <Text>Next</Text>
        </Button>
        <Button
          block
          style={{ margin: 15, marginTop: 5 }}
          onPress={this.handleClearClick}
        >
          <Text>Clear</Text>
        </Button>
      </Content>
    );
  }
}
export default CreateItemScreen;
