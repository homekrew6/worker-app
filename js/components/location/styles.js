const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

export default {
    appHdr2: {
        backgroundColor: '#cbf0ed',
    },
    mainItem:{
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
        padding: 10,
        alignItems: 'center'
    },
    mainItemSec:{
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
        paddingLeft: 15, 
        paddingRight: 15, 
        paddingTop: 20, 
        paddingBottom: 20,
        alignItems: 'center'
    },
    mainItemIcon:{
        borderRadius: 80,
        borderWidth: 1,
        borderColor: '#81cdc7',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 30,
        flexDirection: 'row',
    },
    mainItemIconIcon:{
        fontSize: 20,
        color: '#81cdc7'
    },
    mainItemText:{
        flex: 1,
        paddingLeft: 15,
    },
    checkBoxWarp:{ 
        width: 40 
    },
    lstHeader:{
        color: "#1e3768", 
        fontSize: 18
    },
    lstHeader2:{ 
        color: "#777777", 
        fontSize: 15 
    },
    cancle:{ 
        color: '#1e3768', 
        fontWeight: '300', 
        fontSize: 12 
    },
    tac:{
        alignItems: 'center'
    },
    hdClr:{ 
        color: '#1e3768' 
    },
    wkDay:{ 
        flex: 1 
    },
    wkDayd:{
        fontSize: 14
    },
    timedata:{
        color: '#828282',
        fontSize: 12
    },
    endTime:{
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center'
    },
    startTime:{
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 20,
        alignItems: 'center'
    },
    flexOne:{ 
        flex: 1 
    },
    dotImg:{ 
        marginRight: 5 
    }
};