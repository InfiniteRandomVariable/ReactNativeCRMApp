import React from "react";
import {  TouchableOpacity, Image} from "react-native";

class DrawerTouchableOpacity extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          source={require("../../assets/images/signin.png")}
          style={{ width: 20, height: 20 }}
        />
      </TouchableOpacity>
    );
  }
}

export default DrawerTouchableOpacity;
