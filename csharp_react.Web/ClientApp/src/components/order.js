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

    const billCoinMap = {
        100 : "100 dollar bill",
        50 : "50 dollar bill",
        20 : "20 dollar bill",
        10 : "10 dollar bill",
        5 : "5 dollar bill",
        1 : "1 dollar bill",
        .25 : "quarter",
        .10 : "dime",
        .05 : "nickel",
        .01 : "penny"
    }

    const imageMap = {
        100 : dollar100,
        50 : dollar50,
        20 : dollar20,
        10 : dollar10,
        5 : dollar5,
        1 : dollar1,
        .25 : quarter,
        .10 : dime,
        .05 : nickel,
        .01 : penny
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
            console.log(key)
            const entity = { name: items[key].name, value : currentOrder[key], total : currentOrder[key] * items[key].price, price: items[key].price } 
            const simpleEntity = { itemId: items[key].id, itemAmount : currentOrder[key] }
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

    function handleCheckout() {
        const employeeId = sessionStorage.getItem('employeeId')
        const datetimeNow = new Date().toISOString()
        const entity = { employeeId: employeeId, time: datetimeNow, total: total.toString(), subTotal, tax, items: postBody }
        
        fetch("/api/transaction", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entity)
        })
        .then(res => res)
        .then(data => console.log(data))
    }

    useEffect(() => {
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
            setItems(data)
        })
    }, [])

    function calculateChange(amt, prv) {
        amt = 25.22
        prv = 40
        let diff = prv - amt
        const given = []
        const obj = {}
        
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

        console.log(obj)
        setChange(obj)
        setIsCheckout(false)
        setIsChangeScreen(true)
    }

    return (<div className="order-container">
        <h4>Order</h4>
        {isChangeScreen ? <div> 
            {s.map((item,i) => {
                if (change[item]) {
                    return <div style={{fontSize: 'calc(2vw + 2vh'}} key={i}>{change[item]}X {billCoinMap[item]} <img style={item >= 1 ? {height: '25%', width: '25%'} : {height: '10%', width: '10%'}} src={imageMap[item]}  /></div>
                }
            })}
        </div> : null}
        {isCheckout ? <div style={{width: '65vw'}}>
            <table>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                
                {orderList.map(ob => 
                    <tr>
                        <td>{ob.name}</td>
                        <td>{ob.value}</td>
                        <td>{ob.price}</td>
                        <td>{ob.total}</td>
                    </tr>
                )}
            </table>

            <div>
                <p>Total: ${total}</p>
                <p>Tax: ${tax}</p>
                <p>Subtotal: ${subTotal}</p>
                <button onClick={handleCheckout}>check out with credit card</button>
                <label>Cash provided</label>
                <button onClick={calculateChange}>calculate change</button>
            </div>
        </div> : null}

        {isInitialScreen ? <>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Inventory Quantity</th>
                            <th>Price</th>
                            <th>Order Quantity</th>
                            <th>Increase</th>
                            <th>Decrease</th>
                        </tr>
                    </thead>
                    <tbody>

                    {items.map((item, i) => <tr>
                        <td>{item.id}</td>
                        <td><img src={locations[item.name]} alt={item.name} style={{height: "60%", width: "60%"}} /></td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{getCurrentCount(i)}</td>
                        <td><button onClick={() => handleSelection(i, true)}>Increase</button></td>
                        <td><button onClick={() => handleSelection(i, false)}>Decrease</button></td>
                    </tr>)}
                    </tbody>
                </table>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '15px'}}>
                    <button onClick={handleGoCheckout}>Review Order</button>
                </div>
            </div>
        </> : null}
</div>)
}