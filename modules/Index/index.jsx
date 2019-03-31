import React, { Component } from 'react'
import { Table, Icon, Input, Row, Col, DatePicker, Button, Select } from 'antd'
import style from './style.less'
import MessageTem from './MessageTem'
import MyWarnTem from './MyWarnTem'
import MyQuestionTem from './MyQuestionTem'
import TaskTem from './TaskTem'
import MyToDoTem from './MyToDoTem'
const InputGroup = Input.Group
const Search = Input.Search
const { RangePicker } = DatePicker
const Option = Select.Option;
function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
}
function onOk(value) {
    console.log('onOk: ', value);
}
export class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                { tabName: "我的任务", id: 1, iconType: "solution" },
                { tabName: "我的待办", id: 2, iconType: "message" },
                { tabName: "我的消息", id: 3, iconType: "bell" },
                { tabName: "我的预警", id: 4, iconType: "question-circle" },
                { tabName: "我的问题", id: 5, iconType: "bell" },
                { tabName: "我的行动项", id: 6, iconType: "bell" }
            ],
            currentIndex: 1,
            mainHeight: '', //盒子高度
            mainLeftWidth: '',  //left盒子宽度
        };
    }

    tabChoiced = (id) => {
        //tab切换到方法
        this.setState({
            currentIndex: id,
        });
    };

    componentDidMount() {
        //初始化css样式
        var h = document.documentElement.clientHeight || document.body.clientHeight - 70;   //浏览器高度，用于设置组件高度
        var w = document.documentElement.offsetWidth || document.body.offsetWidth;
        this.setState({
            mainHeight: h - 200,
            mainLeftWidth: w - 55
        })
    }


    render() {
        var _this = this;
        var isTable1Show = this.state.currentIndex == 1 ? 'block' : 'none';
        var isTable2Show = this.state.currentIndex == 2 ? 'block' : 'none';
        var isTable3Show = this.state.currentIndex == 3 ? 'block' : 'none';
        var isTable4Show = this.state.currentIndex == 4 ? 'block' : 'none';
        var isTable5Show = this.state.currentIndex == 5 ? 'block' : 'none';
        var isTable6Show = this.state.currentIndex == 6 ? 'block' : 'none';

        var tabList = this.state.tabs.map(function (res, index) {
            var tabStyle = res.id == this.state.currentIndex ? 'homeActivity' : null;
            return <li key={index} onClick={this.tabChoiced.bind(_this, res.id)} className={tabStyle}><Icon type={res.iconType}
                style={{ fontSize: 40, color: '#fff' }} />
                <span className={index.title}>{res.tabName}</span>
            </li>
        }.bind(_this));

        return (
            <div className={style.main} style={{ height: this.state.mainHeight }}>
                <ul className={style.itemlist}>
                    {tabList}
                </ul>
                <div className={style.rightMain}>
                    {/*我的任务*/}
                    <div className={style.itemTable} style={{ display: isTable1Show }}>
                        <div className={style.itemHeaderTop}>
                            <div className={style.itemHeader}>
                                <Col span={6}>
                                    <label htmlFor="keyword">项目</label>&nbsp;&nbsp;&nbsp;
                                    <Search
                                        placeholder="按项目名称关键字查询"
                                        style={{ width: 180 }}
                                        onSearch={value => console.log(value)}
                                    />
                                </Col>

                                <Col span={10}>
                                    <label htmlFor="timeSearch">按时间段查询</label>&nbsp;&nbsp;&nbsp;
                                    <RangePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder={['开始时间', '结束时间']}
                                        onChange={onChange}
                                        onOk={onOk}
                                        style={{ width: 200 }}
                                    />
                                </Col>
                                <Col span={8} className={style.textContent}>
                                    <span><a href="" className={style.colo}>更多>></a></span>
                                </Col>

                            </div>
                            <TaskTem />
                        </div>
                    </div>
                    {/*我的代办*/}
                    <div style={{ display: isTable2Show }} className={style.itemTable}>
                        <div className={style.itemHeaderTop}>
                            <div className={style.itemHeader}>
                                <Col span={6}>
                                    <label htmlFor="keyword">项目</label>&nbsp;&nbsp;&nbsp;
                                    <Search
                                        placeholder="按项目名称关键字查询"
                                        style={{ width: 180 }}
                                        onSearch={value => console.log(value)}
                                    />
                                </Col>
                                <Col span={8}>
                                    <label htmlFor="timeSearch">按时间段查询</label>&nbsp;&nbsp;&nbsp;
                                    <RangePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder={['Start Time', 'End Time']}
                                        onChange={onChange}
                                        onOk={onOk}
                                        style={{ width: 200 }}
                                    />
                                </Col>
                                <Col span={6}>
                                    <label htmlFor="process">流程类型</label>&nbsp;&nbsp;&nbsp;
                  <Search
                                        placeholder="按流程类型查询"
                                        style={{ width: 180 }}
                                        onSearch={value => console.log(value)}
                                    />
                                </Col>
                                <Col span={4} className={style.textContent}>
                                    <span><a href="" className={style.colo}>更多>></a></span>
                                </Col>
                            </div>
                            <MyToDoTem />
                        </div>
                    </div>
                    {/*我的消息*/}
                    <div style={{ display: isTable3Show }} className={style.itemTable}>
                        <div className={style.itemHeaderTop}>
                            <div className={style.itemHeader}>
                                <Col span={1}>
                                    <span><a href="#" className={style.active}>未读</a></span>
                                </Col>
                                <Col span={1}>
                                    <span><a href="#" className={style.colo}>已读</a></span>
                                </Col>
                                <Col span={1}>
                                    <span><a href="#" className={style.colo}>全部</a></span>
                                </Col>
                                <Col span={6}>
                                    <label htmlFor="keyword">项目 &nbsp;&nbsp;</label>
                                    <Search
                                        placeholder="按项目名称关键字查询"
                                        style={{ width: 180 }}
                                        onSearch={value => console.log(value)}
                                    />
                                </Col>
                                <Col span={13}>
                                    <label htmlFor="timeSearch">按时间段查询&nbsp;&nbsp;</label>
                                    <RangePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder={['Start Time', 'End Time']}
                                        onChange={onChange}
                                        onOk={onOk}
                                        style={{ width: 200 }}
                                    />
                                </Col>
                                <Col span={2} className={style.textContent}>
                                    <span><a href="" className={style.colo}>更多>></a></span>
                                </Col>
                            </div>
                            <MessageTem />
                        </div>
                    </div>
                    {/*我的预警*/}
                    <div style={{ display: isTable4Show }} className={style.itemTable}>
                        <div className={style.itemHeaderTop}>
                            <div className={style.itemHeader}>
                                <Col span={5}>
                                    <span><a href="#" className={style.active}>超期未完成</a></span>&nbsp;&nbsp;&nbsp;
                                    <span><a href="#">即将完成</a></span>&nbsp;&nbsp;&nbsp;
                                    <span><a href="#">即将开始</a></span>&nbsp;&nbsp;&nbsp;
                                </Col>
                                <Col span={5}>
                                    <label htmlFor="keyword">项目&nbsp;&nbsp;</label>
                                    <Search
                                        placeholder="按项目名称关键字查询"
                                        style={{ width: 180 }}
                                        onSearch={value => console.log(value)}
                                    />
                                </Col>
                                <Col span={8}>
                                    <label htmlFor="timeSearch">按时间段查询</label>&nbsp;&nbsp;&nbsp;
                  <RangePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder={['开始时间', '结束时间']}
                                        onChange={onChange}
                                        onOk={onOk}
                                        style={{ width: 200 }}
                                    />
                                </Col>
                                <Col span={4} className={style.textContent}>
                                    <label htmlFor="timeSearch">预警时间&nbsp;&nbsp;</label>
                                    <Select defaultValue="一周" style={{ width: 80 }}>
                                        <Option value="一周">一周</Option>
                                    </Select>
                                </Col>
                                <Col span={2} className={style.textContent}>
                                    <span><a href="" className={style.colo}>更多>></a></span>
                                </Col>
                            </div>
                            <MyWarnTem />
                        </div>
                    </div>
                    {/*我的问题*/}
                    <div style={{ display: isTable5Show }} className={style.itemTable}>
                        <div className={style.itemHeaderTop}>
                            <div className={style.itemHeader}>
                                <Row>
                                    <Col span={5}>
                                        <span><a href="#" className={style.active}>全部</a></span>&nbsp;&nbsp;&nbsp;
                                        <span><a href="#">我创建的</a></span>&nbsp;&nbsp;&nbsp;
                                        <span><a href="#">我负责的</a></span>&nbsp;&nbsp;&nbsp;
                                    </Col>
                                    <Col span={5}>
                                        <label htmlFor="keyword">项目&nbsp;&nbsp;</label>
                                        <Search
                                            placeholder="按项目名称关键字查询"
                                            style={{ width: 180 }}
                                            onSearch={value => console.log(value)}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <label htmlFor="timeSearch">时间段</label>&nbsp;&nbsp;&nbsp;
                                        <RangePicker
                                            showTime
                                            format="YYYY-MM-DD HH:mm:ss"
                                            placeholder={['开始时间', '结束时间']}
                                            onChange={onChange}
                                            onOk={onOk}
                                            style={{ width: 200 }}
                                        />
                                    </Col>
                                    <Col span={2} className={style.textContent}>
                                        <span><a href="" className={style.colo}>更多>></a></span>
                                    </Col>
                                </Row>
                            </div>
                            <MyQuestionTem />
                        </div>
                    </div>
                    {/*我的行动*/}
                    <div style={{ display: isTable6Show }} className={style.itemTable}>
                        <div className={style.itemHeaderTop}>
                            <div className={style.itemHeader}>
                                <Row>
                                    <Col span={6}>
                                        <span><a href="#" className={style.active}>全部</a></span>&nbsp;&nbsp;&nbsp;
                                        <span><a href="#">审核中</a></span>&nbsp;&nbsp;&nbsp;
                                        <span><a href="#">审核通过</a></span>&nbsp;&nbsp;&nbsp;
                                        <span><a href="#">审核未通过</a></span>&nbsp;&nbsp;&nbsp;
                                    </Col>
                                    <Col span={6}>
                                        <label htmlFor="keyword">排序条件&nbsp;&nbsp;</label>
                                        <Select defaultValue="排序条件">
                                            <Option value="排序条件">排序条件</Option>
                                        </Select>
                                    </Col>
                                    <Col span={10}>
                                        <label htmlFor="timeSearch">项目/时间段</label>&nbsp;&nbsp;&nbsp;
                                        <RangePicker
                                            showTime
                                            format="YYYY-MM-DD HH:mm:ss"
                                            placeholder={['开始时间', '结束时间']}
                                            onChange={onChange}
                                            onOk={onOk}
                                            style={{ width: 200 }}
                                        />
                                    </Col>
                                    <Col span={2} className={style.textContent}>
                                        <span><a href="" className={style.colo}>更多>></a></span>
                                    </Col>
                                </Row>
                            </div>
                            <MessageTem />
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

export default Index
