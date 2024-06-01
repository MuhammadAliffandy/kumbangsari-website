import { motion } from 'framer-motion';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import AppButton from '@/app/components/appButton/appButton'
import Grid from '@mui/material/Grid'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton'
import AppAnimationButton from '@/app/components/appAnimation/appAnimationButton';
import Skeleton from 'react-loading-skeleton';
import { listPlatform } from '@/app/utils/model';
import { useSelector } from 'react-redux';
import { useState , useEffect } from 'react';
import { getProductByUser } from '@/app/api/repository/productRepository';
import { toast } from 'react-toastify';

const AppModalProductList = (props) => {

    const userSubscription = useSelector(state => state.userSubscription.value)
    const idSelection = userSubscription <= 2 ? 1 : 3

    const [productData , setProductData] = useState([])

    const getUserProduct = async () => {
        const res = await getProductByUser();
        if(res.status = 'OK'){
            setProductData(res.data)
        }
    }

    useEffect(() => {
        getUserProduct()
    },[props.open])


    return(
        <Modal 
            open={props.open}
            className='flex flex-col justify-center items-center'
        >
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className = 'w-[40%] h-auto rounded-[20px] bg-white p-[20px] '>
                    <Box  className='flex flex-col gap-[25px]'>
                        <Box className = 'flex justify-between'>
                            <p className = 'text-[16px] font-bold text-black' >Silahkan Pilih Produk</p>
                            <AppCloseButton
                                onClick = {()=>{
                                    props.onCloseButton(false)
                                }}
                            />
                        </Box>
                        
                        <Box className='flex flex-col gap-[10px]'>
                            {/*  */}
                            <Grid container  justifyContent="flex-center" alignItems="flex-center" spacing={2} className="w-[100%]" >
                                {
                                    productData.length > 0 ? 
                                    productData.map((data,index) => {
                                        return (
                                            <Grid key={index} xs={12} item>
                                                    <AppAnimationButton className='w-auto cursor-pointer'>
                                                        <Box onClick={()=>{
                                                            if(index < idSelection){ 
                                                                props.onClick(productData[index])
                                                            }else{
                                                                toast.warn('Upgrade ke Premium untuk Mengakses')
                                                            }

                                                            }} className={`${index < idSelection ? 'opacity-[100%]' : 'opacity-[20%]'} p-[20px] bg-NEUTRAL-100 rounded-[20px] flex flex-col gap-[8px] hover:shadow-xl`}>
                                                            <Box className='flex flex-col gap-[10px] items-start h-full'>
                                                                <Box className='flex flex-col'>
                                                                    <p className="text-TEXT-1 text-[18px] font-bold">{data.nameProduct}</p>
                                                                    <p className="text-TEXT-1 text-[12px]">{data.category}</p>
                                                                </Box>
                                                                <Box className='flex gap-[10px] h-[25px]'>
                                                                    { data.platform.instagram ? <img className='w-[25px] h-[25px] rounded-[100%]' src={listPlatform.instagram}/> : null}
                                                                    { data.platform.facebook ? <img className='w-[25px] h-[25px] rounded-[100%]' src={listPlatform.facebook}/> : null }
                                                                    { data.platform.twitter ? <img className='w-[25px] h-[25px] rounded-[100%]' src={listPlatform.twitter}/> : null}
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </AppAnimationButton>
                                                </Grid>
                                        )
                                    }) 
                                    :
                                    
                                    <div className="w-[100%] h-[100px] px-[20px] ">
                                        <Skeleton count={5} className="w-[200px] h-auto"/>
                                    </div>

                                }
                            </Grid>
                        </Box>
                        
                    </Box>
                </motion.div>
        </Modal>
    )
}

export default AppModalProductList;