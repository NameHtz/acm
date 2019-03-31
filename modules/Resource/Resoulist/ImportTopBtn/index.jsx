/*
 * @Author: wihoo.wanghao 
 * @Date: 2019-01-17 11:35:16 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-23 15:23:11
 */

import React from 'react'
import { Icon, Popover, Button, Table, Checkbox } from 'antd';
import intl from 'react-intl-universal'
import style from './style.less'

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
class SelectProjectBtn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            visible: false,
          
              
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
    handleClose = () => {
        this.setState({
            visible: false,
        });
    }
    handleOpen = () => {
        this.setState({
            visible: false,
        });
    }
    handleVisibleChange = (visible) => {
        this.setState({ visible });
    }
   

    
    render() {
        
        const content = (
            <div className={style.main}>
              
                <div className={style.project} >
                  <Checkbox>更新已存在用户</Checkbox>
                  <br/>
                  <Checkbox>追加新用户</Checkbox>
                  <br/>
                  <Checkbox>删除不存在用户</Checkbox>
                </div>
          
                    <div className={style.btn}>
                       
                        <Button type="primary" >更新</Button>
                    </div>
               
            </div>
        );
        return (

            <div className={style.main}>
                {this.state.initDone &&
                    <Popover
                        placement="bottomLeft"
                        content={content} trigger="click"
                        visible={this.state.visible}
                        onVisibleChange={this.handleVisibleChange}
                    >
                        <div className={style.titleass}>
                            <Icon type="download" style={{ paddingRight: "5px" }} />
                            <span>导入</span>
                        </div>
                    </Popover>
                }
            </div>
        )
    }
}

export default SelectProjectBtn