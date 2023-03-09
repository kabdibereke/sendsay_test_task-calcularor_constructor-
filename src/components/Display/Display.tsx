
import { useDrag, useDrop } from 'react-dnd'
import { AppDispatch, RootState } from '../../store'
import {useDispatch,useSelector} from 'react-redux'
import { isDropDisplay } from '../../store/slices/dropSlice'
import { removeElements } from '../../store/slices/canvasSlice'
import { SortElement } from '../../context/context'
import { Item } from '../../interface/interface'
const Display = () => {
  const {displayIsDrop}  = useSelector( (item:RootState) =>item.dropList)
  const dispatch = useDispatch<AppDispatch>()
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'element',
    item: {id:1},
    end: (item, monitor) => {
      const dropResult = monitor.didDrop()
      dispatch(isDropDisplay(dropResult))
      
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
   
  }))
  const classes = displayIsDrop? 
  'relative opacity-50 cursor-not-allowed' 
  : 'shadow-md  cursor-move'
 
  return (
    <div className={'bg-white w-[240px] h-[60px]  rounded-[4px] p-[4px] '+classes} ref={!displayIsDrop? drag: null}    data-testid={`element`} >
         <div className='absolute z-[100] w-[240px] h-[60px]  bg-transparent'></div>
        <div className='w-full h-full  bg-[#F3F4F6] rounded-[6px] flex  justify-end '>
            <p className=" text-[#111827] font-extrabold text-3xl self-center pr-[8px]">0</p>
        </div>
    </div>
  )
}

export default Display

export const DisplayDropped = () => {
 
  const {displayIsDrop}  = useSelector( (item:RootState) =>item.dropList)
  const {displayValue}  = useSelector( (item:RootState) =>item.calc)
  const {select}  = useSelector( (item:RootState) =>item.selected)
  const dispatch = useDispatch<AppDispatch>()
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(select=='constructor') {
      if (event.detail === 2) {
        dispatch(isDropDisplay(false))
        dispatch(removeElements(1))
      }
    }
  };
  const id ='1'
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
  console.log(displayValue.join('').substring(0,13))
  return (
   <>
   {displayIsDrop &&  
   <div  ref={(node) => select=="constructor" && drag(drop(node))} className={'relative bg-white w-[240px] h-[60px]  mb-[12px] rounded-[4px] shadow-md p-[4px]'+ (select=='constructor' ? ' cursor-move':'')} onClick={handleClick}  >
        {select=='constructor' &&   <div className='absolute z-[100] w-[240px] h-[60px]  bg-transparent'></div>}
        <div className='w-full h-full  bg-[#F3F4F6] rounded-[6px] flex  justify-end '>
            <p className={"text-[#111827] font-extrabold text-3xl self-center pr-[8px]"+ (displayValue.join('').substring(0,13)!=='Не определено'? ' text-3xl' : ' text-2xl') }>{displayValue.join('').substring(0,13)!=='Не определено' ? displayValue.join('').substring(0,4): displayValue.join('').substring(0,13) }</p>
        </div>
    </div>}
   </>
  )
}