import React, { Component } from 'react';
import { Form, Row, Col, Input, Button, InputNumber, Select, DatePicker, Checkbox, message } from 'antd';
import intl from 'react-intl-universal';
import { connect } from 'react-redux';
import moment from 'moment';
import { curdCurrentData } from '../../../../store/curdData/action';
import style from './style.less';
import { menuUpdate, menuGetById } from '../../../../api/api';
import axios from '../../../../api/axios';

const locales = {
  'en-US': require('../../../../api/language/en-US.json'),
  'zh-CN': require('../../../../api/language/zh-CN.json'),
};
const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

class MenuInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initDone: false,
      info: {},
    };
  }

  getData = (id) => {
    axios.get(menuGetById(id)).then(res => {
      console.log(res)
      this.setState({
        info: res.data.data,
      });
    });
  };

  componentDidMount() {
    this.loadLocales();
    console.log('加载');
    this.props.data ? this.getData(this.props.data.id) : null;

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
        // console.log(this.props.data);
        const data = {
          ...this.props.data,
          ...values,
          share: values.share ? 1 : 0,
          hidden: values.hidden ? 1 : 0,
          isMenu: values.isMenu ? 1 : 0,
          active: values.active ? 1 : 0,
        };

        console.log(data)
        // 更新菜单
        axios.put(menuUpdate, data, true).then(res => {

          // message.success('修改成功');
          console.log(res)
          this.props.curdCurrentData({
            title: localStorage.getItem('name'),
            status: 'update',
            data,
          });

          this.props.updateSuccess(data);

          // this.props.closeRightBox();

        });

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
        <div className={style.mainHeight}>
          <h3 className={style.listTitle}>基本信息</h3>
          <Form onSubmit={this.handleSubmit} className={style.mainScorll}>
            <div className={style.content}>
              <Row type="flex">
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.sys.menu.menuname')} {...formItemLayout}>
                    {getFieldDecorator('menuName', {
                      initialValue: this.state.info.menuName,
                      rules: [{ required: true }],
                    })(
                      <Input />,
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.sys.menu.sortnum')} {...formItemLayout}>
                    {getFieldDecorator('sort', {
                      initialValue: this.state.info.sort,
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
                      initialValue: this.state.info.menuCode,
                      rules: [{ required: true }],
                    })(
                      <Input />,
                    )}
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.sys.menu.shortcode')} {...formItemLayout}>
                    {getFieldDecorator('shortCode', {
                      initialValue: this.state.info.shortCode,
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
                      initialValue: this.state.info.image,
                      rules: [{ required: true }],
                    })(
                      <Input />,
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.sys.menu.url')} {...formItemLayout}>
                    {getFieldDecorator('url', {
                      initialValue: this.state.info.url,
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
                      initialValue: this.state.info.i18n,
                      rules: [{ required: true }],
                    })(
                      <Input />,
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.sys.menu.menutype')} {...formItemLayout}>
                    {getFieldDecorator('menuType', {
                      initialValue: this.state.info.menuType ? this.state.info.menuType.id : null,
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
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.sys.menu.creattime')} {...formItemLayout}>
                    {getFieldDecorator('creatTime', {
                      initialValue: this.state.info.creatTime ? moment(this.state.info.creatTime.substr(0, 10), 'YYYY-MM-DD') : null,
                      rules: [],
                    })(
                      <DatePicker style={{ width: '100%' }} disabled />,
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={intl.get('wsd.i18n.sys.menu.lastuptime')} {...formItemLayout}>
                    {getFieldDecorator('lastUpdTime', {
                      initialValue: this.state.info.lastUpdTime ? moment(this.state.info.lastUpdTime.substr(0, 10), 'YYYY-MM-DD') : null,
                      rules: [],
                    })(
                      <DatePicker style={{ width: '100%' }} disabled />,
                    )}
                  </Form.Item>
                </Col>

              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item label={intl.get('wsd.i18n.sys.menu.desc')} {...formItemLayout1}>
                    {getFieldDecorator('menuDesc', {
                      initialValue: this.state.info.menuDesc,
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
                      initialValue: this.state.info.active,

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
                      initialValue: this.state.info.isMenu,

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
                      initialValue: this.state.info.hidden,
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
                      initialValue: this.state.info.share,
                      rules: [],
                    })(
                      <Checkbox>{intl.get('wsd.i18n.sys.menu.isshare')}</Checkbox>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item wrapperCol={{ offset: 4 }}>
                <Button
                  className="globalBtn"
                  onClick={this.handleSubmit}
                  style={{ marginRight: 20 }}
                  type="primary"
                >保存
                </Button>
                <Button className="globalBtn" onClick={this.props.closeRightBox}>取消</Button>
              </Form.Item>
            </div>

          </Form>
        </div>}
      </div>
    );
  }
}

const MenuInfos = Form.create()(MenuInfo);
export default connect(null, {
  curdCurrentData,
})(MenuInfos);
// {
//             "wsd.i18n.sys.menu.menuname":"名称",
//             "wsd.i18n.sys.menu.menucode":"代码",
//             "wsd.i18n.sys.menu.sortnum":"排序编号",
//             "wsd.i18n.sys.menu.shortcode":"简码",
//             "wsd.i18n.sys.menu.url":"地址",
//             "wsd.i18n.sys.menu.image":"图标",
//             "wsd.i18n.sys.menu.menutype":"类型",
//             "wsd.i18n.sys.menu.hidden":"隐藏",
//             "wsd.i18n.sys.menu.internation":"国际化",
//             "wsd.i18n.sys.menu.ismenu":"菜单",
//             "wsd.i18n.sys.menu.active":"激活",
//     }
