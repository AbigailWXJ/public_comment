import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import Header from '../../components/Header/index.jsx'
import UserInfo from '../../components/UserInfo'
import OrderList from './subpage/OrderList.jsx'

class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const userinfo=this.props.userinfo
        // console.log(userinfo.username);
        // console.log(userinfo.cityName);
        return (
            <div>
                <Header Header_title="用户中心" backRouter="/" />
                <UserInfo username={userinfo.username} cityName={userinfo.cityName}/>
                <OrderList username={userinfo.username}/>
            </div>
        )
    }
    componentDidMount(){
        //如果未登录，跳转到登录页面
        if(!this.props.userinfo.username) {
            hashHistory.push('/Login')
        }
    }

}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// module.exports = User
// 
function mapStateToProps(state){
    return {
        userinfo: state.userinfo
    }
}
function mapDispatchToProps(dispatch){
    return {
        
    }
}
export default connect (
    mapStateToProps,
    mapDispatchToProps
)(User)
