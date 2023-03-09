import Display from '../Display/Display'
import Equal from '../Equal/Equal'
import NumBlock from '../NumBlock/NumBlock'
import OperationButtons from '../OperationButtons/OperationButtons'

const Sidebar = () => {
  return (
    <div className='flex gap-[12px] flex-col mt-[68px] '>
        <Display />
        <OperationButtons/>
        <NumBlock/>
        <Equal/>
    </div>
  )
}

export default Sidebar