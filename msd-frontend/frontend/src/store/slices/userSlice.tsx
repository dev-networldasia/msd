import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserSlice {
    userId: number | null,
    name?: string,
    avatar?: string,
    gender: number,
    role: number,
}

const initialUserState: IUserSlice = {
    userId: null,
    name: "",
    avatar: "",
    gender: 1,
    role: 1,
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser: (state, action: PayloadAction<IUserSlice>) => action.payload,
        setUserId: (state, action: PayloadAction<number>) => {
            state.userId = action.payload
        },
        clearUser: (state) => initialUserState
    }
})

export const selectorUser = (state: { user: IUserSlice }) => state.user;
export const selectorUserId = (state: { user: IUserSlice }) => state.user.userId;

export const { setUser, setUserId, clearUser } = userSlice.actions;
export default userSlice.reducer;