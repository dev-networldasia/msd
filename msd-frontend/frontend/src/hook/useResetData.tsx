import { useDispatch } from 'react-redux';
import { clearUser } from '../store/slices/userSlice';
import tokenService from '../services/token';

const useResetData = () => {
    const dispatch = useDispatch();

    const resetLoginOut = () => {
        dispatch(clearUser())
        tokenService.removeToken()
    };

    const resetLoginExpired = (url: string) => {
        dispatch(clearUser())
        tokenService.removeToken()
    };
    const resetAllData = () => {
        dispatch(clearUser())
        tokenService.removeToken()

    };

    return {
        resetLoginOut,
        resetLoginExpired,
        resetAllData
    };
};

export default useResetData;
