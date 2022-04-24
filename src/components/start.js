import React, { useState } from 'react';
import './css/start.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from "firebase/firestore"; 
import { firebaseConfig } from '../firebaseConfig';
import Keypad from './keypad';
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Start() {
    const [loading, setLoading] = useState(false);
    const [enteredId, setEnteredId] = useState([])
    const [enteredPasscode, setEnteredPasscode] = useState([])

    async function handleGo() {
        setLoading(true)
        const finalId = enteredId.join('')
        const finalPasscode = enteredPasscode.join('')
        const inputItem = { id: finalId, passcode: finalPasscode}
        var successfulLogin = false

        const querySnapshot = await getDocs(collection(db, "users"))
        querySnapshot.forEach((item) => {
            const user = item.data()
            if (user.id === inputItem.id && user.passcode === inputItem.passcode) {
                alert('successful login')
                sessionStorage.setItem('admin', user.isAdmin)
                sessionStorage.setItem('employeeId', finalId)
                window.location.href = "/platform"
                successfulLogin = true
                return
            }
        })

        if (!successfulLogin) {
            alert('invalid passcode and/or password')
            setEnteredId([])
            setEnteredPasscode([])
            setLoading(false)
        }
    }

    return loading ? <div className='login-container'>loading...</div> : <div className="start-container">
        <div className="id-input-section">
            <div className="title-section">
                Employee ID
            </div>
            <div className="input-view-section">
                <div className="number">
                    {enteredId[0]}
                </div>
                <div className="number">
                    {enteredId[1]}
                </div>
                <div className="number">
                    {enteredId[2]}
                </div>
                <div className="number">
                    {enteredId[3]}
                </div>
            </div>
            <Keypad selectionHandler={setEnteredId} />
        </div>
        <div className="id-input-section">
            <div className="title-section">
                Passcode
            </div>
            <div className="input-view-section">
                <div className="number">
                    {enteredPasscode[0]}
                </div>
                <div className="number">
                    {enteredPasscode[1]}
                </div>
                <div className="number">
                    {enteredPasscode[2]}
                </div>
                <div className="number">
                    {enteredPasscode[3]}
                </div>
            </div>
            <Keypad goHandler={enteredPasscode.length === 4 && enteredId.length === 4 ? handleGo : null} selectionHandler={setEnteredPasscode} />
        </div>
    </div>
}