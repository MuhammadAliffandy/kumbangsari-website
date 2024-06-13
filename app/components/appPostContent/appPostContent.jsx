import { twitterPost , twitterFindId} from '@/app/api/repository/twitterRepository';
import { facebookPost} from '@/app/api/repository/facebookRepository';
import { instagramPost} from '@/app/api/repository/instagramRepository';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const AppPostContent = async (props ,push) => {


    try {
        if(props.platform == 'twitter'){
            const resTwitterId = await twitterFindId({idProduct:props.idProduct})

            if(resTwitterId.status == 'OK'){

                if(resTwitterId.data.twitterId == null){
                    toast.warn('Cek Konektivitas Akun Twitter Anda !!')
                    return false
                }

                const data = {
                    twitterIds:[resTwitterId.data.twitterId],
                    idContent: props.idContent,
                    tweetText:`${props.caption ||'' }\n\n${props.hashtag || ''}`,
                    imageUrls:  props.image != null && props.image != 'null' && props.image != '' ? [
                        props.image,
                    ] : []
                }

                const res = await twitterPost(data)
        
                if(res.status == 'OK'){
                    toast.success('Posting Konten Twitter Berhasil')
                    
                    if(props.isGenerate){
                        fetchEditContent()
                    }
                    push('/dashboard/calendar')
                }
                
                
            }else{
                toast.error('Gagal Menemukan Id Twitter')
            }
        }

        if(props.platform == 'instagram'){

            try {
                const data = {
                    idContent: props.idContent,
                    caption:`${props.caption ||'' }\n\n${props.hashtag || ''}`,
                    imageUrl:props.image != null && props.image != 'null' && props.image != '' ? 
                    props.image
                    : null
                }

                const res = await instagramPost(data)

                if(res.status == 'OK'){
                    toast.success('Posting Konten Instagram Berhasil')
                    if(props.isGenerate){
                        fetchEditContent()
                    }
                    push('/dashboard/calendar')
                }

            } catch (error) {
                if(error.status == 400){
                    toast.warn('Cek Konektivitas Akun Instagram Anda !!')
                    return false
                }else{
                    toast.error('Ada Kesalahan Sever (500)')
                }
            }
        }

        if(props.platform == 'facebook'){

            try {
                const data = {
                    idContent: props.idContent,
                    caption:`${props.caption ||'' }\n\n${props.hashtag || ''}`,
                    imageUrl: props.image != null && props.image != 'null' && props.image != '' ? 
                    props.image
                    : null
                }

                const res = await facebookPost(data)

                if(res.status == 'OK'){
                    toast.success('Posting Konten Facebook Berhasil')
                    
                    if(props.isGenerate){
                        fetchEditContent()
                    }
                    push('/dashboard/calendar')
                

                }

            } catch (error) {
                if(error.status == 400){
                    toast.warn('Cek Konektivitas Akun Facebook Anda !!')
                    return false
                }else{
                    toast.error('Ada Kesalahan Sever (500)')
                }
            }
        }

        window.location.reload()

    } catch (error) {

        if(error.status == 403){
            toast.error('Jumlah Post Sudah Limit')}
        else if(error.status == 403){
            toast.error('Jumlah Post Sudah Limit')
        }else if(error.status == 404){
            toast.error('Posting Konten Gagal')
        }else{
            toast.error('Ada Kesalahan Server (500)')
        }
    }
}

export default AppPostContent;