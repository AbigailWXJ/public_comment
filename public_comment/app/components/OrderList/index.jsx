import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Item from './Item/index.jsx'

import './style.less'

class OrderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const data=this.props.data
        const submitComment=this.props.submitComment
        return (
            <div>
                {
                    data.map((item,index)=>{
                        return <Item key={index} data={item} submitComment={submitComment}/> 
                    })
                }
            </div>
        )
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// module.exports = OrderList
export default OrderList
