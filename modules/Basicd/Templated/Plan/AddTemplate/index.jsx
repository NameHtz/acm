import React, {Component} from 'react'
import style from './style.less'
import {Form, Row, Col, Input, Button, Icon, Select, DatePicker, Modal, message, Switch} from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment';

import emitter from '../../../../../api/ev'
const locales = {
    "en-US": require('../../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const { TextArea } = Input;
export class BasicdTemplatedPlanAddTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {
                key: 1,
                name: "产品需求计划",
                code: "ZGYF",
                iptName: "研发部",
                userName: "孙伯玉",
                planStartTime: "2018-09-01",
                planEndTime: "2018-12-09",
                planDrtn: "30d",
                planWorkHours: "240h",
                planType: "月度计划",
                planLevel: "一级",
                jobType: "任务作业",
                isCtrl: 1,
                drtnType: "固定资源用量",
                remark: "wu",
            }
        }
    }

    componentDidMount() {
        this.loadLocales();
        console.log('加载')
        this.setState({
            width: this.props.width
        })
    }

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        })
            .then(() => {
                // After loading CLDR locale data, start to render
                this.setState({initDone: true});
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        alert(1)
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;
      
        const formItemLayout1 = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
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
                    title="新增项目模板"
                    visible={this.props.modalVisible} onCancel={this.props.handleCancel}
                    footer={[
                    <Button key="submit1" onClick={this.handleSubmit}>保存并继续</Button>,
                    <Button key="submit2" type="primary" onClick={this.handleSubmit}>保存</Button>,
                ]}>
                    <Form onSubmit={this.handleSubmit}>
                        <div className={style.content}>
                            <Row gutter={24} type="flex">
                                <Col span={24}>
                                    <Form.Item
                                        label={intl.get('wsd.i18n.base.planTemAddTask.name')} {...formItemLayout1}>
                                        {getFieldDecorator('name', {
                                            initialValue: this.state.info.name,
                                            rules: [{
                                                required: true,
                                                message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.planTemAddTask.name'),
                                            }],
                                        })(
                                            <Input/>
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
const BasicdTemplatedPlanAddTasks = Form.create()(BasicdTemplatedPlanAddTask);
export default BasicdTemplatedPlanAddTasks
