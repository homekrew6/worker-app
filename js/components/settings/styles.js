const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    bgWhite: {
        backgroundColor: '#fff',
    },
    appHdr2: {
        backgroundColor: '#81cdc7',
    },
    appHdr2Bdy: {
        alignItems: 'center',
    },
    appHdr2Txt: {
        color: '#1e3768',
        fontSize: 15,
    },
    tac: {
        alignItems: 'center'
    },
    catIten: {
        width: 100,
        marginBottom: 40,
        alignItems: 'center',
    },
    catIten_img_view: {
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    catIten_txt: {
        alignItems: 'center',
        color: '#3a4d75',
        fontSize: 14,
        marginTop: 10,
    },
    catIten_txt_warp: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 10,
    },
    catIten_hdr: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    catIten_hdr_txt: {
        fontSize: 12,
    },
    catIten_hdr_txt: {
        color: '#1e3768',
        fontSize: 20,
    },
    catIten_img: {
        width: 60,
        height: 60,
    },
    hd_rt_icon: {
        color: '#81cdc7',
        fontSize: 30,
        fontWeight: 'nornal',
    },
    hd_lft_icon: {
        fontSize: 20,
        color: '#71beb8',
    },
    logo_hdr_img: {
        height: 18,
        width: 110,
    },
    carveImage: {
        height: 200,
        flexDirection: 'row',
        justifyContent: 'center',
        width: deviceWidth,
    },


    confirmationItem: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        borderColor: '#f9f9f9',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmationItem2: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        borderColor: '#f9f9f9',
        flexDirection: 'row',
    },
    bedroomCount: {
        flex: 1,
        textAlign: 'center',
    },
    confirmationIconView: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#1e3768',
        marginRight: 8,
        height: 35,
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmationViewIcon: {
        fontSize: 20,
        color: '#81cdc7',
    },
    confirmationViewIcon2: {
        fontSize: 26,
        color: '#81cdc7',
        marginRight: 10,
        marginLeft: 10,
    },
    confirmationMainTxt: {
        flex: 1,
    },
    confirmationDateTime: {
        color: '#a9a9a9',
        fontSize: 13,
        marginLeft: 10
    },
    confirmationArwNxt: {
        paddingLeft: 5,
    },
    confirmationArwNxtIcn: {
        fontSize: 30,
    },
    confirmationhd: {
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
    },
    confirmationhdtxt: {
        color: '#1e3768',
        fontSize: 18,
    },
    confirmationServicewarp: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    confirmationServiceItem: {
        flex: 1,
        alignItems: 'center',
    },
    confirmationServiceItemIcon: {
        borderRadius: 70,
        height: 45,
        width: 45,
        backgroundColor: '#81cdc7',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmationServiceItemIcon2: {
        borderRadius: 70,
        height: 45,
        width: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#81cdc7',
        borderWidth: 1,
    },
    confirmationServiceItemIconIcn: {
        color: '#fff',
        fontSize: 30,
    },
    confirmationServiceItemIconIcn2: {
        color: '#81cdc7',
        fontSize: 30,
    },
    confirmationServiceTxt: {
        color: '#1e3768',
        marginTop: 5,
        marginBottom: 10,
    },
    confirmationServicePlusWarp: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        height: 25,
        width: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmationServicePlusIcon: {
        color: '#81cdc7',
        fontSize: 18,
    },
    confirmationServiceDvdr: {
        height: 100,
        backgroundColor: '#e6e6e6',
        width: 1,

    },
    confirmationServicefooterItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#81cdc7',
        alignItems: 'center',
    },
    confirmationServicefooterItem2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#1e3768',
        alignItems: 'center',
    },
    confirmationServicefooterItmTxt: {
        color: '#fff',
        fontSize: 14,

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    innerContainer: {
        alignItems: 'center',
    },
    imagesSliderWarp: {
        padding: 15
    },
    imagesSliderFlatList: {
        height: 60
    },
    imagesSliderImage: {
        height: 60,
        width: 60,
        marginLeft: 2,
        marginRight: 2,
        borderRadius: 10
    },

    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
};
