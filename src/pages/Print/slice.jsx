import { createSlice } from "@reduxjs/toolkit";

export const printSlice = createSlice({
  name: "printProfile",
  initialState: {
    isLoading: false,
    profiles: undefined,
    isAUFNRLoading: false,
    AUFNRList: undefined,
    isReadyToPrint: false,
    isCAUFVDLoading: false,
  },
  reducers: {
    getCAUFVDRequest: (state) => {
      state.isCAUFVDLoading = true;
      state.isReadyToPrint = false;
      state.profiles = undefined;
    },
    getCAUFVDSuccess: (state, { payload }) => {
      state.isCAUFVDLoading = false;
      state.isReadyToPrint = true;
      state.profiles = payload;
    },
    getCAUFVDFailure: (state) => {
      state.isCAUFVDLoading = false;
      state.isReadyToPrint = false;
    },
    getAUFNRListRequest: (state) => {
      state.isAUFNRLoading = true;
      state.AUFNRList = undefined;
    },
    getAUFNRListSuccess: (state, { payload }) => {
      state.isAUFNRLoading = false;
      state.AUFNRList = payload;
    },
    getAUFNRListFailure: (state) => {
      state.isAUFNRLoading = false;
    },
  },
});

export const {
  getCAUFVDRequest,
  getCAUFVDSuccess,
  getCAUFVDFailure,
  getAUFNRListRequest,
  getAUFNRListSuccess,
  getAUFNRListFailure,
} = printSlice.actions;
export default printSlice.reducer;
