import Stack from '@mui/material/Stack';
import AppCheckBox from '@/app/components/appCheckBox';

const AppGenderCheckbox = (props) => {
   
    let data = [];

    const arrPop = (array, valueToDelete) => {
        let index = array.indexOf(valueToDelete.toLowerCase());
        if (index !== -1) {
            array.splice(index, 1);
        }
        return array
    }

    const handleChange = (value ,label)=>{
        if(value === ''){
            data = arrPop( data ,label)
        }else{
            data.push(value);
        }

        localStorage.setItem('gender',data)
    }
    
    return (
        <>
            <Stack direction='column' spacing={1}>
                    <AppCheckBox
                        value= 'pria'
                        label = 'Pria'
                        status = {props.status}
                        onChange= {(value , label)=>{
                            handleChange(value,label)
                        }}
                        />
                    <AppCheckBox
                        value = 'perempuan'
                        label = 'Perempuan'
                        status = {props.status}
                        onChange= {(value , label)=>{
                            handleChange(value,label)
                        }}
                    />
            </Stack>
        </>
    )
}

export default AppGenderCheckbox;