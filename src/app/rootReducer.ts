import { combineReducers } from '@reduxjs/toolkit';
import landingReducer from '../features/landing/store/landingSlice';
import dashboardReducer from '../features/dashboard/store/dashboardSlice';

const rootReducer = combineReducers({
  landing: landingReducer,
  dashboard: dashboardReducer,
  // Add other feature reducers here as they are created
  // auth: authReducer,
});

export default rootReducer;
