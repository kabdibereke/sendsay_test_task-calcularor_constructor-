import { useDrag, useDrop } from 'react-dnd'
import Buttons from '../Buttons/Buttons'
import { AppDispatch, RootState } from '../../store'
import {useDispatch,useSelector} from 'react-redux'
import { isDropNumBlock } from '../../store/slices/dropSlice'
import { removeElements } from '../../store/slices/canvasSlice'
import { Item } from '../../interface/interface'
import { SortElement } from '../../context/context'
import { addDisplayValue, addMemoryValue, removeDisplayValue } from '../../store/slices/calcSlice'




const NumBlock = () => {
  const nb = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3']]
  const {numBlockIsDrop}  = useSelector( (item:RootState) =>item.dropList)
  const dispatch = useDispatch<AppDispatch>()
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'element',
    item: {id:2},
    end: (item, monitor) => {
      const dropResult = monitor.didDrop()
      dispatch(isDropNumBlock(dropResult))
      
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))
  const styles = numBlockIsDrop? 
  'relative opacity-50  p-[4px] cursor-not-allowed ' 
  : 'shadow-md p-[4px] cursor-move'
  return (
    <div className={'bg-white w-[240px] h-[224px]  rounded-[4px]'+ styles} ref={!numBlockIsDrop? drag: null}  data-testid={`element`}>
        <div className='absolute z-[100] w-[240px] h-[224px]  bg-transparent'></div>
        <div className='w-full h-full  rounded-[6px] flex flex-wrap justify-between'>
          {nb[0].map((item, index)=> {
        return <Buttons className='w-[72px] h-[48px]'  key={index} block={true} appearance='white'>{item}</Buttons>
        })}
          {nb[1].map((item, index)=> {
        return <Buttons className='w-[72px] h-[48px]'  key={index} block={true} appearance='white'>{item}</Buttons>
        })}
           {nb[2].map((item, index)=> {
        return <Buttons className='w-[72px] h-[48px]'  key={index} block={true} appearance='white'>{item}</Buttons>
        })}
        <Buttons block={true} className='w-[152px] h-[48px]' appearance='white'>0</Buttons>
        <Buttons  block={true} className='w-[72px] h-[48px]' appearance='white'>,</Buttons>
        </div>
    </div>
  )
}

export default NumBlock


export const NumBlockDropped = () => {
    const nb = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3']]
    const {numBlockIsDrop}  = useSelector( (item:RootState) =>item.dropList)
    const {displayValue,memoryValue}  = useSelector( (item:RootState) =>item.calc)
    const dispatch = useDispatch<AppDispatch>()
    const {select}  = useSelector( (item:RootState) =>item.selected)
    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if(select  == 'constructor' ) {
        if (event.detail === 2) {
          dispatch(isDropNumBlock(false))
          dispatch(removeElements(2))
        }
      }
    };
  const id ='2'
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
    if(memoryValue.length==0 && displayValue.length!==0) {
      dispatch(removeDisplayValue('/'))
    }
    dispatch(removeDisplayValue(item))
    dispatch(addMemoryValue(item))
    dispatch(addDisplayValue(item))

  }
    return (
      <>
      {numBlockIsDrop && <div  ref={(node) => select=='constructor' &&  drag(drop(node))}  className={'bg-white w-[240px] h-[224px]  mb-[12px] rounded-[4px] shadow-md p-[4px]' + (select=='constructor' ? ' cursor-move': '')} onClick={handleClick} >
          {select=='constructor' && <div className='absolute z-[100] w-[240px] h-[224px]  bg-transparent'></div>}
          <div className='w-full h-full  rounded-[6px] flex flex-wrap justify-between'>
              {nb[0].map((item, index)=> {
                  return <Buttons className='w-[72px] h-[48px]' onClick={()=>handleCalc(item)} key={index} appearance='white'>{item}</Buttons>
              })}
              {nb[1].map((item, index)=> {
                  return <Buttons className='w-[72px] h-[48px]' onClick={()=>handleCalc(item)} key={index} appearance='white'>{item}</Buttons>
              })}
               {nb[2].map((item, index)=> {
                  return <Buttons className='w-[72px] h-[48px]'  onClick={()=>handleCalc(item)} key={index} appearance='white'>{item}</Buttons>
              })}
              <Buttons className='w-[152px] h-[48px]' onClick={()=>handleCalc('0')} appearance='white'>0</Buttons>
              <Buttons className='w-[72px] h-[48px]' onClick={()=>handleCalc('.')} appearance='white'>,</Buttons>
          </div>
      </div>}
      </>
    )
  }