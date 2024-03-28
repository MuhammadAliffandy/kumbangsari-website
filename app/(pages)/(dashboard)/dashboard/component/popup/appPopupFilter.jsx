import { Popover } from 'react-tiny-popover';
import Box from '@mui/material/Box';
import AppCheckBox from '@/app/components/appCheckBox/appCheckBox'
import AppCustomButton from '@/app/components/appButton/appCustomButton';
import { useState } from 'react';

const AppPopupFilter = (props) => {
    const [open, setOpen] = useState(false);
    const [product , setProduct ] = useState([])
    const [platform , setPlatform ] = useState([])
    
    let allCheckbox = {product:[],platform:[]};

    const arrPop = (array, valueToDelete) => {
        let index = array.indexOf(valueToDelete);
        if (index !== -1) {
            array.splice(index, 1);
        }
        return array
    }

    const handleCheckPlatform = (value , label) => {
        if(value === ''){
            setPlatform(arrPop(platform ,label))
        }else{
            platform.push(value);
        }
        
        allCheckbox.platform = platform
        props.onCheckPlatform(allCheckbox)
    }
    const handleCheckProduct = (value , label) => {
        if(value === ''){
            setProduct(arrPop( product ,label))
        }else{
            product.push(value);
        }
        allCheckbox.product = product
        props.onCheckProduct(allCheckbox)
    }

    return (
        <Popover
            isOpen={open}
            positions={[ 'right', 'bottom']}
            containerStyle={{ zIndex: 1300 , paddingRight: '2%', paddingTop: '1%'}}
            onClickOutside={()=> setOpen(false)}
            align="center"
            content={
                <Box  onMouseLeave={() => 
                        {
                            allCheckbox = {product:[],platform:[]};
                            setOpen(false)
                        }
                } className = {`w-auto h-auto rounded-[20px] bg-white p-[20px] flex flex-col gap-[15px] border-[2px] border-TEXT-1 shadow-xl`}>
                    <Box className = 'flex flex-col gap-[10px]'>
                        <label className='text-black font-semibold'>Produk</label>
                        <Box className ='flex gap-[40px]'>
                            {
                                props.product.map(data => {
                                    return(
                                        <AppCheckBox
                                            value= {data.text}
                                            label = {data.text}
                                            onChange= {(value , label)=>{
                                                handleCheckProduct(value,label)
                                            }}
                                        />
                                    )
                                })
                            }
                        </Box>
                    </Box>
                    <Box  className = 'flex flex-col gap-[10px]'>
                        <label className='text-black font-semibold'>Platform</label>
                        <Box className ='flex gap-[80px]'>
                            <AppCheckBox
                                value= 'instagram'
                                label = 'Instagram'
                                onChange= {(value , label)=>{
                                    handleCheckPlatform(value,label)
                                }}
                            />
                            <AppCheckBox
                                value= 'facebook'
                                label = 'Facebook'
                                onChange= {(value , label)=>{
                                    handleCheckPlatform(value,label)
                                }}
                            />
                            <AppCheckBox
                                value= 'twitter'
                                label = 'Twitter'
                                onChange= {(value , label)=>{
                                    handleCheckPlatform(value,label)
                                }}
                            />
                        </Box>
                    </Box>
                    
                </Box>
            }>
            <div className='relative'>
                <AppCustomButton className='flex gap-[10px] items-center bg-white rounded-[20px] px-[15px] py-[5px] border-[1px] border-TEXT-4' onMouseEnter={()=>{
                    setOpen(true)
                }}>
                        <img className='w-[18px] h-[18px] ' src={'/images/icon/filter.png'}/>
                        <p className="text-TEXT-1 font-bold text-[14px]">Filter</p>
                </AppCustomButton>
            </div>
    </Popover>
    )
}

export default AppPopupFilter;
