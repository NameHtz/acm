import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, Icon, Select, Spin, Checkbox, notification } from 'antd'
import style from './style.less'
import AddSameBtn from "../../../../../components/public/TopTags/AddSameBtn"
import AddNextBtn from "../../../../../components/public/TopTags/AddNextBtn"
import DeleteTopBtn from "../../../../../components/public/TopTags/DeleteTopBtn"
import MoveTDLRTopBtn from "../../../../../components/public/TopTags/MoveTDLRTopBtn"
import EditGtModal from "./EditGtModal"
import EditableTable from "./EditableTable/"
import * as util from '../../../../../utils/util';
//api
import {
    getDictTypeCodeList,
    addDictTypeCode,
    getDictTypeCodeInfoById,
    updateDictTypeCode,
    deleteDictTypeCode
} from '../../../../../api/api'
import axios from '../../../../../api/axios';

const locales = {
    "en-US": require('../../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../../api/language/zh-CN.json')
}
class DigitTypeTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            visible: false,
            title: '',
            dictTypeCodeList: [],
            currentRow: {},
            dataMap: []
        }
    }

    onClickHandle = (name) => {
        if (name == "AddSameBtn") {
            this.setState(
                { title: '新增同级', visible: true })
        }
        if (name == "AddNextBtn") {
            this.setState(
                { title: '新增下级', visible: true })
        }
        if (name == 'DeleteTopBtn') {
            this.deleteDictTypeCode([this.editableTable.state.activeIndex])
        }
    }

    handleCancel = (e) => {
        this.setState({ visible: false })
    }

    // 获取字典码值列表
    getDictTypeCodeList = () => {
        axios.get(getDictTypeCodeList(this.props.data.typeCode)).then(res => {
            const { data } = res.data
            console.log(data)
            this.setState({
                dictTypeCodeList: data
            })
        })
    }

    // 新增字典码值-同级
    addDictTypeCode = (data) => {
        console.log(data)
        axios.post(addDictTypeCode, data).then(res => {
            console.log(res.data)
        })
    }

    // 字典码值基本信息
    getDictTypeCodeInfoById = (id) => {
        axios.get(getDictTypeCodeInfoById(id)).then(res => {
            console.log(res.data)
        })
    }

    // 修改字典码值
    updateDictTypeCode = (data) => {
        axios.put(updateDictTypeCode, data).then(res => {
            console.log(res.data)
        })
    }

    // 删除字典码值
    deleteDictTypeCode = (ids) => {
        console.log(ids)
        axios.deleted(deleteDictTypeCode, { data: [...ids] }).then(res => {
            let index = this.state.dictTypeCodeList.findIndex(v => v.id == ids[0])
            this.setState((preState, props) => ({
                dictTypeCodeList: [...preState.dictTypeCodeList.slice(0, index), ...preState.dictTypeCodeList.slice(index + 1)]
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

    getCurrentRow = () => {
        return this.editableTable.state.currentRow
    }

    // 新增同级及新增下级更新表格数据
    updateDictTableData = (udata, addType) => {
        const { dictTypeCodeList, dataMap } = this.state;

        //addType add新增同级 addTop新增同级顶级 addChild新增下级
        if (addType.type === 'addTop') {
            this.setState((prevState, state) => ({
                dictTypeCodeList: [udata, ...prevState.dictTypeCodeList]
            }))
        }
        if (addType.type === 'add') {
            util.create(dictTypeCodeList, dataMap, this.getCurrentRow(), udata);
            this.setState({
                dictTypeCodeList
            })
        }
        if (addType.type === 'addChild') {
            util.modify(dictTypeCodeList, dataMap, this.getCurrentRow(), udata);
            this.setState({
                dictTypeCodeList
            })
        }
        //util.modify(dictTypeCodeList, dataMap, record, v);
        //util.create(data, dataMap, record, value);
    }

    render() {
        return (
            <div className={style.main}>
                <h3 className={style.listTitle}>字典码值</h3>
                <div className={style.rightTopTogs}>
                    <AddSameBtn onClickHandle={this.onClickHandle} />
                    <AddNextBtn onClickHandle={this.onClickHandle} />
                    <MoveTDLRTopBtn onClickHandle={this.onClickHandle} />
                    <DeleteTopBtn onClickHandle={this.onClickHandle} />
                </div>
                <EditableTable data={this.state.dictTypeCodeList} currentLData={this.props.data} getDictTypeCodeList={this.getDictTypeCodeList} ref={r => this.editableTable = r}></EditableTable>

                <EditGtModal title={this.state.title} updateDictTableData={this.updateDictTableData} getCurrentRow={this.getCurrentRow} currentLData={this.props.data} visible={this.state.visible} addDictTypeCode={this.addDictTypeCode} onCancel={this.handleCancel} />
            </div>
        )
    }
}

export default DigitTypeTable

