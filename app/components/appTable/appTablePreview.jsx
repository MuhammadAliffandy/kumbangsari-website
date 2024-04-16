import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { listPlatform } from '@/app/utils/model';

const AppTablePreview = (props) =>  {
    return (
        <TableContainer >
            <Table sx={{ minWidth: '100%' }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Jam</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Judul Konten</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Produk</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Jenis Konten</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Lihat Detail</p></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.data.map((data , index) => (
                <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell align="center"><p className='text-[12px]'>{data.time}</p></TableCell>
                    <TableCell align="center"><p className='text-[12px]' >{data.contentTitle}</p></TableCell>
                    <TableCell align="center">
                        <div className='flex items-center gap-[10px] justify-center'>
                            <img className='w-[20px] h-[20px] rounded-[100%]' src={ data.platform == 'facebook'? listPlatform.facebook : data.platform == 'instagram'? listPlatform.instagram : data.platform == 'twitter'? listPlatform.twitter : null  }/>
                            <p className='text-[12px]' >{data.productName}</p>
                        </div>
                    </TableCell>
                    <TableCell align="center"><p className='text-[12px]' >{data.contentTypes}</p></TableCell>
                    <TableCell align="center"><button onClick={()=>{
                        props.onClick(data)}} className='underline text-PRIMARY-500'>Detail Konten</button></TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AppTablePreview;