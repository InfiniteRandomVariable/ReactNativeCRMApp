import React, { Component } from "react";
import { Image } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
} from "native-base";
import styles from "./style";

const datas = [
  {
    name: "Home",
    route: "Home"
  },
  {
    name: "Sale",
    route: "AddItem"
  },
  {
    name: "Anatomy",
    route: "Anatomy"
  },
  {
    name: "Anatomy",
    route: "Anatomy"
  },
  {
    name: "Anatomy",
    route: "Anatomy"
  },
  {
    name: "Anatomy",
    route: "Anatomy"
  },
  {
    name: "Anatomy",
    route: "Anatomy"
  },
  {
    name: "Anatomy",
    route: "Anatomy"
  },
  {
    name: "Anatomy",
    route: "Anatomy"
  },
  {
    name: "Anatomy",
    route: "Anatomy"
  },
  {
    name: "Anatomy",
    route: "Anatomy"
  },
  {
    name: "Anatomy",
    route: "Anatomy"
  },
  {
    name: "Anatomy",
    route: "Anatomy"
  },
  {
    name: "Anatomy",
    route: "Anatomy"
  },
  {
    name: "Anatomy",
    route: "Anatomy"
  },
  {
    name: "Anatomy",
    route: "Anatomy"
  },
  {
    name: "Anatomy",
    route: "Anatomy"
  },
  {
    name: "Anatomy",
    route: "Anatomy"
  }

];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >

          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
