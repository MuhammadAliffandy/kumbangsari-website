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
        value === '' ? data = arrPop( data ,label) : data.push(value)

        props.onChange(data)

        return data;
    }

    return (
        <>
            <Stack direction='column' spacing={1}>
                    <AppCheckBox
                        value= 'pria'
                        label = 'Pria'
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                        />
                    <AppCheckBox
                        value = 'perempuan'
                        label = 'Perempuan'
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
            </Stack>
        </>
    )
}

export default AppGenderCheckbox;