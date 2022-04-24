import React from 'react';

export default function Keypad({selectionHandler, goHandler}) {

    function handleNewNumber(number) {
        selectionHandler(oldArray => {
            if (oldArray.length <= 3) {
                return [...oldArray, number]
            } else {
                return oldArray
            }
        })
    }

    return <div className="keypad-section">
                <div className="keypad">
                    <div className="keypad-row">
                        <div className="keypad-number" onClick={() => handleNewNumber(1)}>
                            1
                        </div>
                        <div className="keypad-number" onClick={() => handleNewNumber(2)}>
                            2
                        </div>
                        <div className="keypad-number" onClick={() => handleNewNumber(3)}>
                            3
                        </div>
                    </div>
                    <div className="keypad-row">
                        <div className="keypad-number" onClick={() => handleNewNumber(4)}>
                            4
                        </div>
                        <div className="keypad-number" onClick={() => handleNewNumber(5)}>
                            5
                        </div>
                        <div className="keypad-number" onClick={() => handleNewNumber(6)}>
                            6
                        </div>
                    </div>
                    <div className="keypad-row">
                        <div className="keypad-number" onClick={() => handleNewNumber(7)}>
                            7
                        </div>
                        <div className="keypad-number" onClick={() => handleNewNumber(8)}>
                            8
                        </div>
                        <div className="keypad-number" onClick={() => handleNewNumber(9)}>
                            9
                        </div>
                    </div>
                    <div className="keypad-row">
                        <div className="keypad-number" onClick={() => selectionHandler([])} style={{backgroundColor: 'yellow'}}>
                            CLEAR
                        </div>
                        
                        <div className="keypad-number" onClick={() => handleNewNumber(0)}>
                            0
                        </div>

                        {goHandler ? <div className="keypad-number" style={{backgroundColor: 'green'}} onClick={goHandler}>GO</div> : <div className="keypad-number" style={{backgroundColor: 'transparent'}}></div>}
                    </div>
                    
                </div>
            </div>
}