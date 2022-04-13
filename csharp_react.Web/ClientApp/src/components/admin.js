import React, { useEffect, useState } from 'react';
import './css/admin.css';

export default function Admin() {
    const z = [5,6,7,8,9]
    const [isEdit, setIsEdit] = useState([])
    
    const [itemName, setItemName] = useState("")
    const [itemQuantity, setItemQuantity] = useState("")
    const [itemPrice, setItemPrice] = useState("")

    function handleStartEditing(id) {
        console.log(isEdit)
        setIsEdit(oldList => [...oldList, id])
    }

    function handleStopEditing(id) {
        console.log(2)
        const someOtherList = isEdit.splice(id, 1)
        setIsEdit(someOtherList)
    }

    useEffect(() => {
        console.log('isEdit changed: ', isEdit)
    }, [isEdit])


    function handleSaveChanges(body) {
        /* 
        fetch("/api/item", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        */
        handleStopEditing(body)
   }

    function getRowStuff(item, i) {
        if (isEdit[i]) {
            return <tr key={i}>
                <td>{item}</td>
                <td><input defaultValue="Apple"></input></td>
                <td><input defaultValue="2"></input></td>
                <td><input defaultValue="14.50"></input></td>
                <td><button disabled onClick={() => console.log("delete: ", item)}>Delete Item</button></td>
                <td>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <button onClick={() => handleSaveChanges(item)}>save changes</button>
                        <button onClick={() => handleStopEditing(item)}>discard changes</button>
                    </div>
                </td>
            </tr>
        } else {
            return <tr key={i}>
                <td>{item}</td>
                <td>Apple</td>
                <td>2</td>
                <td>14.50</td>
                <td><button onClick={() => console.log("delete: ", item)}>Delete Item</button></td>
                <td><button onClick={() => handleStartEditing(item)}>start editing</button></td>
            </tr>
        }
    }

    function handleClearFields() {
        setItemName("")
        setItemQuantity("")
        setItemPrice("")
    }

    return (<div>
        <div className="admin-title">
            Admin 
        </div>
        <h4>Update Item</h4>
        <table>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Item Name</td>
                    <td>Inventory Count</td>
                    <td>Price</td>
                    <td>Delete Item</td>
                </tr>
            </thead>
            <tbody>
                {z.map((x, i) => getRowStuff(x, i))}
            </tbody>
        </table>
        <h4>Add Item</h4>
        <div className="add-item-section">
            <label>Name</label>
            <input value={itemName} onChange={(event) => setItemName(event.target.value)} placeholder="apple"></input>
            <label>Quantity</label>
            <input value={itemQuantity} onChange={(event) => setItemQuantity(event.target.value)} placeholder="20"></input>
            <label>Price</label>
            <input value={itemPrice} onChange={(event) => setItemPrice(event.target.value)} placeholder="$2.50"></input>

            <button onClick={() => console.log({itemPrice, itemName, itemQuantity})}>add item</button>
            <button onClick={handleClearFields}>clear fields</button>
        </div>
    </div>)
}