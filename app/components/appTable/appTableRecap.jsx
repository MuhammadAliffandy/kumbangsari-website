import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { listPlatform } from '@/app/utils/model';

const AppTableRecap = (props) =>  {
    return (
        <TableContainer >
            <Table sx={{ minWidth: '100%' }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Platform</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Berhasil</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Gagal</p></TableCell>
                    <TableCell align="center"><p className='font-bold text-TEXT-3'>Menunggu</p></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.data.map((data , index) => (
                <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell align="center">
                        <div className='flex items-center justify-center'>
                            <img className='w-[25px] h-[25px] rounded-[100%]' src={ data.platform == 'facebook'? listPlatform.facebook : data.platform == 'instagram'? listPlatform.instagram : data.platform == 'twitter'? listPlatform.twitter : null  }/>
                        </div>
                    </TableCell>
                    <TableCell align="center"><p className='text-[12px]'>{data.success}</p></TableCell>
                    <TableCell align="center"><p className='text-[12px]' >{data.failed}</p></TableCell>
                    <TableCell align="center"><p className='text-[12px]' >{data.waiting}</p></TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AppTableRecap;