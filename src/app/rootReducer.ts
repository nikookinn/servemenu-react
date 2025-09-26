import { combineReducers } from '@reduxjs/toolkit';
import landingReducer from '../features/landing/store/landingSlice';

export const rootReducer = combineReducers({
  landing: landingReducer,
  // Future feature reducers will be added here
  // auth: authReducer,
  // dashboard: dashboardReducer,
  // menu: menuReducer,
  // qr: qrReducer,
  // analytics: analyticsReducer,
  // settings: settingsReducer,
});
