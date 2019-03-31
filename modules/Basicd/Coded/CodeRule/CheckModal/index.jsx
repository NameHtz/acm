import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Modal, InputNumber, Switch } from 'antd';
import axios from "../../../../../api/axios"
import { baseDigitDir, coderulecell, addCoderulecell, getcoderuletype, updateCoderulecell } from "../../../../../api/api"
import { connect } from 'react-redux';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option
class CheckModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectValue: "ATTRIBUTE",
            info: {}
        }
    }
    getInfo = () => {
        axios.get(coderulecell(this.props.ruleId, this.props.position)).then(res => {
            this.setState({
                info: res.data.data
            }, () => {
                console.log(this.state.info)
                this.setState(preState => ({
                    selectValue: preState.info.ruleTypeVo.id
                }))
            })
        })
    }
    componentDidMount() {
        console.log("CCCC")
        console.log(this.props.type)
        if (this.props.type == "modify") {
            this.getInfo()
        }

        axios.get("api/base/dict/base.coderule.connector/select/tree").then(res => {
            console.log(res)
            this.setState({
                digitDir: res.data.data
            })
        })
        axios.get(getcoderuletype(this.props.boId)).then(res => {
            this.setState({
                coderuletype: res.data.data
            })
        })
    }



    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { selectValue, coderuletype } = this.state
                let data
                //根据类型处理数据
                if (selectValue == "FIXED_VALUE") {
                    data = {
                        ...values,
                        position: this.props.position,
                        ruleId: this.props.ruleId,
                        ruleCellName: "固定值-" + values.cellValue
                    }
                    // delete data.cellValue
                }
                if (selectValue == "SEQUENCE") {

                    data = {
                        ...values,
                        position: this.props.position,
                        ruleId: this.props.ruleId,
                        ruleCellName: "流水号",
                        ruleTypeId: values.cellValue
                    }
                }
                if (selectValue == "ATTRIBUTE") {
                    let index = coderuletype.findIndex(item => item.id == values.cellValue)
                    let name = coderuletype[index].ruleTypeName

                    data = {
                        ...values,
                        position: this.props.position,
                        ruleId: this.props.ruleId,
                        ruleCellName: name,
                        ruleTypeId: values.cellValue
                    }
                    delete data.cellValue
                }
                console.log(data)
                if (this.props.type == "add") {
                    console.log(data)
                    axios.post(addCoderulecell, data, true).then(res => {
                        this.props.updateNode(res.data.data)
                        this.props.form.resetFields();
                        this.props.handleCancel()
                    })
                    return
                }
                if (this.props.type == "modify") {
                    data.id = this.state.info.id
                    console.log(data)
                    axios.put(updateCoderulecell, data, true).then(res => {
                        console.log(res)
                        this.props.updateNode(res.data.data)
                        this.props.handleCancel()
                    })
                }
            }
        });
    }

    onSelect = (value) => {
        this.setState({
            selectValue: value
        })
    }
    render() {
        const { intl } = this.props.currentLocale
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;
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
                {/* <h2>{intl.get('wbs.add.name')}</h2>*/}
                <Modal
                    className={style.formMain}
                    width="850px"

                    centered={true}
                    title={`第${this.props.position}段`}
                    visible={true} onCancel={this.props.handleCancel}
                    footer={
                        <div className='modalbtn'>
                            <Button key="submit1" onClick={this.handleSubmit}>取消</Button>
                            <Button key="submit2" type="primary" onClick={this.handleSubmit}>保存</Button>
                        </div>
                    }>
                    {this.state.selectValue == "ATTRIBUTE" &&
                        <Form onSubmit={this.handleSubmit}>
                            <div className={style.content}>
                                <Row  >
                                    <Col span={12}>
                                        <Form.Item
                                            label="类型" {...formItemLayout}>
                                            {getFieldDecorator('ruleType', {
                                                initialValue: this.state.selectValue,
                                                rules: [],
                                            })(
                                                <Select onSelect={this.onSelect}>
                                                    <Option value="ATTRIBUTE">属性</Option>
                                                    <Option value="FIXED_VALUE">固定值</Option>
                                                    <Option value="SEQUENCE">流水号</Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="值" {...formItemLayout}>
                                            {getFieldDecorator('cellValue', {
                                                initialValue: this.state.info.ruleTypeIdVo ? this.state.info.ruleTypeIdVo.id : null,
                                                rules: [],
                                            })(
                                                <Select >
                                                    {this.state.coderuletype && this.state.coderuletype.map(item => {
                                                        return <Option value={item.id} key={item.id}>{item.ruleTypeName}</Option>
                                                    })}
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row  >
                                    <Col span={12}>
                                        <Form.Item
                                            label="固定长度" {...formItemLayout}>
                                            {getFieldDecorator('maxLength', {
                                                initialValue: this.state.info.maxLength,
                                                rules: [],
                                            })(
                                                <InputNumber style={{ width: "100%" }} />

                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="填充字符" {...formItemLayout}>
                                            {getFieldDecorator('fillChar', {
                                                initialValue: this.state.info.fillChar,
                                                rules: [],
                                            })(
                                                <Input maxlength="1"/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row  >
                                    <Col span={12}>
                                        <Form.Item
                                            label="连接符" {...formItemLayout}>
                                            {getFieldDecorator('connector', {
                                                initialValue: this.state.info.connectorVo ? this.state.info.connectorVo.id : null,
                                                rules: [],
                                            })(
                                                <Select>
                                                    {this.state.digitDir && this.state.digitDir.map(item => {
                                                        return <Option value={item.value} key={item.value}>{item.title}</Option>
                                                    })}
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>

                                </Row>
                            </div>

                        </Form>
                    }
                    {this.state.selectValue == "FIXED_VALUE" &&
                        <Form onSubmit={this.handleSubmit}>
                            <div className={style.content}>
                                <Row  >
                                    <Col span={12}>
                                        <Form.Item
                                            label="类型" {...formItemLayout}>
                                            {getFieldDecorator('ruleType', {
                                                initialValue: this.state.selectValue,
                                                rules: [],
                                            })(
                                                <Select onSelect={this.onSelect}>
                                                    <Option value="ATTRIBUTE">属性</Option>
                                                    <Option value="FIXED_VALUE">固定值</Option>
                                                    <Option value="SEQUENCE">流水号</Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="值" {...formItemLayout}>
                                            {getFieldDecorator('cellValue', {
                                                initialValue: this.state.info.cellValue,
                                                rules: [],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row  >
                                    <Col span={12}>
                                        <Form.Item
                                            label="固定长度" {...formItemLayout}>
                                            {getFieldDecorator('maxLength', {
                                                initialValue: this.state.info.maxLength,
                                                rules: [],
                                            })(
                                                <InputNumber style={{ width: "100%" }} />

                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="填充字符" {...formItemLayout}>
                                            {getFieldDecorator('fillChar', {
                                                initialValue: this.state.info.fillChar,
                                                rules: [],
                                            })(
                                                <Input maxlength="1"/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row  >
                                    <Col span={12}>
                                        <Form.Item
                                            label="连接符" {...formItemLayout}>
                                            {getFieldDecorator('connector', {
                                                initialValue: this.state.info.connectorVo ? this.state.info.connectorVo.id : null,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddTask.name'),
                                                }],
                                            })(
                                                <Select>
                                                    {this.state.digitDir && this.state.digitDir.map(item => {
                                                        return <Option value={item.value} key={item.value}>{item.title}</Option>
                                                    })}
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>

                                </Row>
                            </div>

                        </Form>
                    }
                    {this.state.selectValue == "SEQUENCE" &&
                        <Form onSubmit={this.handleSubmit}>
                            <div className={style.content}>
                                <Row  >
                                    <Col span={12}>
                                        <Form.Item
                                            label="类型" {...formItemLayout}>
                                            {getFieldDecorator('ruleType', {
                                                initialValue: this.state.selectValue,
                                                rules: [],
                                            })(
                                                <Select onSelect={this.onSelect}>
                                                    <Option value="ATTRIBUTE">属性</Option>
                                                    <Option value="FIXED_VALUE">固定值</Option>
                                                    <Option value="SEQUENCE">流水号</Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="连接符" {...formItemLayout}>
                                            {getFieldDecorator('connector', {
                                                initialValue: this.state.info.connectorVo ? this.state.info.connectorVo.id : null,
                                                rules: [],
                                            })(
                                                <Select>
                                                    {this.state.digitDir && this.state.digitDir.map(item => {
                                                        return <Option value={item.value} key={item.value}>{item.title}</Option>
                                                    })}
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row  >
                                    <Col span={12}>
                                        <Form.Item
                                            label="固定长度" {...formItemLayout}>
                                            {getFieldDecorator('maxLength', {
                                                initialValue: this.state.info.maxLength,
                                                rules: [],
                                            })(
                                                <InputNumber style={{ width: "100%" }} />

                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="填充字符" {...formItemLayout}>
                                            {getFieldDecorator('fillChar', {
                                                initialValue: this.state.info.fillChar,
                                                rules: [],
                                            })(
                                                <Input maxlength="1"/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row  >
                                    <Col span={12}>
                                        <Form.Item
                                            label="流水号最小号" {...formItemLayout}>
                                            {getFieldDecorator('seqMinValue', {
                                                initialValue: this.state.info.seqMinValue,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddTask.name'),
                                                }],
                                            })(
                                                <InputNumber style={{ width: "100%" }} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="流水号步长" {...formItemLayout}>
                                            {getFieldDecorator('seqSteep', {
                                                initialValue: this.state.info.seqSteep,
                                                rules: [{
                                                    required: true,

                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>

                        </Form>
                    }
                </Modal>
            </div >
        )
    }
}
const CheckModals = Form.create()(CheckModal);
export default connect(state => ({ currentLocale: state.localeProviderData }))(CheckModals);