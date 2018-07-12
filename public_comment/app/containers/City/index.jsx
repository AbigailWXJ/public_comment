import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as useInfoActionsFromOtherFile from '../../actions/userinfo.js'
import Header from '../../components/Header/index.jsx'
import CurrentCity from '../../components/CurrentCity/index.jsx'

import Citylist from '../../components/Citylist/index.jsx'
import LocalStore from '../../util/localStore.js'
import { CITYNAME } from '../../config/localStoreKey.js'
import { hashHistory } from 'react-router'

class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <Header Header_title="选择城市"></Header>
                <CurrentCity cityName={this.props.userinfo.cityName}></CurrentCity>
                <Citylist changeFn={this.changeFn.bind(this)}></Citylist>
            </div>
        )
    }
    changeFn(newCity){
        // 将新选择的城市改为当前的城市，因为这里是智能组件，可以在这里获取redux里面的值
        if(newCity==null){
            return
        }
        //修改redux
        const userinfo=this.props.userinfo
        userinfo.cityName=newCity
        this.props.userInfoActions.update(userinfo)//相当于dispatch一个action
        //修改localStorage
        LocalStore.setItem(CITYNAME,newCity)
        //跳转到首页
        hashHistory.push('/')
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// // module.exports = City
function mapStatetoProps(state){
    return {
        userinfo: state.userinfo
    }
}
function mapDispatchtoProps(dispatch){
    return {
        userInfoActions: bindActionCreators(useInfoActionsFromOtherFile,dispatch)
    }
}
export default connect(
    mapStatetoProps,
    mapDispatchtoProps
)(City)

