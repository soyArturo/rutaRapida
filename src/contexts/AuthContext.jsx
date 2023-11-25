import { createContext, useState } from 'react';
import SignIn from '../services/AuthService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     async function loadStorageData() {
    //         // TODO: Try using multiget instead of 2 awaits
    //         const storageUser = await AsyncStorage.getItem('@reactNativeAuth:user');
    //         const storageToken = await AsyncStorage.getItem('@reactNativeAuth:token');
    //         if (storageUser && storageToken) {
    //             api.defaults.headers['Authorization'] = `Bearer ${storageToken}`;
    //             setUser(JSON.parse(storageUser));
    //         }
    //     }

    //     loadStorageData();
    // }, []);
    const login = async () => {
        const response = await SignIn();
        setUser(response.user);
        // api.post('/auth/User', {
        //     numeroEmpleado: "400253",
        //     contrasena: "400253"
        // }).then(async (response) => {
        //     console.log(response);
        // }).catch((error) => {
        //     console.log(error);
        // });
    }
    const signOut = () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signed: true, user: user, login, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;