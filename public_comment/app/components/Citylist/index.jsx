import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class Citylist extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    clickHandle(){
        window.history.back()
    }
    render() {
        return (
            <div className='city-list-container'>
                <h3>热门城市</h3>
                <ul className='clear-fix'>
                    <li>
                        <span onClick={this.clickHandle.bind(this,'北京')}>北京</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this,'上海')}>上海</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this,'杭州')}>杭州</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this,'成都')}>成都</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this,'天津')}>天津</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this,'广州')}>广州</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this,'深圳')}>深圳</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this,'厦门')}>厦门</span>
                    </li>
                    <li>
                        <span onClick={this.clickHandle.bind(this,'大理')}>大理</span>
                    </li>
                </ul>
            </div>
        )
    }
    clickHandle(newCity){
        const changeFn=this.props.changeFn
        changeFn(newCity)

    }
}


// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// module.exports = Citylist
export default Citylist