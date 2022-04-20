import React, { useEffect, useState } from 'react';
import './css/transactions.css';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from "firebase/firestore"; 
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0aZ1nTraL-Z7ZHiBPr_QpYCqGYKW0_0I",
    authDomain: "agutierrezsite.firebaseapp.com",
    databaseURL: "https://agutierrezsite.firebaseio.com",
    projectId: "agutierrezsite",
    storageBucket: "agutierrezsite.appspot.com",
    messagingSenderId: "551405246921",
    appId: "1:551405246921:web:1b5908616fb91b3ceaf018",
    measurementId: "G-MBSS92VZXM"
  };
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Transactions() {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        async function getTransactions() {
            const querySnapshot = await getDocs(collection(db, "transactions"))
            querySnapshot.forEach((item) => console.log(item.data()))
        }

        getTransactions()
    }, [])
    /* 
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
    }, [])*/

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