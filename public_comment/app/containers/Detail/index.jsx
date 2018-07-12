import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/Header/index.jsx'
import Info from './subpage/index.jsx'
import Buy from './subpage/buy.jsx'
import Comment from './subpage/Comment.jsx'

class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        // 获取商户id
        const id = this.props.params.id
        console.log(id);
        return (
            <div>
                <Header Header_title= "商户详情" />
                <Info id={id}/>
                <Buy />
                <Comment id={id}/>
            </div>
        )
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// module.exports = Detail
export default Detail
