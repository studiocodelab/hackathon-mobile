import { createSlice, configureStore } from "@reduxjs/toolkit"

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    sessionId: ''
  },
  reducers: {
        incremented: state => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.value += 1
        },
        decremented: state => {
        state.value -= 1
        },
        increaseBy: (state, action) => {
            state.value += action.payload
        },
        setSessionId: (state, action) => {
          state.sessionId = action.payload
        }
    }
})

export const { incremented, decremented, increaseBy, setSessionId } = counterSlice.actions

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
})

export {store};