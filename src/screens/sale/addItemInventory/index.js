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
import { NavigationScreenProps, NavigationStackScreenOptions } from 'react-navigation';
import { helpers } from '../../../flow/exports';
import DrawerTouchableOpacity from '../../../components/UI/DrawerTouchableOpacity';

type Props = NavigationScreenProps & {};
type State = {
  productCodeValue: string,
  costValue: string,
  salesPriceValue: string,
  quantityValue: string,
  totalSalesPriceValue: string
};
type InputItem = { type: string, strValue: string };
// type ProductCode = { key: string };
// type SalesPrice = { key: number };
// type Cost = { key: number };
// type Quantity = { key: number };
// type RestockingReminder = { key: number };

class AddItemInventory extends React.Component<Props, State> {
  static navigationOptions: NavigationStackScreenOptions = ({ navigation }) =>
  //  const { params } = navigation.state;
    ({
      title: navigation.getParam('title', 'Add Item'),
      headerLeft: (
        <DrawerTouchableOpacity onPress={() => navigation.openDrawer()} />
      ),
    })
  ;

  forSalesOnly: boolean;

  handleClick: function;

  baseState: State;

  handleClearClick: function;

  alertHandler: function;

  constructor(props: Props) {
    super(props);

    //  const { navigation } = props;
    this.baseState = {
      productCodeValue: '',
      costValue: '',
      salesPriceValue: '',
      quantityValue: '',
      totalSalesPriceValue: '',
    };
    // this.forSalesOnly = navigation.getParam("forSalesOnly", false);
    this.forSalesOnly = true;
    this.handleClick = this.handleClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    // this.forSalesOnly = true;

    this.state = this.baseState;
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
          onPress: () => helpers.consoleLog(
            'Cancel Pressed',
          ),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }


  getInvalidState = (state: State, callBack: function): string => {
    // var message = ""
    if (state.productCodeValue.toString().length < 3) {
      return `Prodct code field requires at least 3 charater: ${state.productCodeValue.toString()}`;
    }

    if (state.costValue.toString().length === 0) {
      return `Cost field requires at least 1 charater: ${state.costValue.toString()}`;
    }
    if (!callBack(state.costValue.toString())) {
      return `Cost field requires a number ${state.costValue.toString()}`;
    }

    if (state.salesPriceValue.toString().length === 0) {
      return "Sales price field can't be empty";
    }
    if (!callBack(state.salesPriceValue.toString())) {
      return 'Sales price field requires a number ';
    }
    if (state.quantityValue.toString().length === 0) {
      return "Quantity can't be empty";
    }

    if (!callBack(state.quantityValue.toString())) {
      return 'Quantity field requires a number';
    }

    if (state.totalSalesPriceValue.toString().length === 0) {
      return "Total sales price can't be empty";
    }

    if (!callBack(state.totalSalesPriceValue.toString())) {
      return 'Total sales price field requires a number';
    }

    return '';
  };

  handleClick() {
    const theTitle: string = 'Review Sales Item';
    // let stateData = {...this.state};

    //  concat("2","3");
    const errorStateMessage = this.getInvalidState(this.state, helpers.isValidNumber);
    const didPass = helpers.didFillAllExcept({ ...this.state }, []);
    if (errorStateMessage.length > 0) {
      this.alertHandler(Error(errorStateMessage));
      return;
    }

    if (!didPass) return;

    const { navigation } = this.props;
    navigation.navigate('ReviewItem', {
      ...this.state,
      title: theTitle,
      forSalesOnly: this.forSalesOnly,
    });


    // this.state.productCodeValue = "";
  }

  // isValidNumber = function(str: string): boolean {
  //   var n = Number.parseFloat(str);
  //   if (!str || isNaN(n) || n < 0) return false;
  //   return true;
  // };

  // convertToDecimalNumber = function(value: string, toFixed: number): string {
  //   var n = Number.parseFloat(value);
  //   if (!helpers.isValidNumber(value)) return "";
  //   return n.toFixed(toFixed);
  //   //return 3;
  // };

