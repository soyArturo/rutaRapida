import { Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold, useFonts } from '@expo-google-fonts/nunito';
import { useContext, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Image,
    Pressable,
    SafeAreaView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import SizedBox from '../components/SizedBox';
import AuthContext from '../contexts/AuthContext';
import useStyles from '../utils/Styles';

const LoginScreen = () => {
    const { signed, user, login } = useContext(AuthContext);
    console.log(signed);
    console.log(user);
    const userNameInput = useRef(null);
    const passwordInput = useRef(null);
    const styles = useStyles();
    const { control, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
    });
    const handleSignIn = () => {
        login();
    }

    let [fontsLoaded, fontError] = useFonts({
        Nunito_700Bold,
        Nunito_400Regular,
        Nunito_600SemiBold,
    });

    if (!fontsLoaded && !fontError) {
        console.log("Loading fonts...");
        return null;
    }

    return (
        <>
            <StatusBar barStyle="default" />
            <SafeAreaView style={styles.AndroidSafeArea}>
                <View style={{ paddingHorizontal: 25 }}>
                    <View>
                        <Image source={require('../../assets/images/logo.png')}
                            style={styles.logo} />
                    </View>
                    <SizedBox height={32} />
                    <Text
                        style={[
                            styles.title,
                            {
                                fontFamily: 'Nunito_700Bold',
                            },
                        ]}>
                        Ruta Rápida!
                    </Text>
                    <Pressable>
                        <Text style={[
                            styles.label,
                            {
                                fontFamily: 'Nunito_400Regular',
                            }]}
                        >
                            Usuario
                        </Text>
                        <View style={styles.form}>
                            <Controller
                                control={control}
                                name='username'
                                rules={{
                                    required: true,

                                }}
                                render={({ field: { onBlur, onChange, value } }) => (
                                    <TextInput
                                        autoCapitalize="none"
                                        autoComplete="username"
                                        autoCorrect={false}
                                        keyboardType="number-pad"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        onSubmitEditing={() => passwordInput.current?.focus()}
                                        ref={userNameInput}
                                        returnKeyType="next"
                                        style={[styles.textInput, { fontFamily: 'Nunito_400Regular' }]}
                                        textContentType="username"
                                        value={value}
                                    />
                                )}
                            />
                        </View>
                        {errors.username && <Text style={styles.textError}>Este campo es requerido</Text>}
                    </Pressable>
                    <SizedBox height={8} />
                    <Pressable>
                        <Text style={[
                            styles.label,
                            {
                                fontFamily: 'Nunito_400Regular',
                            }]}
                        >
                            Contraseña
                        </Text>
                        <View style={styles.form}>
                            <Controller
                                control={control}
                                name='password'
                                rules={{
                                    required: true,

                                }}
                                render={({ field: { onBlur, onChange, value } }) => (
                                    <TextInput
                                        autoCapitalize="none"
                                        autoComplete="password"
                                        autoCorrect={false}
                                        keyboardType="number-pad"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        onSubmitEditing={handleSignIn}
                                        ref={passwordInput}
                                        returnKeyType="done"
                                        secureTextEntry
                                        style={[styles.textInput, { fontFamily: 'Nunito_400Regular' }]}
                                        textContentType="password"
                                        value={value}
                                    />
                                )}
                            />
                        </View>
                        {errors.password && <Text style={styles.textError}>Este campo es requerido</Text>}
                    </Pressable>
                    <SizedBox height={8} />
                    <TouchableOpacity
                        onPress={handleSignIn}
                    >
                        <View
                            style={styles.button(isValid)}
                        >
                            <Text style={[styles.buttonTitle, { fontFamily: "Nunito_600SemiBold" }]}>Ingresar</Text>
                        </View>
                    </TouchableOpacity>
                    <SizedBox height={32} />
                    <View style={{
                        flex: 2,
                    }}>
                        <Image source={require('../../assets/images/cdf.png')}
                            style={styles.logoCdf} />
                        <Text style={styles.version}>V0.1.0</Text>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

export default LoginScreen;
