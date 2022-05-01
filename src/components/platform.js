import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Transactions from './transactions';
import SingleTransaction from './singleTransaction';
import Order from './order';
import Admin from './admin';
import './css/platform.css';

export default function Platform() {
    const [isAdmin, setIsAdmin] = useState(false);

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
            <div onClick={() => window.location.href = "/platform/order"} className="panel-option">
                Order
            </div>
            <div onClick={() => window.location.href = "/platform/transactions"} className="panel-option">
                Transactions
            </div>
            {isAdmin ? <div onClick={() => window.location.href = "/platform/admin"} className="panel-option" style={{backgroundColor: 'yellow'}}>
                Admin
            </div> : null}
            <div onClick={handleLogOut} className="panel-option" style={{backgroundColor: 'red'}}>
                Log Out
            </div>
        </div>
        <div className="panel-section">
            <Routes>
                <Route path=''>
                    <Route path='' element={<Order />} />
                    <Route path='order' element={<Order />} />
                    <Route path='transactions'>
                        <Route path='' element={<Transactions />} />
                        <Route path=':id' element={<SingleTransaction />} />
                    </Route>

                    
                    <Route path='admin' element={<Admin />} />
                </Route>
            </Routes>
        </div>
    </div>)
}