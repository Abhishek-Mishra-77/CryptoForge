import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer, { fetchCryptoData } from "./cryptoReducer";
import cryptoNewsReducer, { fetchCryptoNewsData } from "./cryptoNewsReducer";

const store = configureStore({
    reducer: {
        crypto: cryptoReducer,
        cryptoNews: cryptoNewsReducer
    }
})

store.dispatch(fetchCryptoNewsData())
store.dispatch(fetchCryptoData())

export default store;
