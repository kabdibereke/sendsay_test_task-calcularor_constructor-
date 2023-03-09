import Canvas from '../components/Canvas/Canvas'
import Select from '../components/Select/Select'
import Sidebar from '../components/Sidebar/Sidebar'
import { RootState } from '../store' 
import {useSelector} from 'react-redux'

const Main = () => {
 const {select}  = useSelector( (item:RootState) =>item.selected)
  return (
   <>
    <div className='relative flex justify-between'>
        {select=='constructor' &&  <Sidebar/>}
         <div className='absolute right-0'>
          <Select/>
          <Canvas  />
         </div>
    </div>
   </>
  )
}

export default Main