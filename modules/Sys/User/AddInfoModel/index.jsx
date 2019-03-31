import React, { Component } from 'react';
import style from './style.less';
import { Modal, Form, Tabs, Row, Col, Input, Checkbox, Button, Icon, Select, DatePicker } from 'antd';
import intl from 'react-intl-universal';
import { connect } from 'react-redux';
import { curdCurrentData } from '../../../../store/curdData/action';
import BasicInfo from "./BasicInfo"
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;
const locales = {
  'en-US': require('../../../../api/language/en-US.json'),
  'zh-CN': require('../../../../api/language/zh-CN.json'),
};

export class PlanPrepared extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '新增用户',
    };
  }

  componentDidMount() {
    this.loadLocales();
    console.log('加载');
    this.setState({
      width: this.props.width,
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

// 表单提交
  handleSubmit = (e) => {
    e.preventDefault();
    alert(1);
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.curdCurrentData({
          title: localStorage.getItem('name'),
          status: 'add',
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
      <div>
        <Modal width="850px"
               className={style.main}

               title={this.state.title}
               visible={this.props.modalVisible}
               onCancel={this.props.handleCancel}
               bodyStyle={{ padding: '5px' }}
               centered={true}
              //  footer={<div className="modalbtn">
              //    <Button key={1} onClick={this.props.handleCancel}>取消</Button>
              //    <Button key={2} onClick={this.handleSubmit} type="primary">保存</Button>
              //  </div>}
              footer={null}
        >
          <div className={style.userFromInfo}>
            <Tabs type="card" tabBarStyle={{ position: 'relative', top: '1px' }}>
              <TabPane tab="基本信息" key="1">
             <BasicInfo addBasicUser={this.props.addBasicUser} closeBasicModal={this.props.handleCancel}></BasicInfo>
              </TabPane>
              <TabPane tab="详细信息" key="2">
                <Form>
                  <div className={style.content}>
                    <Row>
                      <Col span={12}>
                        <Form.Item
                          label={intl.get('wsd.i18n.sys.user1.officePost')} {...formItemLayout}>
                          {getFieldDecorator('officePost', {

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

                            rules: [{
                              required: true,
                              message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.user1.describe'),
                            }],
                          })(
                            <TextArea />,
                          )}
                        </Form.Item>
                      </Col>
                      <Form.Item wrapperCol={{ offset: 4 }}>
                        <Button className="globalBtn" onClick={this.handleSubmit} style={{ marginRight: 20 }}
                                type="primary">保存</Button>
                        <Button className="globalBtn" onClick={this.props.closeRightBox}>取消</Button>
                      </Form.Item>

                    </Row>


                  </div>
                </Form>
              </TabPane>
            </Tabs>
          </div>

        </Modal>
      </div>
    );
  }
}


const PlanPreparedS = Form.create()(PlanPrepared);
export default connect(null, {
  curdCurrentData,
})(PlanPreparedS);
