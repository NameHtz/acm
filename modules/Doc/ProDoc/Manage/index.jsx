import React, { Component } from 'react'
import { Modal, Button, Row, Col, Input, Icon, Select, Form, Table } from 'antd'
import style from './style.less'
import intl from 'react-intl-universal'
import Drop from './Dropdown/index'
import Allot from './Allot/index'

import { connect } from 'react-redux'
import { curdCurrentData } from '../../../../store/curdData/action'



const locales = {
    'en-US': require('../../../../api/language/en-US.json'),
    'zh-CN': require('../../../../api/language/zh-CN.json')
}

const { TextArea } = Input;

class Manage extends Component {

    state = {
        initDone: false,
        DroVisible: false,
        AllotVisible: false,
        X: 0,
        Y: 0,
        modalInfo: {
            title: '管理文件夹'
        },
        inputValue: 0,
        LeftColumns: [{
            title: '文件夹名称',
            dataIndex: 'name',
            key: 'name',
            render: text => <span><Icon type="folder" className={style.leftTableIcon} />{text}</span>
        }, {
            title: '',
            dataIndex: 'num',
            key: 'num'
        }],
        LeftData: [{
            key: 1,
            name: '项目招投标文件',
            num: 1,
            children: [{
                key: 11,
                name: '工程图纸文件',
                num: 12
            }]
        }, {
            key: 2,
            name: '工程合同文件',
            num: 22,
            children: [{
                key: 21,
                name: '工程图纸文件',
                num: 21,
            }, {
                key: 22,
                name: '工程图纸文件',
                num: 22,
            }]
        }],

    }

    componentDidMount() {
        this.loadLocales();
    }

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        }).then(() => {
            this.setState({ initDone: true })
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                const values = {
                    ...fieldsValue,
                    'planStartTime': fieldsValue['planStartTime'].format('YYYY-MM-DD'),
                    'planEndTime': fieldsValue['planEndTime'].format('YYYY-MM-DD'),
                }
                // emitter.emit('noticeUpdateEvents', { status: 'add', data: values })
                this.props.curdCurrentData({
                    title: localStorage.getItem('name'),
                    status: 'add',
                    data: values
                })
                //this.props.curdCurrentData('add', 'status')
                //this.props.curdCurrentData(values, 'data')

                // 清空表单项
                this.props.form.resetFields()
                // 关闭弹窗
                this.props.handleCancel()
            }
        })
    }

    onChange = (value) => {
        this.setState({
            inputValue: value,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (!err) {
                // const values = {
                //     ...fieldsValue,
                //     'planStartTime': fieldsValue['planStartTime'].format('YYYY-MM-DD'),
                //     'planEndTime': fieldsValue['planEndTime'].format('YYYY-MM-DD'),
                // }
                // emitter.emit('noticeUpdateEvents', { status: 'add', data: values })
                // this.props.curdCurrentData({
                //     title: localStorage.getItem('name'),
                //     status: 'add',
                //     data: values
                // })
                //this.props.curdCurrentData('add', 'status')
                //this.props.curdCurrentData(values, 'data')

                // 清空表单项
                this.props.form.resetFields()
                // 关闭弹窗
                // this.props.handleCancel('UploadVisible')
                this.handleCancel.bind(this)
            }
        })
    }



    handleCancel() {
        this.props.handleCancel('UpgradeVisible')
    }

    DropHandleCancel = (v) => {

        // console.log(v)
        if (v == 'temToImport') {
            this.setState({ DroVisible: false, AllotVisible: true })
        } else {
            this.setState({ DroVisible: false })
        }
    }

    AllotHandleCancel = () => {
        this.setState({ AllotVisible: false })
    }

    render() {


        return (
            <div>
                {this.state.initDone && (
                    <Modal
                        className={style.main}
                        width="850px"
                        title={this.state.modalInfo.title}
                        forceRender={true} centered={true}
                        visible={this.props.modalVisible}
                        onCancel={this.handleCancel.bind(this)}
                        footer={
                            <div className='modalbtn'>
                                <Button key="b" type="submit" onClick={this.handleCancel.bind(this)} >关闭</Button>
                                <Button key="saveAndSubmit" type="primary" >保存</Button>
                            </div>
                        }
                    >

                        <div className={style.content}>
                            <div className={style.content}>
                                <Row type="flex">
                                    <Col span={24}>

                                        <Table rowKey={record => record.key} columns={this.state.LeftColumns} dataSource={this.state.LeftData} pagination={false}
                                            onRow={(record) => {
                                                return {
                                                    onContextMenu: (event) => {
                                                        this.setState({ DroVisible: true, X: event.clientX, Y: event.clientY })
                                                        event.preventDefault()

                                                    }
                                                }
                                            }}
                                        />

                                    </Col>
                                    <Col span={5}>
                                        <Button type="primary" block className={style.btn}>新建文件夹</Button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Modal>
                )}
                {/* 右击事件 */}
                <Drop visible={this.state.DroVisible} handleCancel={this.DropHandleCancel.bind(this)} X={this.state.X} Y={this.state.Y} />
                {/* 模板导入 */}
                <Allot modalVisible={this.state.AllotVisible} handleCancel={this.AllotHandleCancel.bind(this)} />
            </div>
        )
    }

}

export default connect(null, {
    curdCurrentData
})(Manage);



