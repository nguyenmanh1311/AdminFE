// import orderReducer from './order/ordersSlice';

import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./order/ordersSlice";
// import commentSlice from './comment/commentSlice';
// import reviewSlice from './review/reviewSlice';
import userSlice from "./user/userSlice";
import showModalSlice from "./modal/showModalSlice";
//khoi tao store
export const store = configureStore({
  reducer: {
    orders: orderSlice,
    users: userSlice,
    modal: showModalSlice,
  },
});
