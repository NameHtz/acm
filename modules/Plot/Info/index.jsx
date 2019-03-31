import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, Icon, Spin } from 'antd'
import style from './style.less'
import TopTags from './TopTags/index'
import RightTags from '../../Components/RightTags'
import StandardTable from '../../../components/Table/index';
import { connect } from 'react-redux';
import axios from "../../../api/axios"
import { getproTileInfo, getproTree, deleteprolist } from "../../../api/api"
import * as util from '../../../utils/util';

class TableComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPageNum: 1,
            pageSize: 10,
            view: "tile",
            data: [],
            activeIndex: "",
            rightData: null,
            rightTags: [
                { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Plot/Info/InfoForm' },
                { icon: 'iconlianxiren1', title: '联系人信息', fielUrl: 'Plot/Approval/LinkManInfo' },
                { icon: 'iconwenjian', title: '文件信息', fielUrl: 'Components/FileInfo' },
                { icon: 'icontuandui', title: '协作团队', fielUrl: 'Plot/Info/TeamInfo' },
                { icon: 'iconset', title: '变量设置', fielUrl: 'Plot/Info/VariableSet' },
                { icon: 'iconfenleima', title: '分类码', fielUrl: 'Components/CategoryCodeTwo' }
            ],
        }

    }
    //搜索
    search = (value) => {
        if (value != null || value.trim() != "") {
            this.setState({
                searcher: value,
                currentPageNum: 1,
            }, () => {
                this.getViewData()
            })

        } else {
            this.setState({
                searcher: null,
                currentPageNum: 1,
            }, () => {
                this.getViewData()
            })
        }
    }
    getTileData = () => {
        axios.post(getproTileInfo(this.state.pageSize, this.state.currentPageNum), {}).then(res => {
            console.log(res)
            this.setState({
                data: res.data.data,
                total: res.data.total
            })
        })
    }
    getTreeData = () => {
        axios.post(getproTree, {}).then(res => {
            console.log(res)
            const dataMap = util.dataMap(res.data.data);
            this.setState({
                data: res.data.data,
                dataMap:dataMap
            })
        })
    }
    getViewData = () => {
        if (this.state.view == "tile") {
            this.getTileData()

        }
        if (this.state.view == "tree") {
            this.getTreeData()
        }

    }
    componentDidMount() {
        this.getViewData()

    }
    getInfo = (record, index) => {

        let id = record.id

        if (this.state.activeIndex == id) {

            id = ''
            record = null
        }
        this.setState({
            activeIndex: id,
            rightData: record
        })
    }
    setClassName = (record, index) => {
        //判断索引相等时添加行的高亮样式
        return record.id === this.state.activeIndex ? 'tableActivty' : "";
    }
    TreeTileViewBtnevent = (menu) => {
        this.setState({
            view: menu
        }, () => {
            this.getViewData()
        })
    }
    //删除
    deleteData = () => {
    
        const { data, dataMap, rightData } = this.state;
        if (this.state.view == "tile") {
            if (rightData) {
                axios.deleted(deleteprolist(rightData.id), null, true).then(res => {
                    let index = data.findIndex(item => item.id == rightData.id && item.eps == rightData.eps)
                    console.log(res)
                    this.setState(preState => ({
                        data: [...preState.data.slice(0, index), ...preState.data.slice(index + 1)],
                        rightData: null,
                        activeIndex: null
                    }), () => {
                        this.getTileData()
                    })
                })

            }
        }else{
          
            util.deleted(data, dataMap, rightData);
            this.props.changeMenuData(data)
            this.setState({
              data,
              rightData: null,
            });
        }
    }
    //新增
    addprojectinfo = (info) => {
        const { data, total, currentPageNum, pageSize } = this.state
        //平铺
        if (this.state.view == "tile") {
            //处理分页
            if (total % pageSize == 0 && data.length<pageSize) {
                this.setState({
                    data: [...data, info],
                    total: total + 1,
                    // currentPageNum: currentPageNum + 1
                })
            } else {
                this.setState({
                    data: [...data, info]
                })
            }

        }else{
            const { data, dataMap, rightData } = this.state;
            // console.log(value);
            util.create(data, dataMap, rightData, info);
            this.setState({
              data,
              dataMap,
            });
        }
        
    }
    updateSuccess = (info) => {
        const { data, rightData } = this.state
        console.log(info)
        //平铺
        if (this.state.view == "tile") {
            let index = data.findIndex(item => item.id == info.id && item.eps == info.eps)

            console.log("qqqqq")
            console.log(index)
            console.log(data)
            this.setState({
                data: [...data.slice(0, index), info, ...data.slice(index + 1)]
            })
        }else{
            const { data, dataMap, rightData } = this.state;
            util.modify(data, dataMap, rightData, info);
            this.setState({
              data,
              rightData: info,
            });
        }
    }
    render() {
        const { intl } = this.props.currentLocale
        let pagination = {
            total: this.state.total,
            // hideOnSinglePage: true,
            current: this.state.currentPageNum,
            pageSize: this.state.pageSize,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `每页${this.state.pageSize}/共${Math.ceil(this.state.total / this.state.pageSize)}页`,
            onShowSizeChange: (current, size) => {
                this.setState({
                    pageSize: size,
                    currentPageNum: 1
                }, () => {
                    this.getTileData()
                })
            },
            onChange: (page, pageSize) => {
                console.log(page)
                this.setState({
                    currentPageNum: page
                }, () => {
                    console.log(this.state.currentPageNum)
                    this.getTileData()
                })
            }
        }
        const columns = [
            {
                title: intl.get('wsd.i18n.pre.project1.projectname'),
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => {
                    if (record.children) {
                        return <span><span className="iconfont" style={{ color: "orange" }}>&#xe631;</span> {text}</span>
                    } else {
                        return <span><span className="iconfont" style={{ color: "orange" }}>&#xeb86;</span> {text}</span>
                    }
                }
            },
            {
                title: intl.get('wsd.i18n.pre.project1.projectcode'),
                dataIndex: 'code',
                key: 'code',

            },
            {
                title: intl.get('wsd.i18n.pre.project1.epsname'),
                dataIndex: 'parent',
                key: 'parent',
                render: (text) => {
                    if (text) {
                        return <span>{text.name}</span>
                    } else {
                        return null
                    }
                }
            },
            {
                title: intl.get('wsd.i18n.pre.project1.iptname'),
                dataIndex: 'org',
                key: 'org',
                render: (text) => {
                    if (text) {
                        return <span>{text.name}</span>
                    } else {
                        return null
                    }
                }
            },
            {
                title: intl.get('wsd.i18n.pre.project1.username'),
                dataIndex: 'user',
                key: 'user',
                render: (text) => {
                    if (text) {
                        return <span>{text.name}</span>
                    } else {
                        return null
                    }
                }
            },
            {
                title: intl.get('wsd.i18n.pre.project1.starttime'),
                dataIndex: 'planStartTime',
                key: 'planStartTime',
            },
            {
                title: intl.get('wsd.i18n.pre.project1.endtime'),
                dataIndex: 'planEndTime',
                key: 'planEndTime',
            },
            {
                title: intl.get('wsd.i18n.pre.project1.totalBudget1'),
                dataIndex: 'projectBudget',
                key: 'projectBudget',
            },
            {
                title: intl.get('wsd.i18n.pre.project1.creator'),
                dataIndex: 'creator',
                key: 'creator',
                render: (text) => {
                    if (text) {
                        return <span>{text.name}</span>
                    } else {
                        return null
                    }
                }
            },
            {
                title: intl.get('wsd.i18n.sys.menu.creattime'),
                dataIndex: 'creatTime ',
                key: 'creatTime ',
            },
            {
                title: intl.get('wsd.i18n.comu.meeting.status'),
                dataIndex: 'status',
                key: 'status',
                render: (text) => {
                    if (text) {
                        if (text.id == "active") {
                            return <span>激活</span>
                        } else {
                            return <span>未激活</span>
                        }
                    } else {
                        return null
                    }

                }
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
            <div>
                <TopTags onClickHandle={this.TreeTileViewBtnevent}
                    deleteData={this.deleteData}
                    addprojectinfo={this.addprojectinfo}
                    view={this.state.view} data={this.state.rightData}
                    search={this.search} />
                <div className={style.main}>
                    <div className={style.leftMain} style={{ height: this.props.height }}>
                        <div style={{ minWidth: 'calc(100vw - 60px)' }}>

                            <StandardTable className={style.Infotable1} columns={columns} dataSource={this.state.data}
                                pagination={this.state.view == "tile" ? pagination : false}
                                rowClassName={this.setClassName}
                                size="small"
                                rowSelection={rowSelection}
                                rowKey={record => `${record.id}${record.eps}`}
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
                    <div className={style.rightBox} style={{ height: this.props.height }}>
                        <RightTags rightTagList={this.state.rightTags} rightData={this.state.rightData} updateSuccess={this.updateSuccess} />
                    </div>
                </div>

            </div>

        )
    }
}


/* *********** connect链接state及方法 start ************* */
export default connect(state => ({
    currentLocale: state.localeProviderData
}))(TableComponent);
