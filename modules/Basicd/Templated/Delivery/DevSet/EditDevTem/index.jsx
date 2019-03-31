import React, {Component} from 'react'
import style from './style.less'
import {Form, Row, Col, Input, Button, Icon,Select} from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment'
const FormItem = Form.Item;
const TextArea= Input.TextArea;
const Option=Select.Option;
const locales = {
    "en-US": require('../../../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../../../api/language/zh-CN.json')
}
class EditDevTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            visible:false,
            info: {
                delvTitle:1,
                delvNum:1,
                delvType:1,
                remark:1,
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

    /*handleSubmit = (e) => {
        e.preventDefault();
        alert(1)
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }*/

    render() {
        const {
          getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
          } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
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
              <Form onSubmit={this.handleSubmit}>
                  <div className={style.content}>
                      <Row type="flex">
                          <Col span={12}>
                              <Form.Item label={intl.get('wsd.i18n.base.tmpldelv1.delvtitle')} {...formItemLayout}>
                                  {getFieldDecorator('delvTitle', {
                                      initialValue: this.state.info.delvName,
                                      rules: [{
                                          required: true,
                                          message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.tmpldelv1.delvtitle'),
                                      }],
                                  })(
                                    <Input/>
                                  )}
                              </Form.Item>
                          </Col>
                          <Col span={12}>
                              <Form.Item label={intl.get('wsd.i18n.base.tmpldelv1.delvnum')} {...formItemLayout}>
                                  {getFieldDecorator('delvNum', {
                                      initialValue: this.state.info.delvCOde,
                                      rules: [{
                                          required: true,
                                          message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.tmpldelv1.delvnum'),
                                      }],
                                  })(
                                    <Input/>
                                  )}
                              </Form.Item>
                          </Col>
                      </Row>
                      <Row>
                          <Col span={12}>
                              <Form.Item label={intl.get('wsd.i18n.base.tmpldelv1.delvtype')} {...formItemLayout}>
                                  {getFieldDecorator('delvType', {
                                      initialValue: this.state.info.delvType,
                                      rules: [{
                                          required: true,
                                          message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.delvlist.delvtype'),
                                      }],
                                  })(
                                    <Select>
                                        <Option value="模块1">模块1</Option>
                                    </Select>
                                  )}
                              </Form.Item>
                          </Col>
                      </Row>
                      <Row>
                          <Col span={24}>
                              <Form.Item label={intl.get('wsd.i18n.base.tmpldelv1.remark')} {...formItemLayout1}>
                                  {getFieldDecorator('remark', {
                                      initialValue: this.state.info.plandelvNum,
                                      rules: [],
                                  })(
                                    <TextArea />
                                  )}
                              </Form.Item>
                          </Col>
                      </Row>
                  </div>
              </Form>
          </div>
        )
    }
}
const EditDevTables = Form.create()(EditDevTable);
export default EditDevTables

/*"wsd.i18n.base.tmpldelv1.delvtitle": "标题",
  "wsd.i18n.base.tmpldelv1.delvnum": "编号",
  "wsd.i18n.plan.delvList.delvtype" : "类型",
  "wsd.i18n.base.tmpldelv1.remark": "备注"*/
