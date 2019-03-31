import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Modal, message, Switch } from 'antd';
import axios from "../../../../../api/axios"
import { addcoderuletype, checkTableName, findTableFileds, baseDigitDir, getdigitDirBo, getcoderuletypeinfo,updateCoderuletype } from "../../../../../api/api"
import { connect } from 'react-redux';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option
class ShowAddOrModifyModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
           info:{},
            selectValue: "COMPLEX_SQL"
        }
    }
    initTableName = () => {
        if (!this.state.tableArray) {
            this.getTableName()
        }
    }
    //获取表名
    getTableName = () => {
        axios.get(checkTableName).then(res => {
            this.setState({
                tableArray: res.data.data
            })
        })
    }

    getTableFiled = () => {
        axios.get(findTableFileds(v)).then(res => {
            this.setState({
                tableField: res.data.data
            })
        })
    }
    intitDigitDirBo = () => {
        if (!this.state.digitDirBo) {
            this.getDictBoVo()
        }
    }
    //获取dictBoVo
    getDictBoVo = () => {
        axios.get(getdigitDirBo(1)).then(res => {
            this.setState({
                digitDirBo: res.data.data
            })
        })
    }
    changeDirBo = (v) => {
        this.getDictTypeVo(v)
    }
    //获取dictTypeVo
    getDictTypeVo = (v) => {
        console.log(v)
        axios.get(baseDigitDir(v)).then(res => {
            this.setState({
                baseDigitDir: res.data.data
            })
        })
    }

    onchangeTable = (v) => {
        //获取字段
        axios.get(findTableFileds(v)).then(res => {
            console.log(res)
            this.setState({
                tableField: res.data.data
            })
        })
    }
    //类型切换
    onSelect = (value) => {
        this.setState({
            selectValue: value
        })
    }
    //获取列表信息
    componentDidMount() {
      
        if (this.props.type == "modify") {
            axios.get(getcoderuletypeinfo(this.props.selectData.id)).then(res => {
                console.log(res)
                this.setState({
                    info: res.data.data
                },()=>{
                    console.log(this.state.info)
                    this.setState(preState=>({
                        selectValue:preState.info.attributeTypeVo.id
                    }))
                })
            })
        }
    }

   

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { type } = this.props
                if (type == "add") {
                    let data = {

                        ...values,
                        ruleBoId: this.props.codeRule.data.id
                    }
                    console.log(data)
                    axios.post(addcoderuletype, data, true).then(res => {
                        console.log(res)
                        this.props.adddData(res.data.data)
                        this.props.handleCancel()
                    })
                }
                if(type=="modify"){
                    let data={
                        ...values,
                        ruleBoId: this.props.codeRule.data.id,
                        id:this.props.selectData.id
                    }
                    axios.put(updateCoderuletype,data,true).then(res=>{
                        this.props.updateData(res.data.data)
                        this.props.handleCancel()
                    })
                }
            }
        });
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
        const formItemLayout1 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        return (
            <div className={style.main}>
                {/* <h2>{intl.get('wbs.add.name')}</h2>*/}
                <Modal
                    className={style.formMain}
                    width="850px"

                    centered={true}
                    title={this.props.title}
                    visible={this.props.visible} onCancel={this.props.handleCancel}
                    footer={
                        <div className='modalbtn'>
                            <Button key="submit1" onClick={this.props.handleCancel}>取消</Button>
                            <Button key="submit2" type="primary" onClick={this.handleSubmit}>保存</Button>
                        </div>
                    }>
                    {this.state.selectValue == "COMPLEX_SQL" &&
                        <Form onSubmit={this.handleSubmit}>
                            <div className={style.content}>
                                <Row  >
                                    <Col span={12}>
                                        <Form.Item
                                            label="名称" {...formItemLayout}>
                                            {getFieldDecorator('ruleTypeName', {
                                                initialValue: this.state.info.ruleTypeName? this.state.info.ruleTypeName:null,
                                                rules: [{
                                                    required: true,
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="类型" {...formItemLayout}>
                                            {getFieldDecorator('attributeType', {
                                                initialValue: this.state.selectValue,
                                                rules: [],
                                            })(
                                                <Select onSelect={this.onSelect}>
                                                    <Option value="COMPLEX_SQL">复杂SQL</Option>
                                                    <Option value="SELF">自身属性</Option>
                                                    <Option value="TABLE_COLUMN">表-字段</Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row  >
                                    <Col span={12}>
                                        <Form.Item
                                            label="重定向到字典" {...formItemLayout}>
                                            {getFieldDecorator('dictBo', {
                                                initialValue: this.state.info.dictBoVo ? this.state.info.dictBoVo.code : null,
                                                rules: [],
                                            })(
                                                <Select onChange={this.changeDirBo} onDropdownVisibleChange={this.intitDigitDirBo}>
                                                    {this.state.digitDirBo && this.state.digitDirBo.map(item => {
                                                        return <Option value={item.boCode} key={item.boCode}>{item.boName}</Option>
                                                    })}
                                                </Select>

                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} >
                                        <Col offset={8}>
                                            <Form.Item
                                            >
                                                {getFieldDecorator('dictType', {
                                                    initialValue: this.state.info.dictTypeVo ? this.state.info.dictTypeVo.code : null,
                                                    rules: [],
                                                })(
                                                    <Select>
                                                        {this.state.baseDigitDir && this.state.baseDigitDir.map(item => {
                                                            return <Option value={item.typeCode} key={item.typeCode}>{item.typeName}</Option>
                                                        })}
                                                    </Select>
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item label="SQL" {...formItemLayout1}>
                                            {getFieldDecorator('typeSql', {
                                                initialValue: this.state.info.typeSql?this.state.info.typeSql:null,
                                                rules: [],
                                            })(
                                                <TextArea rows={2} />
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>

                        </Form>
                    }
                    {this.state.selectValue == "SELF" &&
                        <Form onSubmit={this.handleSubmit}>
                            <div className={style.content}>
                                <Row  >
                                    <Col span={12}>
                                        <Form.Item
                                            label="名称" {...formItemLayout}>
                                            {getFieldDecorator('ruleTypeName', {
                                                initialValue: this.state.info.ruleTypeName? this.state.info.ruleTypeName:null,
                                                rules: [{
                                                    required: true,
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="类型" {...formItemLayout}>
                                            {getFieldDecorator('attributeType', {
                                                initialValue: this.state.selectValue,
                                                rules: [],
                                            })(
                                                <Select onSelect={this.onSelect}>
                                                    <Option value="COMPLEX_SQL">复杂SQL</Option>
                                                    <Option value="SELF">自身属性</Option>
                                                    <Option value="TABLE_COLUMN">表-字段</Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row  >
                                    <Col span={12}>
                                        <Form.Item
                                            label="表名" {...formItemLayout}>
                                            {getFieldDecorator('tableName', {
                                                initialValue: this.state.info.tableName? this.state.info.tableName:null,
                                                rules: [],
                                            })(
                                                <Select onChange={this.onchangeTable} onDropdownVisibleChange={this.initTableName}>
                                                    {this.state.tableArray && this.state.tableArray.map(item => {
                                                        return <Option value={item.value} key={item.value}>{item.title}</Option>
                                                    })}
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="字段名" {...formItemLayout}>
                                            {getFieldDecorator('columnName', {
                                                initialValue: this.state.info.columnName?this.state.info.columnName:null,
                                                rules: [],
                                            })(
                                                <Select >
                                                    {this.state.tableField && this.state.tableField.map(item => {
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
                                            label="重定向到字典" {...formItemLayout}>
                                            {getFieldDecorator('dictBo', {
                                                initialValue: this.state.info.dictBoVo ? this.state.info.dictBoVo.code : null,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddTask.name'),
                                                }],
                                            })(
                                                <Select onChange={this.changeDirBo} onDropdownVisibleChange={this.intitDigitDirBo}>
                                                    {this.state.digitDirBo && this.state.digitDirBo.map(item => {
                                                        return <Option value={item.boCode} key={item.boCode}>{item.boName}</Option>
                                                    })}
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} >
                                        <Col offset={8}>
                                            <Form.Item
                                            >
                                                {getFieldDecorator('dictType', {
                                                    initialValue: this.state.info.dictTypeVo ? this.state.info.dictTypeVo.code : null,
                                                    rules: [],
                                                })(
                                                    <Select>
                                                        {this.state.baseDigitDir && this.state.baseDigitDir.map(item => {
                                                            return <Option value={item.typeCode} key={item.typeCode}>{item.typeName}</Option>
                                                        })}
                                                    </Select>
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Col>
                                </Row>
                            </div>

                        </Form>
                    }
                    {this.state.selectValue == "TABLE_COLUMN" &&
                        <Form onSubmit={this.handleSubmit}>
                            <div className={style.content}>
                                <Row  >
                                    <Col span={12}>
                                        <Form.Item
                                            label="名称" {...formItemLayout}>
                                            {getFieldDecorator('ruleTypeName', {
                                                initialValue: this.state.info.ruleTypeName?this.state.info.ruleTypeName:null,
                                                rules: [{
                                                    required: true,
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="类型" {...formItemLayout}>
                                            {getFieldDecorator('attributeType', {
                                                initialValue: this.state.selectValue,
                                                rules: [],
                                            })(
                                                <Select onSelect={this.onSelect}>
                                                    <Option value="COMPLEX_SQL">复杂SQL</Option>
                                                    <Option value="SELF">自身属性</Option>
                                                    <Option value="TABLE_COLUMN">表-字段</Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row  >
                                    <Col span={12}>
                                        <Form.Item
                                            label="表名" {...formItemLayout} onDropdownVisibleChange={this.initTableName}>
                                            {getFieldDecorator('tableName', {
                                                initialValue: this.state.info.tableName? this.state.info.tableName:null,
                                                rules: [],
                                            })(
                                                <Select onChange={this.onchangeTable}>
                                                    {this.state.tableArray && this.state.tableArray.map(item => {
                                                        return <Option value={item.value} key={item.value}>{item.title}</Option>
                                                    })}
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="字段名" {...formItemLayout}>
                                            {getFieldDecorator('columnName', {
                                                initialValue: this.state.info.columnName?this.state.info.columnName:null,
                                                rules: [],
                                            })(
                                                <Select >
                                                    {this.state.tableField && this.state.tableField.map(item => {
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
                                            label="重定向到字典" {...formItemLayout}>
                                            {getFieldDecorator('dictBo', {
                                                initialValue: this.state.info.dictBoVo ? this.state.info.dictBoVo.code : null,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddTask.name'),
                                                }],
                                            })(
                                                <Select onChange={this.changeDirBo} onDropdownVisibleChange={this.intitDigitDirBo}>
                                                    {this.state.digitDirBo && this.state.digitDirBo.map(item => {
                                                        return <Option value={item.boCode} key={item.boCode}>{item.boName}</Option>
                                                    })}
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} >
                                        <Col offset={8}>
                                            <Form.Item
                                            >
                                                {getFieldDecorator('dictType', {
                                                    initialValue: this.state.info.dictTypeVo ? this.state.info.dictTypeVo.code : null,
                                                    rules: [],
                                                })(
                                                    <Select>
                                                        {this.state.baseDigitDir && this.state.baseDigitDir.map(item => {
                                                            return <Option value={item.typeCode} key={item.typeCode}>{item.typeName}</Option>
                                                        })}
                                                    </Select>
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            label="关联字段" {...formItemLayout}>
                                            {getFieldDecorator('foreignKey', {
                                                initialValue: this.state.info.foreignKey?this.state.info.foreignKey:null,
                                                rules: [],
                                            })(
                                                <Select >
                                                    {this.state.tableField && this.state.tableField.map(item => {
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
                </Modal>
            </div>
        )
    }
}
const ShowAddOrModifyModals = Form.create()(ShowAddOrModifyModal);
const mapStateToProps = state => {
    return {
        currentLocale: state.localeProviderData,
    }
};

// export default connect(state => ({ currentLocale: state.localeProviderData }))(CodeRule);
export default connect(mapStateToProps, null)(ShowAddOrModifyModals);