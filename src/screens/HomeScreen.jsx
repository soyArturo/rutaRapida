import { FontAwesome5 } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import * as Location from "expo-location";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Linking, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MapView, { Marker } from 'react-native-maps';
import useStyles from '../utils/Styles';

const HomeScreen = ({ navigation }) => {
    const [origin, setOrigin] = useState(null);
    const [trip, setTrip] = useState(false);
    const [destination, setDestination] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [client, setClient] = useState("");
    const styles = useStyles();
    const mapViewRef = useRef(null);
    // ref
    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['20%', '25%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    const getLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            alert("Permission denied");
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const current = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        };
        setOrigin(current);
    }

    const onLocation = async () => {
        let location = await Location.getCurrentPositionAsync({});
        mapViewRef.current?.animateCamera({
            center: {
                latitude: origin ? origin.latitude : location.coords.latitude,
                longitude: origin ? origin.longitude : location.coords.longitude,
            },
            zoom: 15,
        });
    }

    const onStart = () => {
        const url = `https://www.google.com/maps/dir/?api=1&origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&travelmode=driving`;
        Linking.openURL(url);
        setTrip(false);
        setDestination(null);
        setClient("");
    }

    const onCancel = () => {
        setTrip(false);
        setDestination(null);
        setClient("");
    }

    useEffect(() => {
        getLocationPermission();
    }, []);

    const clients = [
        {
            label: 'Cliente 1',
            value: {
                latitude: 32.4593982,
                longitude: -116.8778573,
            }
        },
        {
            label: 'Cliente 2',
            value: {
                latitude: 32.4582263,
                longitude: -116.8751239,
            }
        },
    ];

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <>
            <StatusBar barStyle="default" />
            <View style={styles.mapContainer}>
                <View style={styles.mapSearchContainer}>
                    <View style={{ width: "75%" }}>
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: '#000' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            itemTextStyle={{
                                fontSize: 12,
                                color: 'black',
                            }}
                            data={clients}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={client ? client : "Selecciona un cliente"}
                            searchPlaceholder="Buscar"
                            value={destination}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setTrip(true);
                                setClient(item.label);
                                setDestination(item.value);
                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <FontAwesome5
                                    name="users"
                                    size={20}
                                    color='black'
                                    style={{
                                        marginRight: 5,
                                    }} />
                            )}
                        />
                    </View>
                    <TouchableOpacity style={styles.mapUserButton} onPress={handleLogout}>
                        <FontAwesome5 name="user-alt" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <MapView
                    style={styles.map}
                    loadingEnabled={true}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    showsTraffic={true}
                    ref={mapViewRef}
                    onMapReady={onLocation}
                    minZoomLevel={15}
                    maxZoomLevel={20}
                >
                    {trip && (
                        <>
                            <Marker
                                coordinate={origin}
                                image={require('../../assets/images/semi.png')}
                            />
                            <Marker
                                coordinate={destination}
                                title="Destino"
                                description="Destino" />
                            {/* <MapViewDirections
                                origin={origin}
                                destination={destination}
                                apikey={GOOGLE_MAPS_KEY}
                                strokeColor="black"
                                strokeWidth={5}
                                onStart={(params) => {
                                    console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                                }}
                                onReady={result => {
                                    console.log(`Distance: ${result.distance} km`)
                                    console.log(`Duration: ${result.duration} min.`)
                                    mapViewRef.current?.fitToCoordinates(result.coordinates, {
                                        edgePadding: {
                                            right: 50,
                                            bottom: 50,
                                            left: 50,
                                            top: 50,
                                        },
                                    });
                                }}
                            /> */}
                        </>
                    )}
                </MapView>
                <View style={styles.mapLocationContainer(trip)}>
                    <TouchableOpacity
                        style={styles.mapLocationButton}
                        onPress={onLocation}
                    >
                        <FontAwesome5 name="map-marker-alt" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                {trip && (
                    <BottomSheet
                        style={{
                            elevation: 20,
                            shadowColor: '#000',
                        }}
                        ref={bottomSheetRef}
                        index={1}
                        snapPoints={snapPoints}
                        enablePanDownToClose={true}
                        onChange={handleSheetChanges}
                    >
                        <View style={styles.sheetContainer}>
                            <View style={styles.mapInfoContainer}>
                                <Text style={styles.subtitle}>{client}</Text>
                                <TouchableOpacity style={styles.mapCancelButton} onPress={onCancel}>
                                    <FontAwesome5 name="times" size={20} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={styles.mapInfoTitle}>Ruta</Text>
                                <Text style={styles.mapInfoValue}>Mi ubicacion - Cliente</Text>
                            </View>
                            <View style={styles.mapActionContainer}>
                                <View>
                                    <Text style={styles.mapInfoTitle}>10 min</Text>
                                    <Text style={styles.mapInfoValue}>1.5 km</Text>
                                </View>
                                <TouchableOpacity style={styles.mapButton} onPress={onStart}>
                                    <Text style={styles.buttonTitle}>Iniciar Ruta</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </BottomSheet>
                )}
                {/* {trip && (
                    <View style={styles.mapActionContainer}>
                        <TouchableOpacity style={styles.mapButton} onPress={onStart}>
                            <Text style={styles.buttonTitle}>Iniciar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.mapCancelButton} onPress={onCancel}>
                            <Text style={styles.buttonTitle}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                )} */}
            </View>
        </>
    );
};

export default HomeScreen;
