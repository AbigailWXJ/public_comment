import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { hashHistory } from 'react-router'
import './style.less'

class Header extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    clickHandle(){
        const backRouter = this.props.backRouter
        if(backRouter){
            hashHistory.push(backRouter)
        }else {
            window.history.back()
        }

    }
    render() {
        return (
            <div id="common-header">
                <span className="back-icon" onClick={this.clickHandle.bind(this)}>
                    <i className= "icon-chevron-left"></i>
                </span>
                <h1>{this.props.Header_title}</h1>
            </div>
        )
    }
}


// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// module.exports = Header
export default Header