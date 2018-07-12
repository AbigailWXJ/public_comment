import * as actionTypes from '../actions/store.js'

//定义一个初始状态,因为是一个id列表，所有用数组来存
const initialState = []

export default function store (state=initialState, action) {
    switch(action.type) {
        case actionTypes.STORE_UPDATE:
            return action.data
        case actionTypes.STORE_ADD:
            state.unshift(action.data)
            return state
        case actionTypes.STORE_RM:
            return state.filter(item =>{
                if(item.id !== action.data.id){
                    return item
                }
            })
        default:
        return state
    }
}