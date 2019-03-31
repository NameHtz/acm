import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Switch } from 'antd';
import intl from 'react-intl-universal'
import moment from 'moment';
const locales = {
  "en-US": require('../../../../../api/language/en-US.json'),
  "zh-CN": require('../../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const Option = Select.Option
//计划模板->基本信息
class WbsInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initDone: false,
      info: {
        id: 1,
        key: 1,
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
        {this.state.initDone && <div className={style.mainHeight}>
          <h3 className={style.listTitle}>基本信息</h3>
          <div className={style.mainScorll}>
            <Form onSubmit={this.handleSubmit}>
              <div className={style.content}>
                <Row type="flex">
                  <Col span={12}>
                    <Form.Item label={intl.get('wsd.i18n.base.planTem.name')} {...formItemLayout}>
                      {getFieldDecorator('name', {

                        rules: [{
                          required: true,

                        }],
                      })(
                        <Input />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="代码" {...formItemLayout}>
                      {getFieldDecorator('code', {

                        rules: [{
                          required: true,

                        }],
                      })(
                        <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                      )}
                    </Form.Item>
                  </Col>
                </Row>

                <Row >
                  <Col span={12}>
                    <Form.Item label="计划工期" {...formItemLayout}>
                      {getFieldDecorator('creator', {

                        rules: [{
                          required: true,

                        }],
                      })(
                        <Input />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="计划工时" {...formItemLayout}>
                      {getFieldDecorator('creatTime', {

                        rules: [{
                          required: true,

                        }],
                      })(
                        <Input />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row >
                  <Col span={12}>
                    <Form.Item label="计划类型" {...formItemLayout}>
                      {getFieldDecorator('creator', {

                        rules: [],
                      })(
                        <Select>
                          <Option value="月度计划">月度计划</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="计划级别" {...formItemLayout}>
                      {getFieldDecorator('creatTime', {

                        rules: [],
                      })(
                        <Select>
                          <Option value="一级">一级</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row >
                  <Col span={12}>
                    <Form.Item label="WBS反馈" {...formItemLayout}>
                      {getFieldDecorator('creator', {

                        rules: [],
                      })(
                        <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="控制账户" {...formItemLayout}>
                      {getFieldDecorator('creatTime', {

                        rules: [],
                      })(
                        <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row >
                  <Col span={12}>
                    <Form.Item label={intl.get('wsd.i18n.base.planTem.creator')} {...formItemLayout}>
                      {getFieldDecorator('creator', {
                        initialValue: this.state.info.creator,
                        rules: [],
                      })(
                        <Input readOnly />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={intl.get('wsd.i18n.base.planTem.creattime')} {...formItemLayout}>
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
        </div>}
      </div>
    )
  }
}


const WbsInfos = Form.create()(WbsInfo);
export default WbsInfos