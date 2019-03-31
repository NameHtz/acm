import React, { Component } from 'react'
import { Form, Row, Col, Checkbox, Input, Button, Icon, Select, DatePicker, Switch, Slider, InputNumber } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment';
import style from './style.less'

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group

export class OperateChangeEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {},
            oldInfo: Object.assign([], this.props.data),
        }
    }

    componentDidMount() {
        this.loadLocales();
        this.setState({
            info: this.props.data
        })
    }

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        }).then(() => {
            this.setState({ initDone: true });
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var data = values;
                data.key = this.state.info['key']
                alert(JSON.stringify(values))
            }
        });
    }


    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div className={style.main}>
                <h3 className={style.listTitle}>基本信息</h3>
                <div className={style.mainScorll}>
                    <div className={style.content}>
                        <Row type="flex">
                            <Col span={12}>
                                <h4>变更后</h4>
                                <Form onSubmit={this.handleSubmit}>
                                    {this.state.info.type == 2 && (
                                        <div>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.name')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('oldname', {
                                                        initialValue: this.state.info.name,
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.name'),
                                                        }],
                                                    })(
                                                        <Input />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.code')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('oldcode', {
                                                        initialValue: this.state.info.code,
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.code'),
                                                        }],
                                                    })(
                                                        <Input />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.orgName')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('oldorgName', {
                                                        initialValue: this.state.info.orgName,
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.orgName'),
                                                        }],
                                                    })(
                                                        <Select>
                                                            <Select.Option value="1">总经办</Select.Option>
                                                            <Select.Option value="2">研发部</Select.Option>
                                                            <Select.Option value="3">研发部</Select.Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.userName')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('olduserName', {
                                                        initialValue: this.state.info.userName,
                                                        rules: [],
                                                    })(
                                                        <Select>
                                                            <Select.Option value="1">孙博宇</Select.Option>
                                                            <Select.Option value="2">孙博宇</Select.Option>
                                                            <Select.Option value="3">孙博宇</Select.Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.planstarttime')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('oldplanStartTime', {
                                                        initialValue: moment(this.state.info.planStartTime),
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.planstarttime'),
                                                        }],
                                                    })(
                                                        <DatePicker placeholder="请选择" style={{ width: '100%' }} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.planendtime')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('oldplanEndTime', {
                                                        initialValue: moment(this.state.info.planEndTime),
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.planendtime'),
                                                        }],
                                                    })(
                                                        <DatePicker placeholder="请选择" style={{ width: '100%' }} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.planresource')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('oldplanResource', {
                                                        initialValue: this.state.info.planResource,
                                                        rules: [],
                                                    })(
                                                        <Select>
                                                            <Select.Option value="1">主线</Select.Option>
                                                            <Select.Option value="2">主线</Select.Option>
                                                            <Select.Option value="3">主线</Select.Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.score')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('oldscore', {
                                                        initialValue: this.state.info.score,
                                                        rules: [],
                                                    })(
                                                        <Input />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.checkpoint')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('oldcheckPoint', {
                                                        initialValue: this.state.info.checkPoint,
                                                        rules: [],
                                                    })(
                                                        <Input />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.isfeedback')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('oldisFeedback', {
                                                        initialValue: this.state.info.isFeedback,
                                                        rules: [],
                                                    })(
                                                        <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.assessment')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('oldassessMent', {
                                                        initialValue: this.state.info.assessMent,
                                                        rules: [],
                                                    })(
                                                        <TextArea rows={2} cols={10} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.scoretype')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('oldscoreType', {
                                                        initialValue: this.state.info.scoreType,
                                                        rules: [],
                                                    })(
                                                        <TextArea rows={2} cols={10} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.assesstarget')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('oldassessTarget', {
                                                        initialValue: this.state.info.assessTarget,
                                                        rules: [],
                                                    })(
                                                        <TextArea rows={2} cols={10} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.remark')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('oldremark', {
                                                        initialValue: this.state.info.remark,
                                                        rules: [],
                                                    })(
                                                        <TextArea rows={2} cols={10} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </div>
                                    )}
                                    {this.state.info.type == 3 && (
                                        <div>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.name')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('name', {
                                                        initialValue: this.state.info.name,
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.name'),
                                                        }],
                                                    })(
                                                        <Input />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.code')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('oldcode', {
                                                        initialValue: this.state.info.code,
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.code'),
                                                        }],
                                                    })(
                                                        <Input />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.orgName')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('oldorgName', {
                                                        initialValue: this.state.info.orgName,
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.orgName'),
                                                        }],
                                                    })(
                                                        <Select>
                                                            <Select.Option value="1">总经办</Select.Option>
                                                            <Select.Option value="2">研发部</Select.Option>
                                                            <Select.Option value="3">研发部</Select.Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.userName')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('olduserName', {
                                                        initialValue: this.state.info.userName,
                                                        rules: [],
                                                    })(
                                                        <Select>
                                                            <Select.Option value="1">孙博宇</Select.Option>
                                                            <Select.Option value="2">孙博宇</Select.Option>
                                                            <Select.Option value="3">孙博宇</Select.Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.planstarttime')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('oldplanStartTime', {
                                                        initialValue: moment(this.state.info.planStartTime),
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.planstarttime'),
                                                        }],
                                                    })(
                                                        <DatePicker placeholder="请选择" style={{ width: '100%' }} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.planendtime')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('oldplanEndTime', {
                                                        initialValue: moment(this.state.info.planEndTime),
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.planendtime'),
                                                        }],
                                                    })(
                                                        <DatePicker placeholder="请选择" style={{ width: '100%' }} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.duration')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('oldduration', {
                                                        initialValue: this.state.info.duration,
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.duration'),
                                                        }],
                                                    })(
                                                        <Input />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.tasktype')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('oldtaskType', {
                                                        initialValue: this.state.info.taskType,
                                                        rules: [],
                                                    })(
                                                        <CheckboxGroup options={[{ label: '任务', value: 1 }, { label: '开始里程碑', value: 2 }, { label: '完成里程碑', value: 3 }]} defaultValue={['任务']} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.planresource')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('planResource', {
                                                        initialValue: this.state.info.planResource,
                                                        rules: [],
                                                    })(
                                                        <Select>
                                                            <Select.Option value="1">主线</Select.Option>
                                                            <Select.Option value="2">主线</Select.Option>
                                                            <Select.Option value="3">主线</Select.Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.remark')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('oldremark', {
                                                        initialValue: this.state.info.remark,
                                                        rules: [],
                                                    })(
                                                        <TextArea rows={2} cols={10} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </div>
                                    )}
                                    <Row>
                                        <Col span={8} offset={8}>
                                            <Button onClick={this.handleSubmit} type="primary">保存</Button>
                                        </Col>
                                        <Col span={8}>
                                            <Button onClick={this.props.closeRightBox}>取消</Button>
                                        </Col>
                                    </Row>

                                </Form>
                            </Col>
                            <Col span={12}>
                                <h4>变更前</h4>
                                <Form>
                                    {this.state.info.type == 2 && (
                                        <div>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.name')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('name', {
                                                        initialValue: this.state.info.name,
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.name'),
                                                        }],
                                                    })(
                                                        <Input disabled={true} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.code')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('code', {
                                                        initialValue: this.state.oldInfo.code,
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.code'),
                                                        }],
                                                    })(
                                                        <Input disabled={true} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.orgName')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('orgName', {
                                                        initialValue: this.state.oldInfo.orgName,
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.orgName'),
                                                        }],
                                                    })(
                                                        <Select disabled={true}>
                                                            <Select.Option value="1">总经办</Select.Option>
                                                            <Select.Option value="2">研发部</Select.Option>
                                                            <Select.Option value="3">研发部</Select.Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.userName')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('userName', {
                                                        initialValue: this.state.oldInfo.userName,
                                                        rules: [],
                                                    })(
                                                        <Select disabled={true}>
                                                            <Select.Option value="1">孙博宇</Select.Option>
                                                            <Select.Option value="2">孙博宇</Select.Option>
                                                            <Select.Option value="3">孙博宇</Select.Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.planstarttime')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('planStartTime', {
                                                        initialValue: moment(this.state.oldInfo.planStartTime),
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.planstarttime'),
                                                        }],
                                                    })(
                                                        <DatePicker placeholder="请选择" style={{ width: '100%' }} disabled={true} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.planendtime')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('planEndTime', {
                                                        initialValue: moment(this.state.oldInfo.planEndTime),
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.planendtime'),
                                                        }],
                                                    })(
                                                        <DatePicker placeholder="请选择" style={{ width: '100%' }} disabled={true} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.planresource')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('planResource', {
                                                        initialValue: this.state.oldInfo.planResource,
                                                        rules: [],
                                                    })(
                                                        <Select disabled={true}>
                                                            <Select.Option value="1">主线</Select.Option>
                                                            <Select.Option value="2">主线</Select.Option>
                                                            <Select.Option value="3">主线</Select.Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.score')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('score', {
                                                        initialValue: this.state.oldInfo.score,
                                                        rules: [],
                                                    })(
                                                        <Input disabled={true} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.checkpoint')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('checkPoint', {
                                                        initialValue: this.state.oldInfo.checkPoint,
                                                        rules: [],
                                                    })(
                                                        <Input disabled={true} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.isfeedback')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('isFeedback', {
                                                        initialValue: this.state.oldInfo.isFeedback,
                                                        rules: [],
                                                    })(
                                                        <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked disabled={true} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.assessment')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('assessMent', {
                                                        initialValue: this.state.oldInfo.assessMent,
                                                        rules: [],
                                                    })(
                                                        <TextArea rows={2} cols={10} disabled={true} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.scoretype')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('scoreType', {
                                                        initialValue: this.state.oldInfo.scoreType,
                                                        rules: [],
                                                    })(
                                                        <TextArea rows={2} cols={10} disabled={true} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.assesstarget')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('assessTarget', {
                                                        initialValue: this.state.oldInfo.assessTarget,
                                                        rules: [],
                                                    })(
                                                        <TextArea rows={2} cols={10} disabled={true} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.remark')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('remark', {
                                                        initialValue: this.state.oldInfo.remark,
                                                        rules: [],
                                                    })(
                                                        <TextArea rows={2} cols={10} disabled={true} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </div>
                                    )}
                                    {this.state.info.type == 3 && (
                                        <div>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.name')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('name', {
                                                        initialValue: this.state.oldInfo.name,
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.name'),
                                                        }],
                                                    })(
                                                        <Input disabled={true} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.code')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('code', {
                                                        initialValue: this.state.oldInfo.code,
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.code'),
                                                        }],
                                                    })(
                                                        <Input disabled={true} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.orgName')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('orgName', {
                                                        initialValue: this.state.oldInfo.orgName,
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.orgName'),
                                                        }],
                                                    })(
                                                        <Select disabled={true}>
                                                            <Select.Option value="1">总经办</Select.Option>
                                                            <Select.Option value="2">研发部</Select.Option>
                                                            <Select.Option value="3">研发部</Select.Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.userName')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('userName', {
                                                        initialValue: this.state.oldInfo.userName,
                                                        rules: [],
                                                    })(
                                                        <Select disabled={true}>
                                                            <Select.Option value="1">孙博宇</Select.Option>
                                                            <Select.Option value="2">孙博宇</Select.Option>
                                                            <Select.Option value="3">孙博宇</Select.Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.planstarttime')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('planStartTime', {
                                                        initialValue: moment(this.state.oldInfo.planStartTime),
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.planstarttime'),
                                                        }],
                                                    })(
                                                        <DatePicker placeholder="请选择" style={{ width: '100%' }} disabled={true} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.planendtime')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('planEndTime', {
                                                        initialValue: moment(this.state.oldInfo.planEndTime),
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.planendtime'),
                                                        }],
                                                    })(
                                                        <DatePicker placeholder="请选择" style={{ width: '100%' }} disabled={true} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.duration')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('duration', {
                                                        initialValue: this.state.oldInfo.duration,
                                                        rules: [{
                                                            required: true, message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.operate.prepared.duration'),
                                                        }],
                                                    })(
                                                        <Input disabled={true} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.tasktype')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('taskType', {
                                                        initialValue: this.state.oldInfo.taskType,
                                                        rules: [],
                                                    })(
                                                        <CheckboxGroup disabled={true} options={[{ label: '任务', value: 1 }, { label: '开始里程碑', value: 2 }, { label: '完成里程碑', value: 3 }]} defaultValue={['任务']} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.planresource')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('planResource', {
                                                        initialValue: this.state.oldInfo.planResource,
                                                        rules: [],
                                                    })(
                                                        <Select disabled={true}>
                                                            <Select.Option value="1">主线</Select.Option>
                                                            <Select.Option value="2">主线</Select.Option>
                                                            <Select.Option value="3">主线</Select.Option>
                                                        </Select>
                                                    )}
                                                </div>
                                            </Form.Item>
                                            <Form.Item label={intl.get('wsd.i18n.operate.prepared.remark')} {...formItemLayout}>
                                                <div className={style.list}>
                                                    {getFieldDecorator('remark', {
                                                        initialValue: this.state.oldInfo.remark,
                                                        rules: [],
                                                    })(
                                                        <TextArea disabled={true} rows={2} cols={10} />
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </div>
                                    )}
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

const OperateChangeEdits = Form.create()(OperateChangeEdit)
export default OperateChangeEdits
