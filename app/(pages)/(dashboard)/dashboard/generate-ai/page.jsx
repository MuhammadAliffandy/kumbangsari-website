import AppLayout from "../component/appLayout";
import AppModalGenerateAI from "./component/appModalGenerateAI";

const GenerateAIPage = () => {
    return (
        <AppLayout title='Generate AI'>
            <h1 className="text-black">
                ini adalah Generate AI page
                <AppModalGenerateAI/>
            </h1>
        </AppLayout>
    ) 
}

export default GenerateAIPage;