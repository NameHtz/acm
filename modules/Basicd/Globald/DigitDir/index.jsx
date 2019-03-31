import React, { Component } from 'react';
import intl from 'react-intl-universal';
import { connect } from 'react-redux';
import { Table, notification } from 'antd';
import style from './style.less';
import DigRight from './DigRight';
import axios from '../../../../api/axios';
import TopTags from './TopTags/index'
import RightTags from '../../../../components/public/RightTags/index'
import EN_US from '../../../../api/language/en-US.json';
import ZH_CN from '../../../../api/language/zh-CN.json';
// 导入国际化
import { dataMap, create, modify } from "../../../../utils/util"
import { queryDataList, queryList } from '../../../../store/digitDir/reducer';

//api
import { getDigitDirBoList, geteListByBoCod, addDigitDirBo, deleteDigitDirBo } from '../../../../api/api'


const locales = {
    'en-US': EN_US,
    'zh-CN': ZH_CN,
};

const columns = [
    {
        title: <h3>业务对象</h3>,
        dataIndex: 'boName',
        key: 'boName',
    },
];

export class BasicdGlobaldCalendarSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: null,
            initDone: false,
            leftData: [],
            data: [],
            rightTags: [],
            rightData: null,
        };
    }

    componentDidMount() {
        this.getList();
        this.getTagsList();
        this.loadLocales();
    }

    // 初始化右侧图标
    getTagsList = () => {
        axios.post('api/sys/menu/menutab', { menuId: this.props.menuInfo.id }).then(res => {
            this.setState({
                rightTags: [
                    { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Basicd/Globald/DigitDir/DigitInfo' },
                    { icon: 'iconzidianmazhi', title: '字典码值', fielUrl: 'Basicd/Globald/DigitDir/DigitType' }
                ]
            })
        })
    }

    //获取业务对象列表
    getList = () => {
        axios.get(getDigitDirBoList).then(res => {
            this.setState({
                leftData: res.data.data,
                boCode: res.data.data[0].boCode
            }, () => {
                this.getListrightdata()
            });
        });
    };

    // 获取数据字典列表
    getListrightdata = () => {
        axios.get(geteListByBoCod(this.state.boCode)).then(ress => {
            console.log(ress.data)
            this.setState({
                data: ress.data.data,
            }, () => {
                let map = dataMap(ress.data.data);
                this.setState({
                    map: map
                })
            });
        });
    }

    // 初始化国际化
    loadLocales() {
        intl.init({
            currentLocale: 'en-US',
            locales,
        }).then(() => {
            this.setState({ initDone: true });
        });
    }

    //点击业务对象获取数据字典
    getInfo = (record, index) => {
        let { id } = record;
        let records = record;
        if (this.state.activeIndex === id) {
            id = '';
            records = '';
        }
        this.setState({
            activeIndex: id,
            rightData: [],
            boCode: record.boCode
        }, () => {
            this.getListrightdata()
        });
    };

    //点击业务对象右侧数据
    getTableInfo = (data) => {
        this.setState({
            rightData: data
        })
    }

    //新增数据字典
    getrightAddData = (adddata) => {
        const data = adddata
        data.boCode = this.state.boCode
        axios.post(addDigitDirBo, data).then(res => {
            this.setState((preState, props) => ({
                data: [...preState.data, res.data.data]
            }))
            notification.success(
                {
                    placement: 'bottomRight',
                    bottom: 50,
                    duration: 2,
                    message: '操作提醒',
                    description: res.data.message
                }
            )
        })
    }

    setClassName = (record) => {
        const { activeIndex } = this.state;
        // 判断索引相等时添加行的高亮样式
        return record.id === activeIndex ? `${style.clickRowStyl}` : '';
    };

    //修改基本信息
    submitData = (data) => {
        let index = this.state.data.findIndex(v => v.id == data.id)
        this.setState((preState, props) => ({
            data: [...preState.data.slice(0, index), data, ...preState.data.slice(index + 1)]
        }))
    }

    //删除数据字典
    onHandleDelete = () => {
        if (this.state.rightData.id) {
            let index = this.state.data.findIndex(v => v.id == this.state.rightData.id)
            axios.deleted(deleteDigitDirBo, { data: [this.state.rightData.id] }).then(res => {
                this.setState((preState, props) => ({
                    data: [...preState.data.slice(0, index), ...preState.data.slice(index + 1)]
                }))
                notification.success(
                    {
                        placement: 'bottomRight',
                        bottom: 50,
                        duration: 2,
                        message: '操作提醒',
                        description: '删除成功！'
                    }
                )
            })
        }
    }

    render() {
        const { leftData, data } = this.state;
        return (
            <div className={style.main}>
                <TopTags />
                {/* <div style={{minWidth: 'calc(100vw - 60px)'}}> */}
                <div className={style.left}>
                    <Table
                        columns={columns}
                        dataSource={leftData}
                        pagination={false}
                        rowKey={record => record.id}
                        rowClassName={this.setClassName}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    // this.props.queryList();
                                    this.getInfo(record, index);
                                },
                            };
                        }}
                    />
                </div>
                <div className={style.right}>
                    <DigRight data={data} getTableInfo={this.getTableInfo} boCode={this.state.boCode}
                        onHandleDelete={this.onHandleDelete}
                        getadddata={this.getrightAddData} />
                </div>
                {/* </div> */}
                <div className={style.rightBox} style={{ height: this.props.height }}>
                    <RightTags rightTagList={this.state.rightTags} rightData={this.state.rightData} submitData={this.submitData.bind(this)} />
                </div>
            </div>
        );
    }
}

export default connect(state => state.digitDir, { queryDataList, queryList })(BasicdGlobaldCalendarSet);
