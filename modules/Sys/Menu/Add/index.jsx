import React, { Component } from 'react';
import {
  Modal,
  Form,
  Row,
  Col,
  Input,
  Button,
  Icon,
  Select,
  DatePicker,
  Slider,
  InputNumber,
  message,
  Checkbox,
} from 'antd';
import style from './style.less';
import intl from 'react-intl-universal';
import { connect } from 'react-redux';
import { curdCurrentData } from '../../../../store/curdData/action';

import axios from '../../../../api/axios';
import { menuAdd } from '../../../../api/api';

const { TextArea } = Input;
const Option = Select.Option;
const locales = {
  'en-US': require('../../../../api/language/en-US.json'),
  'zh-CN': require('../../../../api/language/zh-CN.json'),
};

export class PlanDefineAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalInfo: {
        title: '新增菜单',
      },
      initDone: false,
    };
  }

  componentDidMount() {

    // this.setState({});
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        this.props.submit(values);
      }
    });
  };

  render() {
    const {intl} = this.props.currentLocale
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
      <div>

        <Modal className={style.main}
          width="850px"
          afterClose={this.props.form.resetFields}
          footer={<div className="modalbtn">
            <Button key={1} onClick={this.props.handleCancel}>取消</Button>
            <Button key={2} onClick={this.handleSubmit} type="primary">保存</Button>
          </div>}
          forceRender={true} centered={true} title={this.state.modalInfo.title} visible={this.props.modalVisible}
          onCancel={this.props.handleCancel}>
          <Form onSubmit={this.handleSubmit} className={style.mainScorll}>
            <div className={style.content}>
              <Row type="flex">
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.sys.menu.menuname')} {...formItemLayout}>
                    {getFieldDecorator('menuName', {

                      rules: [{ required: true }],
                    })(
                      <Input />,
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.sys.menu.sortnum')} {...formItemLayout}>
                    {getFieldDecorator('sort', {

                      rules: [{ required: true }],
                    })(
                      <InputNumber min={1} style={{ width: '100%' }} />,
                    )}
                  </Form.Item>
                </Col>

              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.sys.menu.menucode')} {...formItemLayout}>
                    {getFieldDecorator('menuCode', {

                      rules: [{ required: true }],
                    })(
                      <Input />,
                    )}
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.sys.menu.shortcode')} {...formItemLayout}>
                    {getFieldDecorator('shortCode', {

                      rules: [{ required: true }],
                    })(
                      <Input />,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.sys.menu.image')} {...formItemLayout}>
                    {getFieldDecorator('image', {

                      rules: [{ required: true }],
                    })(
                      <Input />,
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.sys.menu.url')} {...formItemLayout}>
                    {getFieldDecorator('url', {

                      rules: [{ required: true }],
                    })(
                      <Input />,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.sys.menu.internation')} {...formItemLayout}>
                    {getFieldDecorator('i18n', {

                      rules: [{ required: true }],
                    })(
                      <Input />,
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.sys.menu.menutype')} {...formItemLayout}>
                    {getFieldDecorator('menuType', {

                      rules: [{ required: true }],
                    })(
                      <Select>
                        <Option value={1}>组件</Option>
                        <Option value={2}>菜单</Option>
                        <Option value={3}>页签</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>

              </Row>

              <Row>
                <Col span={24}>
                  <Form.Item label={intl.get('wsd.i18n.sys.menu.desc')} {...formItemLayout1}>
                    {getFieldDecorator('menuDesc', {

                      rules: [],
                    })(
                      <TextArea rows={2} />,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.sys.menu.active')} {...formItemLayout}>
                    {getFieldDecorator('active', {
                      valuePropName: 'checked',


                      rules: [],
                    })(
                      <Checkbox>{intl.get('wsd.i18n.sys.menu.activationdesc')}</Checkbox>,
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.sys.menu.ismenu')} {...formItemLayout}>
                    {getFieldDecorator('isMenu', {
                      valuePropName: 'checked',


                      rules: [],
                    })(
                      <Checkbox>{intl.get('wsd.i18n.sys.menu.menudesc')}</Checkbox>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.sys.menu.hidden')} {...formItemLayout}>
                    {getFieldDecorator('hidden', {
                      valuePropName: 'checked',

                      rules: [],
                    })(
                      <Checkbox>{intl.get('wsd.i18n.sys.menu.menuhidden')}</Checkbox>,
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.sys.menu.share')} {...formItemLayout}>
                    {getFieldDecorator('share', {
                      valuePropName: 'checked',

                      rules: [],
                    })(
                      <Checkbox>{intl.get('wsd.i18n.sys.menu.isshare')}</Checkbox>,
                    )}
                  </Form.Item>
                </Col>
              </Row>

            </div>

          </Form>
        </Modal>
      </div>
    );
  }
}

const PlanDefineAdds = Form.create()(PlanDefineAdd);
export default connect(state => ({
  currentLocale: state.localeProviderData,
}))(PlanDefineAdds);
