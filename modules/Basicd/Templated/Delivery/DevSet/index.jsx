import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, Icon, Select ,Spin,Checkbox} from 'antd'
import dynamic from 'next/dynamic'
import style from './style.less'
import DeleteTopBtn from "../../../../../components/public/TopTags/DeleteTopBtn"
import AddTopBtn from '../../../../../components/public/TopTags/AddTopBtn'
import ModifyTopBtn from '../../../../../components/public/TopTags/ModifyTopBtn'
import ImportTopBtn from '../../../../../components/public/TopTags/ImportTopBtn'
import AddDeliveryBtn from '../../../../../components/public/TopTags/AddDeliveryBtn'
import AddPBSBtn from '../../../../../components/public/TopTags/AddPBSBtn'
import AddPBSBtn1 from '../../../../../components/public/TopTags/AddPBSBtn1'
import EditDevModal from './EditDevModal'
import emitter from '../../../../../api/ev'
const locales = {
    "en-US": require('../../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../../api/language/zh-CN.json')
}
const Option = Select.Option;
class DevSetTem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            distributeType: false,
            title:'',
            visible:false,
            data: [
                {
                    key: "1",
                    id:1,
                    delvTitle: "设计图纸",
                    delvNum: "record.001",
                    delvtype: "文件",
                    creator:"曹文轩",
                    creattime:"2018-9-10",
                    children:[{
                        key: "2",
                        id:2,
                        delvTitle: "架构基础图",
                        delvNum: "record.001",
                        delvtype: "文件",
                        creator:"曹文轩",
                        creattime:"2018-9-10",
                    }]

                },
                {
                    key: "3",
                    id:3,
                    delvTitle: "设计图纸",
                    delvNum: "record.001",
                    delvtype: "文件",
                    creator:"曹文轩",
                    creattime:"2018-9-10"

                },
                {
                    key: "4",
                    id:4,
                    delvTitle: "设计图纸",
                    delvNum: "record.001",
                    delvtype: "文件",
                    creator:"曹文轩",
                    creattime:"2018-9-10"

                },

            ]
        }
    }
    componentDidMount() {
        this.loadLocales();
        this.eventEmitter = emitter.addListener("callMe",(e)=>{
            alter(e);
        });
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
        if (name == "AddPBSBtn") {
            console.log( status );
            this.setState({visible: true,title:"新增交付物"})
        }

        if (name == "AddDeliveryBtn") {
            console.log(this)
            this.setState({visible: true,title:"新增交付物"})
        }
        if (name == "ModifyTopBtn") {
            console.log(this)
            this.setState({visible: true ,title:"修改交付物"})
        }
        if (name == "DeleteTopBtn") {
            console.log(this)
            this.setState({visible: true,title:"删除"})
        }
    }
    onClickHandle1 = (name,cb) => {
        if(name=="AddPBSBtn" && cb=="新增同级PBS"){
            this.setState({visible: true,title:"新增同级PBS"})
        }
        if(name=="AddPBSBtn" && cb=="新增下级PBS"){
            this.setState({visible: true,title:"新增下级PBS"})
        }
    }



    handleCancel=(e)=>{
        this.setState({visible:false})
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
    render() {
        const columns = [
            {
                title: "标题",
                dataIndex: 'delvTitle',
                key: 'delvTitle',
            },
            {
                title: "编号",
                dataIndex: 'delvNum',
                key: 'delvNum',
            },
            {
                title: "类别",
                dataIndex: 'delvtype',
                key: 'delvtype',
            },
            {
                title: "创建人",
                dataIndex: 'creator',
                key: 'creator',

            },
            {
                title: "创建日期",
                dataIndex: 'creattime',
                key: 'creattime',
            },
        ];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
        };

        return (
            <div className={style.main}>
                <h3 className={style.listTitle}>交付设置</h3>
                <div className={style.rightTopTogs}>
                    <AddPBSBtn1 onClickHandle={this.onClickHandle1}/>
                    <AddDeliveryBtn onClickHandle={this.onClickHandle}/>
                    <ModifyTopBtn onClickHandle={this.onClickHandle}/>
                    <DeleteTopBtn onClickHandle={this.onClickHandle}/>
                    <ImportTopBtn onClickHandle={this.onClickHandle}/>
                </div>
                <Table columns={columns}
                        rowKey={record => record.id}
                        scroll={{ x: true }}
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

                    <EditDevModal
                        title={this.state.title}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}

                    />
            </div>
        )
    }
}

export default DevSetTem


