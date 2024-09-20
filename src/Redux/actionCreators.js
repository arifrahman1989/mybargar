import * as actionType from './actionType';
import axios from 'axios';

export const addElement = igtype => {
    return {
        type: actionType.ADD_BURGARELEMENT,
        payload: igtype,
    }
}

export const removeElement = igtype => {
    return {
        type: actionType.REMOVE_BURGARELEMENT,
        payload: igtype,
    }
}

export const updatePurchasable = () => {
    return {
        type: actionType.UPDATE_PURCHASABLE,
    }
}

export const resetburgarelement = () => {
    return {
        type: actionType.RESET_BURGARELEMENT,
    }
}
export const loadorders = orders => {
    return {
        type: actionType.LOAD_ORDERS,
        payload: orders,
    }
}
export const ordersloadfaield = () => {
    return {
        type: actionType.ORDERS_LOAD_FAIELD,
    }
}


export const fetchOrders = (token, userId) => dispatch => {
    let selfOrder = '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('https://burgar-project-default-rtdb.firebaseio.com/orders.json?auth=' + token + selfOrder)
        .then(response => {
            dispatch(loadorders(response.data));
        })
        .catch(err => {
            dispatch(ordersloadfaield());
        })
}