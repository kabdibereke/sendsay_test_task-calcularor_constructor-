import eyeActive from '../../assets/eye-active.svg'
import selector from '../../assets/selector-active.svg'
import eye from '../../assets/eye.svg'
import selectorActive from '../../assets/selector.svg'
import { AppDispatch, RootState } from '../../store'
import {useDispatch,useSelector} from 'react-redux'
import { changeSelect } from '../../store/slices/selectSlice'

const Select = () => {
  const {select}  = useSelector( (item:RootState) =>item.selected)
  const dispatch = useDispatch<AppDispatch>()

  const renderSelect =(img:string, imgActive:string, selectType:string )=> {
    return (
      <>
      {select ==selectType? 
       <div className='flex items-center gap-[11px] rounded-[5px] p-[12px] bg-white cursor-pointer'>
            <img src={imgActive} alt="eye" />
            <p>{selectType[0].toUpperCase() + selectType.slice(1)}</p>
        </div>: 
        <div className='flex items-center gap-[11px] p-[12px] cursor-pointer' onClick={()=>dispatch(changeSelect(selectType))}>
            <img src={img} alt="eye" />
            <p>{selectType[0].toUpperCase() + selectType.slice(1)}</p>
        </div>}
      </>
    )
  }
  return (
    <div className='w-[243px] h-[38px] bg-[#F3F4F6] rounded-[6px] flex p-[1px] justify-between'>
          {renderSelect(eye, eyeActive, 'runtime')}
          {renderSelect(selector, selectorActive, 'constructor')}
           
    </div>
  )
}

export default Select