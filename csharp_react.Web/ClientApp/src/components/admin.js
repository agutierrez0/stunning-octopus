import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore"; 
import { firebaseConfig } from '../firebaseConfig';
import './css/admin.css';
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Admin() {
    const [items, setItems] = useState([])
    const [itemName, setItemName] = useState("")
    const [itemQuantity, setItemQuantity] = useState("")
    const [itemPrice, setItemPrice] = useState("")

    useEffect(() => {
        async function getItems() {
            const querySnapshot = await getDocs(collection(db, "items"))
            const allItems = []
            querySnapshot.forEach((item) => {
                const itemInfo = item.data()
                itemInfo['dbId'] = item.id
                allItems.push(itemInfo)
                setItems(oldList => [...oldList, itemInfo])
            })
            setItems(allItems)
        }
        getItems()
    }, [])

    function handleClearFields() {
        setItemName("")
        setItemQuantity("")
        setItemPrice("")
    }

    async function handleAddNewItem() {
        const entity = { name: itemName, price: itemPrice, quantity: itemQuantity }
        const newItemRef = doc(collection(db, "items"));
        await setDoc(newItemRef, entity);
        entity['dbId'] = newItemRef.id;
        setItems(oldItems => [...oldItems, entity])
        handleClearFields()
    }

    async function handleDelete(id) {
        await deleteDoc(doc(db, "items", id));
        const altList = items.filter(v => { return v.dbId !== id; })
        setItems(altList)
    }

    return (<>
    <div className="admin-container">
        <h4>Admin Utilities</h4>
        <h6>Update Item</h6>
        <table>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Inventory Count</td>
                    <td>Price</td>
                    <td>Delete</td>
                </tr>
            </thead>
            <tbody>
                {items.map((x, i) => {
                if (x.quantity > 0) return <tr key={i}>
                    <td>{x.name}</td>
                    <td>{x.quantity}</td>
                    <td>{x.price}</td>
                    <td><button onClick={() =>handleDelete(x.dbId)}>Delete</button></td>
                </tr>
            return null})}
            </tbody>
        </table>
        <div className="add-item-section">
            <h6 style={{textAlign: 'center'}}>Add Item</h6>
            <label>Name</label>
            <input value={itemName} onChange={(event) => setItemName(event.target.value)} placeholder="Apples"></input>
            <label>Quantity</label>
            <input value={itemQuantity} onChange={(event) => setItemQuantity(event.target.value)} placeholder="20"></input>
            <label>Price</label>
            <input value={itemPrice} onChange={(event) => setItemPrice(event.target.value)} placeholder="$2.50"></input>

            <button onClick={handleAddNewItem}>Add Item</button>
            <button onClick={handleClearFields}>Clear Fields</button>
        </div>
    </div>
    </>)
}