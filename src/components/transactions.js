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
            var beforeTime = new Date()
            const querySnapshot = await getDocs(collection(db, "transactions"))
            querySnapshot.forEach((item) => setTransactions(z => [...z, item.data()]))
            var afterTime = new Date()

            const total =  afterTime.getMilliseconds() - beforeTime.getMilliseconds()
            console.log(total)
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
                </tr>
            </thead>
            <tbody>
            
            {transactions.map((t,i) => {
            return <tr key={i}>
                    <td>{t.employeeId}</td>
                    <td>{t.time.toString()}</td>
                    <td>${t.total}</td>
                    <td>${t.tax}</td>
                    <td>${t.subTotal}</td>
                </tr>
            })}
            </tbody>
        </table>
    </div>)
}