
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class SearchInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: ''
        }
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <input
            type="text"
            className="search-input"
            placeholder="请输入关键字"
            value={this.state.value}
            onChange={this.Changehandle.bind(this)}
            onKeyUp={this.KeyUpHandele.bind(this)}
            />
        )
    }
    componentDidMount(){
        //  
        this.setState({
            value: this.props.value || ''
        })
    }
    Changehandle(e){
        // 监控变化
        this.setState({
            value: e.target.value
        })

    }
    KeyUpHandele(e){
        // 监控enter
        if(e.keyCode !== 13){
            return
        }
        this.props.enterHandle(e.target.value)

    }
}

export default SearchInput