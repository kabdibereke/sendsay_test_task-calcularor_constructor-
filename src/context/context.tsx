import {createContext, useContext, useEffect,useState,useCallback, ReactNode}from 'react'
import { useDrop } from 'react-dnd'
import update from 'immutability-helper'

import {useSelector} from 'react-redux'
import { IElement } from '../interface/interface'
import { RootState } from '../store'
interface Props {
  children :ReactNode
}
//@ts-ignore
const SortContext =createContext()
export function SortContextProvider({children}:Props) {
    const [items,setItems]= useState<IElement[]>([])
    const {elements}  = useSelector( (item:RootState) =>item.elementList)
    useEffect(()=> {
      setItems(elements)
    },[elements])

    const findItem = useCallback(
      (id: string) => {
        const item = items.filter((c) => `${c.id}` === id)[0] as IElement
        return {
          item,
          index: items.indexOf(item),
        }
      },
      [items],
    )
    const moveItem = useCallback(
      (id: string, atIndex: number) => {
        const { item, index } = findItem(id)
        setItems(
          update(items, {
            $splice: [
              [index, 1],
              [atIndex, 0, item],
            ],
          }),
        )
      },
      [findItem, items, setItems],
    )
    const [, drop] = useDrop(() => ({ accept: 'card' }))
    return (
        <SortContext.Provider value={{findItem, moveItem, drop, items}}>
            {children}
        </SortContext.Provider>

    )
}

export function SortElement(){
    return useContext(SortContext)
}