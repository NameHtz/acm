import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, InputNumber } from 'antd';
import axios from "../../../../../api/axios"
import { tmmInfo,tmmRuleset} from "../../../../../api/api"
const FormItem = Form.Item;
class PasswardInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info:{}
    }
  }

  componentDidMount() {
    this.setState({
      width: this.props.width
    })
    this.gettmmInfo()
  }
  //获取密码设置
  gettmmInfo=()=>{
    axios.get(tmmInfo).then(res=>{
  console.log("密码信息成功"+JSON.stringify(res.data.data));
      this.setState({
        info:res.data.data
      })

    })
    
  }
  //保存密码规则设置
  upSet=(e)=>{
    // console.log(this.state.info.id)
    const body={
      id:this.state.info.id,
      cycle:e.cycle,
      length:e.length,
      errorNumber:e.errorNumber,
      lockTime:e.lockTime
    }
    axios.put(tmmRuleset,body,true).then(res=>{
      // console.log("保存成功"+JSON.stringify(res));
    })
    .catch(err=>{
      console.log("保存失败"+JSON.stringify(err));
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      // console.log(values);
      this.upSet(values);
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, } = this.props.form;
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

        <Form onSubmit={this.handleSubmit}>
          <div className={style.content}>
            <Row  type="flex">
              <Col span={18}>
                <Form.Item label="修改周长" {...formItemLayout}>
                  {getFieldDecorator('cycle', {
                    initialValue: this.state.info.cycle,
                    rules: [],
                  })(
                    <InputNumber style={{width:"100%"}} />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>

                <div className={style.list}>
                  <span>天</span>
                </div>

              </Col>
            </Row>
            <Row  type="flex">
              <Col span={18}>
              <Form.Item label="长度" {...formItemLayout}>
                  {getFieldDecorator('length', {
                    initialValue: this.state.info.length,
                    rules: [],
                  })(
                    <InputNumber style={{width:"100%"}} />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>

                <div className={style.list}>
                  <span>位</span>
                </div>

              </Col>
            </Row>
            <Row  type="flex">
              <Col span={18}>
              <Form.Item label="错误次数" {...formItemLayout}>
                  {getFieldDecorator('errorNumber', {
                    initialValue: this.state.info.errorNumber,
                    rules: [],
                  })(
                    <InputNumber style={{width:"100%"}} />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <div className={style.list}>
                  <span>次</span>
                </div>

              </Col>
            </Row>
            <Row  type="flex">
              <Col span={18}>
              <Form.Item label="锁定时长" {...formItemLayout}>
                  {getFieldDecorator('lockTime', {
                    initialValue: this.state.info.lockTime,
                    rules: [],
                  })(
                    <InputNumber style={{width:"100%"}} />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>

                <div className={style.list}>
                  <span>分钟</span>
                </div>

              </Col>
              
            </Row>
            <Row  type="flex">
              <Col span={18} offset={6}>
                    <Button  onClick={this.handleSubmit} type="primary" style={{padding: "0 34px"}}>更新设置</Button>
              </Col>          
            </Row>
          </div>

        </Form>
      </div>
    )
  }
}
const PasswardInfos = Form.create()(PasswardInfo);
export default PasswardInfos