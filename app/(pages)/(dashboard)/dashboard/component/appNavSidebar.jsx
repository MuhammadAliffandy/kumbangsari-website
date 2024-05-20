'use client'
import { useMediaQuery } from "react-responsive";
import { useState } from 'react'
import Link from "next/link";

const AppNavSidebar = (props) => {
    const xl = useMediaQuery({ maxWidth: 1280 });
    const [isHover , setIsHover ] = useState(false)

    return (
        <Link href={`${props.urlNavigation ? props.urlNavigation : "#"}`} onClick={props.onClick} onMouseEnter={()=>{setIsHover(true)}} onMouseLeave={()=>{setIsHover(false)}} className={`  w-[100%] flex items-center gap-[20px] 
            ${props.isDrawer ? 'justify-left pl-[12%]' : xl ? 'justify-center' : 'justify-left pl-[12%]'} 
            ${ props.onlyButton ? 'text-TEXT-1 ' : 
            props.active == true & props.child == true ? 
            ' text-PRIMARY-500 ' :
            props.active == false & props.child == true ? 
            ' text-TEXT-1 ' :
            props.active == true ?
        'bg-gradient-to-br from-PRIMARY-500 to-PRIMARY-300 text-TEXT-5 ' : 
        ' text-TEXT-1 hover:bg-gradient-to-br from-PRIMARY-500 to-PRIMARY-300 hover:text-TEXT-5 '}`}>
            { props.icon == null ? <p className="px-[10px] font-bold text-[10px]">.</p> : <img className={`w-[22px] h-[22px] ${xl ? 'my-[12px]' : ''}`} src={`/images/icon/${!props.isSubscription ? `${props.icon.split('.png')[0]}-grey.svg` :  props.active ? props.iconWhite : props.onlyButton ? props.icon : isHover ? props.iconWhite : props.icon}`}/>}
            <div className={`flex items-center gap-[10px] ${props.isSubscription ? '': 'text-TEXT-4' }`}>
                {
                    props.isDrawer ? 
                    <p className='py-[12px] px-[12px] font-poppins font-[500] xl:hidden'>
                        {props.text}
                    </p> 
                    : 
                    xl ? null 
                    :      
                    <p className='py-[12px] font-poppins font-[500]'>
                        {props.text}
                    </p> 
                }
                {
                    props.isSubscription ? null : <img className="w-[12px] h-[12px]" src='/images/icon/lock.svg'/>
                }
            </div>
        </Link> 
    )
}

export default AppNavSidebar