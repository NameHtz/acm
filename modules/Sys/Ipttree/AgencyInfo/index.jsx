import React, { Component } from 'react';
import style from './style.less';
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd';
import intl from 'react-intl-universal';
import emitter from '../../../../api/ev';

const locales = {
  'en-US': require('../../../../api/language/en-US.json'),
  'zh-CN': require('../../../../api/language/zh-CN.json'),
};
const FormItem = Form.Item;
const Option = Select.Option;

class AgencyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initDone: false,
      info: {},
    };
  }

  componentDidMount() {
    this.loadLocales();
    // 监听左侧

    this.setState({
      width: this.props.width,
      info: this.props.data,
    });


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
        var data = values;
        console.log(data);
        data.key = this.state.info['key'];
        emitter.emit('noticeUpdateEvents', { status: 'update', data: data });
        console.log('Received values of form: ', values);
      }
    });
  };

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
        {this.state.initDone &&
        <Form onSubmit={this.handleSubmit}>
          <div className={style.content}>
            <Row type="flex">
              <Col span={12}>
                <Form.Item label={intl.get('wsd.i18n.sys.ipt.iptname')} {...formItemLayout}>
                  {getFieldDecorator('iptName', {
                    initialValue: this.state.info.iptName,
                    rules: [{
                      required: true,
                      message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.iptname'),
                    }],
                  })(
                    <Input />,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={intl.get('wsd.i18n.sys.ipt.iptcode')} {...formItemLayout}>
                  {getFieldDecorator('iptCode', {
                    initialValue: this.state.info.iptCode,
                    rules: [{
                      required: true,
                      message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.iptcode'),
                    }],
                  })(
                    <Input />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={intl.get('wsd.i18n.sys.ipt.parentipt')} {...formItemLayout}>
                  {getFieldDecorator('parentIpt', {
                    initialValue: this.state.info.parentIpt,
                    rules: [{
                      required: true,
                      message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.parentipt'),
                    }],
                  })(
                    <Input />,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={intl.get('wsd.i18n.sys.ipt.ipttype')} {...formItemLayout}>
                  {getFieldDecorator('iptType', {
                    initialValue: this.state.info.iptType,
                    rules: [{
                      required: true,
                      message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.ipttype'),
                    }],
                  })(
                    <Select>
                      <Option value="ogr">ogr</Option>
                      <Option value="ogr">ogr</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>

            </Row>
            <Row>

              <Col span={12}>
                <Form.Item label={intl.get('wsd.i18n.sys.ipt.level')} {...formItemLayout}>
                  {getFieldDecorator('level', {
                    initialValue: this.state.info.level,
                    rules: [{
                      required: true,
                      message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.level'),
                    }],
                  })(
                    <Select>
                      <Option value="1">{intl.get('wsd.i18n.sys.ipt.levelone')}</Option>
                      <Option value="2">{intl.get('wsd.i18n.sys.ipt.leveltwo')}</Option>
                      {/* <Option value="3">{intl.get('wsd.i18n.sys.ipt.levelthree')}</Option> */}
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={intl.get('wsd.i18n.sys.ipt.status')} {...formItemLayout}>
                  {getFieldDecorator('sort', {
                    initialValue: this.state.info.status,
                    rules: [{
                      required: true,
                      message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.status'),
                    }],
                  })(
                    <Input />,
                    // <Select>
                    //   <Option value="有效">{intl.get('wsd.i18n.sys.ipt.effect')}</Option>
                    //   <Option value="无效">{intl.get('wsd.i18n.sys.ipt.noeffect')}</Option>

                    // </Select>,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={intl.get('wsd.i18n.sys.ipt.sortnum')} {...formItemLayout}>
                  {getFieldDecorator('sortNum', {
                    initialValue: this.state.info.sortNum,
                    rules: [{
                      required: true,
                      message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.sortnum'),
                    }],
                  })(
                    <Input />,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={intl.get('wsd.i18n.sys.ipt.iptarea')} {...formItemLayout}>
                  {getFieldDecorator('iptArea', {
                    initialValue: this.state.info.iptAddress,
                    rules: [{
                      required: true,
                      message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.iptarea'),
                    }],
                  })(
                    <Input />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={intl.get('wsd.i18n.sys.ipt.iptaddress')} {...formItemLayout}>
                  {getFieldDecorator('iptAddress', {
                    initialValue: this.state.info.sortNum,
                    rules: [{
                      required: true,
                      message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.iptaddress'),
                    }],
                  })(
                    <Input />,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={intl.get('wsd.i18n.sys.ipt.iptzipcode')} {...formItemLayout}>
                  {getFieldDecorator('iptZipcode', {
                    initialValue: this.state.info.iptZipcode,
                    rules: [{
                      required: true,
                      message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.iptzipcode'),
                    }],
                  })(
                    <Input />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={intl.get('wsd.i18n.sys.ipt.username')} {...formItemLayout}>
                  {getFieldDecorator('userName', {
                    initialValue: this.state.info.userName,
                    rules: [{
                      required: true,
                      message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.username'),
                    }],
                  })(
                    <Input />,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={intl.get('wsd.i18n.sys.ipt.phone')} {...formItemLayout}>
                  {getFieldDecorator('phone', {
                    initialValue: this.state.info.phone,
                    rules: [{
                      required: true,
                      message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.phone'),
                    }],
                  })(
                    <Input />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={intl.get('wsd.i18n.sys.ipt.email')} {...formItemLayout}>
                  {getFieldDecorator('email', {
                    initialValue: this.state.info.email,
                    rules: [{
                      required: true,
                      message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.email'),
                    }],
                  })(
                    <Input />,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={intl.get('wsd.i18n.sys.ipt.ipaddress')} {...formItemLayout}>
                  {getFieldDecorator('ipaddress', {
                    initialValue: this.state.info.ipaddress,
                    rules: [{
                      required: true,
                      message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.ipaddress'),
                    }],
                  })(
                    <Input />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label={intl.get('wsd.i18n.sys.ipt.edate')} {...formItemLayout}>
                  {getFieldDecorator('edate', {
                    initialValue: this.state.info.edate,
                    rules: [{
                      required: true,
                      message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.edate'),
                    }],
                  })(
                    <DatePicker style={{ width: '100%' }} />,
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={intl.get('wsd.i18n.sys.ipt.ndata')} {...formItemLayout}>
                  {getFieldDecorator('ndata', {
                    initialValue: this.state.info.ndata,
                    rules: [{
                      required: true,
                      message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.ndata'),
                    }],
                  })(
                    <DatePicker style={{ width: '100%' }} />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item label={intl.get('wsd.i18n.sys.ipt.remark')} {...formItemLayout1}>
                  {getFieldDecorator('remark', {
                    initialValue: this.state.info.remark,
                    rules: [{
                      required: true,
                      message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.ipt.remark'),
                    }],
                  })(
                    <Input />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Button className="globalBtn" onClick={this.handleSubmit} style={{ marginRight: 20 }}
                      type="primary">保存</Button>
              <Button className="globalBtn" onClick={this.props.closeRightBox}>取消</Button>
            </Form.Item>
          </div>

        </Form>
        }
      </div>
    );
  }
}

const AgencyInfos = Form.create()(AgencyInfo);
export default AgencyInfos;
// {
//             "wsd.i18n.sys.ipt.iptname":"机构名称",
//             "wsd.i18n.sys.ipt.iptcode":"机构代码",
//             "wsd.i18n.sys.ipt.ipttype":"机构类型",
//             "wsd.i18n.sys.ipt.parentipt":"上级机构",
//             "wsd.i18n.sys.ipt.sortnum":"排序",
//             "wsd.i18n.sys.ipt.iptaddress":"机构地址",
//             "wsd.i18n.sys.ipt.username":"联系人",
//             "wsd.i18n.sys.ipt.phone":"联系电话",
//             "wsd.i18n.sys.ipt.status":"状态",
//             "wsd.i18n.sys.ipt.remark":"机构说明",
//     }
