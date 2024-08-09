// import { IonLoading, IonToast } from '@ionic/react';
// import { alertCircle, checkmarkCircle, closeCircle } from 'ionicons/icons';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectorLoading, selectorShow, setShow } from '../store/slices/loadingSlice';
import { CircularProgress, Fade } from '@mui/material';
// import { selectorAlert, shiftToast, TToast } from '../store/slices/toastSlice';
import './styles.css';

const LoadingGlobal = () => {
    const dispatch = useDispatch();

    const loadingApp = useSelector(selectorLoading);

    const onDidDismiss = () => {
        dispatch(setShow(false))
    }

    return (

        <Fade className='custom-position-center z-50'
            in={loadingApp.show}
            unmountOnExit
        >
            {/* <div className={`absolute w-full h-full ${loadingApp.show ? '' : 'hidden'}`}></div> */}
                <CircularProgress />
        </Fade >

    )
}

export default LoadingGlobal;