import Stack from '@mui/material/Stack';
import AppCheckBox from '@/app/components/appCheckBox';

const AppSchoolCheckbox = (props) => {
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
            <Stack direction={'row'} spacing={1}>
                <Stack direction='column' spacing={1}>
                    <AppCheckBox
                        label = 'SD'
                        value= 'SD'
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                    <AppCheckBox
                        label = 'SMA'
                        value= 'SMA'
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                </Stack>
                <Stack direction='column' spacing={1}>
                    <AppCheckBox
                        label = 'SMP'
                        value= 'SMP'
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                    <AppCheckBox
                        label = 'Kuliah'
                        value= 'kuliah'
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                        
                    />
                </Stack>
            </Stack>
        </>
    )
}

export default AppSchoolCheckbox;