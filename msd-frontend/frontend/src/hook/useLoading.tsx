
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectorLoading, setLoading } from '../store/slices/loadingSlice';
import useToast from './useToast';
// let timeout: any
const useLoading = () => {
    const dispatch = useDispatch();
    const { show, message } = useSelector(selectorLoading);

    const pushLoading = (show: true | false, message: string = "") => {
        dispatch(setLoading({
            show,
            message
        }))
    }

    useEffect(() => {
        if (show) {
            setTimeout(() => {
                pushLoading(false);
            }, 30000);

        } else {
            // clearTimeout(timeout)
        }
    }, [show]);
    return pushLoading;
}

export default useLoading;