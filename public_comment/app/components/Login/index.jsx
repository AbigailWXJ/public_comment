
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class LoginComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            value: ''
        }
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        // console.log(this.props.loginFn);
        // 下面是约束型组件
        return (
            <div id="login-container">
                <div className="input-container phone-container">
                    <i className="icon-tablet"></i>
                    <input 
                        type="text" 
                        placeholder="输入手机号" 
                        onChange={this.changeHandle.bind(this)} 
                        value={this.state.value}
                    />
                </div>
                <div className="input-container password-container">
                    <i className="icon-key"></i>
                    <button>发送验证码</button>
                    <input type="text" placeholder="输入验证码"/>

                </div>
                <button className="btn-login" onClick={this.clickHandle.bind(this)}>登录</button>
            </div>
            )
    }
    changeHandle(e){
        this.setState({
            value: e.target.value
        })
    }
    clickHandle(){
        const username=this.state.value //这里为了简单直接将电话号码当作是username
        const loginFn= this.props.loginFn //父组件传入的函数，需要将值传给父组件
        loginFn(username)
    }
}

export default LoginComponent