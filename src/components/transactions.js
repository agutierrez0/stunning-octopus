import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from "firebase/firestore"; 
import { firebaseConfig } from '../firebaseConfig';
import './css/transactions.css';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Transactions() {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        async function getTransactions() {
            const querySnapshot = await getDocs(collection(db, "transactions"))
            querySnapshot.forEach((item) => {
                const itemInfo = item.data()
                itemInfo['niceTime'] = new Date(itemInfo.time)
                setTransactions(z => [...z, itemInfo])
            })
        }
        getTransactions()
    }, [])

    return (<div className="transactions-container">
        <h4>All Transactions</h4>
        <table>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Time</th>
                    <th>Subtotal</th>
                    <th>Tax</th>
                    <th>Total</th>
                    <th>View</th>
                </tr>
            </thead>
            <tbody>

            {transactions.sort((a,b) => a.niceTime.getTime() - b.niceTime.getTime()).reverse().map((t,i) => {
            return <tr key={i}>
                    <td>{t.employeeId}</td>
                    <td>{t.niceTime.toUTCString()}</td>
                    <td>${t.total}</td>
                    <td>${t.tax}</td>
                    <td>${t.subTotal}</td>
                    <td><button>View</button></td>
                </tr>
            })}
            </tbody>
        </table>
    </div>)
}