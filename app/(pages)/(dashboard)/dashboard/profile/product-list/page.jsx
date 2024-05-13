'use client'
import Link from 'next/link';

const ProductListPage = () => {
    return(
        <div>
            <ul className='text-TEXT-1'> 
                <li>
                    <Link href={'/dashboard'} >dashboard</Link>
                </li>
                <li>
                    <Link href={'/dashboard/analyst'} >dashboard</Link>
                </li>
                <li>
                    <Link href={'/dashboard/profile/account'} >dashboard</Link>
                </li>
                <li>
                    <Link href={'/dashboard/generate-ai'} >dashboard</Link>
                </li>
            </ul>
        </div>
    )
}

export default ProductListPage;