import react, { Component } from 'react'
import style from './index.less'
import { Button, Checkbox, Table, Row, Col, message } from 'antd'
import intl from 'react-intl-universal'

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}

let rowKeys = [], funcKeys = []

/* api */
import * as util from '../../../../utils/util';
import axios from '../../../../api/axios';
import { getAuthListByRoleId, updateRoleAuth } from '../../../../api/api';

export class Authority extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [{
                title: intl.get('wsd.i18n.sys.part.fucModule'),
                width: 150,
                dataIndex: 'menuName',
            }, {
                title: intl.get('wsd.i18n.sys.part.fucPower'),
                width: 650,
                dataIndex: 'funcList',
                render: (data, record, index) => {
                    return (
                        <Row>
                            {
                                data && data.map((v, i) => {
                                    return <Col span={6} key={i}><Checkbox checked={this.state.selectedFuncKeys.findIndex(key => key === v.funcCode) >= 0 ? true : false} onChange={this.getCheckboxValue.bind(this, v, record)}>{v.funcName}</Checkbox></Col>
                                })
                            }
                        </Row>
                    )
                }
            }],
            data: [],
            selectedRowKeys: [],
            selectedFuncKeys: []
        }
    }

    componentDidMount() {
        this.loadLocales();
        this.props.data ? this.getAuthListByRoleId(this.props.data.id) : null;
    }

    // 获取checkbox值
    getCheckboxValue = (v, record, event) => {
        const { selectedRowKeys, selectedFuncKeys } = this.state
        const index = selectedFuncKeys.findIndex(key => key === v.funcCode);
        const index2 = selectedRowKeys.findIndex(key => key === record.menuCode);
        if(index > -1) {
            selectedFuncKeys.splice(index, 1)
        } else {
            selectedFuncKeys.push(v.funcCode)
            if(index2 > -1) {
                index > -1 ? selectedRowKeys.splice(index2, 1) : null
            } else {
                selectedRowKeys.push(record.menuCode)
            }
        }
        this.setState({
            selectedRowKeys,
            selectedFuncKeys
        })
    }

    // 初始化state数据
    initStateData = (data) => {
        data.map(v => {
            if(v.check != 0) {
                v.menuCode ? rowKeys.push(v.menuCode) : funcKeys.push(v.funcCode)
            }
            if(v.children) {
                this.initStateData(v.children)
            }
            if(v.funcList) {
                this.initStateData(v.funcList)
            }
        })
        return {
            rowKeys,
            funcKeys
        }
    }

    // 根据Roleid获取权限
    getAuthListByRoleId = (id) => {
        axios.get(getAuthListByRoleId(id)).then(res => {
            rowKeys = []
            funcKeys = []
            const { data } = res.data
            const adata = this.initStateData(data)
            this.setState({
                data,
                selectedRowKeys: adata.rowKeys,
                selectedFuncKeys: adata.funcKeys
            })
        });
    }

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        }).then(() => {
            // After loading CLDR locale data, start to render
            this.setState({ initDone: true });
        });
    }

    onSelectChange = (record, selected, selectedRows, event) => {
        const { selectedRowKeys, selectedFuncKeys } = this.state
        const index = selectedRowKeys.findIndex(key => key === record.menuCode)
        if(index >= 0) {
            selectedRowKeys.splice(index, 1)
            if(record.children) {
                record.children.map(v => {
                    const index2 = selectedRowKeys.findIndex(key => key === v.menuCode)
                    selectedRowKeys.splice(index2, 1)
                })
            }
        } else {
            selectedRowKeys.push(record.menuCode)
            if(record.children) {
                record.children.map(v => {
                    const index2 = selectedRowKeys.findIndex(key => key === v.menuCode)
                    index2 >= 0 ? null : selectedRowKeys.push(v.menuCode)
                })
            }
        }
        this.setState({
            selectedRowKeys,
            selectedFuncKeys
        })
    }

    // 提交数据
    doUpdateRoleAuth = () => {
        const { selectedRowKeys, selectedFuncKeys } = this.state
        const { data } = this.props
        const values = []
        selectedRowKeys.map(v => {
            values.push({
                roleId: data.id,
                resCode: v,
                resType: 'menu'
            })
        })
        selectedFuncKeys.map(v => {
            values.push({
                roleId: data.id,
                resCode: v,
                resType: 'func'
            })
        })
        console.log({data: values})
        axios.put(updateRoleAuth(this.props.data.id), values).then(res => {
            message.success('修改成功');
            //this.props.closeRightBox();
        });
    }

    render() {
        const { selectedRowKeys } = this.state
        const rowSelection = {
            selectedRowKeys,
            onSelect: this.onSelectChange,
            getCheckboxProps: record => ({})
        }

        return (
            <div className={style.main}>
                {this.state.initDone && <Table
                    rowKey={_r => _r.menuCode}
                    columns={this.state.columns}
                    dataSource={this.state.data}
                    defaultExpandAllRows={true}
                    pagination={false}
                    bordered={true}
                    rowSelection={rowSelection}
                    scroll={{ x: 650 }}
                />}
                <div className={style.footBtn}>
                    {/* <div className={style.allCheckBox}><Checkbox onChange={this.onCheckAllChange} indeterminate={this.state.data.length !== this.state.selectedRowKeys.length && this.state.selectedRowKeys.length !== 0} checked={this.state.data.length === this.state.selectedRowKeys.length}>全选</Checkbox></div> */}
                    <div className={style.btn}>
                        <Button type="primary" onClick={this.doUpdateRoleAuth}>保存</Button>
                        <Button className={style.ml10} onClick={this.props.closeRightBox}>取消</Button>
                    </div>
                </div>
            </div>
        )
    }


}


export default Authority

