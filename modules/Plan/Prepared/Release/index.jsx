import React, { Component } from 'react'
import style from './style.less'
import { Modal, Table, Form, Input, Icon, DatePicker, Select, Row, Col, Steps, Button } from 'antd';
import intl from 'react-intl-universal'
import Search from '../../../../components/public/Search'
import moment from 'moment';
import Distribute from '../Distribute'
import '../../../../asserts/antd-custom.less'

import { questionSolvelist } from '../../../../api/api'
import axios from '../../../../api/axios'

const Option = Select.Option;
const Step = Steps.Step;
const { TextArea } = Input;

import emitter from '../../../../api/ev'
const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}

export class PlanPreparedRelease extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            step: 1,
            columns: [],
            data: [
                // {
                //     id: 1,
                //     name: 'ACM产品开发计划1',
                //     code: 'XM',
                //     planStartTime: '2018-08-10',
                //     planEndTime: '2018-08-10',
                //     iptName: '研发部',
                //     userName: '孙博宇',
                //     children: [
                //         {
                //             id: 2,
                //             name: 'ACM产品开发计划1-1',
                //             code: 'XM2',
                //             planStartTime: '2018-08-10',
                //             planEndTime: '2018-08-10',
                //             iptName: '研发部',
                //             userName: '孙博宇',
                //         },
                //         {
                //             id: 3,
                //             name: 'ACM产品开发计划1-1',
                //             code: 'XM2',
                //             planStartTime: '2018-08-10',
                //             planEndTime: '2018-08-10',
                //             iptName: '研发部',
                //             userName: '孙博宇',
                //         },
                //         {
                //             id: 4,
                //             name: 'ACM产品开发计划1-1',
                //             code: 'XM2',
                //             planStartTime: '2018-08-10',
                //             planEndTime: '2018-08-10',
                //             iptName: '研发部',
                //             userName: '孙博宇',
                //         },
                //     ]
                // },
            ],
            info: {
                receiver: '巫启贤、赵帅、徐文豪',
                sender: 'WSD',
                sendTime: '2019-01-25'
            }
        }
    }

    componentDidMount() {
        this.loadLocales()
        // 获取问题列表
        // console.log('问题----')
        this.getQuestionSolvelist()
    }

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        }).then(() => {
            this.setState({
                initDone: true,
                columns: [
                    {
                        title: intl.get('wsd.i18n.plan.feedback.name'),
                        dataIndex: 'title',
                        key: 'name',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.feedback.code'),
                        dataIndex: 'user.code',
                        key: 'code',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.feedback.planstarttime'),
                        dataIndex: 'planStartTime',
                        key: 'planStartTime',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.feedback.planendtime'),
                        dataIndex: 'planEndTime',
                        key: 'planEndTime',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.feedback.iptname'),
                        dataIndex: 'iptName',
                        key: 'iptName',
                    },
                    {
                        title: intl.get('wsd.i18n.plan.feedback.username'),
                        dataIndex: 'userName',
                        key: 'userName',
                    }
                ]
            });
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState((proState, state) => ({
            step: proState.step + 1
        }), () => {
            if (this.state.step == 3) {
                this.props.handleCancel()
                this.setState({
                    step: 1
                })
            }
        })
    }

    backone = (e) => {
        e.preventDefault();
        this.setState((proState, state) => ({
            step: proState.step - 1
        }))
    }

    //获取问题处理列表
    getQuestionSolvelist = () => {
        axios.get(questionSolvelist(' ')).then((result) => {
            // console.log(result,'解决列表')
            let data = result.data.data;
            if(data.length !== 0){
                this.setState({
                    data
                })
            }
        }).catch((err) => {
            console.log(err)
        });
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 21 },
            },
        };
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                this.setState({
                    selectData: selectedRows
                })
                console.log(selectedRows)
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
        };
        return (
            <Modal className={style.main} width="850px" forceRender={true} centered={true}
                title="下达" visible={this.props.modalVisible} onCancel={this.props.handleCancel} footer={
                    <div className="modalbtn">
                        {this.state.step > 1 && <span style={{ float: 'left' }}><Button key="backone" onClick={this.backone}>上一步</Button></span>}
                        <Button key="back" onClick={this.props.handleCancel}>取消</Button>
                        {this.state.step == 1 && <Button key="submit" type="primary" onClick={this.handleSubmit}>下一步</Button>}
                        {this.state.step == 2 && <Button key="submit" type="primary" onClick={this.handleSubmit}>提交</Button>}
                        {this.state.step == 3 && <Button key="submit" type="primary" onClick={this.handleSubmit}>完成</Button>}
                    </div>
                }>
                <div className={style.steps}>
                    <Steps size="small" current={this.state.step - 1}>
                        <Step title="选择计划" />
                        <Step title="启动流程" />
                        <Step title="完成" />
                    </Steps>
                </div>
                {/* step1 */}
                {this.state.step == 1 && (<div className={style.tableMain}>
                    <div className={style.search}>
                        <Search />
                    </div>
                    <Table rowKey={record => record.id} defaultExpandAllRows={true} pagination={false} name={this.props.name} columns={this.state.columns} rowSelection={rowSelection} dataSource={this.state.data} />
                </div>)}
                {/* step2 */}
                {this.state.step == 2 && (<div className={style.tableMain}>
                    <div className={style.search}>
                        <Search />
                    </div>
                    <Distribute />
                    <div style={{ marginTop: '15px' }}>
                        <span>处理意见：</span> <br />
                        <TextArea defaultValue="" placeholder="请输入处理意见" />
                    </div>
                </div>)
                }
            </Modal>

        )
    }
}

const PlanPreparedReleases = Form.create()(PlanPreparedRelease)

export default PlanPreparedReleases
