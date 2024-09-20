import React from 'react';
import './BurgarElement.css';
import BurgarTop from '../../../assets/images/top.png';
import BurgarBottom from '../../../assets/images/bottom.png';
import Salad from '../../../assets/images/salad.png';
import Meat from '../../../assets/images/meat.png';
import Cheese from '../../../assets/images/cheese.png';


const BurgarElement = props => {
    let burgarelement = null;
    switch (props.type) {
        case 'burgar-top':
            burgarelement = <div><img src={BurgarTop} alt='Top Burgar' /></div>;
            break;
        case 'burgar-bottom':
            burgarelement = <div><img src={BurgarBottom} alt='Bottom Burgar' /></div>;
            break;
        case 'salad':
            burgarelement = <div><img src={Salad} alt='Salad' /></div>;
            break;
        case 'meat':
            burgarelement = <div><img src={Meat} alt='Meat' /></div>;
            break;
        case 'cheese':
            burgarelement = <div><img src={Cheese} alt='Cheese' /></div>;
            break;
        default:
            burgarelement = null;
    }
    return (
        <div className='BurgarElement'>
            {burgarelement}
        </div>
    )
}

export default BurgarElement;