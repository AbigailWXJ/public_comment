import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getOrderListData, postComment} from '../../../fetch/user/orderlist.js'
import OrderListComponent from '../../../components/OrderList/index.jsx'
import './style.less'

class OrderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            data:[]
        }
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="order-list-container">
                <h2>您的订单</h2>
                {
                    this.state.data.length
                    ?<OrderListComponent data={this.state.data} submitComment={this.submitComment.bind(this)}/>
                    : <div>loading</div>
                }
            </div>
        )
    }
    componentDidMount(){
        // 获取订单信息
        const username= this.props.username
        if(username) {
            this.loadOrderList(username)

        }
    }
    loadOrderList(username){
        const result=getOrderListData(username)
        // console.log(result);
        result.then (res=>{
            return res.json()
        }).then(json=> {
            this.setState({
                data: json
            })
        })
    }
    submitComment(id, value, callback){
        const result = postComment(id, value)
        result.then(res=>{
            return res.json()
        }).then(json=>{
            if(json.errno ===0) {
                //已经评价，修改状态
                callback()
            }
        })
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// module.exports = OrderList
export default OrderList
