import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'

import HomeHeader from '../../components/HomeHeader/index.jsx'
import Category from '../../components/Category/index.jsx'
import Ad from './subpage/Ad.jsx'
import List from './subpage/List.jsx'
class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <HomeHeader cityName={this.props.userinfo.cityName}></HomeHeader>
                <Category></Category>
                <div style={{height: '15px'}}></div>
                <Ad/>
                <List cityName={this.props.userinfo.cityName} />
            </div>
        )
    }
}

function mapStatetoProps(state){
    return {
        userinfo: state.userinfo

    }
}
function mapDispatchtoProps(dispatch){
    return {

    }
}
export default connect(
    mapStatetoProps,
    mapDispatchtoProps
)(Home)