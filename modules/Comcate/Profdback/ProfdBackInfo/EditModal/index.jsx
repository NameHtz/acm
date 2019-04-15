import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Modal, Table, message } from 'antd';
import intl from 'react-intl-universal'

import {questionHandleAdd,questionHandleUpdate} from '../../../../../api/api'
import axios from '../../../../../api/axios'

const locales = {
  "en-US": require('../../../../../api/language/en-US.json'),
  "zh-CN": require('../../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
class EditModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initDone: false,
      visible: true,
      info: {
        fileName: 1,
        fileVersion: 1,
        creatTime: null,
        creator: 1,
        remark: 1,
      },
      data: [
        // {
        //   key: "[0]",
        //   id: "1",
        //   fileName: "需求计划",
        //   fileType: "word",
        //   oprate: <Icon type="close" />
        // }, {
        //   key: "[1]",
        //   id: "2",
        //   fileName: "需求计划",
        //   fileType: "word",
        //   operate: <Icon type="close" />
        // }
      ]
    }
  }

  componentDidMount() {
    this.loadLocales();
    
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
  
  handleOk = (e) => {
    
    this.props.handleCancel()
  }
  handleCancel = (e) => {
  
    this.props.handleCancel()
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let {data} = this.props;
    if(Array.isArray(data)){
      message.error('请选择一条问题');
      return 0;
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);

        // questionId (integer, optional): 所属问题 ,
        // handleTime (string, optional): 处理时间 ,
        // handleUser (string, optional): 处理人 ,
        // handleResult (string, optional): 处理结果说明 ,
        // fileIds (Array[integer], optional): 附件

        let body = {
          handleTime:values['meetTime'].format('YYYY-MM-DD'),
          handleUser: values.creator,
          handleResult: values.remark,
          questionId:data.id,
          // fileIds
        }
       if(this.props.title === '修改修改记录'){
            axios.put(questionHandleUpdate,body).then((result) => {
              console.log(result)
            })
       }else{
        axios.post(questionHandleAdd,body).then((result) => {
          this.props.handleCancel()
        })
       }
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
    const columns = [
      {
        title: intl.get('wsd.i18n.plan.fileinfo.filename'),
        dataIndex: 'fileName',
        key: 'fileName',
      },
      {
        title: intl.get('wsd.i18n.plan.fileinfo.filetype'),
        dataIndex: 'fileType',
        key: 'fileType',
      },
      {
        title: "",
        dataIndex: 'operate',
        key: 'operate',
      }
    ]
    return (
      <div >
        {this.state.initDone &&
          <Modal title={this.props.title} visible={this.props.visible}
            onOk={this.handleOk} onCancel={this.handleCancel}
           
            width="800px"
            footer={ 
              <div className="modalbtn">
              <Button key={2}  onClick={this.handleCancel} >关闭</Button>
              <Button key={3} onClick={this.handleSubmit} type="primary">保存</Button>
              </div>
          }
          >
            <div className={style.main}>
              <Form onSubmit={this.handleSubmit}>
                <div className={style.content}>

                  <Row >
                    <Col span={12}>
                      <Form.Item label="处理时间" {...formItemLayout}>
                        {getFieldDecorator('creatTime', {
                          initialValue: this.state.info.creatTime,
                          rules: [],
                        })(
                          <DatePicker style={{ width: "100%" }} />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="处理人" {...formItemLayout}>
                        {getFieldDecorator('creator', {
                          initialValue: this.state.info.creator,
                          rules: [],
                        })(
                          <Input />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item label="处理结果说明" {...formItemLayout1}>
                        {getFieldDecorator('remark', {
                          initialValue: this.state.info.remark,
                          rules: [],
                        })(
                          <TextArea rows={2} />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>

                </div>

              </Form>
              <div className={style.Modifytable}>
                <div className={style.tip}>
                  <span>备注：文件支持Word、excal格式</span>
                  <p><Icon type="unlock" />上传文件</p>
                </div>
                <Table columns={columns} dataSource={this.state.data} pagination={false} name={this.props.name} />
              </div>
            </div>
          </Modal>
        }
      </div>
    )
  }
}
const EditModals = Form.create()(EditModal);
export default EditModals
