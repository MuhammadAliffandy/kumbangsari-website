import Stack from '@mui/material/Stack';
import AppCheckBox from '@/app/components/appCheckBox';

const AppSchoolCheckbox = (props) => {
    let data = [];

    const arrPop = (array, valueToDelete) => {
        let index = array.indexOf(valueToDelete);
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
        localStorage.setItem('school',data)
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
                        value= 'SMA'
                        label = 'SMA'
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                </Stack>
                <Stack direction='column' spacing={1}>
                    <AppCheckBox
                        value= 'SMP'
                        label = 'SMP'
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                    <AppCheckBox
                        value= 'kuliah'
                        label = 'Kuliah'
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