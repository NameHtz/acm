import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, Icon, Select ,Spin,Checkbox} from 'antd'
import dynamic from 'next/dynamic'
import style from './style.less'
import EditModal from './EditModal'
import DeleteTopBtn from "../../../../components/public/TopTags/DeleteTopBtn"
import AddTopBtn from '../../../../components/public/TopTags/AddTopBtn'
import ModifyTopBtn from '../../../../components/public/TopTags/ModifyTopBtn'
import CheckModal from "./CheckModal/"

import {questionHandleList,questionHandleDelete} from '../../../../api/api'
import axios from '../../../../api/axios';

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
import emitter from "../../../../api/ev";
const Option = Select.Option;
class ProfdBackInfoTem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            visibleAdd:false,
            visibleModify:false,
            visibleType:false,
            visible:false,
            activeIndex:'',
            title:'',
            selectDelId:[],

            //数据实例
            data: [
                // {
                //     id:'1',
                //     key: "1",
                //     delvTitle: "项目计划发布时是需要走审批流程的，审批人一般都是项目相干负责人",
                //     delvTime: "2018-03-23",
                //     delver: "孙伯禹",
                //     attachmentNum:2,
                // },
                // {
                //     id:'2',
                //     key: "2",
                //     delvTitle: "项目计划发布时是需要走审批流程的，审批人一般都是项目相干负责人",
                //     delvTime: "2018-03-23",
                //     delver: "孙伯禹",
                //     attachmentNum:2,
                // },
                // {
                //     id:'3',
                //     key: "3",
                //     delvTitle: "项目计划发布时是需要走审批流程的，审批人一般都是项目相干负责人",
                //     delvTime: "2018-03-23",
                //     delver: "孙伯禹",
                //     attachmentNum:2,
                // },
            ]
        }
    }

    componentDidMount() {
        this.loadLocales();
        
        this.getQuestionHandleList()
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
        console.log(name)
        if (name == "AddTopBtn") {
            this.setState({
                isShowEditModal:true,
                editModalTitle:"新增修改记录"
            })
            
        }
        if(name == "ModifyTopBtn"){
            this.setState({
                isShowEditModal:true,
                editModalTitle:"修改修改记录"
            })
        }
        
        if(name == 'DeleteTopBtn'){
            //删除
            axios.put(questionHandleDelete,selectDelId).then((result) => {
                console.log(result)
            }).catch((err) => {
                console.log(err)
            });
        }
    }
   //关闭新增或修改
   closeEditModal=()=>{
    this.setState({
        isShowEditModal:false,
     
    })
   }
    getInfo = (record,index) => {
        let id = record.id,records = record
        if (this.state.activeIndex == id) {
            id = ''
            records = ''
        }
        this.setState( {
                           activeIndex: id
                       } )
    }

    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : "";
    }
    //显示附件
    onClickHandleCheck=()=>{
        this.setState({
            isShowCheckModal:true
        })
    }
    //关闭附件
    closeCheckModal=()=>{
        this.setState({
            isShowCheckModal:false
        })
    }

    // 获取处理记录
    getQuestionHandleList = () => {
        axios.get(questionHandleList(' ')).then((result) => {
            // console.log(result,'获取处理记录')
            let data = result.data.data;
            if(data.length != 0 ){
                this.setState({
                    data
                })
            }
        }).catch((err) => {
            console.log(err)
        });
    }
    render(){
        const columns = [
            {
                title: "处理结果说明",
                dataIndex: 'delvTitle',
                key: 'delvTitle',
            },
            {
                title: "处理时间",
                dataIndex: 'delvTime',
                key: 'delvTime',
            },
            {
                title: "处理人",
                dataIndex: 'delver',
                key: 'delver',
            },
            {
                title: "附件",
                dataIndex: 'attachmentNum',
                key: 'attachmentNum',
                render: (text, record) => (
    
                    <a onClick={this.onClickHandleCheck.bind(this.record)}>{`查看(${text})`}</a>
                  )
            },
           
        ]
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                console.log(record, selected, selectedRows);
                this.setState({
                    selectDelId:selectedRows.map(val=>val.id)
                })
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
                this.setState({
                    selectDelId:selectedRows.map(val=>val.id)
                })
            },
        }
        return (
            <div className={style.main}>
                <h3 className={style.listTitle}>处理记录</h3>
                <div className={style.rightTopTogs}>
                  
                    <AddTopBtn onClickHandle={this.onClickHandle}/>
                    <ModifyTopBtn onClickHandle={this.onClickHandle}/>
                    <DeleteTopBtn onClickHandle={this.onClickHandle}/>
                </div>
                <div className={style.mainScorll}>            
                <Table columns={columns}
                       rowKey={record => record.id}
                      
                       pagination={false}
                       dataSource={this.state.data}
                       pagination={false}
                       name={this.props.name}
                       rowSelection={rowSelection}
                       rowClassName={this.setClassName}
                       onRow={(record, index) => {
                    return {
                        onClick: (event) => {
                            this.getInfo(record, index)
                        }
                    }
                }}/>
                   </div>
                {this.state.isShowEditModal && 
                <EditModal 
                title={this.state.editModalTitle} 
                data={this.props.data}
                visible={this.state.isShowEditModal} 
                handleCancel={this.closeEditModal.bind(this)}></EditModal>
                }
               
               {this.state.isShowCheckModal && 
               <CheckModal 
               visible={this.state.isShowCheckModal} 
               handleCancel={this.closeCheckModal.bind(this)}></CheckModal>}
            </div>
        )
    }
}

export default ProfdBackInfoTem


