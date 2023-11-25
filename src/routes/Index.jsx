import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import AppRoutes from './AppRoute';
import AuthRoutes from "./AuthRoute";


const Routes = () => {
    const { signed } = useContext(AuthContext);
    return signed ? <AppRoutes /> : <AuthRoutes />
}

export default Routes;