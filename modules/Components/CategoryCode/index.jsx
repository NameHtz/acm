import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, Spin,Modal } from 'antd'
import DistributionBtn from "../../../components/public/TopTags/DistributionBtn"
import DeleteTopBtn from "../../../components/public/TopTags/DeleteTopBtn"
import EditableTable from "./EditableTable"
import dynamic from 'next/dynamic'
import style from "./style.less"
const confirm = Modal.confirm
const locales = {
    "en-US": require('../../../api/language/en-US.json'),
    "zh-CN": require('../../../api/language/zh-CN.json')
}
class CategoryCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            showDistribute: false,
            
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
            this.setState({
                showDistribute: true
            })
        }
        
        if (name == "DeleteTopBtn") {
            confirm({
                title: '您确定要删除分类码？',
                cancelText: '取消',
                okText: '确定',
                onOk () {
                   
                }
            });
        }


    }
    closeDistributeModal=()=>{
        this.setState({
            showDistribute: false
        })
    }
    
    render() {
        const DistributeModal = dynamic(import('./DistributeModal/index'), {
            loading: () => <Spin size="small" />
        })

        return (
            <div className={style.main}>
                {this.state.initDone &&
                    <div className={style.mainHeight}>
                        <h3 className={style.listTitle}>分类码</h3>
                        <div className={style.rightTopTogs}>
                            <DistributionBtn onClickHandle={this.onClickHandle.bind(this)}></DistributionBtn>
                            <DeleteTopBtn onClickHandle={this.onClickHandle.bind(this)}></DeleteTopBtn>
                            {this.state.showDistribute && <DistributeModal handleCancel={this.closeDistributeModal.bind(this)}></DistributeModal>}
                           
                        </div>
                        <div className={style.mainScorll} >
                            <EditableTable></EditableTable>
                        </div>
                      

                    </div>}
            </div>
        )
    }
}

export default CategoryCode
// {
//             "wsd.i18n.plan.fileinfo.filename" : "文件名称",
//             "wsd.i18n.plan.fileinfo.fileversion" : "版本号",
//             "wsd.i18n.plan.fileinfo.creattime" : "创建时间",
//             "wsd.i18n.plan.fileinfo.creator" : "创建人",
//             "wsd.i18n.plan.fileinfo.remark" : "备注",
//     }