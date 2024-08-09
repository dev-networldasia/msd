import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TToast = {
    message: string,
    type: 'success' | 'warning' | 'error' | 'info',
    duration: number;
}

interface IToastSlice {
    toasts: TToast[]
}

const initialState: IToastSlice = {
    toasts: []
}

export const ToastSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        createToast: (state, action: PayloadAction<TToast>) => {
            state.toasts.push(
                action.payload
            );
        },
        shiftToast: (state) => {
            state.toasts.shift();
        }
    },
    // extraReducers: {
    //     [extraAction]: (state, action) => {
    //         state.toasts.push({ message: action.error.message, type: "error" });
    //     }
    // }
});

export const selectorAlert = (state: { notifications: IToastSlice }) => state.notifications
export const { createToast, shiftToast } = ToastSlice.actions;

export default ToastSlice.reducer;
