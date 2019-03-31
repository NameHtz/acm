import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment';
const locales = {
  "en-US": require('../../../../../api/language/en-US.json'),
  "zh-CN": require('../../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;

class BasicdTemplatedDocDocInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initDone: false,
      info: {
        id: 1,
        name: 1,
        iptName: 1,
        userName: 1,
        status: 1,
        creator: 1,
        creatTime: 1,
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
        this.setState({ initDone: true });
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();

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
          <Form onSubmit={this.handleSubmit}>
            <div className={style.content}>
              <Row gutter={24} type="flex">
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.base.docTem.doctitle')} {...formItemLayout}>
                    {getFieldDecorator('docTitle', {
                      initialValue: this.state.info.docTitle,
                      rules: [{
                        required: true,
                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.docTem.doctitle'),
                      }],
                    })(
                      <Input />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.base.docTem.docnum')} {...formItemLayout}>
                    {getFieldDecorator('docNum', {
                      initialValue: this.state.info.docNum,
                      rules: [{
                        required: true,
                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.docTem.docnum'),
                      }],
                    })(
                      <Input />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}> <Col span={12}>
                <Form.Item label={intl.get('wsd.i18n.base.docTem.docversion')} {...formItemLayout}>
                  {getFieldDecorator('docVersion', {
                    initialValue: this.state.info.docVersion,
                    rules: [{
                      required: true,
                      message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.docTem.docversion'),
                    }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.base.docTem.doctype')} {...formItemLayout}>
                    {getFieldDecorator('docType', {
                      initialValue: this.state.info.docType,
                      rules: [],
                    })(
                      <Select>
                        <Option value="模块1">模块1</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}> <Col span={12}>
                <Form.Item label={intl.get('wsd.i18n.base.docTem.docobject')} {...formItemLayout}>
                  {getFieldDecorator('docObject', {
                    initialValue: this.state.info.docObject,
                    rules: [],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.base.docTem.creator')} {...formItemLayout}>
                    {getFieldDecorator('creator', {
                      initialValue: this.state.info.creator,
                      rules: [],
                    })(
                      <Input />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}> <Col span={12}>
                <Form.Item label={intl.get('wsd.i18n.base.docTem.creattime')} {...formItemLayout}>
                  {getFieldDecorator('creatTime', {
                    initialValue: moment(this.state.info.creatTime),
                    rules: [],
                  })(
                    <DatePicker style={{ "width": "100%" }} />
                  )}
                </Form.Item>
              </Col>
              </Row>
              <Row >
                <Col span={24}>
                  <Col offset={4} >
                    <Button onClick={this.handleSubmit} style={{ width: "100px" }} type="primary">保存</Button>
                    <Button onClick={this.props.closeRightBox} style={{ width: "100px", marginLeft: "20px" }}>取消</Button>
                  </Col>
                </Col>
              </Row>
            </div>

          </Form>
        </div>
      </div>
    )
  }
}

const BasicdTemplatedDocDocInfos = Form.create()(BasicdTemplatedDocDocInfo);
export default BasicdTemplatedDocDocInfos