'use client'
import { useState } from 'react'

const AppNavSidebar = (props) => {
    const [isHover , setIsHover ] = useState(false)

    return (
        <button onClick={props.onClick} onMouseEnter={()=>{setIsHover(true)}} onMouseLeave={()=>{setIsHover(false)}} className={`  w-[100%] flex items-center gap-[20px] justify-left pl-[12%] ${ props.onlyButton ? 'text-TEXT-1 ' : props.active == true ? 'bg-gradient-to-br from-PRIMARY-500 to-PRIMARY-300 text-TEXT-5 ' : ' text-TEXT-1 hover:bg-gradient-to-br from-PRIMARY-500 to-PRIMARY-300 hover:text-TEXT-5 '}`}>
            <img className='w-[22px] h-[22px]' src={`/images/icon/${props.active ? props.iconWhite : props.onlyButton ? props.icon : isHover ? props.iconWhite : props.icon}`}/>
            <p className='py-[12px] font-poppins font-medium'>
                {props.text}
            </p>
        </button> 
    )
}

export default AppNavSidebar