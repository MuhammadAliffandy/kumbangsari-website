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
import AppCheckBox from '@/app/components/appCheckBox/appCheckBox';

const AppModalFacebookPage = (props) => {

    const userSubscription = useSelector(state => state.userSubscription.value)
    const idSelection = userSubscription <= 2 ? 1 : 3

    const [facebookPageData , setFacebookPageData] = useState([
        {
            id: '1',
            name: 'planify_page',
            picture: {data : {url: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT3qC0FVMOhymoD83Zex88_huxxIiT9ZwCI1ed0GjTyW8B29bOp'}}
        },
        {
            id: '1',
            name: 'planify_page',
            picture: {data : {url: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT3qC0FVMOhymoD83Zex88_huxxIiT9ZwCI1ed0GjTyW8B29bOp'}}
        },
        {
            id: '1',
            name: 'planify_page',
            picture: {data : {url: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT3qC0FVMOhymoD83Zex88_huxxIiT9ZwCI1ed0GjTyW8B29bOp'}}
        },
    ])

    // const getUserFacebookPage = async () => {
    //     const res = await getProductByUser();
    //     if(res.status = 'OK'){
    //         setFacebookPageData(res.data)
    //     }
    // }

    // useEffect(() => {
    //     getUserFacebookPage()
    // },[props.open])


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
                            <p className = 'text-[12px] font-bold text-black' >Pilih halaman Facebook untuk dihubungkan!</p>
                            <Grid container  justifyContent="flex-center" alignItems="flex-center" spacing={2} className="w-[100%]" >
                                {
                                    facebookPageData.length > 0 ? 
                                    facebookPageData.map((data,index) => {
                                        return (
                                            <Grid key={index} xs={12} item>
                                                        <Box className="flex justify-between p-[10px] rounded-[15px] bg-NEUTRAL-100">
                                                            <Box className='flex gap-[15px] items-center'>
                                                                <img src={data.picture.data.url} alt='facebook-page-image' className='w-[50px] h-[50px] object-cover rounded-[100%]' />
                                                                <p className='text-[14px] text-black font-poppins'>{data.name ||'Page Name'}</p>
                                                            </Box>
                                                            <AppCheckBox
                                                                value= {'true'}
                                                                checked={false}
                                                                label={''}
                                                                onChange= {(value , label)=>{
                                                    
                                                                }}
                                                            />
                                                        </Box>
                                                </Grid>
                                        )
                                    }) 
                                    :
                                    
                                    <div className="w-[100%] h-[100px] px-[20px] ">
                                        <Skeleton count={5} className="w-[200px] h-auto"/>
                                    </div>


                                }
                            </Grid>
                            <Box className='flex justify-end'>
                                <AppButton
                                    className='w-[30%] py-[10px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[18px]'
                                    text={'Simpan'} 
                                    type = {'button'}
                                    onClick={()=>{
                                    }}
                                />
                            </Box>
                        </Box>
                        
                    </Box>
                </motion.div>
        </Modal>
    )
}

export default AppModalFacebookPage;