import cn from 'classnames';
import { ButtonProps } from './Button.props'


const Buttons = ({children, appearance,block=false, className, ...props}:ButtonProps) => {
    const styles= !block?  
    'duration-150 hover:border-[#5D5FEF] hover:duration-150'
        : 'cursor-move'
  return (
    <>
    {appearance == 'white' && 
    <button  className={cn(className,"bg-white border-solid border-[#E2E3E5] border rounded-[6px]", styles)}    {...props}>
        {children}
    </button>}
    {appearance == 'blue' && 
    <button  className={'w-[232px] h-[64px] bg-[#5D5FEF] text-white rounded-[6px]' } {...props}>
        {children}
    </button>}
    </>
  )
}

export default Buttons