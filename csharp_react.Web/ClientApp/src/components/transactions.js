import React, { useEffect, useState } from 'react';
import './css/transactions.css';

export default function Transactions() {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        fetch("/api/transaction", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => setTransactions(data))
    }, [])

    return (<div className="transactions-container">
        <h4>All Transactions</h4>
        <table>
            <thead>
                <tr>
                    <th>Transaction ID</th>
                    <th>Employee ID</th>
                    <th>Time</th>
                    <th>Subtotal</th>
                    <th>Tax</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
            
        {transactions.map((t,i) => {
            return <tr key={i}>
                <td>{t.id}</td>
                <td>{t.employeeId}</td>
                <td>{t.time}</td>
                <td>${t.total}</td>
                <td>${t.tax}</td>
                <td>${t.subtotal}</td>
            </tr>
        })}
            </tbody>
        </table>
    </div>)
}