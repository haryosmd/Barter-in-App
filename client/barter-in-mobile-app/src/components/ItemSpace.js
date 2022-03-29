import React from "react";
import { View } from "react-native";

const ItemSpace = ({ height, width }) => {
  return <View style={{ height, width }} />;
};

ItemSpace.defaultProps = {
  height: 0,
  widt: 0,
};

export default ItemSpace;
