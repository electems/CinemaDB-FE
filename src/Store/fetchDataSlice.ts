import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./store"; 
import { api } from "../services/api"; 

export enum STATUSES {
  IDLE = "idle",
  ERROR = "error",
  LOADING = "loading",
}

interface FetchDataState {
  data: any[]; 
  status: STATUSES;
}

const initialState: FetchDataState = {
  data: [],
  status: STATUSES.IDLE,
};


const fetchDataSlice = createSlice({
  name: "fetchData",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<any[]>) {
      state.data = action.payload;
    },
    setStatus(state, action: PayloadAction<STATUSES>) {
      state.status = action.payload;
    },
  },
});


export const { setData, setStatus } = fetchDataSlice.actions;
export default fetchDataSlice.reducer;

export const fetchData = (): AppThunk => async (dispatch) => {
  dispatch(setStatus(STATUSES.LOADING));
  try {
    const res = await api.get("/auditioncall/audtions");
    const data = await res.data;
    dispatch(setData(data));
    dispatch(setStatus(STATUSES.IDLE));
  } catch (err) {
    console.error(err);
    dispatch(setStatus(STATUSES.ERROR));
  }
};
