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
const { TextArea } = Input;
//文档模板->基本信息
export class BasicdGlobaldCurInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initDone: false,
      info: {
        id: 1,
        currName: '比特率',
        currCode: 1,
        currSymbol: 1,
        rate: 1,
        creatTime: 1,
        creator: 1,
        currBase: 1,
        remark: 1,
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
    const formItemLayout2 = {
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
        <h3 className={style.listTitle}>基本信息</h3>
        <div className={style.mainScorll}>
          <Form onSubmit={this.handleSubmit}>
            <div className={style.content}>
              <Row >
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.base.currency.currname')} {...formItemLayout}>
                    {getFieldDecorator('currName', {
                      initialValue: this.state.info.currName,
                      rules: [{
                        required: true,
                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.currency.currname'),
                      }],
                    })(
                      <Input />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.base.currency.currcode')} {...formItemLayout}>
                    {getFieldDecorator('currCode', {
                      initialValue: this.state.info.currCode,
                      rules: [{
                        required: true,
                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.currency.currcode'),
                      }],
                    })(
                      <Input />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row> <Col span={12}>
                <Form.Item label={intl.get('wsd.i18n.base.currency.currsymbol')} {...formItemLayout}>
                  {getFieldDecorator('currSymbol', {
                    initialValue: this.state.info.currSymbol,
                    rules: [{
                      required: true,
                      message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.base.currency.currsymbol'),
                    }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.base.currency.creattime')} {...formItemLayout}>
                    {getFieldDecorator('creatTime', {
                      initialValue: moment(this.state.info.creatTime),
                      rules: [],
                    })(
                      <DatePicker style={{ width: '100%' }} disabled={true} />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>

                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.base.currency.creator')} {...formItemLayout}>
                    {getFieldDecorator('creator', {
                      initialValue: this.state.info.creator,
                      rules: [],
                    })(
                      <Input disabled={true} />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item label={intl.get('wsd.i18n.base.currency.remark')} {...formItemLayout2}>
                    {getFieldDecorator('remark', {
                      initialValue: this.state.info.remark,
                      rules: [],
                    })(
                      <TextArea rows={2} />
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


const BasicdGlobaldCurInfos = Form.create()(BasicdGlobaldCurInfo);
export default BasicdGlobaldCurInfos