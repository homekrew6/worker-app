const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

export default {
    //common
    flexDirectionRow: { flexDirection: 'row'},
    fontWeight700: { fontWeight: '700' },
    

    // header

    headIcon: { fontSize: 22, color: '#71beb8', color: '#81cdc7' },
    headBody:{ alignItems: 'center' },
    headCenter:{ color: '#1e3768', textAlign: 'center' },
    headerWarp: { backgroundColor: '#f3f3f3' },


    container: { flex: 1 },


    //  tabstyle
    Tabs:{ backgroundColor: '#1e3768', height: 2 },
    dayHeading: { padding: 15, backgroundColor: '#f2f2f2' },

    //Job Listing style
    jobList: { backgroundColor: '#f2f2f2', padding: 0, margin: 0 },
    jobListItem: { marginBottom: 0, backgroundColor: '#fff', marginLeft: 0 },
    listWarp: { flexDirection: 'row', paddingLeft: 10, paddingRight: 10, alignItems: 'center' },
    listWarpImageWarp: { height: 65, width: 65, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#81cdc7', borderRadius: 60 },
    listWarpImage: { height: 30, width: 30 },
    listWarpTextWarp: { flex: 1, paddingLeft: 15 },
    listWarpPriceUp: { fontSize: 14 },
    listWarpPriceDown:  { fontSize: 12 } ,
    leftAction: { backgroundColor: 'red', flex: 1, alignItems: 'center', justifyContent: 'center' },
    leftActionIcon: { color: '#fff', fontSize: 20 },
    leftActionText: { color: '#fff', fontSize: 14 },
    rightAction: { backgroundColor: '#81cdc7', flex: 1, alignItems: 'center', justifyContent: 'center' },



    headIcon2: { fontSize: 22, color: '#fff' },
    headBody: { alignItems: 'center' },
    headCenter: { color: '#1e3768', textAlign: 'center' },
    headerWarp: { backgroundColor: '#81cdc7' },
    container: { flex: 1 },

    jobItemWarp: { backgroundColor: '#fff', paddingTop: 15, paddingLeft: 10, paddingRight: 10,paddingBottom: 15,flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc' },
    jobItemIconIonicons: { color: '#81cdc7', fontSize: 30 },
    jobItemIcon: { color: '#81cdc7', fontSize: 20 },
    jobItemName: { flex: 1, fontSize: 14, paddingLeft: 10 },
    jobItemValue: { fontSize: 14, color: '#ccc', paddingLeft: 10 },
    jobItemValueDateandTime: { fontSize: 12 }
};