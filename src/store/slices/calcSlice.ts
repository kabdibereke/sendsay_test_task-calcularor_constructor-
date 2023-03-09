import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IElement } from '../../interface/interface'


interface ICalc {
    memoryValue:string[]
    displayValue: string[]
}

const initialState: ICalc = {
    memoryValue:[],
    displayValue:[]
}

export const CalcSlice = createSlice({
  name: 'calc',
  initialState,
  reducers: {
        addMemoryValue: (state, action)=> {
            if(state.memoryValue.length==0) {
                if(action.payload=='.' ||action.payload=='/' || action.payload=='*'|| action.payload=='-' || action.payload=='+' ) {
                    return
                }
            }
            if(state.memoryValue[0]=='/' || state.memoryValue[0]=='*' || state.memoryValue[0]=='-' ||  state.memoryValue[0]=='+' || state.displayValue[0]=='.' ) {
                state.memoryValue.shift()
            }
            if( state.memoryValue[state.memoryValue.length-1]=='.') {
                if(action.payload=='.') {
                    return
                }
            }
            state.memoryValue.push(action.payload)
        },
        addDisplayValue: (state, action)=> {
            if(state.displayValue.length==0) {
                if(action.payload=='.' ||action.payload=='/' || action.payload=='*'|| action.payload=='-' || action.payload=='+' ) {
                    return
                }
             
            }
            if(state.displayValue[0]=='0') {
                if(action.payload!=='.') {
                    state.displayValue.shift()
                }
            }
            if(state.displayValue[0]=='/' || state.displayValue[0]=='*' || state.displayValue[0]=='-' ||  state.displayValue[0]=='+' || state.displayValue[0]=='.' ) {
                state.displayValue.shift()
            }
            if( state.displayValue[state.displayValue.length-1]=='.') {
                if(action.payload=='.') {
                    return
                }
            }
            state.displayValue.push(action.payload)
            
        },
        removeDisplayValue: (state,action) => {
           if(action.payload=='/' || action.payload=='*' || action.payload=='-' || action.payload=='+' ) {
            state.displayValue=[]
           }
        },
        removeMemoryValue:(state)=> {
            state.memoryValue=[]
        }
        
  },
  
  
})

export const { addMemoryValue,addDisplayValue,removeDisplayValue,removeMemoryValue} = CalcSlice.actions

export default CalcSlice.reducer