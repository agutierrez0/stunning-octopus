import React, { useEffect, useState } from 'react';
import './css/order.css';

import penny from '../change_pics/penny.png';
import nickel from '../change_pics/nickel.png';
import dime from '../change_pics/dime.png';
import quarter from '../change_pics/quarter.png';
import dollar1 from '../change_pics/1dollar.jpeg';
import dollar5 from '../change_pics/5dollar.jpeg';
import dollar10 from '../change_pics/10dollar.jpeg';
import dollar20 from '../change_pics/20dollar.jpeg';
import dollar50 from '../change_pics/50dollar.jpeg';
import dollar100 from '../change_pics/100dollar.jpeg';

import chips from '../item_pics/chips.jpeg';
import chocolateCake from '../item_pics/chocolate_cake.jpeg';
import chocolate from '../item_pics/chocolate.jpeg';
import cookies from '../item_pics/cookies.jpeg';
import deli from '../item_pics/deli.jpeg';
import donuts from '../item_pics/donuts.jpeg';
import fruits from '../item_pics/fruits.jpeg';
import granolaBar from '../item_pics/granola_bar.jpeg';
import muffins from '../item_pics/muffins.jpeg';
import sodaBottle from '../item_pics/soda_bottle.jpeg';
import sodaCan from '../item_pics/soda_can.jpeg';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc } from "firebase/firestore"; 
import { firebaseConfig } from '../firebaseConfig';
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const locations = {
    chips,
    "chocolate cake" : chocolateCake,
    chocolate,
    cookies,
    deli,
    donuts,
    fruits,
    "granola bar" : granolaBar,
    muffins,
    "soda bottles" : sodaBottle,
    "soda cans" : sodaCan
}

