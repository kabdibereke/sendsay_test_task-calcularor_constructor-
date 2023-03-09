import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface ISelect {
    select: 'runtime' | 'constructor'
}

const initialState: ISelect = {
    select: 'constructor' 
}

export const SelectSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    changeSelect: (state, action) => {
       state.select = action.payload
    },
    
  },
  
  
})


export const { changeSelect} = SelectSlice.actions

export default SelectSlice.reducer