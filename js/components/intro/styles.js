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
    image1: {
        width: 151,
        height: 200
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
        color: 'red',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 16,
    },
    imagestl2: {
        width: deviceWidth,
        height: 200,
        backgroundColor: 'red'
    },
    locName:{ 
        color: "#1e3768", 
        fontSize: 18 
    },
    locName2:{ 
        color: "#777777", 
        fontSize: 15 
    },
    listHdr:{ 
        color: '#81cdc7' 
    },
    listHdrEdtIcn:{ 
        color: '#1e3768', 
        fontSize: 18 
    },
    listHdrEdt:{
        color: '#1e3768'
    }
};