//  how to make slice Component for redux toolkit
 // 1. import createSlice  and createAsyncThunk or others fuctions  from '@reduxjs/toolkit'
//2.  declare a variable  with the name of your component, and call createSlice passing it an object that contains:
// 2.1 define a function that will be called when the action is dispatched, this function should return an object with payloadCreator property
// 2.3 define the initial state of your component in an object
// const initialState = {value: 'Hello'}
// 3.1 Create a slice with createSlice function, it must have child : name , initial state and an object that contains reducers  and extra reduce (optional)
// 3.2 Create a function that will be called when you dispatch this action, it should return a promise with a payload (the value)

// export the action 
// export the reduced

import { createSlice } from '@reduxjs/toolkit'
import { Component } from 'react'

// declaring a variable cartSlice  that will contain our slice of application state
const cartSlice = createSlice({    
    name: 'cart',
    initialState: [],
    reducers: {
        add(state, action) {
            state.push(action.payload);
        },
        remove(state, action) {
            return state.filter((item) => item.id !== action.payload);
        },
    },
});

export const { add, remove } = cartSlice.actions;   //  we can use this syntax to destructure our actions
                                                // so instead of writing `addCartItem` , `removeCartItem` we just write `add` & `remove`
                                                // so we don't need to write cartSlice.actions.add / cartSlice.actions.remove every time
                                                 // so instead of writing `add

export default cartSlice.reducer;   // here  we are exporting the reducer function created by our slice  of application state.
