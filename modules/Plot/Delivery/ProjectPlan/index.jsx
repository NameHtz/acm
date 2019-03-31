import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, Icon, Spin } from 'antd'
import style from './style.less'
import Search from "../../../../components/public/Search"
import DownloadTopBtn from "../../../../components/public/TopTags/DownloadTopBtn"
const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
class ProjectPlan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            data: [
                {
                    id: 1,
                    key: 1
                },
                {
                    id: 2,
                    key: 2
                },
                {
                    id: 3,
                    key: 3
                },
                {
                    id: 4,
                    key: 4
                },
                {
                    id: 5,
                    key: 5
                },
                {
                    id: 6,
                    key: 6
                },
                {
                    id: 7,
                    key: 7
                },
                {
                    id: 8,
                    key: 8
                }
            ]
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
    onClickHandle = () => {

    }


    getInfo = (record, index) => {

        this.setState({
            activeIndex: record.id
        })
    }

    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : "";
    }
    render() {
        const columns = [
            {
                title: intl.get("wsd.i18n.base.planTem.name"),
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: intl.get("wsd.i18n.pre.eps.projectcode"),
                dataIndex: 'projectcode',
                key: 'projectcode',
            },
            {
                title: "计划开始",
                dataIndex: 'starttime',
                key: 'starttime',
            },
            {
                title: "计划完成",
                dataIndex: 'endtime',
                key: 'endtime',
            },
            {
                title: "实际开始",
                dataIndex: 'start',
                key: 'start',
            },
            {
                title: "实际完成",
                dataIndex: 'end',
                key: 'end',
            },
            {
                title: "交付状态",
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: "交付时间",
                dataIndex: 'time',
                key: 'time',
            },
        ];
        const columns1 = [
            {
                title: "名称",
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: "文档密级",
                dataIndex: 'note',
                key: 'note',
            },
            {
                title: "创建日期",
                dataIndex: 'date',
                key: 'date',
            }
        ]
        // const LinkModal = dynamic(import('../LinkModal/index'), {
        //     loading: () => <Spin size="small" />
        // })
        return (
            <div className={style.main}>
                {this.state.initDone &&
                    <div>
                        <div className={style.proLeft}>
                            <h3 className={style.listTitle}><p >计划</p></h3>

                            <div className={style.function}>
                                <Search></Search>
                            </div>
                            <div className={style.table}>
                                <Table columns={columns} dataSource={this.state.data} pagination={false} name={this.props.name}
                                    rowClassName={this.setClassName}
                                    onRow={(record, index) => {
                                        return {
                                            onClick: (event) => {
                                                this.getInfo(record, index)
                                            }
                                        }
                                    }
                                    } />
                            </div>
                        </div>
                        <div className={style.proRight}>
                            <h3 className={style.listTitle}><p className={style.textcolor}>文件</p></h3>
                            <div className={style.function}>
                                <DownloadTopBtn></DownloadTopBtn>
                            </div>
                            <div className={style.table}>
                                <Table columns={columns1} dataSource={this.state.data} pagination={false} name={this.props.name}
                                    rowClassName={this.setClassName}
                                    onRow={(record, index) => {
                                        return {
                                            onClick: (event) => {
                                                this.getInfo(record, index)
                                            }
                                        }
                                    }
                                    } />
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default ProjectPlan
