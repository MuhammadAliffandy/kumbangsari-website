import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Skeleton from "react-loading-skeleton";
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';


const AppTablePayment = (props) =>  {

    const [currentPage, setCurrentPage] = useState(0);

    const perPage = 10;
    const offset = currentPage * perPage;
    const currentPageData = props.data.slice(offset, offset + perPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };


    return (
        <TableContainer className='scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
            <Table sx={{ minWidth: '100%', }} aria-label="simple table">
                <TableHead sx={ 
                    {
                        '& th:last-child': {
                            borderTopRightRadius: '15px',
                            borderBottomRightRadius: '15px'
                        },
                        '& th:first-child': {
                            borderTopLeftRadius: '15px',
                            borderBottomLeftRadius: '15px'
                        },
                    }}>
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
                    {
                    
                    props.data.length <= 0 ?
                    
                    <>
                        <TableRow className="w-[100%] h-auto">
                            <TableCell align="center"><p className='text-[12px]'><Skeleton count={6} className="w-[100%] h-[20px]"/></p></TableCell>
                            <TableCell align="center"><p className='text-[12px]'><Skeleton count={6} className="w-[100%] h-[20px]"/></p></TableCell>
                            <TableCell align="center"><p className='text-[12px]'><Skeleton count={6} className="w-[100%] h-[20px]"/></p></TableCell>
                            <TableCell align="center"><p className='text-[12px]'><Skeleton count={6} className="w-[100%] h-[20px]"/></p></TableCell>
                            <TableCell align="center"><p className='text-[12px]'><Skeleton count={6} className="w-[100%] h-[20px]"/></p></TableCell> 
                            <TableCell align="center"><p className='text-[12px]'><Skeleton count={6} className="w-[100%] h-[20px]"/></p></TableCell> 
                        </TableRow>
                    </> 

                    :

                    currentPageData.map((data , index) => (
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
                                <img className='w-[20px] h-[20px] rounded-[100%]' src={`/images/icon/${data.status == 'waiting' ? 'clock' : data.status  == 'failed' ? 'failed'  : 'success' }.svg`}/>
                                <p className={`text-[12px] ${data.status == 'waiting' ? 'text-STATE-BLUE-BASE' : data.status == 'failed' ? 'text-STATE-RED-BASE' : 'text-STATE-GREEN-BASE'}`} >{data.status == 'waiting' ? 'Menunggu' : data.status == 'failed' ? 'Gagal' : 'Berhasil'}</p>
                            </div>
                        </TableCell>
                        <TableCell align="center"><button onClick={()=>{
                            props.onClick(data)}} className='underline text-PRIMARY-500'>Detail Pembayaran</button></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ReactPaginate
                    pageCount={Math.ceil(props.data.length / perPage)}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination text-[12px] flex p-[10px] items-center justify-center gap-[20px] text-TEXT-1'}
                    activeClassName={'active bg-PRIMARY-500 px-[12px] py-[6px] rounded-[50%] text-TEXT-5'}
                    previousLabel={<FontAwesomeIcon icon={faChevronLeft} />} 
                    nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
                />
        </TableContainer>
    );
}

export default AppTablePayment;