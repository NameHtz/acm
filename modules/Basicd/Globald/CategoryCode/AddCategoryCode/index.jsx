import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Modal, message, Switch } from 'antd';
import { connect } from 'react-redux';
const FormItem = Form.Item;
const { TextArea } = Input;
import axios from "../../../../../api/axios"
import{ addClassify} from "../../.././../../api/api"
export class AddCategoryCode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            visible:true,
            info: {

            }
        }
    }

    componentDidMount() {
        this.setState({
            width: this.props.width
        })
    }

  

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data={
                    ...values,
                    boCode:this.props.boCode,
                    parentId: 0,
                }
                let isSuccess=true
                axios.post(addClassify,data,isSuccess).then(res=>{
                    console.log(res)
                    this.props.AddClassifyName(res.data.data)
                    this.props.form.resetFields();
                    this.props.handleCancel()
                })
            }
        });
    }
    handleSubmit1 = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data={
                    ...values,
                    boCode:this.props.boCode,
                    parentId: 0,
                }
                let isSuccess=true
                axios.post(addClassify,data,isSuccess).then(res=>{
                    console.log(res)
                    this.props.AddClassifyName(res.data.data)
                    this.props.form.resetFields();
                })
            }
        });
    }
    handleCancel=()=>{
        this.props.form.resetFields();
        this.props.handleCancel()
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
                    forceRender={true}
                    centered={true}
                    title="新增分类码"
                    visible={this.props.visible} onCancel={this.handleCancel}
                    footer={
                        <div className='modalbtn'>
                            <Button key="submit1" onClick={this.handleSubmit1}>保存并继续</Button>
                            <Button key="submit2" type="primary" onClick={this.handleSubmit}>保存</Button>
                        </div>
                    }>
                    <Form onSubmit={this.handleSubmit}>
                        <div className={style.content}>
                            <Row type="flex">
                                <Col span={12}>
                                    <Form.Item
                                        label={intl.get("wsd.i18n.plan.activitydefineinfo.category")} {...formItemLayout}>
                                        {getFieldDecorator('classifyCode', {

                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.activitydefineinfo.category'),
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={intl.get("wsd.i18n.base.gbtype.remark")} {...formItemLayout}>
                                        {getFieldDecorator('classifyName', {

                                            rules: [],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>

                        </div>

                    </Form>
                </Modal>
            </div>
        )
    }
}
const AddCategoryCodes = Form.create()(AddCategoryCode);
export default connect(state =>
    ({
      currentLocale: state.localeProviderData,
    }))(AddCategoryCodes);
  