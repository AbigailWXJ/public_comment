import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from '../../components/Header/index.jsx'
import { hashHistory } from 'react-router'

import * as userInfoActionsFromOtherFile from '../../actions/userinfo.js'
import LoginComponent from '../../components/Login/index'

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state ={
            checking: true //认证中
        }
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
            <Header Header_title="登录" />
                { this.state.checking
                    ? <div>等待中</div>
                    : <LoginComponent loginFn={this.logHandle.bind(this)} />
                }
            </div>
        )
    }
    componentDidMount(){
        this.doCheck()
    }
    //登录成功之后的业务处理
    logHandle(username){
        // 保存用户名
        const actions = this.props.userInfoActions
        let userinfo = this.props.userinfo
        userinfo.username = username//改变用户的名字
        actions.update(userinfo)

        // 跳转链接
        const params = this.props.params
        const router = params.router
        if (router){
            hashHistory.push(router)
        }else {
            //跳转到默认页面
            this.goUserPage()
        }

    }
    doCheck(){
        const userinfo = this.props.userinfo
        if(userinfo.username) {
            // 已经登录
            this.goUserPage()
        }else{
            // 尚未登录
            this.setState({
                checking: false
            })
        }

    }
    goUserPage(){
        hashHistory.push('/User')

    }
}

function mapStateToProps(state){
    return {
        userinfo: state.userinfo
    }
}
function mapDispatchToProps(dispatch){
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)