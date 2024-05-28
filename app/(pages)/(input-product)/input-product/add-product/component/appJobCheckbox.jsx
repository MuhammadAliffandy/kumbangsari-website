import Stack from '@mui/material/Stack';
import AppCheckBox from '@/app/components/appCheckBox/appCheckBox';

const AppJobCheckbox = (props) => {
    let data = [];
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
            localStorage.setItem('job',listValue)
        }else {
            if(value === ''){
                data = arrPop( data ,label)
            }else{
                data.push(value);
            }
            localStorage.setItem('job',data)
        }
    }

    return (
        <>
            <Stack direction={props.direction || 'row'} spacing={1} className={props.className || ''} sx={props.sx}>
                <Stack direction='column' spacing={1}>
                    <AppCheckBox
                        label = 'Tdk Bekerja'
                        value = 'tidakkerja'
                        status = {listValue.indexOf('tidakkerja') > -1 ? 'added' : props.status}
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                    <AppCheckBox
                        label = 'Kesehatan'
                        value = 'kesehatan'
                        status = {listValue.indexOf('kesehatan') > -1 ? 'added' : props.status}
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                </Stack>
                <Stack direction='column' spacing={1}>
                    <AppCheckBox
                        label = 'Pelajar/Mhs'
                        value = 'pelajar'
                        status = {listValue.indexOf('pelajar') > -1 ? 'added' : props.status}
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                    <AppCheckBox
                        label = 'Karyawan'
                        value = 'karyawan'
                        status = {listValue.indexOf('karyawan') > -1 ? 'added' : props.status}
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                </Stack>
                <Stack direction='column' spacing={1}>
                    <AppCheckBox
                        label = 'Hiburan'
                        value = 'hiburan'
                        status = {listValue.indexOf('hiburan') > -1 ? 'added' : props.status}
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                    <AppCheckBox
                        label = 'Teknis'
                        value = 'teknis'
                        status = {listValue.indexOf('teknis') > -1 ? 'added' : props.status}
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                </Stack>
                <Stack direction='column' spacing={1}>
                    <AppCheckBox
                        label = 'Pendidikan'
                        value = 'pendidikan'
                        status = {listValue.indexOf('pendidikan') > -1 ? 'added' : props.status}
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                    <AppCheckBox
                        label = 'Lainnya'
                        value = 'lainnya'
                        status = {listValue.indexOf('lainnya') > -1 ? 'added' : props.status}
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                </Stack>
            </Stack>
        </>
    )
}

export default AppJobCheckbox;