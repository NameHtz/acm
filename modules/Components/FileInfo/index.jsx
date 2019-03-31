import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, Spin, Modal, message ,Icon} from 'antd'
import DownloadTopBtn from "../../../components/public/TopTags/DownloadTopBtn"
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
class FileInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            // selectStatus: 0,//选中状态 0 , 1, 2 no,单选，多选
            seletData: [], //选中数据
            addModal: false,//显示新增
            upfileModal: false,//显示上传
            checkModal: false,//显示查看
            modifyFile: false,//显示修改
            activeIndex: '',
          
            data: [
                {
                    key: "[0]",
                    id: "1",
                    fileName: "01ACM商品需求说明书",
                    fileVersion: "A120",
                    creatTime: "2018-12-21",
                    creator: "孙伯禹",
                   
                    remark: "--",
                },
                {
                    key: "[1]",
                    id: "2",
                    fileName: "01ACM商品需求说明书",
                    fileVersion: "A120",
                    creatTime: "2018-12-21",
                    creator: "孙伯禹",
                  
                    remark: "--",
                }, {
                    key: "[3]",
                    id: "3",
                    fileName: "01ACM商品需求说明书",
                    fileVersion: "A120",
                    creatTime: "2018-12-21",
                    creator: "孙伯禹",
                   
                    remark: "--",
                }

            ]
        }
    }

    getInfo = (record, index) => {
      
        let id = record.id, records = record
        /* *********** 点击表格row执行更新state start ************* */
        if (this.state.activeIndex == id) {
       
          id = ''
          records = null
        } 
        /* *********** 点击表格row执行更新state end ************* */
        this.setState({
          activeIndex: id,
          rightData:record
        })
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
        console.log(name)
        if (name == "AddTopBtn") {
            this.setState({
                isShow: true,
                ModalTitle: "新增文件"
            })
            return 
        }
        if(this.state.activeIndex==""){
            message.warning("请选择数据")
        }else{
            if(name=="ModifyTopBtn"){
                this.setState({
                    isShow: true,
                    ModalTitle: "修改文件"
                })
                return
            }
            if(DeleteTopBtn){
                confirm({
                    title: '您确定要删除文件？',
                    cancelText: '取消',
                    okText: '确定',
                    onOk() {
    
                    }
                });
            }
        }
    }
    closeAddAndModifyModal=()=>{
        this.setState({
            isShow: false,
        })
    }
    //点击显示查看
    onClickHandleCheck = (e) => {
        let obj = document.getElementById("checkid");
        let currentElement = e.currentTarget
        console.log(currentElement.scrollTop, currentElement.scrollLeft)
        console.log(obj.scrollTop, obj.scrollTop)

        this.setState({
            checkModal: true,
            x: "65%",
            y: e.clientY - 110
        })
    }
    //关闭查看
    closeCheckModal = () => {
        this.setState({
            checkModal: false
        })
    }

    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : "";
    }

    render() {

        const ModifyFileModal = dynamic(import('./ModifyFileModal/index.jsx'), {
            loading: () => <Spin size="small" />
        })
        const CheckModal = dynamic(import('./CheckModal/index.jsx'), {
            loading: () => <Spin size="small" />
        })
        const columns = [
            {
                title: intl.get('wsd.i18n.base.planTemAddTask.name'),
                dataIndex: 'fileName',
                key: 'fileName',
                render: (text, record) => (
                    <span> <Icon type="eye" onClick={this.onClickHandleCheck.bind(this.record)} style={{marginRight:"5px"}}/>{text}</span>
                  )
            },
            {
                title: intl.get('wsd.i18n.plan.fileinfo.fileversion'),
                dataIndex: 'fileVersion',
                key: 'fileVersion',
            },
            {
                title: intl.get('wsd.i18n.plan.fileinfo.creattime'),
                dataIndex: 'creatTime',
                key: 'creatTime',
            },
            {
                title: "上传人",
                dataIndex: 'creator',
                key: 'creator',
            },
            {
                title:"文件类型",
                dataIndex: 'remark',
                key: 'remark',
            },
        ];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(selectedRowKeys);
                console.log('selectedRows: ', selectedRows)
                // if (selectedRowKeys.length > 0) {
                //     if (selectedRowKeys.length == 1) {
                //         this.setState({
                //             selectStatus: 1,
                //             seletData: selectedRows
                //         })
                //     } else {
                //         this.setState({
                //             selectStatus: 2,
                //             seletData: selectedRows
                //         })
                //     }

                // } else {
                //     this.setState({
                //         selectStatus: 0
                //     })
                // }
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
                        <h3 className={style.listTitle}>{intl.get('wsd.i18n.plan.fileinfo.modaltitle')}</h3>
                        <div className={style.rightTopTogs}>
                            <AddTopBtn onClickHandle={this.onClickHandle.bind(this)}></AddTopBtn>
                            <ModifyTopBtn onClickHandle={this.onClickHandle.bind(this)}></ModifyTopBtn>
                            <DeleteTopBtn onClickHandle={this.onClickHandle.bind(this)}></DeleteTopBtn>
                            <DownloadTopBtn onClickHandle={this.onClickHandle.bind(this)}></DownloadTopBtn>
                            {this.state.isShow && <ModifyFileModal title={this.state.ModalTitle} handleCancel={this.closeAddAndModifyModal.bind(this)}></ModifyFileModal>}
                        </div>
                        <div className={style.mainScorll} id="checkid">
                            <Table className={style.table} columns={columns} dataSource={this.state.data} pagination={false} name={this.props.name} rowSelection={rowSelection} rowClassName={this.setClassName}
                                onRow={(record, index) => {
                                    return {
                                        onClick: (event) => {
                                            this.getInfo(record, index)
                                        }
                                    }
                                }
                                }
                            />
                        </div>
                        {this.state.checkModal && <CheckModal handleCancel={this.closeCheckModal.bind(this)} x={this.state.x} y={this.state.y}></CheckModal>}
                    </div>}
            </div>
        )
    }
}

export default FileInfo
