import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { persistReducer, persistStore } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import userReducer from './userSlice';

// // Gộp các reducer (có thể thêm reducer khác sau này)
// const rootReducer = combineReducers({
//   user: userReducer,
// });

// // Cấu hình redux-persist
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: ['user'], // chỉ lưu slice user
// };

// // Tạo reducer có persist
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Tạo store
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false, // cần tắt check vì redux-persist dùng non-serializable values
//     }),
// });

// // Tạo persistor (để gắn vào PersistGate)
// export const persistor = persistStore(store);
