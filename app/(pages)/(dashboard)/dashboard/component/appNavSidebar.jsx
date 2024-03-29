'use client'
import { useMediaQuery } from "react-responsive";
import { useState } from 'react'

const AppNavSidebar = (props) => {
    const xl = useMediaQuery({ maxWidth: 1280 });
    const [isHover , setIsHover ] = useState(false)

    return (
        <button onClick={props.onClick} onMouseEnter={()=>{setIsHover(true)}} onMouseLeave={()=>{setIsHover(false)}} className={`  w-[100%] flex items-center gap-[20px] ${props.isDrawer ? 'justify-left pl-[12%]' : xl ? 'justify-center' : 'justify-left pl-[12%]'} ${ props.onlyButton ? 'text-TEXT-1 ' : props.active == true ? 'bg-gradient-to-br from-PRIMARY-500 to-PRIMARY-300 text-TEXT-5 ' : ' text-TEXT-1 hover:bg-gradient-to-br from-PRIMARY-500 to-PRIMARY-300 hover:text-TEXT-5 '}`}>
            <img className={`w-[22px] h-[22px] ${xl ? 'my-[12px]' : ''}`} src={`/images/icon/${props.active ? props.iconWhite : props.onlyButton ? props.icon : isHover ? props.iconWhite : props.icon}`}/>
            {
                props.isDrawer ? 
                <p className='py-[12px] px-[12px] font-poppins font-[500]'>
                    {props.text}
                </p> 
                : 
                xl ? null 
                :      
                <p className='py-[12px] font-poppins font-[500]'>
                    {props.text}
                </p> 
            }
        </button> 
    )
}

export default AppNavSidebar