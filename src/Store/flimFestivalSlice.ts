import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../services/api';

interface Photo {
  photo: string;
}

interface FilmPoster {
  image: string;
  venue: string;
  price: number;
  dateandtime: string;
  location: string;
  about: string;
  photos: Photo[];
}

interface FilmState {
  filmPoster: FilmPoster[];
  loading: boolean;
  error: string | null;
}

const initialState: FilmState = {
  filmPoster: [],
  loading: false,
  error: null,
};

export const fetchFilmPoster = createAsyncThunk(
  'film/fetchFilmPoster',
  async (params: { language: string; formLayout: string }) => {
    const response = await api.get(`auth/${params.language}/${params.formLayout}`);
    return response.data as FilmPoster[];
  }
);

const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmPoster.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilmPoster.fulfilled, (state, action) => {
        state.loading = false;
        state.filmPoster = action.payload;
      })
      .addCase(fetchFilmPoster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default filmSlice.reducer;
