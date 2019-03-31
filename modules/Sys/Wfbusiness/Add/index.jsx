import React, { Component } from 'react';
import style from './style.less';
import { Modal, Button, Form, Row, Col, Input } from 'antd';
import intl from 'react-intl-universal';
import axios from '../../../../api/axios'
import { wfTypeAdd } from '../../../../api/api'


import { connect } from 'react-redux';
import { curdCurrentData } from '../../../../store/curdData/action';

const locales = {
  'en-US': require('../../../../api/language/en-US.json'),
  'zh-CN': require('../../../../api/language/zh-CN.json'),
};

class WfAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initDone: false,
      info: {
        id: 1,
        modeCode: 1,
        wfCode: 1,
        wfName: 1,
        wfUrl: 1,
        wfEvents: 1,
        formModeCode: 1,
      },
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {

        // emitter.emit('noticeUpdateEvents', { status: 'add', data: values })
        // this.props.curdCurrentData({
        //   title: localStorage.getItem('name'),
        //   status: 'add',
        //   data: fieldsValue,
        // });

        console.log(fieldsValue)
        // axios.post(wfTypeAdd, fieldsValue).then(res => {
        //     console.log(res)
        // })

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
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    return (
      <div>
        <Modal
          title={this.props.modelTitle}
          visible={this.props.modalVisible}
          onCancel={this.props.handleCancel}
          footer={<div className="modalbtn">
            <Button key={1} onClick={this.handleCancel}>取消</Button>
            <Button key={2} onClick={this.handleSubmit} type="primary">保存</Button>
          </div>}
          width="850px"
          centered={true}
          className={style.main}
        >

          <Form onSubmit={this.handleSubmit}>
            <div className={style.content}>
              <Row type="flex">

                <Col span={24}>
                  <Form.Item label={intl.get('wsd.i18n.sys.wfbusiness.wfcode')} {...formItemLayout}>
                    {getFieldDecorator('wfCode', {
                      initialValue: this.state.info.wfCode,
                      rules: [{
                        required: true,
                        message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.wfbusiness.wfcode'),
                      }],
                    })(
                      <Input />,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row> <Col span={24}>
                <Form.Item label={intl.get('wsd.i18n.sys.wfbusiness.wfname')} {...formItemLayout}>
                  {getFieldDecorator('wfName', {
                    initialValue: this.state.info.wfName,
                    rules: [{
                      required: true,
                      message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.sys.wfbusiness.wfname'),
                    }],
                  })(
                    <Input />,
                  )}
                </Form.Item>
              </Col>
                <Col span={24}>
                  <Form.Item label={intl.get('wsd.i18n.sys.wfbusiness.wfurl')} {...formItemLayout}>
                    {getFieldDecorator('wfUrl', {
                      initialValue: this.state.info.wfUrl,
                      rules: [],
                    })(
                      <Input />,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row> <Col span={24}>
                <Form.Item label={intl.get('wsd.i18n.sys.wfbusiness.wfevents')} {...formItemLayout}>
                  {getFieldDecorator('wfEvents', {
                    initialValue: this.state.info.wfEvents,
                    rules: [],
                  })(
                    <Input />,
                  )}
                </Form.Item>
              </Col>
                <Col span={24}>
                  <Form.Item label={intl.get('wsd.i18n.sys.wfbusiness.modecode')} {...formItemLayout}>
                    {getFieldDecorator('modeCode', {
                      initialValue: this.state.info.modeCode,
                      rules: [],
                    })(
                      <Input />,
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label={intl.get('wsd.i18n.sys.wfbusiness.formmodecode')} {...formItemLayout}>
                    {getFieldDecorator('formModeCode', {
                      initialValue: this.state.info.formModeCode,
                      rules: [],
                    })(
                      <Input />,
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


const WfAdds = Form.create()(WfAdd);
export default connect(null, {
  curdCurrentData,
})(WfAdds);
