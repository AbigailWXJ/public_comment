import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'
import SearchInput from '../SearchInput/index.jsx'
import { hashHistory } from 'react-router'
import './style.less'

class HomeHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div id="home-header" className = "clear-fix">
                <div className="home-header-left float-left">
                    <Link to="/city">
                        <span>{this.props.cityName}</span>
                        &nbsp;
                        <i className = "icon-angle-down"></i>
                    </Link>
                </div>
                <div className="home-header-right float-right">
                    <Link to="/Login">
                        <i className="icon-user"></i>
                    </Link>
                </div>
                <div className="home-header-middle">
                    <div className="search-container">
                        <i className="icon-search"></i>
                        &nbsp;
                        <SearchInput value='' enterHandle={this.enterHandle.bind(this)} />
                    </div>
                </div>
            </div>
        )
    }
    enterHandle(value){
        // console.log(123,value)
        hashHistory.push('/search/all/' + encodeURIComponent(value))
    }
}

export default HomeHeader