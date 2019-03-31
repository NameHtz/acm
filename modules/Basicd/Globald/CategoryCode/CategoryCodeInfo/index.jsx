import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Switch } from 'antd';

import { connect } from 'react-redux';
import axios from "../../../../../api/axios"
import { getClassifyOrValueById,updateClassifyOrValue } from "../../../../../api/api"

//计划模板->基本信息
class CategoryCodeInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initDone: false,
      info: {

      }
    }
  }
  initData = () => {
    axios.get(getClassifyOrValueById(this.props.data.id)).then(res => {
      this.setState({
        info: res.data.data
      })
    })
  }
  componentDidMount() {
    this.initData()
  }


  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data={
          ...values,
          id:this.props.data.id
        }
        let isSuccess=true
       axios.put(updateClassifyOrValue,data,isSuccess).then(res=>{
          console.log(res)
          this.props.updateSuccess(res.data.data)
       })

      }
    });
  }

  render() {
    const { intl } = this.props.currentLocale
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
        <div className={style.mainHeight}>
          <h3 className={style.listTitle}>基本信息</h3>
          <div className={style.mainScorll}>
            <Form onSubmit={this.handleSubmit}>
              <div className={style.content}>
                <Row >
                  <Col span={12}>
                    <Form.Item label={intl.get("wsd.i18n.plan.activitydefineinfo.category")} {...formItemLayout}>
                      {getFieldDecorator('classifyCode', {
                        initialValue: this.state.info.classifyCode,
                        rules: [{
                          required: true,
                          message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.plan.activitydefineinfo.category'),
                        }],
                      })(
                        <Input />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={intl.get("wsd.i18n.base.gbtype.remark")} {...formItemLayout}>
                      {getFieldDecorator('classifyName', {
                        initialValue: this.state.info.classifyName,
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
                  <Col span={24}>
                    <Col offset={4} >
                      <Button onClick={this.handleSubmit} style={{ width: "100px" }} type="primary">保存</Button>
                      <Button onClick={this.props.closeRightBox} style={{ width: "100px", marginLeft: "20px" }}>关闭</Button>
                    </Col>
                  </Col>
                </Row>
              </div>

            </Form>
          </div>
        </div>
      </div>
    )
  }
}


const CategoryCodeInfos = Form.create()(CategoryCodeInfo);
export default connect(state =>
  ({
    currentLocale: state.localeProviderData,
  }))(CategoryCodeInfos);