import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILoadingSlice {
    show: boolean,
    message: string
}

const initialLoadingState: ILoadingSlice = {
    show: false,
    message: ""
}

const userSlice = createSlice({
    name: 'loading',
    initialState: initialLoadingState,
    reducers: {
        setLoading: (state, action: PayloadAction<ILoadingSlice>) => action.payload,
        setShow: (state, action: PayloadAction<boolean>) => {
            state.show = action.payload
        },
        setMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload
        },
        clearLoading: (state) => initialLoadingState
    }
})

export const selectorLoading = (state: { loading: ILoadingSlice }) => state.loading;
export const selectorShow = (state: { loading: ILoadingSlice }) => state.loading.show
export const selectorMessage = (state: { loading: ILoadingSlice }) => state.loading.show;
export const { setLoading, setShow, setMessage, clearLoading } = userSlice.actions;
export default userSlice.reducer;