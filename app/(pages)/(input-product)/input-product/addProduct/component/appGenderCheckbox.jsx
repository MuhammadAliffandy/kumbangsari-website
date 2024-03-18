import Stack from '@mui/material/Stack';
import AppCheckBox from '@/app/components/appCheckBox/appCheckBox';

const AppGenderCheckbox = (props) => {
   
    let data = [] 
    let listValue = props.listValue;

    const arrPop = (array, valueToDelete) => {
        let index = array.indexOf(valueToDelete.toLowerCase());
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
            localStorage.setItem('gender',listValue)
        }else {
            if(value === ''){
                data = arrPop( data ,label)
            }else{
                data.push(value);
            }
            localStorage.setItem('gender',data)
        }

    }


    return (
        <>
            <Stack direction='column' spacing={1}>
                    <AppCheckBox
                        value= 'pria'
                        label = 'Pria'
                        status = { listValue.indexOf('pria') > -1 ? 'added' : props.status}
                        onChange= {(value , label)=>{
                            handleChange(value,label)
                        }}
                        />
                    <AppCheckBox
                        value = 'perempuan'
                        label = 'Perempuan'
                        status = { listValue.indexOf('perempuan') > -1 ? 'added' : props.status}
                        onChange= {(value , label)=>{
                            handleChange(value,label)
                        }}
                    />
            </Stack>
        </>
    )
}

export default AppGenderCheckbox;