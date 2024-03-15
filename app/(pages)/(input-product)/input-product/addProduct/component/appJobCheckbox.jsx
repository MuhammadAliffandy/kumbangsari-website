import Stack from '@mui/material/Stack';
import AppCheckBox from '@/app/components/appCheckBox';

const AppJobCheckbox = (props) => {
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

        localStorage.setItem('job',data)
        return data;
    }

    return (
        <>
            <Stack direction={'row'} spacing={1}>
                <Stack direction='column' spacing={1}>
                    <AppCheckBox
                        label = 'Tdk Bekerja'
                        value = 'tidakkerja'
                        status = {props.status}
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                    <AppCheckBox
                        label = 'Kesehatan'
                        value = 'kesehatan'
                        status = {props.status}
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                </Stack>
                <Stack direction='column' spacing={1}>
                    <AppCheckBox
                        label = 'Pelajar/Mhs'
                        value = 'pelajar'
                        status = {props.status}
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                    <AppCheckBox
                        label = 'Karyawan'
                        value = 'karyawan'
                        status = {props.status}
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                </Stack>
                <Stack direction='column' spacing={1}>
                    <AppCheckBox
                        label = 'Hiburan'
                        value = 'hiburan'
                        status = {props.status}
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                    <AppCheckBox
                        label = 'Teknis'
                        value = 'teknis'
                        status = {props.status}
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                </Stack>
                <Stack direction='column' spacing={1}>
                    <AppCheckBox
                        label = 'Pendidikan'
                        value = 'pendidikan'
                        status = {props.status}
                        onChange= {(value , label)=>{
                            handleChange(value , label)
                        }}
                    />
                    <AppCheckBox
                        label = 'Lainnya'
                        value = 'lainnya'
                        status = {props.status}
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