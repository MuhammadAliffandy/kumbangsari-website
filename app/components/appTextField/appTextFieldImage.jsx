import React from 'react';
import AppTextField from '@/app/components/appTextField/appTextField'
import InputAdornment from '@mui/material/InputAdornment';

const AppTextFieldImage = (props) =>  {
    const inputFileRef = React.useRef(null);
    const [file, setFile] = React.useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        props.onClick(event.target.files[0]) 
    };

    const handleButtonClick = () => {
        inputFileRef.current.click();
    };

    return (
        <div className='w-[100%]'>
            <input
                type="file"
                ref={inputFileRef}
                accept=".jpg, .jpeg, .png"
                style={{ display: 'none' }}
                onChange={
                    handleFileChange
                }
            />
            <AppTextField
                id="image"
                value = { props.value != null ? props.value : file ?  file.name : ''}
                type='text'
                placeholder='Masukkkan gambar Product konten di sini'
                InputProps={
                    {
                        style: {
                            borderRadius: "15px",
                            backgroundColor: '#F7F9F9'
                        },
                        endAdornment: <InputAdornment className='cursor-pointer'position="end"><img className='w-[18px] h-[18px] ' src={'/images/icon/gallery-edit.png'}/> </InputAdornment>
                    }
                }
                onClick={()=>{
                    handleButtonClick()
                }}
            />
        </div>
    );
}

export default AppTextFieldImage;
