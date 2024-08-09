import { useDispatch } from 'react-redux';
import { createToast } from '../store/slices/toatSlice';
import './styles.css'

const useToast = () => {
    const dispatch = useDispatch();

    const pushToast = (message: string, type: 'warning' | 'success' | 'error' | 'info', duration: number = 2000) => {
        if (message && message?.length > 0) {
            dispatch(createToast({
                message,
                type,
                duration
            }))
        } else {
            const messageTmp = "Không thể kết nối đến máy chủ"
            dispatch(createToast({
                message: messageTmp,
                type: "error",
                duration: 1000
            }))
        }
    }

    return pushToast;
}

export default useToast;