import React, {Component} from 'react'
import style from './style.less'
import moment from 'moment';
import { Modal, Button ,Form, Row, Col, Input, Icon, Select, DatePicker} from 'antd';
import intl from 'react-intl-universal'
import PlanTaskModal from "../PlanTaskModal"

import {questionAdd,getUserInfoById} from '../../../../api/api'
import axios from '../../../../api/axios'

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const {TextArea} = Input
class Add extends Component {
    constructor (props) {
        super (props)
        this.state = {
            initDone: false,
            title:'基本信息',
            data: {
                key: "1",
                title: "项目发布之前相关人士是否通知",
                questionType: "技术问题",
                questionPriority: "高",
                userName: "孙伯域",
                repGroup: '研发部',
                creatTime: "2019-3-19",
                project: 'ACM产品开发项目',
                task: '产品需求设计',
                questionRemark: "在项目编辑页面添加...",
                questionHandle: "务必在处理之前...",
                handleTime: "2019-3-19",
                creator: "WSD",
                status: '新建',
                presentDep: '研发部',
                additionRequest: '暂无'
            }
        }
    }
    componentDidMount() {
        this.loadLocales();
        console.log('加载')
        this.setState({
            width: this.props.width
        })
        console.log(this.props.modelTitle)
    }
    //打开计划任务
    OpenTaskModal=()=>{
        this.setState({
            isShowTaskmodal:true
        })
    }
    closeTaskModal=()=>{
        this.setState({
            isShowTaskmodal:false
        })
    }
    loadLocales() {
        intl.init({
                currentLocale: 'zh-CN',
                locales,
            })
            .then(() => {
                // After loading CLDR locale data, start to render
                this.setState({initDone: true});
            });
    }
  //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
  getItemsValue = ()=>{
    const values= this.props.form.getFieldsValue();//4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
    return values;
}
    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     alert(1)
    //     console.log(e)
       
    // }
    handleSubmit=(e)=>{
        //调用子组件的自定义方法getItemsValue
     

        this.props.handleCancel();
        this.questionAdd()

    }

    //添加一条项目问题

    questionAdd = ()=>{
        let data = {

        }
        // axios.post(questionAdd,data,true).then((result) => {
            
        // }).catch((err) => {
            
        // });

        /**
         * 
         * " handleTime": Moment {_isAMomentObject: true, _i: "2018-10-29", _f: "YYYY-MM-DD", _isUTC: false, _pf: {…}, …}
         " task": "产品需求设计"
         " userName": "孙伯域"
          projectname: "ACM产品开发项目"
          questionPriority: "高"
          questionRemark: "在项目编辑页面添加..."
         questionType: "技术问题"
        questionhandle: "暂无"
        repGroup: "研发部"
        title: "项目发布之前相关人士是否通知"
         */


        this.props.form.validateFieldsAndScroll((err,values)=>{
             let data = {
                "taskId": 0,
                "title": "string",
                "questionType": "string",
                "questionPriority": "string",
                "org": 0,
                "userId": 0,
                "questionRemark": "string",
                "questionHandle": "string"
             }
             console.log(values)
             // axios.post(questionAdd,data,true).then((result) => {
            
        // }).catch((err) => {
            
        // });
           
        })
    }



