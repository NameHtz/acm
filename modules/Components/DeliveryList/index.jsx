import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, Spin,Modal ,message} from 'antd'
import DistributionBtn from "../../../components/public/TopTags/DistributionBtn"
import UploadTopBtn from "../../../components/public/TopTags/UploadTopBtn"
import ModifyTopBtn from "../../../components/public/TopTags/ModifyTopBtn"
import DeleteTopBtn from "../../../components/public/TopTags/DeleteTopBtn"
import AddTopBtn from "../../../components/public/TopTags/AddTopBtn"
import dynamic from 'next/dynamic'
import style from "./style.less"
const confirm = Modal.confirm
const locales = {
    "en-US": require('../../../api/language/en-US.json'),
    "zh-CN": require('../../../api/language/zh-CN.json')
}
class DeliveryList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            selectStatus: 0,//选中状态 0 , 1, 2 no,单选，多选
            seletData: [], //选中数据
            addModal: false,//显示新增
            upfileModal: false,//显示上传
            modifyFile: false,//显示修改
            showDistribute: false,//显示分配
            data: [{
                key:"[0]",
                delvName:"ACM产品视觉设计文档",
                delvCOde:"A120",
                delvType:"文件",
                plandelvNum:3,
                creator:"孙伯禹",
                creatTime:"2018-12-23",
                completeStatus:"完成",
                completeTime:"2019-4-02",
                actdelvNum:2
        }]
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
       
        if (name == "AddTopBtn") {
            this.setState({
                addModal: true,
            })
            return
        }
       
        if (name == "ModifyTopBtn") {
           
                this.setState({
                    modifyFile: true,
                })
          
            return
        }
        if (name == "DistributionBtn") {
           
                this.setState({
                    showDistribute: true,
                })
        
            return
        }
        if (name == "UploadTopBtn") {
           
                this.setState({
                    upfileModal: true,
                })
          
            return
        }
        if (name == "DeleteTopBtn") {
            
                confirm({
                    title: '您确定要删除文件？',
                    cancelText: '取消',
                    okText: '确定',
                    onOk() {
    
                    }
                });
         
            return
        }
        

    }
    closeDistributionModal=()=>{
        this.setState({
            showDistribute:false
        })
    }
    closeAddModal = () => {
        this.setState({
            addModal: false
        })
    }
    closeUpFileModal = () => {
        this.setState({
            upfileModal: false
        })
    }
    
    closeModifyFileModal = () => {
        this.setState({
            modifyFile: false
        })
    }
    openCkeck=(text)=>{
        this.setState({
            isShowCheckModal:true,
            filenum:text
        })
    }
    closeCheckModal=()=>{
        this.setState({
            isShowCheckModal:false
        })
    }
    render() {
        const UploadModal = dynamic(import('./UploadModal/index.jsx'), {
            loading: () => <Spin size="small" />
        })
        const AddModal = dynamic(import('./AddModal/index'), {
            loading: () => <Spin size="small" />
        })
        const ModifyFileModal = dynamic(import('./ModifyFileModal/index'), {
            loading: () => <Spin size="small" />
        })
        const DistributionModal=dynamic(import('./DistributionModal/index.jsx'),{
            loading: () => <Spin size="small"/>
        })
        const CheckModal=dynamic(import('./CheckModal/index.jsx'),{
            loading: () => <Spin size="small"/>
        })
        const columns = [
            {
                title: intl.get('wsd.i18n.plan.delvList.delvname'),
                dataIndex: 'delvName',
                key: 'delvName',
            },
            {
                title: intl.get('wsd.i18n.plan.delvList.delvcode'),
                dataIndex: 'delvCOde',
                key: 'delvCOde',
            },
            {
                title: intl.get('wsd.i18n.plan.delvList.delvtype'),
                dataIndex: 'delvType',
                key: 'delvType',
            },
            {
                title: intl.get('wsd.i18n.plan.delvList.plandelvnum'),
                dataIndex: 'plandelvNum',
                key: 'plandelvNum',
            },
            {
                title: intl.get('wsd.i18n.plan.delvList.creator'),
                dataIndex: 'creator',
                key: 'creator',
            },
            {
                title: intl.get('wsd.i18n.plan.delvList.creattime'),
                dataIndex: 'creatTime',
                key: 'creatTime',
            },
            {
                title: intl.get('wsd.i18n.plan.delvList.completestatus'),
                dataIndex: 'completeStatus',
                key: 'completeStatus',
            },
            {
                title: intl.get('wsd.i18n.plan.delvList.completetime'),
                dataIndex: 'completeTime',
                key: 'completeTime',
            },
            {
                title: intl.get('wsd.i18n.plan.delvList.actdelvnum'),
                dataIndex: 'actdelvNum',
                key: 'actdelvNum',
                render: (text, record) => (
                    <span> <a onClick={this.openCkeck.bind(this,text)}>查看</a>{"("+text+")"}</span>
                  )
            },
        ];

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(selectedRowKeys);
                console.log('selectedRows: ', selectedRows)
                if (selectedRowKeys.length > 0) {
                    if (selectedRowKeys.length == 1) {
                        this.setState({
                            selectStatus: 1,
                            seletData: selectedRows
                        })
                    } else {
                        this.setState({
                            selectStatus: 2,
                            seletData: selectedRows
                        })
                    }

                } else {
                    this.setState({
                        selectStatus: 0
                    })
                }
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
                {this.state.initDone &&
                    <div className={style.mainHeight}>
                        <h3 className={style.listTitle}>交付清单</h3>
                        <div className={style.rightTopTogs}>
                            <DistributionBtn onClickHandle={this.onClickHandle.bind(this)}></DistributionBtn>
                            <AddTopBtn onClickHandle={this.onClickHandle.bind(this)}></AddTopBtn>
                            <UploadTopBtn onClickHandle={this.onClickHandle.bind(this)}></UploadTopBtn>
                            <ModifyTopBtn onClickHandle={this.onClickHandle.bind(this)}></ModifyTopBtn>
                            <DeleteTopBtn onClickHandle={this.onClickHandle.bind(this)}></DeleteTopBtn>
                            {this.state.showDistribute && <DistributionModal handleCancel={this.closeDistributionModal.bind(this)}></DistributionModal>}
                            {this.state.addModal && <AddModal handleCancel={this.closeAddModal.bind(this)}></AddModal>}
                            {this.state.upfileModal && <UploadModal handleCancel={this.closeUpFileModal.bind(this)}></UploadModal>}
                            {this.state.modifyFile && <ModifyFileModal handleCancel={this.closeModifyFileModal.bind(this)}></ModifyFileModal>}
                        </div>
                        <div className={style.mainScorll}>
                            <Table columns={columns} dataSource={this.state.data} pagination={false} name={this.props.name} rowSelection={rowSelection} />
                            {this.state.isShowCheckModal && <CheckModal text={this.state.filenum} handleCancel={this.closeCheckModal.bind(this)}></CheckModal>}
                        </div>
                        
                    </div>}
            </div>
        )
    }
}

export default DeliveryList
// {
//             "wsd.i18n.plan.fileinfo.filename" : "文件名称",
//             "wsd.i18n.plan.fileinfo.fileversion" : "版本号",
//             "wsd.i18n.plan.fileinfo.creattime" : "创建时间",
//             "wsd.i18n.plan.fileinfo.creator" : "创建人",
//             "wsd.i18n.plan.fileinfo.remark" : "备注",
//     }