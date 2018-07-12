import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getAdData} from '../../../fetch/home/home.js'
import HomeAd from '../../../components/HomeAd/index.jsx'
class Ad extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            data:[]
        }
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                {this.state.data.length
                    ? <HomeAd data={this.state.data}/>
                : <div>{/*加载中...*/}</div>}
            </div>
        )
    }
    componentDidMount(){
        // 获取广告数据
        const result = getAdData()
        result.then(res=>{
            return res.json()
        }).then(json=>{
            //获取处理数据
            const data = json
            if(data.length){
                this.setState({
                    data:data
                })
            }
        })
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
export default Ad
// module.exports = Ad