import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Upload, message, Modal } from 'antd';
import { connect } from 'react-redux';
import axios from "../../../../../api/axios"
import { calendarInfo } from "../../../../../api/api"
export class StandardSetModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true,
            // calendars: [  // 日历 
            //     {
            //         weekDays: [ // 周
            //             {
            //                 dayWorking: 0, // 非工作日
            //                 dayType: 1, // 周日
            //                 workingTimes: []
            //             },
            //             {
            //                 dayWorking: 1, // 工作日
            //                 dayType: 2, // 周一
            //                 workingTimes: [
            //                     { // 当前工作时间
            //                         fromTime: "03:30:00",
            //                         toTime: "04:00:00"
            //                     },
            //                     { // 当前工作时间
            //                         fromTime: "08:30:00",
            //                         toTime: "11:30:00"
            //                     },
            //                     {
            //                         fromTime: "13:00:00",
            //                         toTime: "17:00:00"
            //                     }
            //                 ]
            //             },
            //             {
            //                 dayWorking: 1, // 工作日
            //                 dayType: 3, // 周二
            //                 workingTimes: [{ // 当前工作时间
            //                     fromTime: "08:00:00",
            //                     toTime: "11:00:00"
            //                 },
            //                 {
            //                     fromTime: "13:00:00",
            //                     toTime: "17:00:00"
            //                 }
            //                 ]
            //             },
            //             {
            //                 dayWorking: 1,
            //                 dayType: 4, // 周三
            //                 workingTimes: [{ // 当前工作时间
            //                     fromTime: "08:00:00",
            //                     toTime: "11:00:00"
            //                 },
            //                 {
            //                     fromTime: "13:00:00",
            //                     toTime: "17:00:00"
            //                 }
            //                 ]
            //             },
            //             {
            //                 dayWorking: 1,
            //                 dayType: 5, // 周四
            //                 workingTimes: [{ // 当前工作时间
            //                     fromTime: "08:00:00",
            //                     toTime: "11:00:00"
            //                 },
            //                 {
            //                     fromTime: "13:00:00",
            //                     toTime: "17:00:00"
            //                 }
            //                 ]
            //             },
            //             {
            //                 dayWorking: 1, // 工作日
            //                 dayType: 6, // 周五
            //                 workingTimes: [{ // 当前工作时间
            //                     fromTime: "08:00:00",
            //                     toTime: "11:00:00"
            //                 },
            //                 {
            //                     fromTime: "13:00:00",
            //                     toTime: "17:00:00"
            //                 }
            //                 ]
            //             },
            //             {
            //                 dayWorking: 0, // 非工作日
            //                 dayType: 7, // 周六
            //                 workingTimes: []
            //             }
            //         ],
            //         name: "五天工作日",
            //         id: "1",
            //         exceptions: [ // 例外的日期
            //             {
            //                 dayWorking: 0, // 非工作日
            //                 name: '',
            //                 timePeriod: { //例外的日期范围
            //                     fromDate: '2007-01-01T00:00:00',
            //                     toDate: '2007-01-02T23:59:59'
            //                 },
            //                 workingTimes: [{
            //                     fromTime: "08:00:00",
            //                     toTime: "17:00:00"
            //                 }]
            //             },
            //             {
            //                 dayWorking: 0, // 非工作日
            //                 name: '国庆节',
            //                 timePeriod: { //例外的日期范围
            //                     fromDate: '2007-10-01T00:00:00',
            //                     toDate: '2007-10-07T23:59:59'
            //                 }
            //             }
            //         ]
            //     }
            // ],
            startindex: 0,//标记星期几位置
            daytime: 0,//一天时间
            weektime: 0,//一周时间
            array: [] //渲染数据
        }
    }

    componentDidMount() {
        this.getData()
    }
    //获取数据
    getData = () => {
        console.log(this.props)
        console.log(this.props.data)
        axios.get(calendarInfo(this.props.data.id)).then(res => {
            console.log(res.data.data)
            this.setState({
                calendars: res.data.data
            }, () => {
                //初始化
                this.initlData()
            })
        })
    }
    //计算时间
    countTime = () => {
        let time = 0;
        let weektime = 0;
        if (this.state.calendars.weekDays[this.state.startindex].workingTimes) {
            this.state.calendars.weekDays[this.state.startindex].workingTimes.forEach(itemx => {
                let fromTime = parseInt(itemx.fromTime.substr(0, 2))
                let fromTimeminutes = itemx.fromTime.substr(3, 2)
                let toTime = parseInt(itemx.toTime.substr(0, 2))
                let toTimeminutes = itemx.toTime.substr(3, 2)
                let start = fromTime
                let end = toTime
                if (fromTimeminutes == "30") {
                    start += 0.5
                }
                if (toTimeminutes == "30") {
                    end += 0.5
                }
                let temple = end - start
                time += temple
            })
        }
        this.state.calendars.weekDays.forEach(item => {
            let temptime = 0
            console.log(item)
            if (item.workingTimes) {
                item.workingTimes.forEach(value => {
                    let fromTime = parseInt(value.fromTime.substr(0, 2))
                    let fromTimeminutes = value.fromTime.substr(3, 2)
                    let toTime = parseInt(value.toTime.substr(0, 2))
                    let toTimeminutes = value.toTime.substr(3, 2)
                    let start = fromTime
                    let end = toTime
                    if (fromTimeminutes == "30") {
                        start += 0.5
                    }
                    if (toTimeminutes == "30") {
                        end += 0.5
                    }
                    let temple = end - start
                    temptime += temple
                })
            }

            weektime += temptime
        })
        this.setState({
            daytime: time,
            weektime
        })

    }

    handleOk = (e) => {

        this.props.handleCancel()
    }
    handleCancel = (e) => {

        this.props.handleCancel()
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

            }
        });
    }
    //初始化函数，将日期数据转化可视化数组
    initlData = () => {
        let array = []
        for (let i = 0; i < 24; i++) {
            array.push({
                flow: i,
                unit: {
                    one: false,
                    two: false
                }
            })
        }

        if (this.state.calendars.weekDays[this.state.startindex]) {
            if (this.state.calendars.weekDays[this.state.startindex].workingTimes) {
                this.state.calendars.weekDays[this.state.startindex].workingTimes.forEach(itemx => {
                    let fromTime = parseInt(itemx.fromTime.substr(0, 2))
                    let fromTimeminutes = itemx.fromTime.substr(3, 2)
                    let toTime = parseInt(itemx.toTime.substr(0, 2))
                    let toTimeminutes = itemx.toTime.substr(3, 2)
                    let end = toTime;
                    if (toTimeminutes == "00") {
                        end++
                    }
                    for (let i = fromTime; i < end; i++) {
                        if (i == fromTime) {
                            if (fromTimeminutes == "00" && toTime==fromTime) {
                                array[i].unit.one = true;
                                array[i].unit.two = true;
                            } else {
                                array[i].unit.two = true;
                            }
                            continue
                        } else if (i == toTime && i>fromTime) {
                            if (toTimeminutes == "30") {
                                array[i].unit.one = true;
                            }
                        } else {
                            array[i].unit.one = true;
                            array[i].unit.two = true;
                        }
                        // if(i == toTime && i>fromTime){
                        //     if(toTimeminutes=="30"){
                        //         array[i].unit.one = true;
                        //     }
                        // }
                    }
                })

            }

        }
        this.setState({
            array: array
        },()=>{
            this.countTime()
        })
    }
    //切换星期函数
    handleClickWeek = (index) => {

        this.setState({
            startindex: index
        }, () => {
            //初始渲染数据
            this.initlData()
           
        })

    }
    //数组转化时间格式
    ArrayToTime = () => {

        const { calendars, startindex, array } = this.state
        let workingTimes = [];
        let flag = true;
        let start, end

        array.forEach((value, index, array) => {
            if (flag) {

                if (value.unit.one) {
                    flag = false;
                    if (index >= 10) {
                        start = index + ":00:00"
                    } else {
                        start = "0" + index + ":00:00"
                    }
                    //半小时
                    if (!value.unit.two) {
                        if (index >= 10) {
                            end = index + ":30:00"
                        } else {
                            end = "0" + index + ":30:00"
                        }
                        workingTimes.push(
                            {
                                fromTime: start,
                                toTime: end
                            }
                        )
                        flag = true
                    }
                    //一小时
                    if (value.unit.two && (index + 1 < array.length) && (!array[index + 1].unit.one) || value.unit.two && (index + 1 == array.length)) {
                        if (index + 1 >= 10) {
                            end = index + 1 + ":00:00"
                        } else {
                            end = "0" + (index + 1) + ":00:00"
                        }
                        workingTimes.push(
                            {
                                fromTime: start,
                                toTime: end
                            }
                        )
                        flag = true
                    }
                }
                if (value.unit.two && !value.unit.one) {
                    flag = false;
                    if (index >= 10) {
                        start = index + ":30:00"
                    } else {
                        start = "0" + index + ":30:00"
                    }
                    //半小时
                    if ((index + 1 < array.length) && !array[index + 1].unit.one || (index + 1 == array.length)) {
                        if (index + 1 >= 10) {
                            end = index + 1 + ":00:00"
                        } else {
                            end = "0" + (index + 1) + ":00:00"
                        }
                        workingTimes.push(
                            {
                                fromTime: start,
                                toTime: end
                            }
                        )
                        flag = true
                    }
                }
            }
            if (!flag) {
                if (!value.unit.one && index - 1 > 0 && array[index - 1].unit.two) {
                    if (index + 1 >= 10) {
                        end = index + ":00:00"
                    } else {
                        end = "0" + index + ":00:00"
                    }
                    workingTimes.push(
                        {
                            fromTime: start,
                            toTime: end
                        }
                    )
                    flag = true
                }
                if (!value.unit.two && value.unit.one) {
                    if (index + 1 >= 10) {
                        end = index + ":30:00"
                    } else {
                        end = "0" + index + ":30:00"
                    }
                    workingTimes.push(
                        {
                            fromTime: start,
                            toTime: end
                        }
                    )
                    flag = true
                }
            }


        })
        calendars.weekDays[startindex].workingTimes = workingTimes
        console.log(workingTimes)
        this.setState({
            calendars: calendars
        }, () => {
            this.countTime()
        })
    }
    changeColor(index, lr) {
        const { array } = this.state
        let oneOrTwo = "one"
        if (lr == "two") {
            oneOrTwo = "two"
        }
        if (array[index].unit[oneOrTwo]) {
            array[index].unit[oneOrTwo] = false;
            this.setState({
                array: array
            }, () => {

                this.ArrayToTime()
            })
        } else {
            array[index].unit[oneOrTwo] = true;
            this.setState({
                array: array
            }, () => {
                this.ArrayToTime()
            })
        }
        console.log(array)
    }
    render() {
        const { intl } = this.props.currentLocale
        const week = ['日', "一", "二", "三", "四", "五", "六"]
        console.log(this.props.data)


        return (
            <div>

                <Modal className={style.main} width="850px"
                    centered={true}
                    title="标准设置"
                    visible={true}
                    onCancel={this.props.handleCancel}
                    footer={
                        <div className='modalbtn'>
                            <Button key="submit" onClick={this.handleSubmit}>取消</Button>
                            <Button key="submit1" type="primary" onClick={this.handleSubmit}>保存</Button>
                        </div>
                    }>
                    <div className={style.standardset}>
                        <div className={style.week}>
                            <span>星期：</span>
                            <div className={style.weeklist}>
                                {week.map((item, i) => <li key={i} className={this.state.startindex == i ? style.current : ""} onClick={this.handleClickWeek.bind(this, i)}>{item}</li>)}
                            </div>
                        </div>
                        <div className={style.content}>
                            <li className={style.first}><div>:00-:30 :30-:60</div></li>
                            {this.state.array &&
                                this.state.array.map((item, index) => {
                                    return <li key={index}>
                                        <div className={style.number}>{index}：</div>
                                        <div className={item.unit.one ? style.contentchild1 : style.contentchild} onClick={this.changeColor.bind(this, index, "one")}></div>
                                        <div className={item.unit.two ? style.contentchild1 : style.contentchild} onClick={this.changeColor.bind(this, index, "two")}></div>
                                    </li>
                                })
                            }
                        </div>
                        <div className={style.rightbox}>
                            <div className={style.resultt}>
                                <li><Input readOnly value={this.state.daytime} />小时/天</li>
                                <li><Input readOnly value={this.state.weektime} />小时/周</li>
                                <li><Input readOnly value={0} />小时/月</li>
                                <li><Input readOnly value={0} />小时/年</li>
                            </div>
                            <div className={style.btn}>
                                <Button>复制</Button>
                                <br />
                                <Button>粘贴</Button>
                            </div>
                        </div>
                    </div>
                </Modal>

            </div>
        )
    }
}

export default connect(state =>
    ({
        currentLocale: state.localeProviderData,
    }))(StandardSetModal);