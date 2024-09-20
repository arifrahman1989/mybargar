import * as actionType from './actionType';

const BURGARELEMENT_PRICE = {
    salad: 30,
    cheese: 50,
    meat: 70,
}


const INITIAL_STATE = {
    BurgarElements: [
        { type: 'salad', amount: 0 },
        { type: 'cheese', amount: 0 },
        { type: 'meat', amount: 0 },
    ],
    orders: [],
    orderLoading: true,
    orderErr: false,
    totalPrice: 100,
    token: null,
    userId: null,
    authLoading: false,
    authFailedMsg: null,
}

export const reducer = (state = INITIAL_STATE, action) => {
    const BurgarElements = [...state.BurgarElements];
    switch (action.type) {
        case actionType.ADD_BURGARELEMENT:
            for (let item of BurgarElements) {
                if (item.type === action.payload)
                    item.amount++;
            }
            return {
                ...state,
                BurgarElements: BurgarElements,
                totalPrice: state.totalPrice + BURGARELEMENT_PRICE[action.payload],
            }
        case actionType.REMOVE_BURGARELEMENT:
            for (let item of BurgarElements) {
                if (item.type === action.payload) {
                    if (item.amount <= 0) return state;
                    item.amount--;
                }
            }
            return {
                ...state,
                BurgarElements: BurgarElements,
                totalPrice: state.totalPrice - BURGARELEMENT_PRICE[action.payload],
            }

        case actionType.UPDATE_PURCHASABLE:
            const sum = state.BurgarElements.reduce((sum, element) => {
                return sum + element.amount;
            }, 0)
            return {
                ...state,
                purchasable: sum > 0,
            }

        case actionType.RESET_BURGARELEMENT:
            return {
                ...state,
                BurgarElements: [
                    { type: 'salad', amount: 0 },
                    { type: 'cheese', amount: 0 },
                    { type: 'meat', amount: 0 },
                ],
                totalPrice: 100,
            }
        case actionType.LOAD_ORDERS:
            let orders = [];
            for (let key in action.payload) {
                orders.push({
                    ...action.payload[key],
                    id: key,
                })
            }
            return {
                ...state,
                orders: orders,
                orderLoading: false,
            }
        case actionType.ORDERS_LOAD_FAIELD:
            return {
                ...state,
                orderErr: true,
                orderLoading: false,
            }
        // Auth case
        case actionType.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,

            }
        case actionType.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
            }
        case actionType.AUTH_LODDING:
            return {
                ...state,
                authLoading: action.payload,

            }
        case actionType.AUTH_FAIELD:
            return {
                ...state,
                authFailedMsg: action.payload,
            }
        default:
            return state;
    }

}