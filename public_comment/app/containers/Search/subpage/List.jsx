import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { getSearchData } from '../../../fetch/search/search'
import ListComponent from '../../../components/List/index.jsx'
import LoadMore from '../../../components/LoadMore/index.jsx'


const initialState = {
            data: [],
            hasMore: false,
            isLoadingMore: false,
            page: 1
}
class SearchList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state =initialState
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                {
                    this.state.data.length
                    ? <ListComponent data= {this.state.data}/>
                    :<div>加载中...</div>
                }
                {
                    this.state.hasMore
                    ? <LoadMore isLoadingMore={this.state.isLoadingMore}
                    loadMoreFn= {this.loadMoreData.bind(this)}/>
                    : ''
                }
            </div>
        )
    }
    componentDidMount(){
        // 获取首页数据
        this.loadFirstPageData()
    }
     // 获取首页数据
    loadFirstPageData(){
        const cityName = this.props.userinfo.cityName
        const keyword = this.props.keyword || ''
        const category = this.props.category
        const result = getSearchData(0,cityName, category, keyword)
        this.resultHandle(result)

    }
    // 加载更多数据
    loadMoreData () {
        //记录状态
        this.setState({
            isLoadingMore : true
        })

        const cityName = this.props.userinfo.cityName
        const page = this.state.page
        const keyword = this.props.keyword || ''
        const category = this.props.category
        const result = getSearchData (page,cityName,category,keyword)
        this.resultHandle(result)

        //更新状态
        this.setState({
            isLoadingMore : false
        })
    }
    // 处理数据
    resultHandle(result){
        // 增加page计数
        const page = this.state.page
        this.setState({
            page: page + 1
        })
        result.then(res=>{
            return res.json()
        }).then(json=>{
            const hasMore = json.hasMore
            const data = json.data
            this.setState({
                hasMore: hasMore,
                // 注意，这里将最新获取的数据，拼接到原数据之后，使用concat函数
                data: this.state.data.concat(data),
            })
        })

    }
    // 处理重新搜索
    componentDidUpdate(prevProps, prevState){
        const keyword = this.props.keyword
        const category = this.props.category

        // 搜索条件完全相等时，忽略，这里非常重要！！！！
        if(keyword === prevProps.keyword && category === prevProps.category){
            return
        }
        //重置 state
        this.setState(initialState)
        //重新加载数据
        this.loadFirstPageData()
    }
}




function mapStateToProps(state){
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch){
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchList)