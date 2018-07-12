import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getInfoData } from '../../../fetch/detail/detail.js'
import DetailInfo from '../../../components/DetailInfo/index.jsx'

class Info extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state= {
            info: false
        }
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                {
                    this.state.info
                    ? <DetailInfo id={this.props.id} data={this.state.info}/>
                    : ''
                }
            </div>
        )
    }
    componentDidMount () {
        var id = this.props.id
        var result = getInfoData(id)
        result.then (res=>{
            return res.json()
        }).then(json=> {
            this.setState({
                info: json
            })
        })
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// module.exports = Info
export default Info