    render () {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const formItemLayout1 = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };
        const {data} = this.state;
        return (
            <div >
                <Modal
                    title={this.props.modelTitle}
                    visible={this.props.modalVisible}
                    onCancel={this.props.handleCancel}
                    footer= {null}
                    width="850px"
                    centered={true}
                    className={style.main}
                    footer={ 
                        <div className="modalbtn">
                      
                        <Button key={3} onClick={this.handleSubmit} type="primary"  ghost>保存并继续</Button>
                        <Button key={2}  onClick={this.handleSubmit} type="primary" >保存</Button>
                        </div>
                    }
                >
                    {/*引入新增项目问题模板   ---使用wrappedComponentRef 拿到子组件传递过来的ref（官方写法）*/}
                    <div>
                    <Form>
                        <div>
                            <Row type='flex'>
                                <Col span={11}>
                                    <FormItem label={intl.get("wsd.i18n.comu.question.title")} {...formItemLayout}>
                                        {getFieldDecorator('title', {
                                            initialValue: data.title,
                                            rules: [{required: true, message: intl.get("wsd.i18n.comu.question.title")}],
                                        })(
                                            <Input style={{overflow: 'hidden', textOverflow: 'ellipsis'}}/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={11}>
                                    <FormItem label={intl.get("wsd.i18n.comu.question.questiontype")} {...formItemLayout}>
                                        {getFieldDecorator('questionType', {
                                            initialValue: data.questionType,
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row >
                            <Col span={11}>
                                    <FormItem label={intl.get("wsd.i18n.comu.meetingaction.iptname")} {...formItemLayout}>
                                        {getFieldDecorator('repGroup', {
                                            initialValue: data.repGroup,
                                        })(
                                            <Select>
                                                <Option value='研发部'>研发部</Option>
                                                <Option value='销售部'>销售部</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={11}>
                                    <FormItem label={intl.get("wsd.i18n.comu.question.username")} {...formItemLayout}>
                                        {getFieldDecorator(' userName', {
                                            initialValue: data.userName,
                                        })(
                                            <Select>
                                                <Option value='低'>孙波禹</Option>
                                                <Option value='高'>张三</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row >
                               
                                <Col span={11}>
                                    <FormItem label={intl.get("wsd.i18n.comu.question.questionpriority")} {...formItemLayout}>
                                        {getFieldDecorator('questionPriority', {
                                            initialValue: data.questionPriority,
                                        })(
                                            <Select>
                                                <Option value='低'>低</Option>
                                                <Option value='高'>高</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={11}>
                                    <FormItem label={intl.get("wsd.i18n.comu.question.handletime")} {...formItemLayout}>
                                        {getFieldDecorator(' handleTime', {
                                            initialValue: moment(data.handleTime),
                                            rules: [{
                                                required: true,
                                                message: '请输入要求处理日期',
                                            }],
                                        })(
                                            <DatePicker style={{width:'100%'}}/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={11}>
                                    <FormItem label={intl.get("wsd.i18n.comu.meeting.projectname")} {...formItemLayout}>
                                        {getFieldDecorator('projectname', {
                                            initialValue: data.project,
                                        })(
                                            <Select>
                                                <Option value='研发部'>研发部</Option>
                                                <Option value='销售部'>销售部</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={11}>
                                    <FormItem label={intl.get("wsd.i18n.comu.meeting.plantask")} {...formItemLayout}>
                                        {getFieldDecorator(' task', {
                                            initialValue: data.task,
                                        })(
                                            <Select>
                                                <Option value='1'>产品需求设计1</Option>
                                                <Option value='2'>产品需求设计2</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={2}>
                                <Icon type="api" theme="twoTone" className={style.link} onClick={this.OpenTaskModal.bind(this)}/>
                                </Col>
                            </Row>
                           
                            <Row>
                                <Col span={22}>
                                    <FormItem label={intl.get("wsd.i18n.comu.question.questionremark")} {...formItemLayout1}>
                                        {
                                            getFieldDecorator('questionRemark', {
                                                initialValue: data.questionRemark,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.comu.question.questionremark'),
                                                }],
                                            })
                                            (<TextArea rows={2}/>)
                                        }
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row >
                                <Col span={22}>
                                    <FormItem label={intl.get("wsd.i18n.comu.question.questionhandle")}{...formItemLayout1}>
                                        {
                                            getFieldDecorator('questionhandle', {
                                                initialValue: data.additionRequest,
                                                rules: [{
                                                    required: true,
                                                    message: intl.get('wsd.i18n.message.enter') + intl.get('wsd.i18n.comu.question.questionhandle'),
                                                }],
                                            })
                                            (<TextArea rows={2}/>)
                                        }
                                    </FormItem>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                    </div>
            </Modal>
            {this.state.isShowTaskmodal &&<PlanTaskModal modalVisible={this.state.isShowTaskmodal} handleCancel={this.closeTaskModal.bind(this)}/>}
            </div>
        )
    }
}



const Adds = Form.create()(Add);
export default Adds
