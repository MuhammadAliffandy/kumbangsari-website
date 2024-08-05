'use client'
import AppMap from '@/app/components/appMap/appMap';
import { formatRupiahNumber } from '@/app/utils/helper';
import images from '@/public/images/images';
import Box from '@mui/material/Box'

const ProfilePage = () => {

    const mission = [
        "Membangun Kualitas Sumber Daya Manusia Yang Cerdas dan Berintegritas ",
        "Membangun Struktur Ekonomi Desa Yang Tangguh dan Berdaya Saing",
        "Meningkatkan Kualitas Lingkungan Pemukiman yang Nyaman Huni Dan Bermartabat",
        "Membuka Akses Ekonomi Desa untuk Pemerataan Kesejahteraan dan Keadilan Bagi Warga Desa",
        "Peningkatan Sarpras Kualitas Infrastruktur Desa",
        "Mengoptimalkan Peran dan Fungsi RT dan RW Dalam Melayani Pekerjaan Masyarakat",
        "Mengembangkan Seni, Olahraga, Tradisi, Budaya Dan Kearifan Lokal dalam Aspek Membangun Kehidupan Masyarakat",
    ];

    return(
        <>
            <section className="w-[100%] flex flex-col items-center justify-center h-auto xl:h-[100vh]">
                <Box className='w-full h-full flex'>
                    <Box className='w-[50%] h-[100%] flex flex-col gap-[10px] items-center justify-center'>
                        <img src={images.image.logoSitubondo} className='w-[200px] h-auto'/>
                        <Box className='flex flex-col justify-center items-center '>
                            <h1 className='text-black text-[32px] font-bold'>Desa Kumbangsari</h1>
                            <p className='text-black text-[20px]'>Kecamatan Jangkar Kabupaten Situbondo</p>
                        </Box>
                    </Box>
                    <Box className='w-[50%] h-[100%] flex flex-col '>
                        <Box className='w-full h-full flex items-center justify-center flex-col gap-[20px]'>
                            <Box className='h-auto flex flex-col gap-[8px] items-center justify-end'>
                                <h1 className='text-black text-[32px] font-bold'>Visi</h1>
                                <p className='text-black text-[14px]'>Mewujudkan Desa Kumbangsari yang <b>MAJU, MANDIRI, AGAMIS, JUJUR,</b> dan <b>UNGGUL</b></p>
                            </Box>
                            <Box className='h-auto flex flex-col gap-[8px] items-center justify-start'>
                                <h1 className='text-black text-[32px] font-bold'>Misi</h1>
                                <Box className='flex flex-col gap-[4px] w-[80%]'>
                                    {
                                        mission.map((data , index) => {
                                            return(
                                                <div className='flex gap-[4px] items-start'>
                                                    <p className='text-black text-[14px] w-[14px]'>{index + 1}.</p>
                                                    <p className='text-black text-[14px]'>{data}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </section>
            {/*  */}
            <section>
                <Box className='flex flex-col gap-[5px] items-center'>
                    <p className="text-[18px] text-PRIMARY-500">{ 'Bagan Desa'}</p>
                    <p className="text-[24px] font-extrabold text-TEXT-1 text-center px-[20px] ">{"Struktur Organisasi Pemerintahan Desa"}</p>
                </Box>
                <Box>

                </Box>
            </section>
            {/*  */}
            <section>
                <Box className='flex flex-col gap-[5px] items-center'>
                    <p className="text-[18px] text-PRIMARY-500">{ 'Bagan Desa'}</p>
                    <p className="text-[24px] font-extrabold text-TEXT-1 text-center px-[20px] ">{"Struktur Organisasi PKK"}</p>
                </Box>
                <Box>

                </Box>
            </section>
            {/*  */}
            <section className='w-[100%] flex flex-col items-center justify-center h-auto xl:h-[100vh]'>
                <Box className = 'flex flex-col gap-[40px] items-center justify-center'>
                    <Box className='flex flex-col gap-[5px] items-center'>
                        <p className="text-[18px] text-PRIMARY-500">{ 'Desa Kumbangsari'}</p>
                        <p className="text-[24px] font-extrabold text-TEXT-1 text-center px-[20px] ">{"Sejarah Desa Kumbangsari"}</p>
                    </Box>
                    <Box className='w-[80%] flex flex-col gap-[10px] items-center justify-center'>
                        <p className='text-black text-[16px] text-center font-bold'>Asal Usul Desa</p>
                        <p className='text-black text-[14px] text-center'>
                        {
                            `
                            Desa Kumbangsari merupakan desa yang berada di tengah tengah diantara desa yang lain di Kecamatan Jangkar Kabupaten Situbondo.
                            Seperti Daerah atau Tempat Lainnya, Desa ini jika mempunyai sejarah atau asal usul tersendiri mulai dari nama desa, dusun , asal penduduknya dan 
                            sebagainya. Desa Kumbangsari yang artinya dalam kamus besar harum semerbak mewangi dan manis.
                            Selain itu, disebut dengan desa yang keramat, mengapa demikian dikarenakan banyak pejuang sekaligus pembabat hutan yang meninggal di desa Kumbangsari
                            dan dimakamkan di Desa Kumbangsari yang sekarang terkenal dengan sebutan asta atau bhujuk.
                            `
                        }
                        </p>
                        <p className='text-black text-[16px] text-center font-bold'>Sejarah Pemerintahan Desa</p>
                        <p className='text-black text-[14px] text-center'>
                        {
                            `
                            Pemerintahan Desa Kumbangsari merupakan satu pemerintahan yang ada sejak jaman kerajaan. Sesuai dengan perkembanngan keadaan dan kondisi masyrakat maka
                            wilayah pemerintahan terdiri atas lima dusun yaitu Dusun Toroy, Dusun Krajan, Dusun Sekolahan, Dusun Kaju Raje , Dusun Dawuhan meliputi beberapa RT dan RW
                            untuk semua Dusun yang berada di bawah naungan pemerintah Desa Kumbangsari Kecamatan Jangkar Kabupaten Situbondo.
                            `
                        }
                        </p>
                    </Box>
                </Box>
            </section>
            {/*  */}
            <section className='w-[100%] flex flex-col items-center justify-center h-auto xl:h-[100vh] gap-[40px]'>
                <Box className='flex flex-col gap-[5px] items-center'>
                    <p className="text-[18px] text-PRIMARY-500">{ 'Peta Lokasi Desa'}</p>
                    <p className="text-[24px] font-extrabold text-TEXT-1 text-center px-[20px] ">{"Peta Lokasi Desa Kumbangsari"}</p>
                </Box>
                <Box className='w-[80%] h-[60vh] flex gap-[40px]'>
                    <Box className='w-[50%] flex flex-col justify-between  h-full'>
                        
                        <div>
                            <p className='text-black text-[36px] font-bold'>Desa Kumbangsari</p>
                            <div className='w-full h-[1px] bg-gray-400'></div>
                        </div>

                        <div>
                            <Box className='flex flex-col items-start justify-between gap-[20px] w-full'>
                                <p className='text-black text-[24px] font-bold'>Batas Desa </p>
                                
                                <div className='flex items-start justify-between w-full'>
                                    <Box className='flex flex-col justify-start'>
                                        <p className='text-black text-[24px] font-bold'>Utara</p>
                                        <p className='text-black text-[18px]'>Selat Madura</p>
                                    </Box>
                                    <Box className='flex flex-col justify-start'>
                                        <p className='text-black text-[24px] font-bold text-right'>Timur</p>
                                        <p className='text-black text-[18px]'>Desa Gadingan</p>
                                    </Box>
                                
                                </div>
                                <div className='flex items-start justify-between w-full'>
                                    <Box className='flex flex-col justify-start'>
                                        <p className='text-black text-[24px] font-bold'>Selatan</p>
                                        <p className='text-black text-[18px]'>Desa Palangan</p>
                                    </Box>
                                    <Box className='flex flex-col justify-start'>
                                        <p className='text-black text-[24px] font-bold text-right'>Barat</p>
                                        <p className='text-black text-[18px]'>Desa Agel</p>
                                    </Box>
                                
                                </div>

                            </Box>

                            <div className='w-full h-[1px] bg-gray-400'></div>
                        </div>

                        <div>
                            <Box className='flex items-center justify-between w-full'>
                                <p className='text-black text-[24px] font-bold'>Luas Desa</p>
                                <p className='text-black text-[24px]'>{formatRupiahNumber(350000)} ha</p>
                            </Box>
            
                            <div className='w-full h-[1px] bg-gray-400'></div>
                        </div>

                        <div>
                            <Box className='flex items-center justify-between w-full'>
                                <p className='text-black text-[24px] font-bold'>Jumlah Penduduk</p>
                                <p className='text-black text-[24px]'>3.057 Jiwa</p>
                            </Box>
                            <div className='w-full h-[1px] bg-gray-400'></div>
                        </div>

                    </Box>
                    <Box className='w-[50%] h-full'>
                        <AppMap
                            height={'h-[60vh]'}
                        />
                    </Box>
                </Box>
            </section>
        </>
)

}

export default ProfilePage ;