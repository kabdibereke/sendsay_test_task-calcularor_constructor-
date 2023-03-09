
import { useDrag, useDrop } from 'react-dnd'
import Buttons from '../Buttons/Buttons'
import { AppDispatch, RootState } from '../../store'
import {useDispatch,useSelector} from 'react-redux'
import { isDropOB } from '../../store/slices/dropSlice'
import { removeElements } from '../../store/slices/canvasSlice'
import { SortElement } from '../../context/context'
import { Item } from '../../interface/interface'
import { addDisplayValue, addMemoryValue, removeDisplayValue } from '../../store/slices/calcSlice'

const OperationButtons = () => {
    const ob = ['/', 'х', '-', '+']
    const {obIsDrop}  = useSelector( (item:RootState) =>item.dropList)
    const dispatch = useDispatch<AppDispatch>()
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'element',
      item: {id:3},
      end: (item, monitor) => {
        const dropResult = monitor.didDrop()
        dispatch(isDropOB(dropResult))
        
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }))
    const styles = obIsDrop? 
    'relative  opacity-50  cursor-not-allowed' 
    : 'shadow-md  cursor-move'
  return (
    <div className={'bg-white w-[240px] h-[60px]  rounded-[4px]  p-[4px] '+styles} ref={!obIsDrop? drag: null} data-testid={`element`} >
        <div className='absolute z-[100] w-[240px] h-[60px] bg-transparent'></div>
        <div className='w-full h-full  rounded-[6px] flex justify-between'>
        {ob.map((item,index)=> {
            return  <Buttons className='w-[52px] h-[48px]' block={true} key={index} appearance='white'>{item}</Buttons>
        })}
        </div>
    </div>
  )
}

export default OperationButtons


export const OperationButtonsDroped = () => {
  const ob = ['/', 'х', '-', '+']
  const {obIsDrop}  = useSelector( (item:RootState) =>item.dropList)
  const {displayValue,memoryValue}  = useSelector( (item:RootState) =>item.calc)
    const dispatch = useDispatch<AppDispatch>()
    const {select}  = useSelector( (item:RootState) =>item.selected)
    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if(select =='constructor') {
        if (event.detail === 2) {
          dispatch(isDropOB(false))
          dispatch(removeElements(3))
        }
      }
    };
    const id ='3'
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
  const handleCalc =(item:string)=> {
    if(item=='х') {
      item='*'
    }
    if(memoryValue.length==0 && displayValue.length!==0) {
      dispatch(removeDisplayValue('/'))
    }
    dispatch(removeDisplayValue(item))
    dispatch(addMemoryValue(item))
    dispatch(addDisplayValue(item))

  }
return (
  <>
    {obIsDrop && 
    <div ref={(node) => drag(drop(node))} className={'bg-white w-[240px] h-[60px]  mb-[12px] rounded-[4px] shadow-md p-[4px]' + (select=='constructor'? ' cursor-move': '')} onClick={handleClick} >
        {select=='constructor' &&  <div className='absolute z-[100] w-[240px] h-[60px] bg-transparent'></div>}
        <div className='w-full h-full  rounded-[6px] flex justify-between'>
        {ob.map((item,index)=> {
            return  <Buttons className='w-[52px] h-[48px]' onClick={()=>handleCalc(item)} key={index} appearance='white'>{item}</Buttons>
        })}
        </div>
    </div>}
  </>
)
}