import React, { useEffect, useState } from 'react';
import './css/admin.css';

export default function Admin() {
    const [items, setItems] = useState([])
    const [itemName, setItemName] = useState("")
    const [itemQuantity, setItemQuantity] = useState("")
    const [itemPrice, setItemPrice] = useState("")

    useEffect(() => {
        fetch("/api/item", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => setItems(data))
    }, [])


    function handleClearFields() {
        setItemName("")
        setItemQuantity("")
        setItemPrice("")
    }

    function handleAddNewItem() {
        fetch("/api/item", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: itemName, price: itemPrice, quantity: itemQuantity })
        })
        .then(res => res.json())
        .then(data => setItems(oldItems => [...oldItems, { id: data.id, name: itemName, price: itemPrice, quantity: itemQuantity}]))
    }

    function handleDelete(id) {
        fetch("/api/item/" + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status === 200) {
                const altList = items.filter(v => { return v.id !== id; })
                setItems(altList)
            }
        })
    }

    return (<>
    <div className="admin-container">
        <h4>Admin Utilities</h4>
        <h6>Update Item</h6>
        <table>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Inventory Count</td>
                    <td>Price</td>
                    <td>Delete</td>
                </tr>
            </thead>
            <tbody>
                {items.map((x, i) => {
                if (x.quantity > 0) return <tr key={i}>
                    <td>{x.id}</td>
                    <td>{x.name}</td>
                    <td>{x.quantity}</td>
                    <td>{x.price}</td>
                    <td><button onClick={() =>handleDelete(x.id)}>Delete</button></td>
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