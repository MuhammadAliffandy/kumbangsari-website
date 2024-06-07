import { toast } from "react-toastify";

const AppToastPending = (method) => {
    toast.promise(
        method,
        {
            pending: 'Tunggu Sebentar ..'
        }
    )
}

export default AppToastPending;