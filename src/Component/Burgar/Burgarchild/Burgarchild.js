import React from 'react';
import './Burgarchild.css';
import BurgarElement from '../BurgarElement/BurgarElement';

const Burgarchild = props => {
    let BurgarArr = props.BurgarElements.map(item => {
        let amountArr = [...Array(item.amount).keys()];
        return amountArr.map(_ => {
            return <BurgarElement type={item.type} key={Math.random()} />
        })
    })
        .reduce((arr, element) => {
            return arr.concat(element);
        }, []);

    if (BurgarArr.length === 0) {
        BurgarArr = <p>Please Add Me</p>
    }
    return (
        <div className='burgar'>
            < BurgarElement type='burgar-top' />
            {BurgarArr}
            < BurgarElement type='burgar-bottom' />
        </div>
    )
}
export default Burgarchild;