import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { bindActionCreators} from 'redux'
import BuyAndStore from '../../../components/BuyandStore/index.jsx'
//引入action
import * as storeActionsFromFile from '../../../actions/store.js'


class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            isStore: false
        }
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <BuyAndStore isStore={this.state.isStore} 
                buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)}/>
            </div>
        )
    }
    componentDidMount(){
        // console.log(123,this.props.store);
        // console.log(456,this.props.storeActions);
    }
    // 购买事件
    buyHandle(){
        //验证登录
        const loginFlag = this.loginCheck()
        if(!loginFlag){
            return 
        }
        //购买流程
        //
        //
        //跳转到用户页面，以显示所购买的东西
        hashHistory.push('/User')

    }
    //检查当前商户是否已被收藏
    checkStoreState(){
        const id = this.props.id
        const store = this.props.store

        //只要有一个值满足条件就返回true
        store.some((item)=>{
            if(item.id === id){
                this.setSate({
                    isStore: treu
                })
                //跳出循环
                return true
            }
        })
    }
    // 收藏事件
    storeHandle(){
        //验证登录
        const loginFlag = this.loginCheck()
        if(!loginFlag){
            return 
        }

        const id = this.props.id
        const storeActions = this.props.storeActions

        if(this.state.isStore) {
            // 当前商户已经被收藏。点击时即要取消收藏
            storeActions.rm({id: id})
        }else {
            // 当前商户未被收藏。点击时即要执行收藏
            storeActions.add({id: id})
        }

        //修改状态
        this.setSate({
            isStore: !isStore
        })

    }
    // 登录验证
    loginCheck(){
        const id= this.props.id
        const userinfo=this.props.userinfo
        if(!userinfo.name){
            //用户没有登录，直接
            //跳转到登录页面的时候，要传入目标router，以便登录完了可以自己跳转回来
            hashHistory.push('/Login' + encodeURIComponent('/detail/' + id))

            return false
        }
            return true
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// module.exports = Buy


function mapStateToProps(state){
    return {
        userinfo: state.userinfo,
        store: state.store
    }
}
function mapDispatchToProps(dispatch){
    return {
        storeActions: bindActionCreators(storeActionsFromFile,dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)
