import React, { useState } from 'react';
import Transaction from './transaction';
import Order from './order';
import Admin from './admin';
import './css/platform.css';

export default function Platform() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedOption, setSelectedOption] = useState(0);

    return (<div className="platform-container">
        <div className="select-panel-section">
            <div onClick={() => setSelectedOption(0)} className="panel-option">
                Order
            </div>
            <div onClick={() => setSelectedOption(1)} className="panel-option">
                Transactions
            </div>
            {isAdmin ? <div onClick={() => setSelectedOption(2)} className="panel-option">
                Admin
            </div> : null}
        </div>
        <div className="panel-section">
            {selectedOption === 0 ? <Order /> : null}
            {selectedOption === 1 ? <Transaction /> : null}
            {selectedOption === 2 ? <Admin /> : null}
        </div>
    </div>)
}