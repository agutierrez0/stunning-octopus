import React, { useEffect, useState } from 'react';
import './css/order.css';

export default function Order() {
    const [items, setItems] = useState([]);
    const [currentOrder, setCurrentOrder] = useState({});

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
            currentOrder[index] = 1
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

    useEffect(() => {
        setItems([{name: 'apples', emoji: '🍎'}, {name: 'oranges', emoji: '🍊'}, {name: 'grapes', emoji: '🍇'}])
    }, [])

    return (<div className="order-container">
    <div className="order-title">
        Order
    </div>
    <div className="order-items">
        {items.map((item, i) => <div className="order-item">
            {item.name}
            {item.emoji}
            <button onClick={() => handleSelection(i, true)} style={{margin: '5px'}}>increase</button>
            <button onClick={() => handleSelection(i, false)} style={{margin: '5px'}}>decrease</button>
            {getCurrentCount(i)}
        </div>)}
    </div>
    <div className="order-buttons">
        Review Order
    </div>
</div>)
}