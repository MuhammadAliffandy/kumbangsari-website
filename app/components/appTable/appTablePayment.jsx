import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const AppTablePreview = (props) =>  {
    return (
        <TableContainer >
            <Table sx={{ minWidth: '100%' }} aria-label="simple table">
            <TableHead className='rounded-[20px]'>
                <TableRow className='bg-PRIMARY-400' >
                    <TableCell align="center"><p className='text-white'>Tanggal</p></TableCell>
                    <TableCell align="center"><p className='text-white'>Paket</p></TableCell>
                    <TableCell align="center"><p className='text-white'>Total Biaya</p></TableCell>
                    <TableCell align="center"><p className='text-white'>Metode Pembayaran</p></TableCell>
                    <TableCell align="center"><p className='text-white'>Status</p></TableCell>
                    <TableCell align="center"><p className='text-white'>Lihat Detail</p></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.data.map((data , index) => (
                <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell align="center"><p className='text-[12px]'>{data.date}</p></TableCell>
                    <TableCell align="center"><p className='text-[12px]'>{data.packet}</p></TableCell>
                    <TableCell align="center"><p className='text-[12px]' >{data.price}</p></TableCell>
                    <TableCell align="center"><p className='text-[12px]' >Metode Pembayaran</p></TableCell>
                    <TableCell align="center">
                        <div className='flex items-center gap-[8px] justify-center'>
                            <img className='w-[20px] h-[20px] rounded-[100%]' src={`/images/icon/${data.status == 'waiting' ? 'clock' : 'success' }.svg`}/>
                            <p className={`text-[12px] ${data.status == 'waiting' ? 'text-STATE-BLUE-BASE' : 'text-STATE-GREEN-BASE'}`} >{data.status == 'waiting' ? 'Menunggu' : 'Berhasii'}</p>
                        </div>
                    </TableCell>
                    <TableCell align="center"><button onClick={()=>{
                        props.onClick(data)}} className='underline text-PRIMARY-500'>Detail Pembayaran</button></TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AppTablePreview;