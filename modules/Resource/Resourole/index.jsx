import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, Spin } from 'antd'
import style from './style.less'
import dynamic from 'next/dynamic'
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
class ResourceResourole extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            addsamelevel: false,//新增同级
            addlowerlevel: false,//新增下级
            activeIndex: "",
            rightData: [],
            rightTags: [
                { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Resource/Resourole/BasicInfo' },
            ],

            data: [
                {
                    key: "[0]",
                    id: "1",
                    roleName: "人力资源",
                    roleCode: "HR",
                    roleType: "人工",
                    unit: "",
                    calendarId: "",
                    remark: "",
                    children: [
                        {
                            key: "[0].children[0]",
                            id: "2",
                            roleName: "管理员",
                            roleCode: "Manager",
                            roleType: "人工",
                            unit: "",
                            calendarId: "8h/d",
                            remark: "",
                        }, {
                            key: "[0].children[1]",
                            id: "3",
                            roleName: "人力资源",
                            roleCode: "Manager",
                            roleType: "人工",
                            unit: "",
                            calendarId: "8h/d",
                            remark: "",
                        }
                    ]
                }
            ]
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
    //topTags
    TopTagsonClickHandle = (name, menu) => {
        // 删除
        if (name === 'NewDropdownBtn') {

            if (menu == "新增同级") {
                console.log("新增同级")
                this.setState({
                    addsamelevel: true,
                    title: "新增同级"
                })
            }
            if (menu == "新增下级") {
                console.log("新增下级")
                this.setState({
                    addlowerlevel: true,
                    title: "新增下级"
                })
            }

        }



    }
    componentDidMount() {
        this.loadLocales();
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
        })
            .then(() => {
                // After loading CLDR locale data, start to render
                this.setState({ initDone: true });
            });
    }
    closeSameLevelMadal = () => {
        this.setState({
            addsamelevel: false
        })
    }
    closeLowerLevelMadal = () => {
        this.setState({
            addlowerlevel: false
        })
    }
    render() {
        const columns = [
            {
                title: intl.get('wsd.i18n.rsrc.rsrcrole.rolename'),
                dataIndex: 'roleName',
                key: 'roleName',
            },
            {
                title: intl.get('wsd.i18n.rsrc.rsrcrole.rolecode'),
                dataIndex: 'roleCode',
                key: 'roleCode',
            },
            {
                title: intl.get('wsd.i18n.rsrc.rsrcrole.roletype'),
                dataIndex: 'roleType',
                key: 'roleType',
            },
            {
                title: intl.get('wsd.i18n.rsrc.rsrcrole.unit'),
                dataIndex: 'unit',
                key: 'unit',
            },
            {
                title: intl.get('wsd.i18n.rsrc.rsrcrole.calendarid'),
                dataIndex: 'calendarId',
                key: 'calendarId',
            },
            {
                title: intl.get('wsd.i18n.rsrc.rsrcrole.remark'),
                dataIndex: 'remark',
                key: 'remark',
            },
        ];
        const AddRoleModal = dynamic(import('./AddRoleModal/index'), {
            loading: () => <Spin size="small" />
        })
        return (
            <div>
                <TopTags onClickHandle={this.TopTagsonClickHandle.bind(this)} />
                <div className={style.main}>
                    <div className={style.leftMain} style={{ height: this.props.height }}>
                        <div style={{ minWidth: 'calc(100vw - 60px)' }}>
                            {this.state.initDone &&
                                <Table columns={columns}
                                    dataSource={this.state.data}
                                    pagination={false}
                                    rowClassName={this.setClassName}
                                    rowKey={record => record.id}
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

                        {this.state.addsamelevel && <AddRoleModal handleCancel={this.closeSameLevelMadal.bind(this)} title={this.state.title}></AddRoleModal>}
                        {this.state.addlowerlevel && <AddRoleModal handleCancel={this.closeLowerLevelMadal.bind(this)} title={this.state.title}></AddRoleModal>}
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
    })(ResourceResourole);
/* *********** connect链接state及方法 end ************* */