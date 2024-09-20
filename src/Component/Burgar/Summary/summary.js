import React from 'react';

const Summary = props => {
    const BurgarSummary = props.BurgarElements.map(item => {
        return (
            <li key={item.type}>
                <span style={{ textTransform: 'capitalize' }}>{item.type}</span>:{item.amount}
            </li>
        )
    })
    return (
        <div>
            <ul>
                {BurgarSummary}
            </ul>
        </div>
    )
}

export default Summary;