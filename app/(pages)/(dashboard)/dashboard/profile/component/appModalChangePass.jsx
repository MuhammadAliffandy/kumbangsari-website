import { motion } from 'framer-motion';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import AppTextField from '@/app/components/appTextField/appTextField'
import AppButton from '@/app/components/appButton/appButton'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton'
import {  validatePassword, } from '@/app/(pages)/(auth)/auth/component/validation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { changePasswordUser } from '@/app/api/repository/userRepository';
import AppToastPending from '@/app/components/AppToastPending/appToastPending';

const AppModalChangePass = (props) => {
    
    const { register, watch ,handleSubmit, formState: { errors } } = useForm();

    const password = watch('password', '');

    const handleChangePassword = async (data) => {
        try {
        
                const dataPass = {
                    oldPassword : data.oldPassword,
                    newPassword : data.password,
                    newConfirmPassword : data.newConfirmPassword
                }


                
                const res = await changePasswordUser(dataPass)
                if(res.status == 'OK'){
                    toast.success('Ubah Password Success')
                    props.onClose(false)
                }

        } catch (error) {
            if(error.status == 404){
                toast.error('Ubah Password Gagal')
            }else{
                toast.error(error.data.message)
            }
        }

    }


    const onSubmit = (data) => {
        AppToastPending(handleChangePassword(data))
    }

    return(
        <Modal 
            open={props.open}
            className='flex flex-col justify-center items-center'
        >
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className = 'w-[80%] xl:w-[60%] h-auto rounded-[20px] bg-white p-[20px] '>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-[25px]'>
                        <Box className = 'flex justify-between'>
                            <p className = 'text-[24px] font-bold text-black' >Ubah Kata Sandi</p>
                            <AppCloseButton
                                onClick = {()=>{
                                    props.onCloseButton(false)
                                }}
                            />
                        </Box>
                        
                        {/*  */}
                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                            <label className='text-black font-semibold'>Kata Sandi</label>
                            <AppTextField
                                    id="oldPassword"
                                    placeholder='Masukkan kata sandi di sini'
                                    type={"password"} 
                                    validationConfig = {register('oldPassword', {
                                        validate : validatePassword
                                    })}
                                    error={Boolean(errors.oldPassword)}
                                    helperText={errors.oldPassword && errors.oldPassword.message}
                                
                                />
                        </Box>
                        {/*  */}
                        <Box>
                            <Box className='flex flex-col xl:flex-row gap-[20px] items-center'> 
                                <Box className='w-[100%] flex flex-col gap-[10px]'>
                                    <label className='text-black font-semibold'>Kata Sandi Baru</label>
                                    <AppTextField
                                        id="password"
                                        placeholder='Masukkan kata sandi di sini'
                                        type={"password"} 
                                        validationConfig = {register('password', {
                                            validate : validatePassword
                                        })}
                                        error={Boolean(errors.password)}
                                        helperText={errors.password && errors.password.message}
                                            
                                    />
                                </Box>
                                <Box className='w-[100%] flex flex-col gap-[10px]'>
                                    <label className='text-black font-semibold'>Konfirmasi Kata Sandi</label>
                                    <AppTextField
                            
                                            id="newConfirmPassword"
                                            placeholder='Masukkan konfirmasi kata sandi di sini'
                                            type={"password"} 
                                            validationConfig = {register('newConfirmPassword', {
                                            required: 'Password harus sama',
                                                validate: value => {
                                                    if(value !== password ){
                                                        'Password tidak Cocok'
                                                    }
                                                }
                                            })}
                                            error={Boolean(errors.newConfirmPassword)}
                                            helperText={errors.newConfirmPassword && errors.newConfirmPassword.message}

                                        />
                                </Box>
                            </Box>
                        </Box>

                        <Box className='w-[100%] flex justify-end'>
                                <Box className='w-[60%] xl:w-[30%]'>
                                    <AppButton
                                        text={'Simpan'} 
                                        type = {'submit'}
                                        fontSize = {'12px'}
                                    />
                                </Box>
                        </Box>
                    </form>
                </motion.div>
        </Modal>
    )
}

export default AppModalChangePass;