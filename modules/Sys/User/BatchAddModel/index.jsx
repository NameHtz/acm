import React, { Component } from 'react'
import style from './style.less'
import { Modal, Button, Row, Col, Form, Select, Input, Radio, TreeSelect, Checkbox, message } from 'antd';
import intl from 'react-intl-universal'
import axios from "../../../../api/axios"
import { parse } from 'path';
const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;

// 用户管理 -- 批量新增用户
export class BatchAddModel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [

            ],
            sameroles: [],
            ischecked: []//标记密码是否同上
        }
    }
    //初始化
    initlData=()=>{
        const templedata = []
        for (let i = 0; i < 10; i++) {
            templedata.push({ sex: 1 })
        }
        this.setState({
            data: templedata
        })
    }
    componentDidMount() {
        this.loadLocales();
        console.log('加载')
        //创建长度为10空数组
        const templedata = []
        this.initlData()
        //获取组织机构
        axios.get("api/sys/org/select/tree").then(res => {
            let data=[]
            if(res.data.data){
                data=res.data.data
            }
            this.setState({
                orglist: data,
                orglist1: [{id:8848,title:"同上",parentId: 0,  type: "same",  value: "8848"},...data]
            }, () => {
                //获取用户角色
                axios.get("api/sys/role/list").then(res => {
                    this.setState({
                        rolelist: res.data.data
                    })
                })
            })
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
    //onCancel
    onCancel=()=>{
        this.initlData()
        this.props.cancelBacth()
    }
    //保存
    handleSubmit = () => {
        let data=[]
        let flag=false
        this.state.data.forEach((item,index)=>{
            for(let i in item){
                if(item[i] &&i!="sex"){
                    if(!item.actuName){
                        message.warning(`第${index+1}个用户信息的姓名不能为空`)
                        return
                    }
                    if(!item.userName){
                        message.warning(`第${index+1}个用户信息的用户名不能为空`)
                        return
                    }
                    if(!item.roles){
                        message.warning(`第${index+1}个用户信息的用户角色不能为空`)
                        return
                    }
                    if(!item.password){
                        message.warning(`第${index+1}个用户信息的密码不能为空`)
                        return
                    }
                    if(!item.orgId){
                        message.warning(`第${index+1}个用户信息的所属信息不能为空`)
                        return
                    }
                    flag=true
                }
            }
            if(flag){
                data.push(item)
                flag=false
            }
         
        })
        // for (let i = 0; i < this.state.data.length; i++) {
        //     if (!this.state.data[i].actuName || this.state.data[i].actuName.trim() == "") {
        //         message.warning(`第${i+1}个用户信息的姓名不能为空`)
        //         return
        //     }
        //     if (!this.state.data[i].userName || this.state.data[i].userName.trim() == "") {
        //         message.warning(`第${i+1}个用户信息的用户名不能为空`)
        //         return
        //     }
        //     if (!this.state.data[i].roles || this.state.data[i].roles.length == 0) {
        //         message.warning(`第${i+1}个用户信息的用户角色不能为空`)
        //         return
        //     }
        //     if (!this.state.data[i].password || this.state.data[i].password.trim() == "") {
        //         message.warning(`第${i+1}个用户信息的密码不能为空`)
        //         return
        //     }
        //     if (!this.state.data[i].orgId || this.state.data[i].orgId==NaN) {
        //         message.warning(`第${i+1}个用户信息的所属信息不能为空`)
        //         return
        //     }
        // }
        if(data.length>0){
            console.log(data)
            data.forEach((item, i) => {
                if (item.roles[0] == 8848) {
                    item.roles = this.state.data[0].roles
                }
                if(item.orgId==8848){
                    item.orgId = this.state.data[0].orgId
                }
            })
            axios.post("api/sys/user/addBatch", data,true).then(res => {
                //关闭modal
                this.props.cancelBacth()
                //刷新用户列表
                this.props.refresh()
                this.initlData()
            })
        }
    
        
      

    }
    //SaveSame同上
    SaveSame = (arg, e, s) => {
        console.log(s)
        e.stopPropagation();
        const { data, ischecked } = this.state
        if (e.target.checked) {


            if (data[0][arg.attribute]) {
                data[arg.index][arg.attribute] = data[0][arg.attribute]
                console.log(data == this.state.data)
                this.setState(preState => ({
                    data: [...data]
                }))
            }
            this.setState(preState => ({
                ischecked: [...preState.ischecked, arg.index]
            }))
        } else {
            console.log(ischecked)
            let current = ischecked.findIndex(item => item == arg.index)
            this.setState((preState, props) => ({
                ischecked: [...preState.ischecked.splice(0, current), ...preState.ischecked.splice(current + 1)]
            }))


        }
    }
    //Select设置数据参数属性名、索引、多选数组id
    onChangeSelect = (attribute, index, array, i) => {
        // console.log(attribute)
        // console.log(index)
        // console.log(array)
        // console.log(i)
        const { data } = this.state
        let obj = data[index]
        if (array.length > 0) {
            //存在同上选项
            if (array[array.length - 1] == 8848) {
                obj[attribute] = [8848]
                this.setState({
                    data: [...data]
                })
                return
            }
            if (array[0] == 8848) {

                obj[attribute] = array[1]
                this.setState({
                    data: [...data]
                })
                return
            }




        }
        obj[attribute] = array
        this.setState({
            data: [...data]
        })
    }
    //Radio设置数据参数属性名、索引、当前对象
    onChangeRadio = (attribute, index, e) => {
        // console.log(attribute)
        // console.log(index)
        // console.log(e.target.value)
        const { data } = this.state
        let currentindex = data.findIndex((v, i) => i == index)
        let obj = data[currentindex]
        obj[attribute] = e.target.value
        this.setState({
            data: [...data]
        })

    }
    //TreeSelect设置数据参数属性名、索引、当前id
    onChangeTreeSelect = (attribute, index, id) => {
        const { data } = this.state
        let currentindex = data.findIndex((v, i) => i == index)
        let obj = data[currentindex]
        obj[attribute] = parseInt(id)
        this.setState({
            data: [...data]
        })
    }
    //input设置数据参数属性名、索引、当前对象
    setData = (attribute, index, e) => {

        const { data } = this.state
        let currentindex = data.findIndex((v, i) => i == index)
        let obj = data[currentindex]
        obj[attribute] = e.currentTarget.value
        this.setState({
            data: [...data]
        }, () => {
            if (index == 0) {
                const { ischecked, data } = this.state
                ischecked.forEach(item => {
                    data[item].password = data[0].password
                })
                this.setState({
                    data: [...data]
                })
            }
        })

    }
    render() {

      
        const items = this.state.data.map((value, index) => {
            let id, start = index + 1
            if (start > 9 && start < 100) {
                id = "0" + start
            } else if (start >= 100) {
                id = start
            } else {
                id = "00" + start
            }
            return <Row gutter={8} key={index}>
                <Col span={1}>
                    {id}
                </Col>
                <Col span={2}>
                    <Form.Item>
                        <Input onChange={this.setData.bind(this, "actuName", index)} value={this.state.data[index].actuName ? this.state.data[index].actuName : null} />
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Form.Item>
                        <Input onChange={this.setData.bind(this, "userName", index)} value={this.state.data[index].userName ? this.state.data[index].userName : null} />
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Form.Item>
                        <Select mode="multiple" onChange={this.onChangeSelect.bind(this, "roles", index)} value={this.state.data[index].roles ? this.state.data[index].roles : []}>
                            {index != 0 && <Option value={8848} key={"same"}>同上</Option>}
                            {this.state.rolelist && this.state.rolelist.map(item => {
                                return <Option value={item.id} key={id}>{item.roleDesc}</Option>
                            })}

                        </Select>
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Form.Item>
                        <TreeSelect
                            onChange={this.onChangeTreeSelect.bind(this, "orgId", index)}
                            showSearch
                            style={{ width: "100%" }}
                            treeData={index == 0 ?this.state.orglist:this.state.orglist1}
                            allowClear
                            treeDefaultExpandAll
                            value={this.state.data[index].orgId ? this.state.data[index].orgId : null}
                        />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item>
                        <Input onChange={this.setData.bind(this, "email", index)} value={this.state.data[index].email ? this.state.data[index].email : null} />
                    </Form.Item>
                </Col>

                <Col span={3}>
                    <Form.Item>
                        <RadioGroup onChange={this.onChangeRadio.bind(this, "sex", index)} value={this.state.data[index].sex}>
                            <Radio value={1}>男</Radio>
                            <Radio value={0}>女</Radio>
                        </RadioGroup>
                    </Form.Item>

                </Col>
                <Col span={5}>
                    <Form.Item>
                        {index == 0 ? <Input onChange={this.setData.bind(this, "password", index)} value={this.state.data[index].password ? this.state.data[index].password : null} />
                            :
                            <Input disabled={(this.state.ischecked.findIndex(item => item == index) == -1) ?
                                false : true} addonAfter={<Checkbox onChange={this.SaveSame.bind(this, { index, attribute: "password" })}>同上</Checkbox>}
                                onChange={this.setData.bind(this, "password", index)}
                                value={this.state.data[index].password ? this.state.data[index].password : null} />}
                    </Form.Item>
                </Col>
            </Row>

        })
        return (
            <div >
                <Modal title="批量添加用户"
                    className={style.main}
                    visible={this.props.batchVisible}
                    onCancel={this.onCancel}
                    centered={true}
                    footer={<div className="modalbtn">
                        <Button key={1} onClick={this.onCance}>取消</Button>
                        <Button key={2} onClick={this.handleSubmit} type="primary">保存</Button>
                    </div>}
                    width="80%"
                    bodyStyle={{ padding: '15px' }}
                >

                    {this.state.initDone && <Form>
                        <div>

                            <div style={{ borderBottom: '1px solid #e8e8e8', paddingBottom: '8px', marginBottom: "7px" }}>
                                <Row gutter={8}>
                                    <Col span={1}>ID</Col>
                                    <Col span={2} className={style.head}>姓名</Col>
                                    <Col span={3} className={style.head}>用户名</Col>
                                    <Col span={3} className={style.head}>{intl.get('wsd.i18n.sys.user1.actuname')}</Col>
                                    <Col span={3}>所属部门</Col>
                                    <Col span={4}>私人邮箱</Col>
                                    <Col span={3}>{intl.get('wsd.i18n.sys.user1.sex')}</Col>
                                    <Col span={5} className={style.head}>密码</Col>
                                </Row>
                            </div>
                            {items}


                        </div>
                    </Form>}


                </Modal>

            </div>
        )
    }
}

export default BatchAddModel
