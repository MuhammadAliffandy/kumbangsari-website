import { PROVIDER_DELETE, PROVIDER_GET, PROVIDER_POST, PROVIDER_PUT } from "../provider"
import { getCookie} from '@/app/utils/helper';

const delay = () => new Promise(res => setTimeout(() => res(), 800))

export const getAnalysisBestPerformance = async () => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_GET(`api/v1/analysis/best-performance`,token)
    return response
}

export const getAnalysisRecapPost = async () => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_GET(`api/v1/analysis/count-recap-post`,token)
    return response
}

export const getAnalysisChartPerformance = async () => {
    await delay()
    const token = getCookie('token');
    const response = await PROVIDER_GET(`api/v1/analysis/chart-performance`,token)
    return response
}
