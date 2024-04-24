'use client'

import AppLayout from "../component/appLayout";
import React, { useState } from 'react';

const AnalystPage = () => {

    const [items, setItems] = useState([
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
        'Apple', 'Banana', 'Orange',
]);

    const addItem = () => {
        // Menambahkan item baru ke dalam state
        setItems(prevItems => [...prevItems, 'Mango']);
    }

    return (
        <AppLayout title='Analisis'>
            <div className="grow bg-red-500 h-[100%]">
                <h1 className="text-black">
                    ini adalah Analyst page
                </h1>
                <button onClick={addItem}>Tambah Item</button>
                <ul className="overflow-y-scroll h-[100%]">
                    {/* Memetakan state items */}
                    {items.map((item, index) => (
                        <li className="text-black" key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    ) 
}

export default AnalystPage;