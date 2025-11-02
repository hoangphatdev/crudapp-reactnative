import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  password: '',
  role: '',
  imageUrl: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { username, email, password, imageUrl, role } = action.payload;
      state.username = username;
      state.email = email;
      state.password = password;
      state.imageUrl = imageUrl;
      state.role = role;
    },
    clearUser: state => {
      state.username = '';
      state.email = '';
      state.password = '';
      state.imageUrl = '';
      state.role = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
