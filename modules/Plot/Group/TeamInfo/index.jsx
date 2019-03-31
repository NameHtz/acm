import React, { Component } from 'react'
import intl from 'react-intl-universal'

import style from './style.less'
import { connect } from 'react-redux'
import { curdCurrentData } from '../../../../store/curdData/action'
import TeamB from "../TeamTableB"
const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
class TeamInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,

        }
    }
    onClickHandle = (name) => {

        if (name == "DistributionBtn") {

            this.setState({
                distributeType: true
            })
        }
    }
    componentDidMount() {
        this.loadLocales();
    }

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        })
            .then(() => {
                // After loading CLDR locale data, start to render
                this.setState({ initDone: true });
            });
    }

    render() {
        return (
            <div className={style.main}>
                {this.state.initDone &&
                    <div className={style.GroupTeam}>
                        <h3 className={style.listTitle}>协作团队</h3>
                        <TeamB data={this.props.data} bizType={this.props.bizType}></TeamB>
                    </div>}
            </div>
        )
    }
}

export default TeamInfo
