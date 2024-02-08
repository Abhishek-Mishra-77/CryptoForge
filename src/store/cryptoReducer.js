import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const options = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coins',
    headers: {
        'X-RapidAPI-Key': 'bd00fa80b8msh3771382c2c3c79ep1b3e74jsn63c6f7ae0a3c',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
};

export const fetchCryptoData = createAsyncThunk('crytoData', async () => {
    const response = await axios.request(options);
    const { data } = response.data
    return data;
})

const cryptoSlice = createSlice({
    name: 'crypto',
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCryptoData.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchCryptoData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload
        })
        builder.addCase(fetchCryptoData.rejected, (state, action) => {
            console.log('Error', action.payload);
            state.isError = true
        })
    }
})

export default cryptoSlice.reducer;