  updateStateValue = (item: InputItem) => {
    const thisState = this.state;
    if (item.strValue === undefined) {
      return;
    }

    switch (item.type) {
      case 'Cost':
        if (!isNaN(item.strValue)) {
          this.setState({ costValue: item.strValue });
          //  this.props.navigation.setParams({cost: item.strValue});
        } else {
          this.setState({ costValue: '' });
          //  this.props.navigation.setParams({cost: ""});
        }

        return;
      case 'ProductCode':
        this.setState({ productCodeValue: item.strValue });
        //  this.props.navigation.setParams({productCode: item.strValue});
        return;
      case 'SalesPrice':
      {
        if (helpers.isValidNumber(item.strValue)) {
        //  const thisState = this.state;
          const quantityValue = Number.parseFloat(thisState.quantityValue);
          const ppNum = helpers.convertToDecimalNumber(item.strValue, 2);
          const pNum = Number.parseFloat(ppNum);
          const totalSalesPrice = (pNum * quantityValue).toFixed(2);
          if (quantityValue > 0 && helpers.isValidNumber(`${totalSalesPrice}`)) {
            // this.setState({ salesPriceValue: item.strValue });
            this.setState(() => ({
              salesPriceValue: item.strValue,
              totalSalesPriceValue: `${totalSalesPrice}`,
            }));
          } else {
            this.setState({ salesPriceValue: item.strValue });
          }
          //    this.props.navigation.setParams({salesPrice: item.strValue});
        } else {
          this.setState({ salesPriceValue: '' });
          //    this.props.navigation.setParams({salesPrice: ""});
        }

        return;
      }
      case 'Quantity': {
        const salesPriceValue = Number.parseFloat(thisState.salesPriceValue);
        const ppNum = helpers.convertToDecimalNumber(item.strValue, 2);
        const pNum = Number.parseFloat(ppNum);
        const totalSalesPrice: string = `${(pNum * salesPriceValue).toFixed(2)}`;
        const v: number = parseInt(item.strValue);

        if (helpers.isValidNumber(`${v}`) && v > 0) {
          if (
            salesPriceValue > 0
            && helpers.isValidNumber(totalSalesPrice)
          ) {
            this.setState(() => ({
              totalSalesPriceValue: totalSalesPrice,
              quantityValue: `${v}`,
            }));
          } else {
            this.setState({ quantityValue: `${v}` });
          }

          //  this.props.navigation.setParams({quantity: this.state.quantityValue});
        } else {
          this.setState({ quantityValue: '' });
          //    this.props.navigation.setParams({quantity: ""});
        }
        return; }
      case 'TotalSalesPrice':

        if (helpers.isValidNumber(item.strValue)) {
          const quantityValue = Number.parseFloat(thisState.quantityValue);
          const ppNum = helpers.convertToDecimalNumber(item.strValue, 2);
          const pNum = Number.parseFloat(ppNum);
          const unitPrice = (pNum / quantityValue).toFixed(2);
          if (quantityValue > 0 && helpers.isValidNumber(`${unitPrice}`)) {
            this.setState(() => ({
              totalSalesPriceValue: item.strValue,
              salesPriceValue: `${unitPrice}`,
            }));
          } else {
            this.setState({ totalSalesPriceValue: item.strValue });
          }

          //    this.props.navigation.setParams({salesPrice: item.strValue});
        } else {
          this.setState({ totalSalesPriceValue: '' });
          //    this.props.navigation.setParams({salesPrice: ""});
        }

        return;
      default:
        helpers.consoleLog("Can't find the case createItem");
    }
  };

  render() {
    const thisState = this.state;
    const unitPriceTitle = 'Sales Unit Price';
    return (
      <Content>
        <Form>
          <Item>
            <Input
              onChangeText={text => this.updateStateValue({ type: 'ProductCode', strValue: text })
              } // <-- Here
              placeholder="Product Code"
              value={thisState.productCodeValue}
            />
          </Item>
          <Item>
            <Input
              onChangeText={text => this.updateStateValue({ type: 'Cost', strValue: text })
              } // <-- Here
              placeholder="Cost"
              value={thisState.costValue}
            />
          </Item>

          <Item>
            <Input
              onChangeText={text => this.updateStateValue({ type: 'SalesPrice', strValue: text })
              } // <-- Here
              placeholder={unitPriceTitle}
              value={thisState.salesPriceValue}
            />
          </Item>
          <Item>
            <Input
              onChangeText={text => this.updateStateValue({ type: 'Quantity', strValue: text })
              } // <-- Here
              placeholder="Quantity"
              value={thisState.quantityValue}
            />
          </Item>
          <Item>
            <Input
              onChangeText={text => this.updateStateValue({
                type: 'TotalSalesPrice',
                strValue: text,
              })
              } // <-- Here
              placeholder="Total Sales Price"
              value={thisState.totalSalesPriceValue}
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
export default AddItemInventory;
