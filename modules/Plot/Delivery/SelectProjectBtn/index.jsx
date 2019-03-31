/*
 * @Author: wihoo.wanghao 
 * @Date: 2019-01-17 11:35:16 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-18 18:12:56
 */

import React from 'react'
import { Icon, Popover, Button, Table } from 'antd';
import intl from 'react-intl-universal'
import style from './style.less'
import Search from "../../../../components/public/Search"
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
            activeIndex: [],
            data: [
                {
                    id: 1,
                    key: 1,
                    projectName: <span><Icon type="folder" />三一集团</span>,
                    children: [
                        {
                            key: 2,
                            id: 2,
                            projectName: <span><Icon type="file-text" />三一集团</span>
                        },
                        {
                            key: 3,
                            id: 3,
                            projectName: <span><Icon type="file-text" />三一集团</span>,
                            children: [
                                {
                                    key: 4,
                                    id: 4,
                                    projectName: <span><Icon type="file-text" />三一集团</span>,
                                }
                            ]
                        },
                    ]
                },
                {
                    id: 5,
                    key: 5,
                    projectName: <span><Icon type="folder" />三一集团</span>,
                    children: [
                        {
                            key: 6,
                            id: 6,
                            projectName: <span><Icon type="file-text" />三一集团</span>
                        },
                        {
                            key: 7,
                            id: 7,
                            projectName: <span><Icon type="file-text" />三一集团</span>,
                            children: [
                                {
                                    key: 8,
                                    id: 8,
                                    projectName: <span><Icon type="file-text" />三一集团</span>,
                                }
                            ]
                        },
                    ]
                }
            ]
        }
    }
    handleKeyPress = (e) => {
     
      
    }
    handleKeyup = (e) => {
      
     
    }
    componentDidMount() {

        this.loadLocales();
       
        // window.addEventListener("keydown",(e)=>{
        //     console.log("鼠标按下down")
        //     if (e.keyCode == 16 || e.keyCode == 17) {
        //         this.setState({
        //             keyStatus: true,
        //         })
        //     }
        // })
        // window.addEventListener("keyup",(e)=>{
        //     console.log("鼠标抬起")
        //     this.setState({
        //         keyStatus: false,
        //     })
        // })
    }
    shouldComponentUpdate(nextProps,nextState){
       
        return true;
       
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
    getInfo = (record,event) => {
        let i = this.state.activeIndex.findIndex((value) => value === record.id)
        if (event.ctrlKey || event.shiftKey) {
            if (i != -1) {
                this.setState((prevState, props) => ({
                    activeIndex: [
                        ...prevState.activeIndex.slice(0, i),
                        ...prevState.activeIndex.slice(i + 1)
                    ]
                }));
            } else {
                this.setState((prevState, props) => ({
                    activeIndex: [...prevState.activeIndex, record.id]
                }));
            }

        } else {
            if(i!=-1){
                this.setState({
                    activeIndex: []
                })
            }else{
                this.setState({
                    activeIndex: [record.id]
                })
            }
            
        }

    }

    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        if(this.state.activeIndex.findIndex(value => record.id === value)>-1){
            return `${style['clickRowStyl']}`
        }else{
             return "";
        }
       
    }
    render() {
        console.log(this.state.activeIndex)
        const columns = [
            {
                title: "项目",
                dataIndex: 'projectName',
                key: 'projectName',
            }
        ]
        const content = (
            <div className={style.main}>
                <Search></Search>
                <div className={style.project} >
                    <Table columns={columns} dataSource={this.state.data} pagination={false}
                        rowClassName={this.setClassName}
                        rowKey={record => record.id}
                        scroll={{ y: 240 }}

                        onRow={(record, index) => {
                            return {
                                onClick: (event) => {
                                    console.log(event.ctrlKey)
                                    this.getInfo(record, event)

                                }

                            }
                        }
                        } />
                </div>
                <div className={style.footer}>
                    <span>按住ctr或shift可同时选择多个项目</span>
                    <div className={style.btn}>
                        <Button onClick={this.handleClose.bind(this)}>关闭项目</Button>
                        <Button type="primary" onClick={this.handleOpen.bind(this)}>打开项目</Button>
                    </div>
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
                            <Icon type="table" style={{paddingRight:"5px"}}/>
                            <span>选择项目</span>
                            <Icon type="caret-down" />
                        </div>
                    </Popover>
                }
            </div>
        )
    }
}

export default SelectProjectBtn