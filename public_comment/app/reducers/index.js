import { combineReducers } from 'redux'
import userinfo from './userinfo'
import store from './store.js'

//合并reducer
export default combineReducers({
    userinfo,
    store
})