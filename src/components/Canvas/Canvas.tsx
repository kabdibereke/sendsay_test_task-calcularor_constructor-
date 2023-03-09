import { useDrop } from 'react-dnd'
import addIcon from '../../assets/addIcon.png'
import  { DisplayDropped } from '../Display/Display'
import { NumBlockDropped } from '../NumBlock/NumBlock'
import { AppDispatch, RootState } from '../../store'
import {useDispatch,useSelector} from 'react-redux'
import { addElement } from '../../store/slices/canvasSlice'
import { OperationButtonsDroped } from '../OperationButtons/OperationButtons'
import { EqualDropped } from '../Equal/Equal'
import { SortElement } from '../../context/context'
const initialItems = [
  {id:1, element: <DisplayDropped/>},
  {id:2, element: <NumBlockDropped/>},
  {id:3, element: <OperationButtonsDroped/>},
  {id:4, element: <EqualDropped/>},
]

const Canvas = () => {
  //@ts-ignore
  const {items}=SortElement()
  const {elements}  = useSelector( (item:RootState) =>item.elementList)
  const dispatch = useDispatch<AppDispatch>()
 
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'element',
    drop: (item:any) => addElementToCanvas(item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))
  const addElementToCanvas =(id:number)=> {
    const elementList = initialItems.filter((item) => id === item.id);
    dispatch(addElement(elementList[0]));
  }
  
  const isActive = canDrop && isOver
  let backgroundColor = 'white'
  if (isActive) {
    backgroundColor = '#F0F9FF'
  } 
  const styles = elements.length==0?  
  'items-center justify-center ' 
  : ''
  return (
    <div className={'w-[243px] h-[448px] border-dashed border-[2px] border-[#C4C4C4] rounded-[6px] mt-[30px] flex flex-col ' + styles} ref={drop} style={{ backgroundColor }} data-testid="dustbin">
       {elements.length==0 && 
        <div className='w-[127px] h-[81px] flex flex-col items-center ' >
          <img className='w-[18px] h-[18px] mb-[12px]' src={addIcon} alt="image" />
          <p className='font-medium leading-[17px] text-[#5D5FEF] mb-[4px]'>Перетащите сюда</p>
          <p className='w-[106px] text-[12px] text-center text-[#6B7280]'>любой элемент из левой панели</p>
        </div>}
        {items.map((element:any) => {
          return  (<>
             {element.element}
          </> );
        })}
    </div>
  )
}

export default Canvas