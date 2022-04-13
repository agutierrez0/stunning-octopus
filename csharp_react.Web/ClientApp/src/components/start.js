import React, { useState } from 'react';
import './css/start.css';

export default function Start() {
    const [loading, setLoading] = useState(false);
    const [enteredId, setEnteredId] = useState([])
    const [enteredPasscode, setEnteredPasscode] = useState([])

    function handleNewNumber(isId, number) {
        if (isId) {
            setEnteredId(oldArray => [...oldArray, number])
        } else {
            setEnteredPasscode(oldArray => [...oldArray, number])
        }
    }

    function handleBackSpace(isId) {
        if (isId) {
            enteredId.pop()
        } else {
            enteredPasscode.pop()
        }
    }

    function handleGo() {
        setLoading(true)
        const finalId = enteredId.join('')
        const finalPasscode = enteredPasscode.join('')
        const item = { employeeId: finalId, passcode: finalPasscode}
        
        fetch("/api/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        .then(res => {
            if (res.status === 200) {
                sessionStorage.setItem('employeeId', finalId)
                window.location.href = "/platform"
            } else {
                setEnteredId([])
                setEnteredPasscode([])
                alert('invalid passcode and/or password')
                setLoading(false)
            }
        })
    }

    return loading ? <div>loading...</div> : <div className="start-container">
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
            <div className="keypad-section">
                <div className="keypad">
                    <div className="keypad-row">
                        <div className="keypad-number" onClick={() => handleNewNumber(true, 1)}>
                            1
                        </div>
                        <div className="keypad-number" onClick={() => handleNewNumber(true, 2)}>
                            2
                        </div>
                        <div className="keypad-number" onClick={() => handleNewNumber(true, 3)}>
                            3
                        </div>
                    </div>
                    <div className="keypad-row">
                        <div className="keypad-number" onClick={() => handleNewNumber(true, 4)}>
                            4
                        </div>
                        <div className="keypad-number" onClick={() => handleNewNumber(true, 5)}>
                            5
                        </div>
                        <div className="keypad-number" onClick={() => handleNewNumber(true, 6)}>
                            6
                        </div>
                    </div>
                    <div className="keypad-row">
                        <div className="keypad-number" onClick={() => handleNewNumber(true, 7)}>
                            7
                        </div>
                        <div className="keypad-number" onClick={() => handleNewNumber(true, 8)}>
                            8
                        </div>
                        <div className="keypad-number" onClick={() => handleNewNumber(true, 9)}>
                            9
                        </div>
                    </div>
                    <div className="keypad-row">
                        <div className="keypad-number" onClick={() => handleBackSpace(true)} style={enteredId.length > 0 ? {backgroundColor: 'red'} : {backgroundColor: 'transparent'}}>
                            {enteredId.length > 0 ? "BACK" : null}
                        </div>
                        
                        <div className="keypad-number" onClick={() => handleNewNumber(true, 0)}>
                            0
                        </div>
                        <div className="keypad-number" style={{backgroundColor: 'transparent'}}>

                        </div>
                    </div>
                    
                </div>
            </div>
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
            <div className="keypad-section">
                <div className="keypad">
                    <div className="keypad-row">
                        <div className="keypad-number" onClick={() => handleNewNumber(false, 1)}>
                            1
                        </div>
                        <div className="keypad-number" onClick={() => handleNewNumber(false, 2)}>
                            2
                        </div>
                        <div className="keypad-number" onClick={() => handleNewNumber(false, 3)}>
                            3
                        </div>
                    </div>
                    <div className="keypad-row">
                        <div className="keypad-number" onClick={() => handleNewNumber(false, 4)}>
                            4
                        </div>
                        <div className="keypad-number" onClick={() => handleNewNumber(false, 5)}>
                            5
                        </div>
                        <div className="keypad-number" onClick={() => handleNewNumber(false, 6)}>
                            6
                        </div>
                    </div>
                    <div className="keypad-row">
                        <div className="keypad-number" onClick={() => handleNewNumber(false, 7)}>
                            7
                        </div>
                        <div className="keypad-number" onClick={() => handleNewNumber(false, 8)}>
                            8
                        </div>
                        <div className="keypad-number" onClick={() => handleNewNumber(false, 9)}>
                            9
                        </div>
                    </div>
                    <div className="keypad-row">

                        <div onClick={() => handleBackSpace(false)} className="keypad-number" style={enteredPasscode.length > 0 ? {backgroundColor: 'red'} : {backgroundColor: 'transparent'}}>
                            {enteredPasscode.length > 0 ? "BACK" : null}
                        </div>
                        
                        <div className="keypad-number" onClick={() => handleNewNumber(false, 0)}>
                            0
                        </div>

                        <div className="keypad-number" style={enteredPasscode.length === 4 && enteredId.length === 4 ? {backgroundColor: 'green'} : {backgroundColor: 'transparent'}} onClick={handleGo}>
                            {enteredPasscode.length === 4 && enteredId.length === 4 ? "GO" : null}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
}