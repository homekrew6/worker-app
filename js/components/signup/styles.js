const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  logoContainer: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    //alignItems: 'flex-start'
    //marginTop: deviceHeight / 8,
    //marginBottom: 30
  },
  logo: {
    position: "absolute",
    //left: Platform.OS === "android" ? 40 : 50,
    top: Platform.OS === "android" ? 35 : 60,
    width: 70,
    height: null
  },
  text: {
    color: "#D8D8D8",
    bottom: 6,
    marginTop: 5
  }
};
