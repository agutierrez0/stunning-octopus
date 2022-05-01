import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, getDocs, collection } from "firebase/firestore"; 
import { firebaseConfig } from '../firebaseConfig';
import { useParams } from 'react-router-dom';
import { locations } from './order';
import './css/transactions.css';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function SingleTransaction() {
    const [employeeId, setEmployeeId] = useState('')
    const [time, setTime] = useState('')
    const [subTotal, setSubTotal] = useState()
    const [tax, setTax] = useState()
    const [total, setTotal] = useState()
    const [items, setItems] = useState([])
    const [allItems, setAllItems] = useState([])
    const { id } = useParams()

    function getItem(dbId) {
        var res = {}
        allItems.forEach(item => {
            if (item.dbId === dbId) res = item
        })
        return res
    }

    useEffect(() => {
        async function getItems() {
            const querySnapshot = await getDocs(collection(db, "items"))
            const allItems = []
            querySnapshot.forEach((item) => {
                const itemInfo = item.data()
                itemInfo['dbId'] = item.id
                allItems.push(itemInfo)
                setAllItems(oldList => [...oldList, itemInfo])
            })
        }
        getItems()
    }, [])

    useEffect(() => {
        async function getTransactionInfo() {
            const docRef = doc(db, "transactions", id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const entity = docSnap.data()
                setEmployeeId(entity.employeeId)
                setTime(new Date(entity.time).toUTCString())
                setSubTotal(entity.subTotal)
                setTax(entity.tax)
                setTotal(entity.total)
                setItems(entity.items)
            } else {
                alert('transaction not found!')
            }
        }
        if (id) getTransactionInfo()
    }, [id])

    return (<div className="transactions-container">
        <h4>Transaction #{id}</h4>

        <label>Employee ID: {employeeId}</label>
        <label>Time: {time}</label>
        <label>Subtotal: ${total}</label>
        <label>Tax: ${tax}</label>
        <label>Total: ${subTotal}</label>

        <label>Items</label>
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {items.map((t,i) => {
                    const item = getItem(t.dbId)
                    console.log(t)
                    return <tr key={i}>
                        <td><img src={locations[item.name]}  alt={t.dbId} /></td>
                        <td>{item.name}</td>
                        <td>{t.itemAmount}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>)
}