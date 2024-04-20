/* eslint-disable react/prop-types */
/* Redux is a state management library that allows us to maintain global state
  which means that we can access that state across all the components
* Mainly there is 3 concepts
* store(It is global state that is accessible in any components )
* Actions - Should define the action to the state
* Reducers - essentially takes an action depending on type action it will going to update in store
* Before taking an action or updating the data redux will take copy of data and will update the data
* React by default cannot talk with redux first we have to connect provider and then connect our store 
  and entire redux state to react
* In App.tsx or Index.tsx we have to import provider from redux
*/

import { createSlice } from '@reduxjs/toolkit'

/* State 1 */
interface CounterState {
  value: number
}
/* State 2 */
const initialState: CounterState = {
  value: 0
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    }
  }
})

export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer
