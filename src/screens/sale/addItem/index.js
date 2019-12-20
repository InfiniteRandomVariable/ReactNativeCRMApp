// @format
// @flow
import React from "react";

// use MainComponents.MyComponent and MainComponents.MyComponent2
import {
  Image,
  ActivityIndicator,
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  ListItem,
} from "native-base";
import { NavigationScreenProps,NavigationStackScreenOption } from "react-navigation";

import DrawerTouchableOpacity from "../../../components/UI/DrawerTouchableOpacity";

type JSON = {
  [key: string]: string | JSON
};

type ListItemProps = { item: NameType, onPressItem: any, index: number};

type Props = NavigationScreenProps & {};

type NameType = {
  email: string,
  selected: boolean,
  name: {
    title: string,
    first: string,
    last: string
  }
};

type ArrayHolderType = [];

type State = {
  loading: boolean,
  data: Array<NameType>,
  error: null,
  value?: string
};


class MyListItem extends React.Component<ListItemProps> {
  constructor(props: ListItemProps) {
    super(props);
    console.log("Setting this.props.item.email: " + this.props.item.email);

    this.state = {
      selected:  ((this.props.item.selected) ? true : false)
    };

    console.log(
      "Index: " + this.props.index + ", email:" + this.props.item.email
    );

  }

  _onPress = () => {

    console.log(
      "pressing this.props.item.email: " +
        this.props.item.email +
        " index: " +
        this.props.index + " is selected: " +
        this.props.item.selected
    );

    this.props.onPressItem(this.props.item, this.props.index);
  };

  render() {
  //  const textColor = "black";
    const textColor = this.props.item.selected ? "red" : "black";
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={listStyles.view}>
          <Text style={[listStyles.text, { color: textColor }]}>
            {this.props.item.email}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const listStyles = StyleSheet.create({
  view: {
    marginLeft: "5%"
  },
  text: {
    textAlign: "left",
    color: "#EEEEEE",
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5
  },
  important: {
    color: "red",
    fontWeight: "bold"
  }
});

class AddItemScreen extends React.Component<Props, State> {
   arrayholder : [];

  static navigationOptions: NavigationStackScreenOption = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : "AA Nested Details Screen",
      headerLeft: (
        <DrawerTouchableOpacity onPress={() => navigation.openDrawer()} />
      )
    };
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = async () => {
    const url = `https://randomuser.me/api/?&results=20`;
    //  const url =  'https://facebook.github.io/react-native/movies.json';
    this.setState({ loading: true });

    await fetch(url)
      .then(
        res =>

          res.json()
      )
      .then(responseJson => {



        const items = responseJson.results.map(function (item) {
          item.selected = false;
          return item
          });
        this.setState({
          data: items,
          error: responseJson.error || null,
          loading: false
        });
        console.log(
          "fetch 2 " +
            this.state.data[0].email +
            " name title" +
            this.state.data[0].name.title
        );
        console.log("fetch 2.1");

        this.arrayholder = responseJson.results;

        console.log("fetch 3");
      })
      .catch(error => {
        console.log("fetch error " + error);
        this.setState({ error, loading: false });
      });
  };

  goToAddNewItemPage = () => {
    console.log("goToAddNewItemPage");
    const text = this.state.value;



    if (text !== null && text !== undefined) {
      if (text.length > 0) {
        this.props.navigation.navigate("CreateItem", {title:"Add Sales Item",
              forSalesOnly: true});
      }
    } else {
      console.log("EMPTY Text goToAddNewItemPage");
    }
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  searchFilterFunction = (text: string) => {


    if (Array.isArray(this.arrayholder) && this.arrayholder.length) {
      console.log("is an array length " + this.arrayholder.length);
      const newData = this.arrayholder.filter((item: NameType) => {
        const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
        const textData = text.toUpperCase();
        console.log(
          "about to return itemData: " + itemData + ". textData: " + textData
        );
        itemData.selected = false;
        return itemData.indexOf(textData) > -1;
      });
      console.log("About to set newdata state with matches: " + newData.length);
      this.setState({
        data: newData,
        value: text
      });
    }else{

      this.setState({
        value: text
      });
    }
  };

  renderHeader = () => {
    console.log("RenderHeader");

    return (
      <ListItem
        searchBar
        rounded
        autoCorrect={false}
        style={{ backgroundColor: "#fff" }}
      >
        <Item>
          <Icon name="ios-search" />
          <Input
            onChangeText={text => this.searchFilterFunction(text)} // <-- Here
            placeholder="Search"
            value={this.state.value}
          />
        </Item>
        <Button transparent onPress={this.goToAddNewItemPage}>
          <Text>Add</Text>
        </Button>
      </ListItem>
    );
  };

  //iterate the item from data
  //if the item is already selected, change selected to false.
  //if the item hasn't been selected, change selected to true,
  // and if other items has been selected. Change the other items to false and update the list.


  _onPressListItem = (item: NameType, index: number) => {
    console.log(`_onPressListItem (main component function): ${  item.email  } index: ${  index} `);

    if (Array.isArray(this.state.data) && this.state.data.length){

    this.setState((state) => {

    const newData = this.state.data.filter((dataItem: NameType) => {
      if (dataItem.name != item.name){
        console.log(`change to false ${  dataItem.email  } index: ${  index} isSelected: ${ dataItem.selected}`);
        dataItem.selected = false;

      }else{
        console.log(`change to opposite ${  dataItem.email  } index: ${  index} isSelected: ${ dataItem.selected}`);

        if (dataItem.selected === 'undefined') {
          dataItem.selected = true;
        }else{
          dataItem.selected = !dataItem.selected;
        }


      }
      return dataItem;
    });


   return { data: newData};

    });
  }


    // // updater functions are preferred for transactional updates
    // this.setState((state) => {
    //   // copy the map rather than modifying state.
    //   const selected = new Map(state.selected);
    //   selected.set(id, !selected.get(id)); // toggle
    //   return {selected};
    // });


  };

  _renderListItem = ({ item, index }) => (
    <MyListItem item={item} index={index} onPressItem={this._onPressListItem} />
  );


  _keyExtractor = (item, index) => {
    console.log("keyExtractor index: " + index);
    return "" + index;
  };

  render() {
    if (this.state.loading) {
      console.log("this state is loading");
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      );
    }

    console.log("this.state.data.length: " + this.state.data.length);

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={this._renderListItem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

export default AddItemScreen;
