import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({   //  status of request to the server 
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
    reducers: {   // is  used for simple actions like add or delete item in the list
        // setProducts(state, action) {
        //     state.data = action.payload;
        // },
        // setStatus(state, action) {
        //     state.status = action.payload;
        // },
    },
    extraReducers: (builder) => {    //  <-- builder callback is  used to build the reducer logic and  add case reducers to the slice
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});

export const { setProducts, setStatus } = productSlice.actions;   // is  exporting actions which we can use in our components 
export default productSlice.reducer;

// Thunks
export const fetchProducts = createAsyncThunk('products/fetch', async () => {   // is  used for requests to the server - functions that can dispatch actions
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
});

// export function fetchProducts() {
//     return async function fetchProductThunk(dispatch, getState) {
//         dispatch(setStatus(STATUSES.LOADING));
//         try {
//             const res = await fetch('https://fakestoreapi.com/products');
//             const data = await res.json();
//             dispatch(setProducts(data));
//             dispatch(setStatus(STATUSES.IDLE));
//         } catch (err) {
//             console.log(err);
//             dispatch(setStatus(STATUSES.ERROR));
//         }
//     };
// }

// what is use of createthunk : it is used for  creating a thunk that can be reused across multiple components.
// Action creators : are  used to create actions. They don’t modify the Redux store directly but instead return an action that is then passed
// Apply thunk : is used  to make asynchronous calls in the redux store by using a middleware called Redux Thunk.
