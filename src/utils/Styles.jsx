
import { Dimensions, Platform, StatusBar, StyleSheet } from "react-native";


const useStyles = () => {

    return StyleSheet.create({
        AndroidSafeArea: {
            flex: 1,
            backgroundColor: '#f4f5f7',
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            justifyContent: 'center',
        },
        logo: {
            width: 150,
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center',
        },
        title: {
            color: '#000',
            fontSize: 28,
            fontWeight: '700',
            lineHeight: 34,
        },
        button: (isValid) => ({
            alignItems: 'center',
            backgroundColor: isValid ? '#f8d001' : 'gray',
            borderRadius: 8,
            height: 40,
            justifyContent: 'center',
        }),
        mapButton: {
            alignItems: 'center',
            backgroundColor: '#F9D001',
            borderRadius: 8,
            padding: 8,
            justifyContent: 'center',
        },
        mapCancelButton: {
            alignItems: 'center',
            backgroundColor: 'transparent',
            justifyContent: 'center',
        },
        mapLocationButton: {
            alignItems: 'center',
            backgroundColor: 'black',
            borderRadius: 8,
            height: 56,
            justifyContent: 'center',
            width: 56,
            elevation: 1,
        },
        mapUserButton: {
            alignItems: 'center',
            backgroundColor: 'gray',
            borderRadius: 35 / 2,
            height: 35,
            justifyContent: 'center',
            width: 35,
            elevation: 1,
        },
        buttonTitle: {
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight: '600',
            lineHeight: 22,
        },
        content: {
            flex: 1,
        },
        mapContainer: {
            flex: 1,
        },
        map: {
            width: '100%',
            height: '100%',
        },
        form: {
            alignItems: 'center',
            backgroundColor: '#F9FAFB',
            borderRadius: 8,
            borderColor: '#d1d5db',
            borderWidth: 1,
            flexDirection: 'row',
            height: 40,
            paddingHorizontal: 8,
        },
        label: {
            color: '#23232D',
            fontSize: 14,
            fontWeight: '400',
            lineHeight: 20,
            width: "auto",
            marginBottom: 8,
        },
        root: {
            backgroundColor: '#fff',
            flex: 1,
            alignItems: 'center',
        },
        container: {
            flex: 10,
            flexBasis: 'auto',
            flexGrow: 1,
            flexShrink: 1,
            justifyContent: 'center',
            backgroundColor: '#F9D001',
            height: Dimensions.get('window').height * 0.4,
            width: Dimensions.get('window').width * 0.8,
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 32,
        },
        safeAreaView: {
            flex: 1,
        },
        subtitle: {
            color: '#23232D',
            fontSize: 16,
            fontWeight: '600',
            lineHeight: 22,
        },
        version: {
            color: '#23232D',
            fontSize: 10,
            fontWeight: '400',
            lineHeight: 22,
            textAlign: 'center',
        },
        textButton: {
            color: '#FFFFFF',
            fontSize: 15,
            fontWeight: '400',
            lineHeight: 20,
        },
        textInput: {
            color: '#23232D',
            flex: 1,
            backgroundColor: '#F9FAFB',
        },
        logoCdf: {
            width: 50,
            height: 50,
            resizeMode: 'contain',
            alignSelf: 'center',

        },
        textError: {
            color: 'red',
            fontSize: 12,
            fontWeight: '600',
            lineHeight: 20,
        },
        dropdown: {
            width: "100%",
            borderColor: 'rgba(235, 235, 245, 0.6)',
            borderWidth: 0.5,
            borderRadius: 8,
            paddingHorizontal: 8,
            backgroundColor: 'white',
            elevation: 1,
        },
        placeholderStyle: {
            fontSize: 12,
            color: 'black',
        },
        selectedTextStyle: {
            fontSize: 12,
            fontWeight: '600',
            color: 'blue',
        },
        inputSearchStyle: {
            height: 40,
            fontSize: 12,
            color: 'black',
        },
        mapSearchContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            height: "auto",
            justifyContent: 'space-between',
            position: 'absolute',
            top: StatusBar.currentHeight,
            left: 16,
            right: 16,
            zIndex: 1,
        },
        mapInfoContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        mapInfoTitle: {
            color: '#23232D',
            fontSize: 14,
            fontWeight: '500',
            lineHeight: 20,
        },
        mapInfoValue: {
            color: '#23232D',
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 20,
        },
        sheetContainer: {
            flex: 1,
            justifyContent: 'space-between',
            paddingHorizontal: 8,
            paddingBottom: 8,
        },
        mapActionContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 16,
        },
        mapLocationContainer: (trip) => ({
            flexDirection: 'row',
            alignItems: 'center',
            height: "auto",
            justifyContent: 'flex-end',
            position: 'absolute',
            bottom: trip ? "26%" : 16,
            left: 16,
            right: 16,
            zIndex: 1,
        }),
    })
}

export default useStyles;