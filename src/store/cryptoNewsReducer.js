import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCryptoNewsData = createAsyncThunk('crytoNewsData', async () => {
    const response = await axios.get('https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=783fbc48c6334623b72e26b46af4f95c');
    const { data } = response;
    return data;
})


const cryptoNewsSlice = createSlice({
    name: 'crytoNewsData',
    initialState: {
        isLoading: false,
        cryptoNews: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCryptoNewsData.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchCryptoNewsData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cryptoNews = action.payload
        })
        builder.addCase(fetchCryptoNewsData.rejected, (state, action) => {
            console.log('Error', action.payload);
            state.isError = true
        })
    }
})

export default cryptoNewsSlice.reducer;