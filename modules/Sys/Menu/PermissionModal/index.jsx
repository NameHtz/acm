import React, { Component } from 'react';
import style from './style.less';
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Modal, Checkbox } from 'antd';
import intl from 'react-intl-universal';
import axios from '../../../../api/axios';
import { funcAdd, funcInfo, funcUpdate } from '../../../../api/api';
import moment from 'moment';

const locales = {
  'en-US': require('../../../../api/language/en-US.json'),
  'zh-CN': require('../../../../api/language/zh-CN.json'),
};
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class PermissionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initDone: false,
      menuId: null,
      funcId: null,
      info: {},
    };
  }

  reqfun = (v) => {
    axios.get(funcInfo(v)).then(res => {
      this.setState({
        info: res.data.data[0]
      })
    })
  }

  componentDidMount() {
    this.loadLocales();
    // console.log(this.props.data);
    if (this.props.addOrModify == 'add') {
      if (this.props.data) {
        this.setState({
          menuId: this.props.data.id
        });
      }
    } else if (this.props.addOrModify == 'modify') {
      this.setState({
        funcId: this.props.data.id
      });
      this.reqfun(this.props.data.id);
    }
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

        if (this.props.addOrModify == 'add') {
          let data = {
            menuId: this.state.menuId,
            funcName: values.funcName,
            funcCode: values.funcCode,
            del: values.del == true ? 1 : 0
          }
          axios.post(funcAdd, data, true).then(res => {
            this.props.handleCancel(res.data.data)
          })
        } else if (this.props.addOrModify == 'modify') {
          let data = {
            id: this.state.funcId,
            funcName: values.funcName,
            funcCode: values.funcCode,
            del: values.del == true ? 1 : 0
          }
          axios.put(funcUpdate, data, true).then(res=>{
            this.props.updateSuccess(res.data.data)
            this.props.handleCancel()
          })
        }

      }
    });
  };

  handleCancel = (e) => {

    this.props.handleCancel();
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
    return (
      <div className={style.main}>
        {this.state.initDone &&
          <div>
            <Modal title={this.props.title} visible={this.props.visible}
              onCancel={this.handleCancel}
              width="800px"
              footer={<div className="modalbtn">
                <Button key={1} onClick={this.handleCancel}>取消</Button>
                <Button key={2} onClick={this.handleSubmit} type="primary">保存</Button>
              </div>}
            >
              <Form onSubmit={this.handleSubmit}>
                <div className={style.content}>
                  <Row type="flex">
                    <Col span={12}>
                      <Form.Item label={intl.get('wsd.i18n.sys.menu.menuname')} {...formItemLayout}>
                        {getFieldDecorator('funcName', {
                          initialValue: this.state.info.funcName,
                          rules: [{
                            required: true,
                            message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.menu.menuname'),
                          }],
                        })(
                          <Input />,
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label={intl.get('wsd.i18n.sys.menu.menucode')} {...formItemLayout}>
                        {getFieldDecorator('funcCode', {
                          initialValue: this.state.info.funcCode,
                          rules: [{
                            required: true,
                            message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.menu.menucode'),
                          }],
                        })(
                          <Input />,
                        )}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={12}>
                      <Form.Item label={intl.get('wsd.i18n.sys.menu.active')} {...formItemLayout}>
                        {getFieldDecorator('del', {
                          valuePropName: 'checked',
                          initialValue: this.state.info.del? this.state.info.del.id :false
                        })(
                          <Checkbox></Checkbox>,
                        )}
                      </Form.Item>
                    </Col>
                  </Row>


                </div>

              </Form>
            </Modal>
          </div>}
      </div>
    );
  }
}

const PermissionModals = Form.create()(PermissionModal);
export default PermissionModals;
