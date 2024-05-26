import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box'
import AppCustomButton from "@/app/components/appButton/appCustomButton";
import { listPlatform } from '@/app/utils/model';
import Skeleton from "react-loading-skeleton";

const AppTableProduct = (props) =>  {
    return (
        <TableContainer className='scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full' >
            <Table sx={{ minWidth: '100%' }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>No.</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Nama Akun</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Produk</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Tanggal Ditambahkan</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Tanggal Diperbarui</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Status Konektivitas</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Aksi</p></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    props.data.length <= 0 ?
                
                    <>
                        <TableRow className="w-[100%] h-auto">
                            <TableCell align="center"><p className='text-[12px]'><Skeleton count={6} className="w-[100%] h-[20px]"/></p></TableCell>
                            <TableCell align="center"><p className='text-[12px]'><Skeleton count={6} className="w-[100%] h-[20px]"/></p></TableCell>
                            <TableCell align="center"><p className='text-[12px]'><Skeleton count={6} className="w-[100%] h-[20px]"/></p></TableCell>
                            <TableCell align="center"><p className='text-[12px]'><Skeleton count={6} className="w-[100%] h-[20px]"/></p></TableCell>
                            <TableCell align="center"><p className='text-[12px]'><Skeleton count={6} className="w-[100%] h-[20px]"/></p></TableCell>
                        </TableRow>
                    </> 

                    :

                    props.data.map((data , index) => (
                    <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="center"><p className='text-[12px]' >{index + 1}.</p></TableCell>
                        <TableCell align="center"><p className='text-[12px]' >{data.accountName}</p></TableCell>
                        <TableCell align="center">
                            <div className='flex items-center gap-[10px] justify-center'>
                                <img className='w-[20px] h-[20px] rounded-[100%]' src={ data.platform == 'facebook'? listPlatform.facebook : data.platform == 'instagram'? listPlatform.instagram : data.platform == 'twitter'? listPlatform.twitter : null  }/>
                                <p className='text-[12px]' >{data.productName}</p>
                            </div>
                        </TableCell>
                        <TableCell align="center"><p className='text-[12px]'>{data.createdAt}</p></TableCell>
                        <TableCell align="center"><p className='text-[12px]'>{data.updatedAt}</p></TableCell>
                        <TableCell align="center">
                            <div className='flex items-center gap-[8px] justify-center'>
                                <img className='w-[20px] h-[20px] rounded-[100%]' src={`/images/icon/${data.status == 'waiting' ? 'clock' : data.status  == 'failed' ? 'failed'  : 'success' }.svg`}/>
                                <p className={`text-[12px] ${data.status == 'waiting' ? 'text-STATE-BLUE-BASE' : data.status == 'failed' ? 'text-STATE-RED-BASE' : 'text-STATE-GREEN-BASE'}`} >{data.status == 'waiting' ? 'Menunggu' : data.status == 'failed' ? 'Gagal' : 'Berhasil'}</p>
                            </div>
                        </TableCell>
                        <TableCell align="center">
                        <Box className='flex items-center gap-[10px]'>
                            <AppCustomButton className=' bg-white ' onClick={()=>{
                                props.onEdited(data)
                            }}>
                                <img className='w-[18px] h-[18px] ' src={'/images/icon/edit.png'}/>
                            </AppCustomButton>
                            <AppCustomButton className=' bg-white ' onClick={()=>{
                                props.onDeleted(data)
                            }}>
                                <img className='w-[18px] h-[18px] ' src={'/images/icon/trash.png'}/>
                            </AppCustomButton>
                        </Box>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AppTableProduct;