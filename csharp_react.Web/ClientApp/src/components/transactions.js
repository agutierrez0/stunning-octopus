import React, { useEffect, useState } from 'react';
import './css/transactions.css';

export default function Transactions() {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        // db fetch
        setTransactions([0,0,0,0,0,0,0,0])
    }, [])

    return (<div className="transactions-container">
        <table>
            <thead>
                <tr>
                    <th>UserId</th>
                    <th>Total Amount</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
            
        
        {transactions.map(t => {
            return <tr>
                <td>1</td>
                <td>100$</td>
                <td>February</td>
            </tr>
        })}
            </tbody>
        </table>
    </div>)
}