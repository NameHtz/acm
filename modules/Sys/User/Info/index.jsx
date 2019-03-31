import React, { Component } from 'react';
import style from './style.less';
import { Form, Tabs, Row, Col, Input, Checkbox, Button, Icon, Select, DatePicker, TreeSelect } from 'antd';

import intl from 'react-intl-universal';
import { connect } from 'react-redux';
import { curdCurrentData } from '../../../../store/curdData/action';
import moment from 'moment';
import axios from "../../../../api/axios"
import { getUserInfoById } from "../../../../api/api"
import BasicInfo from "./BasicInfo"
const locales = {
  'en-US': require('../../../../api/language/en-US.json'),
  'zh-CN': require('../../../../api/language/zh-CN.json'),
};
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '/static/icons/iconfont.js', // 在 iconfont.cn 上生成
});
export class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initDone: false,
      userInfo: false,  // 控制点击用户信息的显隐
      info: {
        actuName: '',
        roleName: '',
        userLevel: '',
        sex: '',
        birth: null,
        entryDate: null,
        leaveDate: null,
        startDate: null,
        passExpirationDate: null,
        startDate: null,
        endDate: null,
        phone: '',
        email: '',
        status: '',
        sortNum: '',

      },
    };
  }

  componentDidMount() {
    this.loadLocales();
    console.log(this.props)
   
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

  // 表单提交
  handleSubmit = (e) => {
    e.preventDefault();
    alert(1);
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.curdCurrentData({
          title: localStorage.getItem('name'),
          status: 'update',
          data: values,
        });
      }
    });
  };

  // 点击用户信息
  userInfoFuc = () => {
    this.setState({
      userInfo: !this.state.userInfo,
    });
  };

  render() {
    console.log(this.state.rolelist)
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
    const formLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 20 },
      },
    };
    return (
      <div className={style.main}>
        {this.state.initDone && <div className={style.mainHeight}>
          <h3 className={style.listTitle}>员工信息</h3>
         
          <div className={style.mainScorll}>
            <Tabs type="card" tabBarStyle={{ position: 'relative', top: '1px' }}>
              <TabPane tab="基本信息" key="1">
              {/* 基本信息表 */}
                <BasicInfo data={this.props.data} updateSuccess={this.props.updateSuccess} closeRightBox={this.props.closeRightBox}/>
              </TabPane>
              <TabPane tab="详细信息" key="2">
                <Form>
                  <div className={style.content}>
                    <Row>
                      <Col span={12}>
                        <Form.Item
                          label={intl.get('wsd.i18n.sys.user1.officePost')} {...formItemLayout}>
                          {getFieldDecorator('officePost', {
                            initialValue: this.state.info.officePost,
                            rules: [{
                              required: true,
                              message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.officePost'),
                            }],
                          })(
                            <Input />,
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label={intl.get('wsd.i18n.sys.user1.officeEmail')} {...formItemLayout}>
                          {getFieldDecorator('officeEmail', {
                            initialValue: this.state.info.officeEmail,
                            rules: [{
                              required: true,
                              message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.officeEmail'),
                            }],
                          })(
                            <Input />,
                          )}
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          label={intl.get('wsd.i18n.sys.user1.faxNum')} {...formItemLayout}>
                          {getFieldDecorator('faxNum', {
                            initialValue: this.state.info.faxNum,
                            rules: [{
                              required: true,
                              message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.faxNum'),
                            }],
                          })(
                            <Input />,
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label={intl.get('wsd.i18n.sys.user1.officePhone')} {...formItemLayout}>
                          {getFieldDecorator('officePhone', {
                            initialValue: this.state.info.officePhone,
                            rules: [{
                              required: true,
                              message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.officePhone'),
                            }],
                          })(
                            <Input />,
                          )}
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item label={intl.get('wsd.i18n.sys.user1.qq')} {...formItemLayout}>
                          {getFieldDecorator('qq', {
                            initialValue: this.state.info.qq,
                            rules: [{
                              required: true,
                              message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.qq'),
                            }],
                          })(
                            <Input />,
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label={intl.get('wsd.i18n.sys.user1.familyPhone')} {...formItemLayout}>
                          {getFieldDecorator('familyPhone', {
                            initialValue: this.state.info.familyPhone,
                            rules: [{
                              required: true,
                              message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.familyPhone'),
                            }],
                          })(
                            <Input />,
                          )}
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item
                          label={intl.get('wsd.i18n.sys.user1.familyAddress')} {...formLayout}>
                          {getFieldDecorator('familyAddress', {
                            initialValue: this.state.info.familyAddress,
                            rules: [{
                              required: true,
                              message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.familyAddress'),
                            }],
                          })(
                            <Input />,
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          label={intl.get('wsd.i18n.sys.user1.officeAddress')}  {...formLayout}>
                          {getFieldDecorator('officeAddress', {
                            initialValue: this.state.info.officeAddress,
                            rules: [{
                              required: true,
                              message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.officeAddress'),
                            }],
                          })(
                            <Input />,
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label={intl.get('wsd.i18n.sys.user1.blog')} {...formItemLayout}>
                          {getFieldDecorator('blog', {
                            initialValue: this.state.info.blog,
                            rules: [{
                              required: true,
                              message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.blog'),
                            }],
                          })(
                            <Input />,
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label={intl.get('wsd.i18n.sys.user1.familyPost')} {...formItemLayout}>
                          {getFieldDecorator('familyPost', {
                            initialValue: this.state.info.familyPost,
                            rules: [{
                              required: true,
                              message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.familyPost'),
                            }],
                          })(
                            <Input />,
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label={intl.get('wsd.i18n.sys.user1.politicalLook')} {...formItemLayout}>
                          {getFieldDecorator('politicalLook', {
                            initialValue: this.state.info.politicalLook,
                            rules: [{
                              required: true,
                              message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.politicalLook'),
                            }],
                          })(
                            <Select>
                              <Option value="模块1">党员</Option>
                              <Option value="模块2">团员</Option>
                            </Select>,
                          )}

                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label={intl.get('wsd.i18n.sys.user1.perMailBox')} {...formItemLayout}>
                          {getFieldDecorator('perMailBox', {
                            initialValue: this.state.info.perMailBox,
                            rules: [{
                              required: true,
                              message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.perMailBox'),
                            }],
                          })(
                            <Input />,
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label={intl.get('wsd.i18n.sys.user1.rank')} {...formItemLayout}>
                          {getFieldDecorator('rank', {
                            initialValue: this.state.info.rank,
                            rules: [{
                              required: true,
                              message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.rank'),
                            }],
                          })(
                            <Select>
                              <Option value="模块1">一级</Option>
                              <Option value="模块2">二级</Option>
                            </Select>,
                          )}

                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label={intl.get('wsd.i18n.sys.user1.topUps')} {...formItemLayout}>
                          {getFieldDecorator('topUps', {
                            initialValue: this.state.info.topUps,
                            rules: [{
                              required: true,
                              message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.topUps'),
                            }],
                          })(
                            <Input />,
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label={intl.get('wsd.i18n.sys.user1.manageOrg')} {...formItemLayout}>
                          {getFieldDecorator('manageOrg', {
                            initialValue: this.state.info.manageOrg,
                            rules: [{
                              required: true,
                              message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.manageOrg'),
                            }],
                          })(
                            <Input />,
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label={intl.get('wsd.i18n.sys.user1.manageRole')} {...formItemLayout}>
                          {getFieldDecorator('manageRole', {
                            initialValue: this.state.info.manageRole,
                            rules: [{
                              required: true,
                              message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.manageRole'),
                            }],
                          })(
                            <Input />,
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item label={intl.get('wsd.i18n.sys.user1.describe')} {...formLayout}>
                          {getFieldDecorator('describe', {
                            initialValue: this.state.info.describe,
                            rules: [{
                              required: true,
                              message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.describe'),
                            }],
                          })(
                            <TextArea />,
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item label={intl.get('wsd.i18n.sys.user1.mark')} {...formLayout}>
                          {getFieldDecorator('mark', {
                            initialValue: this.state.info.qq,
                            rules: [{
                              required: true,
                              message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.mark'),
                            }],
                          })(
                            <TextArea />,
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
              </TabPane>
            </Tabs>
          </div>
        </div>
        }
      </div>
    );
  }
}

const UserInfos = Form.create()(UserInfo);
export default connect(null, {
  curdCurrentData,
})(UserInfos);
