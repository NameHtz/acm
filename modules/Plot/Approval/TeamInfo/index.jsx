import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, Checkbox, Spin } from 'antd'
import style from './style.less'
import dynamic from 'next/dynamic'
import TeamTable from "../TeamTable"
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
    onClickHandle = (name) => {

        if (name == "DistributionBtn") {
            console.log(this)
            this.setState({
                distributeType: true
            })
        }
    }
    render() {
        return (
            <div className={style.main}>
                {this.state.initDone &&
                    <div style={{height:"100%"}}>
                        <h3 className={style.listTitle}>项目团队</h3>
                        
                            <TeamTable data={this.props.data}></TeamTable>
                      
                    </div>}
            </div>

        )
    }
}

export default TeamInfo
