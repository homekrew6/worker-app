const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

export default {
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
    },
    menuCarditem: {
        paddingTop: 0,
        marginTop: 0,
        paddingBottom: 0,
    },
    menuCardView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomColor: '#ececec',
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingTop: 10,
        alignItems: 'center',
    },
    menuCardIcon: {
        height: 20,
        width: 20
    },
    menuCardIcon2:{
        height: 50,
        width: 50
    },
    menuCardTxt: {
        flex: 1,
        flexDirection: 'row',
        color: '#606060',
        paddingLeft: 10,
        lineHeight: 25,
    },
    appHdr: {
        backgroundColor: '#80cec8',

    },
    appHdr2: {
        backgroundColor: '#cbf0ed',

    },
    appHdrtitleWarp: {
        alignItems: 'center'
    },

    pname: {
        color: '#5e5e5e',
        fontSize: 20,
    },
    pemail: {
        color: '#969696',
        fontSize: 14,
    },
    pphone: {
        color: '#4b4b4b',
        fontSize: 14,
    },
    pcard: {
        paddingBottom: 0
    },
    pBtmTxt: {
        flex: 1,
        borderTopColor: '#ececec',
        borderTopWidth: 1,
        paddingTop: 15,
        paddingBottom: 5,
    },
    profileImage: {
        height: 70,
        width: 70,
        borderRadius: 70,
        marginRight: 15
    },
    pBtmTxt_Txt: {
        textAlign: 'right',
        color: '#060606'
    },
    flx_View: {
        flex: 1,
        flexDirection: 'row',
    },
    artNt: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bg_white: {
        backgroundColor: '#fff'
    },
    bg_head_icon: {
        color: '#1e3768'
    },
    artNtTxt: {
        color: '#ff0026',
        width: 20
    },
    arw_lft: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    arw_lft_img: {
        height: 20,
        width: 10,
        marginLeft: 10
    },
    version: {
        textAlign: 'center',
        fontSize: 10,
        paddingTop: 15,
        paddingBottom: 15
    },
    bg_white: {
        backgroundColor: '#fff'
    },
    editprofileLst: {
        flexDirection: 'row',
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    editprofileWarp: {
        width: 100,
        paddingBottom: 0,
        marginBottom: 0,
        flexDirection: 'row'
    },
    editprofileInputwrap: {
        flex: 1
    },
    editprofileInput: {
        color: '#29416f',
        fontSize: 14,
        color: '#828282'
    },
    editPflHdr: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cbf0ed',
        paddingBottom: 40
    },
    editPflHdrWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        marginTop: 0,
        marginBottom: 0
    },
    editPflHdrThumbnail: {
        height: 110,
        width: 110,
        borderRadius: 90
    },
    editPflHdrBtn: {
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 15
    },


    starRed: { color: 'red', fontSize: 12 },
    starRedSkill: { color: 'red', fontSize: 10 },

    headIcon: { fontSize: 22, color: '#81cdc7' },
    headBody: { alignItems: 'center' },
    headCenter: { color: '#1e3768', textAlign: 'center' },
    headerWarp: { backgroundColor: '#81cdc7' },
    appHdr2: { backgroundColor: '#81cdc7' },
    headIcon2: { fontSize: 22, color: '#fff' },


    // total bill item

    totalBillitem: { flexDirection: 'row', paddingTop: 12, paddingBottom: 12, paddingLeft: 10, paddingRight: 10, alignItems: 'center', borderBottomColor: '#ccc', borderBottomWidth: 1, backgroundColor: '#fff' },
    totalImage: { width: 20, height: 20 },
    text1: { paddingLeft: 8 },
    text2: { width: '100%', textAlign: 'right', paddingRight: 10 },
    price: { width: 80 },
    priceText: { fontSize: 14, fontWeight: 'bold', width: '100%', textAlign: 'right' },
    imagesWarp: { width: 25 },
    subMaterials: { borderColor: '#ccc', borderWidth: 1, height: 35, width: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 6 }

};