export default function Order() {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isChangeScreen, setIsChangeScreen] = useState(false);
    const [isInitialScreen, setIsInitialScreen] = useState(true);
    const [items, setItems] = useState([]);
    const [currentOrder, setCurrentOrder] = useState({});
    const [orderList, setOrderList] = useState([]);
    const [total, setTotal] = useState(0)
    const [tax, setTax] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [postBody, setPostBody] = useState({})
    const [change, setChange] = useState()
    const [moneyProvided, setMoneyProvided] = useState()

    const billCoinMap = {
        100 : ["100 dollar bill", dollar100],
        50 : ["50 dollar bill", dollar50],
        20 : ["20 dollar bill", dollar20],
        10 : ["10 dollar bill", dollar10],
        5 : ["5 dollar bill", dollar5],
        1 : ["1 dollar bill", dollar1],
        0.25 : ["quarter", quarter],
        0.10 : ["dime", dime],
        0.05 : ["nickel", nickel],
        0.01 : ["penny", penny]
    }
    const s = [100, 50, 20, 10, 5, 1, .25, .10, .05, .01]
    
    function handleSelection(index, isIncrease) {
        if (index in currentOrder) {
            if (isIncrease) {
                currentOrder[index]++
            } else {
                currentOrder[index]--
                if (currentOrder[index] <= 0) {
                    delete currentOrder[index]
                }
            }
        } else {
            if (isIncrease) currentOrder[index] = 1
        }

        setCurrentOrder(currentOrder)
        setItems(oldItems => [...oldItems])
    }

    function getCurrentCount(index) {
        if (index in currentOrder) {
            return currentOrder[index]
        } else {
            return 0
        }
    }

    function handleGoCheckout() {
        const someList = []
        const someOtherList = []
        var totalAmount = 0
        for (const key in currentOrder) {
            const entity = { id: items[key].id, name: items[key].name, value : currentOrder[key], total : currentOrder[key] * items[key].price, price: items[key].price } 
            const simpleEntity = { itemId: items[key].id, itemAmount : currentOrder[key], dbId: items[key].dbId }
            someList.push(entity)
            someOtherList.push(simpleEntity)
            totalAmount = totalAmount + entity.total
        }

        var taxAmount = Math.round((totalAmount * 0.0875) * 100) / 100
        setTotal(totalAmount)
        setTax(taxAmount)
        setSubTotal(totalAmount + taxAmount)

        setOrderList(someList)
        setPostBody(someOtherList)
        setIsCheckout(true)
        setIsInitialScreen(false)
    }

    async function handleCheckout(isCash) {
        const employeeId = sessionStorage.getItem('employeeId')
        const datetimeNow = new Date().toISOString()
        const entity = { employeeId: employeeId, time: datetimeNow, total: total, subTotal, tax, items: postBody }
        
        try {
            await addDoc(collection(db, "transactions"), entity);
            for (const thing of postBody) {
                const itemRef = doc(db, 'items', thing.dbId)
                const itemSnap = await getDoc(itemRef)
                const dbInfo = itemSnap.data()

                await updateDoc(itemRef, { quantity: dbInfo['quantity'] - thing.itemAmount })
            }

            var time = 3000
            if (isCash) {
                calculateChange()
                time = 15000
            }

            setTimeout(() => {
                window.location.reload()
            }, time)
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

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

    function calculateChange() {
        const given = []
        const obj = {}
        let diff = moneyProvided - subTotal
        
        for(var i = 0; i < s.length; i++) {
            if (s[i] < diff) {
                diff = diff - s[i]
                given.push(s[i]);
                i--;
            }
        }

        for (const item of given) {
            if (obj[item]) {
                obj[item]++
            } else {
                obj[item] = 1
            }
        }

        setChange(obj)
        setIsCheckout(false)
        setIsChangeScreen(true)
    }

    return (<div className="order-container">
        <h4>Order</h4>
        {isChangeScreen ? <div> 
            {s.map((item,i) => {
                
                if (change[item]) {
                    return <div style={{fontSize: 'calc(2vw + 2vh'}} key={i}>{change[item]}x {billCoinMap[item][0]} 
                                <img style={item >= 1 ? {height: '25%', width: '25%'} : {height: '10%', width: '10%'}} src={billCoinMap[item][1]} alt={billCoinMap[item][0]}  />
                            </div>
                } else {
                    return null
                }
            })}
        </div> : null}

        {isCheckout ? <>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Order Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList.map((item, i) => <tr key={i}>
                        <td>{item.id}</td>
                        <td><img src={locations[item.name]} alt={item.name} style={{height: "60%", width: "60%"}} /></td>
                        <td>{item.name}</td>
                        <td>${item.price}</td>
                        <td>{item.value}</td>
                    </tr>)}
                </tbody>
            </table>
            <div style={{textAlign: 'start', width: '100%'}}>
                <p>Subtotal: ${total}</p>
                <p>Tax: ${tax}</p>
                <p>Total: ${subTotal}</p>

                <div style={{display: 'flex', flexDirection: 'column', width: 'fit-content'}}>
                    <label><b>Pay with credit card</b></label>
                    <button onClick={() => handleCheckout(false)}>Credit Card</button>

                    <label><b>Pay with cash</b></label>
                    <label>Cash provided</label>
                    <input onChange={(event) => setMoneyProvided(event.target.value)}></input>
                    <button onClick={() => handleCheckout(true)}>Calculate Change</button>
                </div>
            </div>
        </> : null}

        {isInitialScreen ? <>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Inventory Quantity</th>
                        <th>Price</th>
                        <th>Order Amount</th>
                        <th>Increase</th>
                        <th>Decrease</th>
                    </tr>
                </thead>
                <tbody>

                {items.map((item, i) => {
                if (item.quantity > 0) return <tr key={i}>
                    <td>{item.id}</td>
                    <td><img src={locations[item.name]} alt={item.name} style={{height: "60%", width: "60%"}} /></td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                    <td>{getCurrentCount(i)}</td>
                    <td><button onClick={() => handleSelection(i, true)}>Increase</button></td>
                    <td><button onClick={() => handleSelection(i, false)}>Decrease</button></td>
                </tr> 
                return null})}
                </tbody>
            </table>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '15px'}}>
                <button onClick={handleGoCheckout}>Review Order</button>
            </div>
        </> : null}
    </div>)
}