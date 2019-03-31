import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, Tabs, Checkbox } from 'antd'
import style from './style.less'
import TeamA from "../../Group/TeamTableB"
import TeamB from "../../Approval/TeamTable"
const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
class FileInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            team:true
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
    handleClick=(i)=>{
        if(i==1){
            this.setState({
                team:true
            })
        }else{
            this.setState({
                team:false
            })
        }
        
    }
    render() {
        return (
            <div className={style.main}>
                {this.state.initDone &&
                    <div className={style.TeamInfo2}>
                      <div className={style.headtitle}>
                          <h3 className={this.state.team? style.listTitle1:style.listTitle} onClick={this.handleClick.bind(this,1)}>项目团队</h3>
                            <div className={style.line}></div>
                          <h3 className={!this.state.team? style.listTitle1:style.listTitle} onClick={this.handleClick.bind(this,0)}>协作团队</h3>
                      </div>
                      {this.state.team && <TeamB></TeamB>}
                      {!this.state.team && <TeamA></TeamA>}
                    </div>}
                    
            </div>
        )
    }
}

export default FileInfo