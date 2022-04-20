import React, { useEffect, useState } from 'react';
import Transactions from './transactions';
import Order from './order';
import Admin from './admin';
import './css/platform.css';

export default function Platform() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedOption, setSelectedOption] = useState(0);

    function handleLogOut() {
        sessionStorage.clear()
        window.location.href = "/"
    }

    useEffect(() => {
        const checkAdmin = sessionStorage.getItem('admin')
        if (checkAdmin === "true") setIsAdmin(true)
    }, [])

    return (<div className="platform-container">
        <div className="select-panel-section">
            <div onClick={() => setSelectedOption(0)} className="panel-option">
                Order
            </div>
            <div onClick={() => setSelectedOption(1)} className="panel-option">
                Transactions
            </div>
            <div onClick={handleLogOut} className="panel-option" style={{backgroundColor: 'red'}}>
                Log Out
            </div>
            {isAdmin ? <div onClick={() => setSelectedOption(2)} className="panel-option" style={{backgroundColor: 'yellow'}}>
                Admin
            </div> : null}
        </div>
        <div className="panel-section">
            {selectedOption === 0 ? <Order /> : null}
            {selectedOption === 1 ? <Transactions /> : null}
            {selectedOption === 2 ? <Admin /> : null}
        </div>
    </div>)
}