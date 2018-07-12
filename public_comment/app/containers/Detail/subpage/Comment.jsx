import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getCommentData } from '../../../fetch/detail/detail.js'
import CommentList from '../../../components/CommentList/index.jsx'
import LoadMore from '../../../components/LoadMore/index.jsx'
import './style.less'

class Comment extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            data: [],
            hasMore: false,//是否还有可展示的数据
            isLoadingMore: false,//是加载中还是加载更多
            page: 1 //下一页的页码

        }
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="detail-comment-subpage">
                <h2>用户点评</h2>
               { this.state.data.length
                ? <CommentList data= {this.state.data}/>
                : <div>加载中...</div>
               }
               {
                this.state.hasMore
                ? <LoadMore isLoadingMore={this.state.isLoadingMore}
                loadMoreFn={this.loadMoreData.bind(this)} />
                : ''
               }
            </div>
        )
    }
    componentDidMount(){
        this.LoadFistPageData()
    }
    LoadFistPageData(){
        const id = this.props.id
        const result=getCommentData(0,id)
        // console.log(result);
        this.resultHandle(result)
        // console.log(result);
    }
    loadMoreData(){
        //记录状态
        this.setState({
            isLoadingMore: true
        })

        const id=this.props.id
        const page=this.state.page
        const result = getCommentData(page, id)
        this.resultHandle(result)

        this.setState({
            isLoadingMore: false
        })
    }
    resultHandle(result) {
        result.then(res=>{
            return res.json()
        }).then(json=>{
            // 增加页数
            const page=this.state.page
            this.setState({
                page: page+1
            })

            const hasMore = json.hasMore
            const data= json.data
            // console.log(data);

            this.setState({
                hasMore: hasMore,
                data: this.state.data.concat(data)
            })

        })
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// module.exports = Comment
export default Comment
