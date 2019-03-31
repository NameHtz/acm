import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, message } from 'antd'
import style from "./style.less"
import _ from 'lodash'
import TopTags from './TopTags/index'
import RightTags from '../../../components/public/RightTags/index'
import StandardTable from '../../../components/Table/index';
/* *********** 引入redux及redux方法 start ************* */
import { connect } from 'react-redux'
/* *********** 引入redux及redux方法 end ************* */
const locales = {
    "en-US": require('../../../api/language/en-US.json'),
    "zh-CN": require('../../../api/language/zh-CN.json')
}

/* api */
import * as util from '../../../utils/util';
import axios from '../../../api/axios';
import { roleList } from '../../../api/api';

class TableComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            selectedRowKeys: null,       //被选中的角色
            data: [],
            activeIndex: "",
            rightData: [],
            rightTags: [
                { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Sys/Part/BasicInfo' },
                { icon: 'iconquanxianpeizhi1', title: '功能权限', fielUrl: 'Sys/Part/Authority' },
            ],
            selectData: [],
            dataMap: [],
            record: ''
        }
    }

    componentDidMount() {
        this.loadLocales();
        this.getList()
    }

    // 初始化列表数据
    getList = () => {
        axios.get(roleList).then(res => {
            const dataMap = util.dataMap(res.data.data);
            this.setState({
                data: res.data.data,
                dataMap,
            });
        });
    };

    // 添加
    addSuccess = (value) => {
        console.log(value);
        const { data, dataMap, record } = this.state;
        util.create(data, dataMap, record, value);
        this.setState({
            data,
            dataMap,
        });
    };

    //删除
    delSuccess = () => {
        const { data, dataMap, record } = this.state;
        util.deleted(data, dataMap, record);
        this.setState({
            data,
            record: '',
        });
    };

    // 修改
    updateSuccess = (data) => {
        // const { data, dataMap, record } = this.state;
        // util.modify(data, dataMap, record, v);
        // this.setState({
        //     data,
        //     record: v,
        // });
        let index = this.state.data.findIndex(v => v.id == data.id)
        this.setState((preState, props) => ({
            data: [...preState.data.slice(0, index), data, ...preState.data.slice(index + 1)]
        }))
    };

    getInfo = (record, index) => {
        const { activeIndex } = this.state;
        const { id } = record;
        if (activeIndex === record.id) {
            this.setState({
                record: null,
                activeIndex: null,
            });
        } else {
            this.setState({
                record,
                activeIndex: id,
            });
        }
    };

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

    showAuthority(selectedRowKeys, selectedRows) {
        console.log('展示角色信息', selectedRowKeys, selectedRows)
        emitter.emit('noticeRight', selectedRows)
        this.setState({
            activeIndex: selectedRows.id
        })
    }

    render() {
        const columns = [
            {
                title: intl.get('wsd.i18n.sys.role.rolename'),
                dataIndex: 'roleName',
                key: 'roleName',
            },
            {
                title: intl.get('wsd.i18n.sys.role.rolecode'),
                dataIndex: 'roleCode',
                key: 'roleCode',
            },
            {
                title: intl.get('wsd.i18n.sys.role.roledesc'),
                dataIndex: 'roleDesc',
                key: 'roleDesc',
            },
        ];

        const { record, data, initDone, rightTags } = this.state;
        const { height } = this.props;
        return (
            <div>
                <TopTags
                    record={record}
                    addSuccess={this.addSuccess}
                    delSuccess={this.delSuccess}
                />
                <div className={style.TableComponent}>
                    <div className={style.leftMain} style={{ height }}>
                        {initDone && <Table
                                columns={columns}
                                dataSource={data}
                                pagination={false}
                                rowKey={_r => _r.id}
                                rowClassName={this.setClassName}
                                onRow={(_r) => {
                                    return {
                                        onClick: this.getInfo.bind(this, _r),
                                    };
                                }}
                            />
                        }
                    </div>
                    <div className={style.rightBox} style={{ height }}>
                        <RightTags rightTagList={rightTags} rightData={record} updateSuccess={this.updateSuccess.bind(this)} />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    currentLocale: state.localeProviderData
}))(TableComponent);
