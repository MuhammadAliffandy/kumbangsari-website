import Stack from '@mui/material/Stack';
import AppCheckBox from '@/app/components/appCheckBox/appCheckBox';

const AppSchoolCheckbox = (props) => {
    let data = [];
    let listValue = props.listValue;

    const arrPop = (array, valueToDelete) => {
        let index = array.indexOf(valueToDelete);
        if (index !== -1) {
            array.splice(index, 1);
        }
        return array
    }

    const handleChange = (value ,label)=>{
        if(listValue != ''){
            if(value === ''){
                listValue = arrPop( data ,label)
            }else{
                listValue.push(value);
            }
            localStorage.setItem('school',listValue)
        }else {
            if(value === ''){
                data = arrPop( data ,label)
            }else{
                data.push(value);
            }
            localStorage.setItem('school',data)
        }
    }

    return (
        <>
            <Stack direction={props.direction || 'row'} spacing={1} className={props.className || ''} sx={props.sx}>
                <Stack direction={props.directionChild || 'column'} spacing={1} sx={props.sxChild}>
                    <AppCheckBox
                        label = 'SD'
                        value= 'SD'
                        status = {listValue.indexOf('SD') > -1 ? 'added' : props.status}
                        disabled={props.disabled || false}
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                    <AppCheckBox
                        value= 'SMA'
                        label = 'SMA'
                        status = {listValue.indexOf('SMA') > -1 ? 'added' : props.status}
                        disabled={props.disabled || false}
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                </Stack>
                <Stack direction={props.directionChild || 'column'} spacing={1} sx={props.sxChild}>
                    <AppCheckBox
                        value= 'SMP'
                        label = 'SMP'
                        status = {listValue.indexOf('SMP') > -1 ? 'added' : props.status}
                        disabled={props.disabled || false}
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                    <AppCheckBox
                        value= 'kuliah'
                        label = 'Kuliah'
                        status = {listValue.indexOf('kuliah') > -1 ? 'added' : props.status}
                        disabled={props.disabled || false}
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