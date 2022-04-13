import React, { useEffect, useState } from 'react';
import './css/order.css';

export default function Order() {
    const [items, setItems] = useState([]);
    const [currentOrder, setCurrentOrder] = useState({});
    const [isCheckout, setIsCheckout] = useState(0);
    const [orderList, setOrderList] = useState([]);

    const [total, setTotal] = useState(0)
    const [tax, setTax] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [postBody, setPostBody] = useState({})

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
        console.log(currentOrder)
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

    return (<div className="order-container">
        <div className="order-title">
                Order
        </div>
        {isCheckout ? <div>
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


                <button onClick={handleCheckout}>check out</button>
            </div>
        </div> :
        <div>
            <div className="order-items">
                {items.map((item, i) => <div className="order-item">
                    {item.name}
                    {/* image */}
                    <button onClick={() => handleSelection(i, true)} style={{margin: '5px'}}>increase</button>
                    <button onClick={() => handleSelection(i, false)} style={{margin: '5px'}}>decrease</button>
                    {getCurrentCount(i)}
                </div>)}
            </div>
            <div className="order-buttons">
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <div style={{display:'flex', flexDirection:'column'}}>
                    <button onClick={handleGoCheckout}>Review Order</button>
                    </div>
                </div>
            </div>
        </div>
        }
</div>)
}