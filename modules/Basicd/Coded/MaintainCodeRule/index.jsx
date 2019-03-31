import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, message, Button } from 'antd'
import style from "./style.less"
import store from "../../../../store"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as codeRuleAction from '../../../../store/base/codeRule/action';
import TopTags from './TopTags/index'
import axios from '../../../../api/axios';
import { getcoderuletype ,deleteCoderuletype} from "../../../../api/api"

class MaintainCodeRule extends Component {
    constructor(props) {
        super(props)
        this.state = {
          
            visible: false,
            title: '',
            activeIndex:[],
            rightData:[],
            rightTags: [
                { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Sys/Menu/MenuInfo' },
                { icon: 'iconquanxianpeizhi1', title: '权限配置', fielUrl: 'Sys/Menu/Permission' },
            ],
            data: [

            ],
            columns: [],
            rightTag: [],
            id: null
        }

        /* *********** 添加监听redux中store变化 start ************* */
        store.subscribe(() => {
            let storeState = store.getState();
            //     console.log(storeState)
            //    console.log(storeState.codeRule.data.id)
            //    console.log(this.state.id)
            if (storeState.codeRule.data.id != this.state.id) {
                this.getlist()
            }
        })
        /* *********** 添加监听redux中store变化 end ************* */
    }
    //获取列表信息
    getlist = () => {
        axios.get(getcoderuletype(this.props.codeRule.data.id)).then(res => {
            console.log(res)
            this.setState((preState, props) => ({
                data: res.data.data,
                id: props.codeRule.data.id
            }), () => {
                console.log("ssss")
            })

        })
    }

    componentDidMount() {
        this.getlist()
    }
    onClickHandle = (name) => {
        if (name == "AddTopBtn") {
            this.setState({
                isShowAddRule: true
            })
            return
        }
        if (name == "AddCodeValueBtn") {
            this.setState({
                isShowAddCodeValue: true
            })
            return
        }
    }
    closeAddRule = () => {
        this.setState({
            isShowAddRule: false
        })
    }
    onClickCheck = () => {
        this.setState({
            isShowCheckModal: true
        })

    }
    closeCheckModal = () => {
        this.setState({
            isShowCheckModal: false
        })
    }

  

    setClassName= (record, index) => {
        // 判断索引相等时添加行的高亮样式
        //判断索引相等时添加行的高亮样式
        if (this.state.activeIndex.findIndex(value => record.id === value) > -1) {
            return 'tableActivty'
        } else {
            return "";
        }

    };
    //新增数据
    adddData=(value)=>{
        const {data}=this.state
        data.push(value)
        this.setState({
            data
        })
    }
       //更新数据
    updateData=(value)=>{
        const {data}=this.state
        let index= data.findIndex(item=>item.id==value.id)
        data[index]=value
        this.setState({
            data
        })
    }
    //删除
    deleteData=()=>{
        const {rightData,data,activeIndex}=this.state
        axios.deleted(deleteCoderuletype,{data:activeIndex},true)
        rightData.forEach(item=>{
            let index=data.findIndex(i=>i.id==item.id)
            data.splice(index,1)
        })
        this.setState({
            data,
            rightData:[],
            activeIndex:[]
        })
    }
    render() {
        console.log(this.state)
        const columns = [
            {
                title: "名称",
                dataIndex: 'ruleTypeName',
                key: 'ruleTypeName',
            },
            {
                title: "类型",
                dataIndex: 'attributeTypeVo',
                key: 'attributeTypeVo',
            },
            {
                title: "SQL",
                dataIndex: 'typeSql',
                key: 'typeSql',

            },
            {
                title: "表名",
                dataIndex: 'tableName',
                key: 'tableName',

            },

            {
                title: "字段名",
                dataIndex: 'columnName',
                key: 'columnName',

            },
            {
                title: "关联字段",
                dataIndex: 'foreignKey',
                key: 'foreignKey',

            },
            {
                title: "重定向到字典",
                dataIndex: 'redirect',
                key: 'redirect',
                render: (text, record) => (
                    <span>{record.dictBoVo.name+"-"+record.dictTypeVo.name}</span>
                )
            },
        ]
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    activeIndex: selectedRowKeys,
                    rightData: selectedRows,
                })
            },
            onSelect: (record, selected, selectedRows) => {
                console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        };

        return (
            <div>
                <TopTags data={this.state.rightData} 
                codeRule={this.props.codeRule} 
                updateData={this.updateData} 
                data={this.state.rightData} 
                adddData={this.adddData} 
                deleteData={this.deleteData}/>
                <div className={style.main}>
                    <div className={style.leftMain} style={{ height: this.props.height }}>

                        <Table columns={columns}
                            rowKey={record => record.id}
                            size="small"
                            rowSelection={rowSelection}
                            dataSource={this.state.data}
                            pagination={false}
                            pagination={false}
                            rowClassName={this.setClassName}
                            onRow={(record, index) => {
                                return {
                                    onClick: (event) => {
                                        event.currentTarget.getElementsByClassName("ant-checkbox-wrapper")[0].click()
                                    }
                                }
                            }}
                        />

                    </div>

                </div>

            </div>

        )
    }
}


const mapStateToProps = state => {
    return {
        currentLocale: state.localeProviderData,
        codeRule: state.codeRule
    }
};
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Object.assign({}, codeRuleAction), dispatch)
});
// export default connect(state => ({ currentLocale: state.localeProviderData }))(CodeRule);
export default connect(mapStateToProps, mapDispatchToProps)(MaintainCodeRule);