const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const imageht = (deviceHeight - 88);

export default {
    mainContent: {
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    image: {
        paddingTop: 40,
        width: deviceWidth,
        height: imageht,
        display: 'flex',
        alignItems: 'center',
    },
    imageLogo: {
        width: 120,
        height: 120,
        marginBottom: 20
    },
    image2: {
        width: deviceWidth,
        height: 500
    },
    text: {
        color: '#000',
        backgroundColor: 'transparent',
        textAlign: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 22,
        color: '#1e3768',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 16,
    },
    imagestl2: {
        width: deviceWidth,
        height: 200,
        backgroundColor: 'red'
    },
     wrapper: {
    },
    slide: {
        width: deviceWidth,
        height: imageht,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#92BBD9',
        paddingTop: 20
    }
};