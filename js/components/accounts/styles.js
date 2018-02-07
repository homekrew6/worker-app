const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

export default{
    imageContainer: {
        flex: 1,
        width: null
    },
    logoContainer: {

        flexDirection: 'row',
        justifyContent: 'center',
        height: 120
    },
    logo: {
        top: Platform.OS === "android" ? 20 : 20,
        width: 76,
        height: 100
    },
    text: {
        color: "#D8D8D8",
        bottom: 6,
        marginTop: 5
    }
};