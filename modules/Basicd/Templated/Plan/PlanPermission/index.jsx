import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, Icon, Select ,Spin,Checkbox} from 'antd'
import dynamic from 'next/dynamic'
import style from './style.less'
import DeleteTopBtn from "../../../../../components/public/TopTags/DeleteTopBtn"
import DistributionBtn from "../../../../../components/public/TopTags/DistributionBtn"
const locales = {
    "en-US": require('../../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../../api/language/zh-CN.json')
}
const Option = Select.Option;
class PlanTemPer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            distributeType: false,
            data: [
                {
                    key: "1",
                    id:1,
                    userName: "用户1",
                    source: "本机扩展用户",
                    manage: 1,
                },
                {
                    key: "2",
                    id:2,
                    userName: "用户1",
                    source: "本机扩展用户",
                    manage: 0,


                },
                {
                    key: "3",
                    id:3,
                    userName: "用户3",
                    source: "本机扩展用户",
                    manage: 1,

                },

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
    onClickHandle = (name) => {
        if (name == "DistributionBtn") {
            console.log(this)
            this.setState({
                distributeType: true
            })
        }
    }
    onClickHandle1 = (name) => {
        if (name == "DistributionBtn") {
            console.log(this)
            this.setState({
                distributeType: true
            })
        }
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
        const DistributionModal = dynamic(import('../Distribute'), {
            loading: () => <Spin size="small" />
        })
        const columns = [
            {
                title: "用户名称",
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: "来源",
                dataIndex: 'source',
                key: 'source',
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
                <h3 className={style.listTitle}>模板权限</h3>
                <div className={style.rightTopTogs}>
                   
                    <DistributionBtn onClickHandle={this.onClickHandle1}/>
                    <DeleteTopBtn onClickHandle={this.onClickHandle} />
                    {this.state.distributeType && <DistributionModal></DistributionModal>}
                </div>
                <Table columns={columns}
                       rowKey={record => record.id}
                      
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
            </div>

        )
    }
}

export default PlanTemPer

