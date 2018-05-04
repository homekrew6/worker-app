// const React = require("react-native");

// const { StyleSheet, Dimensions, Platform } = React;

// const deviceHeight = Dimensions.get("window").height;

export default {

    bgWhite:{ backgroundColor: 'white' },

    // header part
    headerMain: { backgroundColor: '#81cdc7', alignItems: 'center', justifyContent: 'center' },
    headerBody: { alignItems: 'center', justifyContent: 'center' },
    headerTitle: { color: '#1e3768', fontSize: 16 },
    headerIconClose: { color: '#fff', fontSize: 30 },
    headerIconBack: { color: '#fff', fontSize: 24 },
    buttonIconWarp: { width: 30, backgroundColor: 'transparent' },



    // footer call and chat

    footerWarp: { height: 45 },
    footerTabStyle: { flex: 1, alignItems: 'center', justifyContent: 'center', height: 50, width: 50, flexDirection: 'row' },
    footerTabText: { color: '#fff' },
    footerTabIcon: { color: '#fff', fontSize: 16, marginRight: 5 },
    


    // live chat List
    liveChatWarp: { borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 15, position: 'relative', overflow: 'visible' },
    grayCointenner: { backgroundColor: '#ccc', flexDirection: 'row', borderRadius: 10, alignItems: 'center', padding: 8 },
    ImageContnr: { height: 60, width: 60 },
    textWarp: { flex: 1, paddingLeft: 10, paddingRight: 10 },
    liveChartTitle: { color: '#4e4e4e' },
    timeWarp: { color: '#4e4e4e' },
    absoluteImageWarp:  { height: 60, width: 60, overflow: 'visible', left: 0, zIndex: 99, position: 'absolute', top: 5, left: 20 },
    absoluteImage: { height: 60, width: 60 },


    // after header search box
    afterHeaderSearch: { padding: 10, backgroundColor: "#81cdc7", paddingTop: 0, },
    afterHeaderSearchInput: { textAlign: 'center', backgroundColor: '#fff', borderRadius: 50, height: 35 },


    // live Chat list
    chatListWarp: { borderBottomWidth: 1, borderBottomColor: '#ccc', marginLeft: 15, marginRight: 15 },
    chatListTouchWarp: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 10, paddingBottom: 10 },
    chatListTextWarp: { flex: 1 },
    chatListTextName: { color: '#000' },
    chatListTextQuestion: { color: '#a9a9a9', fontSize: 14 },
    chatListTextIcon: { fontSize: 18 },
    chatListTime: { fontSize: 14 },


    // modal
    modalWarp: { flex: 1, justifyContent: 'center', display: 'flex', width: '100%' },
    modalWhiteWarp: { backgroundColor: 'white', borderRadius: 10 },
    textWarp: { width: '100%' },
    numberWarp: { textAlign: 'center', color: '#000', fontSize: 24 },
    buttonWarp: { flexDirection: 'row', borderTopColor: '#ccc', borderTopWidth: 1 },
    buttonItem: { flex: 1, alignItems: 'center', justifyContent: 'center', height: 40 },
    buttonItemText: { color: '#a9a9a9' },
    buttonItem2: { borderLeftWidth: 1, borderLeftColor: '#ccc' },

    //liveChat
    chatterHeaderWarp: { backgroundColor: '#cccccc', padding: 15 },
    chatterHeaderWarpInner: { flexDirection: 'row', alignItems: 'center' },
    chatterHeaderImageWarp: { marginBottom: 10 },
    chatterHeaderImage: { height: 50, width: 50, borderRadius: 70 },
    chatterHeadertextWarp: { marginLeft: 10 },
    chatterHeaderTime: { fontSize: 12 },
    sortMassage: { fontSize: 12, textAlign: 'center', width: '100%' },

    scrollWarp: { flex: 1 },
    scrollChat: { padding: 10, flex: 1 },
    chatWarp:{ flexDirection: 'row', marginBottom: 15 },
    person1Warp: { flex: 1, marginBottom: 10, overflow: 'visible', position: 'relative', alignItems: 'flex-end' },
    person1TextWarp: { maxWidth: '80%', padding: 8, borderRadius: 5, backgroundColor: '#ccc', position: 'relative', overflow: 'visible' },
    personText: { fontSize: 14 },
    person1Arrow: { height: 12, width: 12, position: 'absolute', right: -3, bottom: -4, zIndex: 999 },
    person1ImageWarp: { marginLeft: 15, justifyContent: 'flex-end' },
    person1Image: { height: 30, width: 30, borderRadius: 70 },
    person2ImageWarp: { marginRight: 15, justifyContent: 'flex-end' },
    person2Image: { height: 30, width: 30, borderRadius: 70 },
    person2Warp: { flex: 1, marginBottom: 15, overflow: 'visible', position: 'relative' },
    person2TextWarp: { width: '100%', maxWidth: '80%', padding: 8, borderRadius: 5, backgroundColor: '#ccc', position: 'relative', overflow: 'visible' },
    person2Arrow: { height: 12, width: 12, position: 'absolute', left: -4, bottom: -4, zIndex: 999 },

    chatfooterWarp:{ backgroundColor: '#ccc', flexDirection: 'row', flex: 1, alignItems: 'center', backgroundColor: '#81cdc7' },
    chatIcon: { paddingLeft: 10, paddingRight: 10 },
    chatCameraIcon: { fontSize: 24, color: '#fff' },
    chatMiddleInputWarp: { flex: 1, overflow: 'hidden' },
    chatMiddleInput: { backgroundColor: '#fff', borderRadius: 40, paddingLeft: 10, paddingRight: 10, height: 36 },
    sendIcon: { fontSize: 24, color: '#fff' },

    noDataFound: { alignItems: 'center', justifyContent: 'center', marginTop: 15 },
    
};
