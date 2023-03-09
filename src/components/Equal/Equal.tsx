import Buttons from "../Buttons/Buttons"
import { AppDispatch, RootState } from '../../store'
import {useDispatch,useSelector} from 'react-redux'
import { isDropEqual } from '../../store/slices/dropSlice'
import { removeElements } from '../../store/slices/canvasSlice'
import { useDrag, useDrop } from "react-dnd"
import { Item } from "../../interface/interface"
import { SortElement } from "../../context/context"
import { addDisplayValue, addMemoryValue, removeDisplayValue, removeMemoryValue } from "../../store/slices/calcSlice"

const Equal = () => {
  const {equalIsDrop}  = useSelector( (item:RootState) =>item.dropList)
  const dispatch = useDispatch<AppDispatch>()
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'element',
    item: {id:4},
    end: (item, monitor) => {
      const dropResult = monitor.didDrop()
      dispatch(isDropEqual(dropResult))
      
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))
  const styles = equalIsDrop? 
  'relative opacity-50 cursor-not-allowed' 
  : 'shadow-md cursor-move'
  return (
    <div className={'bg-white w-[240px] h-[72px]  rounded-[4px]  p-[4px] ' + styles}  ref={!equalIsDrop? drag: null} data-testid={`element`}  >
        <div className='absolute z-[100] w-[240px] h-[72px]  bg-transparent'></div>
        <Buttons block={true} appearance="blue">=</Buttons>
    </div>
  )
}

export default Equal

export const EqualDropped = () => {
  const {equalIsDrop}  = useSelector( (item:RootState) =>item.dropList)
  const {displayValue,memoryValue}  = useSelector( (item:RootState) =>item.calc)
  const dispatch = useDispatch<AppDispatch>()
  const {select}  = useSelector( (item:RootState) =>item.selected)
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(select=='constructor') {
      if (event.detail === 2) {
        dispatch(isDropEqual(false))
        dispatch(removeElements(4))
      }
      
    }
  };
  const id ='4'
  //@ts-ignore
  const {findItem, moveItem}=SortElement()
  const originalIndex = findItem(id).index
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'card',
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          moveItem(droppedId, originalIndex)
        }
      },
    }),
    [id, originalIndex, moveItem],
  )

  const [, drop] = useDrop(
    () => ({
      accept: 'card',
      hover({ id: draggedId }: Item) {
        if (draggedId !== id) {
          const { index: overIndex } = findItem(id)
          moveItem(draggedId, overIndex)
        }
      },
    }),
    [findItem, moveItem],
  )
  const handleCalc =()=> {
    dispatch(removeDisplayValue('/'))
    
    const result = memoryValue.join('')
    if(result[0]=='0' && result[1]=='/') {
      dispatch(addDisplayValue(['Не определено']))
    }
    dispatch(addDisplayValue([eval(result).toString()]))
    dispatch(removeMemoryValue())
  }
  return (
   <>
   {equalIsDrop &&  
    <div ref={(node) => drag(drop(node))} className={'relative bg-white w-[240px] h-[72px]  mb-[12px] rounded-[4px] shadow-md p-[4px]' + (select=='constructor' ? ' cursor-move': '')}  onClick={handleClick} >
        {select=='constructor' &&   <div className='absolute z-[100] w-[240px] h-[72px]  bg-transparent'></div>}
        <Buttons onClick={handleCalc} appearance="blue">=</Buttons>
    </div>}
   </>
  )
}

