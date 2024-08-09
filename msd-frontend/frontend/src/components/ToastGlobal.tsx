import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';
import { TToast, selectorAlert, shiftToast } from '../store/slices/toatSlice';

const ToastGlobal = () => {
    const dispatch = useDispatch();
    const toasts = useSelector(selectorAlert);
    const [toast, setToast] = useState<TToast>({ type: "success", message: "", duration: 2000 });
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        if (!isShow) {
            showNextToast();
        }
    }, [toasts?.toasts])

    const showNextToast = () => {
        if (toasts?.toasts?.length > 0) {
            setToast(toasts?.toasts[0]);
            setIsShow(true);
            dispatch(shiftToast());
            setTimeout(() => {
                setIsShow(false);
            }, toasts?.toasts[0].duration)
        }
    }

    const onDidDismissToast = () => {
        setIsShow(false);
    }

    return (
        <Snackbar open={isShow} autoHideDuration={toast.duration} onClose={() => onDidDismissToast()}>
            <Alert onClose={() => onDidDismissToast()} severity={toast.type} >
                {toast.message}
            </Alert>
        </Snackbar>
    )
}

export default ToastGlobal;