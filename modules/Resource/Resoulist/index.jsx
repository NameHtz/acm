import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, Spin } from 'antd'
import style from './style.less'
import AddEqModal from "./AddEqModal"
import AddModal from "./AddModal"
import AddMaterialModal from "./AddMaterialModal"
import AddKindModal from "./AddKindModal"
import _ from 'lodash'
/* *********** 引入redux及redux方法 start ************* */
import { connect } from 'react-redux'
import store from '../../../store'
import { saveCurrentData, resetRightCurrentData } from '../../../store/rightData/action'
import { curdCurrentData, resetCurrentData } from '../../../store/curdData/action'
import { changeLocaleProvider } from '../../../store/localeProvider/action'
/* *********** 引入redux及redux方法 end ************* */
import TopTags from './TopTags/index'
import RightTags from '../../../components/public/RightTags/index'
const locales = {
    "en-US": require('../../../api/language/en-US.json'),
    "zh-CN": require('../../../api/language/zh-CN.json')
}
const data1 = [
    {
        id: 1,
        key: "[0]",
        roleName: "集团总裁",
        roleCode: "HR",
        roleType: "人工",
        unit: "",
        maxunit: "",
        remark: ""
    },
    {
        id: 2,
        key: "[1]",
        roleName: "集团总裁",
        roleCode: "HR",
        roleType: "人工",
        unit: "",
        maxunit: "",
        remark: ""
    },
    {
        id: 3,
        key: "[2]",
        roleName: "集团总裁",
        roleCode: "HR",
        roleType: "人工",
        unit: "",
        maxunit: "",
        remark: ""
    }
]
const data2 = [{
    id: 1,
    key: "[0]",
    rsrcName: "机械",
    rsrcCode: "01",
    rsrcRoleName: "现场设备资源",
    rsrcType: "设备",
    unit: "",
    maxunit: "",
    featureDesc: "",
    calendarId: "",
    status: "可用",
    remark: "",
    children: [
        {
            id: 2,
            key: "[0].children[0]",
            rsrcName: "机械",
            rsrcCode: "01",
            rsrcRoleName: "现场设备资源",
            rsrcType: "设备",
            unit: "",
            maxunit: "8h/d",
            featureDesc: "",
            calendarId: "",
            status: "可用",
            remark: "",
        }
    ]
}]
const data3 = [{
    id: 1,
    key: "[0]",
    rsrcName: "物资材料",
    rsrcCode: "01",
    rsrcRoleName: "材料资源",
    rsrcType: "材料",
    unit: "",
    maxunit: "",
    featureDesc: "",
    calendarId: "",
    remark: "",
    children: [
        {
            id: 2,
            key: "[0].children[0]",
            rsrcName: "机械",
            rsrcCode: "01",
            rsrcRoleName: "现场设备资源",
            rsrcType: "设备",
            unit: "",
            maxunit: "8h/d",
            featureDesc: "",
            calendarId: "",
            remark: "",
        }
    ]
}]

class TableComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: "",
            rightData: [],
            rightTags: [
                { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Resource/Resoulist/PeopleListInfo' },
                { icon: 'iconjiaose1', title: '资源角色', fielUrl: 'Resource/Resoulist/RoleInfo' },
                { icon: 'iconfenleima', title: '分类码', fielUrl: 'Components/CategoryCodeTwo' }
            ],
            initDone: false,
            resource: "人力资源",
            data: data1,
            columns: [],
            columns1: [],
            columns3: []
        }
        /* *********** 添加监听redux中store变化 start ************* */
        store.subscribe(() => {
            let storeState = store.getState();
            if (localStorage.getItem('name') == storeState.curdData.title) {
                if (storeState.curdData.status != '') {
                    this.curdData(storeState.curdData.status, storeState.curdData.data)
                }
            }
        })
        /* *********** 添加监听redux中store变化 end ************* */
    }
    /**
         * curd data数据
         * @param {*} status curd
         * @param {*} data curd
         */
    curdData = (status, data) => {
        // 新增
        if (status == 'add') {
            alert(JSON.stringify(data))
        }

        // 修改
        if (status == 'update') {
            alert(JSON.stringify(data))
        }

        // 删除
        if (status == 'delete') {
            alert(JSON.stringify(data))
        }
        this.props.resetCurrentData()
        //let tempData
        // this.setState({
        //     width: this.props.width,
        //     data: tempData
        // })
    }
    // 监听 添加 修改 删除事件
    TopTagsonClickHandle = (name, title) => {
        switch (name) {
            case "ResourceBtn":

                if (title == "人力资源") {

                    this.setState((prevState, props) => ({
                        columns: prevState.columns1,
                        activeIndex: "",
                        rightData: [],
                        rightTags: [
                            { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Resource/Resoulist/PeopleListInfo' },
                            { icon: 'iconjiaose1', title: '资源角色', fielUrl: 'Resource/Resoulist/RoleInfo' },
                            { icon: 'iconfenleima', title: '分类码', fielUrl: 'Components/CategoryCodeTwo' }
                        ]
                    }), () => {
                        this.setState({
                            data: data1
                        })
                    });
                }
                if (title == "设备资源") {

                    this.setState((prevState, props) => ({
                        columns: prevState.columns3,

                        activeIndex: "",
                        rightData: [],
                        rightTags: [
                            { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Resource/Resoulist/ListInfo' },
                            { icon: 'iconjiaose1', title: '资源角色', fielUrl: 'Resource/Resoulist/RoleInfo' },
                            { icon: 'iconfenleima', title: '分类码', fielUrl: 'Components/CategoryCodeTwo' }
                        ]
                    }), () => {
                        this.setState({
                            data: data2
                        })
                    });
                }
                if (title == "材料资源") {

                    this.setState((prevState, props) => ({
                        columns: prevState.columns3,

                        activeIndex: "",
                        rightData: [],
                        rightTags: [
                            { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Resource/Resoulist/MaterialInfo' },
                            { icon: 'iconjiaose1', title: '资源角色', fielUrl: 'Resource/Resoulist/RoleInfo' },
                            { icon: 'iconfenleima', title: '分类码', fielUrl: 'Components/CategoryCodeTwo' }
                        ]
                    }), () => {
                        this.setState({
                            data: data3
                        })
                    });
                }
                break;
            case "AddTopBtn":
                this.setState({
                    addName: "新增人类资源",
                    isshowAddModal: true
                })

                break;
            case "AddKindBtn":
                this.setState({
                    addkindName: title,
                    isshowAddKindModal: true
                })
                break;
            case "AddEquipBtn":
                this.setState({
                    addName: "新增设备资源",
                    isshowAddEqModal: true
                })
                break;
            case "AddMaterialBtn":
                console.log("aaaaa")
                this.setState({
                    addName: "新增材料资源",
                    isshowAddMaterialModal: true
                })
                break;
            case "ImportTopBtn":

                break;
            case "DeleteTopBtn":

                break;
            default:
                return
        }
    }
    componentDidMount() {
        this.loadLocales();




    }
    //关闭新增人类资源
    closeAddModal = () => {
        this.setState({
            isshowAddModal: false
        })
    }
    //关闭新增材料资源
    closeAddMaterialModal = () => {
        this.setState({
            isshowAddMaterialModal: false
        })
    }
    //关闭新增设备资源
    closeAddEqModal = () => {
        this.setState({
            isshowAddEqModal: false
        })
    }
    closeAddKindModal = () => {
        this.setState({
            isshowAddKindModal: false
        })
    }
    getInfo = (record, index) => {


        let id = record.id, records = record
        /* *********** 点击表格row执行更新state start ************* */
        if (this.state.activeIndex == id) {
            console.log("wwww")
            id = ''
            records = ''
            this.setState({
                rightData: []
            })
            this.props.resetRightCurrentData()
        } else {
            console.log("Ssss")
            // this.props.saveCurrentData({
            //   title: localStorage.getItem('name'),
            //   rightTag: this.state.rightTag[0].list,
            //   data: record
            // })
        }
        /* *********** 点击表格row执行更新state end ************* */
        this.setState({
            activeIndex: id,
            rightData: record
        })
    }


    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : "";
    }


    loadLocales() {
        intl.init({
            currentLocale: this.props.currentLocale.currentLocale,
            locales,
        }).then(() => {
            // After loading CLDR locale data, start to render
            this.setState({
                initDone: true,
                columns: [
                    {
                        title: intl.get('wsd.i18n.rsrc.rsrclist.rsrcname'),
                        dataIndex: 'roleName',
                        key: 'roleName',
                    },
                    {
                        title: intl.get('wsd.i18n.rsrc.rsrclist.rsrccode'),
                        dataIndex: 'roleCode',
                        key: 'roleCode',
                    },
                    {
                        title: intl.get('wsd.i18n.rsrc.rsrclist.rsrctype'),
                        dataIndex: 'roleType',
                        key: 'roleType',
                    },
                    {
                        title: intl.get('wsd.i18n.rsrc.rsrclist.maxunit'),
                        dataIndex: 'maxunit',
                        key: 'maxunit',
                    },
                    {
                        title: intl.get('wsd.i18n.rsrc.rsrclist.rsrcrolename'),
                        dataIndex: 'unit',
                        key: 'unit',
                    },

                    {
                        title: intl.get('wsd.i18n.rsrc.rsrclist.status'),
                        dataIndex: 'status',
                        key: 'status',
                    },
                    {
                        title: intl.get('wsd.i18n.rsrc.rsrcrole.remark'),
                        dataIndex: 'remark',
                        key: 'remark',
                    }
                ],
                columns1: [
                    {
                        title: intl.get('wsd.i18n.rsrc.rsrclist.rsrcname'),
                        dataIndex: 'roleName',
                        key: 'roleName',
                    },
                    {
                        title: intl.get('wsd.i18n.rsrc.rsrclist.rsrccode'),
                        dataIndex: 'roleCode',
                        key: 'roleCode',
                    },
                    {
                        title: intl.get('wsd.i18n.rsrc.rsrclist.rsrctype'),
                        dataIndex: 'roleType',
                        key: 'roleType',
                    },
                    {
                        title: intl.get('wsd.i18n.rsrc.rsrclist.rsrcrolename'),
                        dataIndex: 'unit',
                        key: 'unit',
                    },
                    {
                        title: intl.get('wsd.i18n.rsrc.rsrclist.maxunit'),
                        dataIndex: 'maxunit',
                        key: 'maxunit',
                    },
                    {
                        title: intl.get('wsd.i18n.rsrc.rsrclist.status'),
                        dataIndex: 'status',
                        key: 'status',
                    },
                    {
                        title: intl.get('wsd.i18n.rsrc.rsrcrole.remark'),
                        dataIndex: 'remark',
                        key: 'remark',
                    }
                ],
                columns3: [
                    {
                        title: intl.get('wsd.i18n.rsrc.rsrclist.rsrcname'),
                        dataIndex: 'rsrcName',
                        key: 'rsrcName',
                    },
                    {
                        title: intl.get('wsd.i18n.rsrc.rsrclist.rsrccode'),
                        dataIndex: 'rsrcCode',
                        key: 'rsrcCode',
                    },
                    {
                        title: intl.get('wsd.i18n.rsrc.rsrclist.rsrctype'),
                        dataIndex: 'rsrcType',
                        key: 'rsrcType',
                    },
                    {
                        title: intl.get('wsd.i18n.rsrc.rsrclist.rsrcrolename'),
                        dataIndex: 'rsrcRoleName',
                        key: 'rsrcRoleName',
                    },
                    {
                        title: intl.get('wsd.i18n.rsrc.rsrclist.rsrcaddress'),
                        dataIndex: 'rsrcaddress',
                        key: 'rsrcaddress',
                    },
                    {
                        title: intl.get('wsd.i18n.rsrc.rsrclist.maxunit'),
                        dataIndex: 'maxunit',
                        key: 'maxunit',
                    },
                    {
                        title: intl.get('wsd.i18n.rsrc.rsrclist.remark'),
                        dataIndex: 'remark',
                        key: 'remark',
                    },
                ]
            });
        });
    }

    render() {
        return (
            <div>
                <TopTags onClickHandle={this.TopTagsonClickHandle.bind(this)} />
                <div className={style.main}>
                    <div className={style.leftMain} style={{ height: this.props.height }}>
                        <div style={{ minWidth: 'calc(100vw - 60px)' }}>
                            {
                                this.state.initDone &&
                                <Table columns={this.state.columns} dataSource={this.state.data} pagination={false}
                                    rowClassName={this.setClassName}
                                    onRow={(record, index) => {
                                        return {
                                            onClick: (event) => {
                                                this.getInfo(record, index)
                                            }
                                        }
                                    }
                                    } />
                            }
                        </div>

                        {this.state.isshowAddModal && <AddModal title={this.state.addName} handleCancel={this.closeAddModal.bind(this)}></AddModal>}
                        {this.state.isshowAddEqModal && <AddEqModal title={this.state.addName} handleCancel={this.closeAddEqModal.bind(this)}></AddEqModal>}
                        {this.state.isshowAddMaterialModal && <AddMaterialModal title={this.state.addName} handleCancel={this.closeAddMaterialModal.bind(this)}></AddMaterialModal>}
                        {this.state.isshowAddKindModal && <AddKindModal title={this.state.addkindName} handleCancel={this.closeAddKindModal.bind(this)}></AddKindModal>}
                    </div>
                    <div className={style.rightBox} style={{ height: this.props.height }}>
                        <RightTags rightTagList={this.state.rightTags} rightData={this.state.rightData} />
                    </div>
                </div>

            </div>

        )
    }
}


/* *********** connect链接state及方法 start ************* */
export default connect(state => ({
    currentLocale: state.localeProviderData
}), {
        saveCurrentData,
        curdCurrentData,
        resetRightCurrentData,
        resetCurrentData,
        changeLocaleProvider
    })(TableComponent);
/* *********** connect链接state及方法 end ************* */
