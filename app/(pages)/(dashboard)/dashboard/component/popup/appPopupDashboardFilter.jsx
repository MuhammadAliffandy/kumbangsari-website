import { Popover } from 'react-tiny-popover';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import AppCheckBox from '@/app/components/appCheckBox/appCheckBox'
import AppCustomButton from '@/app/components/appButton/appCustomButton';
import { useState } from 'react';
import AppButton from '@/app/components/appButton/appButton';

const AppPopupFilter = (props) => {
    
    const [open, setOpen] = useState(false);
    const [product , setProduct ] = useState([])
    const [dataProduct , setDataProduct ] = useState([])
    
    let allCheckbox = {product:[],platform:[]};

    const arrPop = (array, valueToDelete) => {
        let index = array.indexOf(valueToDelete);
        if (index !== -1) {
            array.splice(index, 1);
        }
        return array
    }

    const handleCheckProduct = (value , label) => {
        if(value === ''){
            setProduct(arrPop( product ,label))
        }else{
            product.push(value);
        }
        allCheckbox.product = product
   
        setDataProduct(allCheckbox)
        
    }

    return (
        <Popover
            isOpen={open}
            positions={ props.isResponsive ? ['bottom'] : [ 'right', 'bottom']}
            containerStyle={{ zIndex: 1300 , paddingRight: props.isResponsive ? '2%': '2%', paddingTop: '1%'}}
            onClickOutside={()=> setOpen(false)}
            align="center"
            content={
                <motion.div  
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onMouseLeave={() => 
                        {
                            allCheckbox = {product:[],platform:[]};
                            setOpen(false)
                        }
                } className = {`w-auto h-auto rounded-[20px] bg-white p-[20px] flex flex-col gap-[15px] border-[2px] border-TEXT-1 shadow-xl`}>
                    <Box className = 'flex flex-col gap-[10px]'>
                        <label className='text-black font-semibold'>Produk</label>
                        <Box className ='flex gap-[40px]'>
                            {
                                props.product.map((data,index)=> {
                                    return(
                                        <AppCheckBox
                                            key = {index}
                                            value= {data.text}
                                            label = {data.text}
                                            status = {props.listProductCheckbox.indexOf(data.text) > -1 ? 'added' : 'reset'}
                                            onChange= {(value , label)=>{
                                                handleCheckProduct(value,label)
                                            }}
                                        />
                                    )
                                })
                            }
                        </Box>
                        <Box className='w-[100%] flex justify-end'>
                            <AppButton
                                className={'py-[8px] px-[20px] text-[12px] bg-CUSTOM-RED hover:bg-SECONDARY-600 shadow-xl text-white font-poppins rounded-[20px]'}
                                text='Simpan'
                                onClick={()=>{
                                    props.onClick(dataProduct)
                                }}
                            />
                        </Box>
                    </Box>
                    
                    
                </motion.div>
            }>
            <div className='relative'>
                <AppCustomButton className='flex gap-[10px] items-center bg-white rounded-[20px] px-[15px] py-[5px] border-[1px] border-TEXT-4' onClick={()=>{
                    setOpen(!open)
                }}>
                        <img className='w-[18px] h-[18px] ' src={'/images/icon/filter.png'}/>
                        {props.isResponsive ? null : <p className="text-TEXT-1 font-bold text-[14px]">Filter</p>} 
                </AppCustomButton>
            </div>
    </Popover>
    )
}

export default AppPopupFilter;
