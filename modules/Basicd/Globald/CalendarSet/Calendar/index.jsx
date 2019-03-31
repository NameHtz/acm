import React, { Component } from 'react'
import Link from 'next/link'
import { Input } from 'antd';
import style from './style.less'
import Router from 'next/router'
import Calend from './Calend'
import axios from '../../../../../api/axios'
import { calendarDefInfo, calendarInfo } from '../../../../../api/api'


//日历
class Acm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bagcolor: '#bfbfc4',
            defualtTime: '',
            weekTime: '',
            weekTime2: [],
            right: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
            time: [],
            exceptionData:[],
        }
    }

    //获取数据
    getData = () => {
        axios.get(calendarDefInfo).then(res => {
            console.log(res)
            if(res.data){
                this.setState({
                    exceptionData: res.data.data.exceptions
                })
            }
        })
    }

    componentDidMount() {
        this.getData()
        let firstaa = []
        for (let i = 1; i <= 12; i++) {
            var ss = '2019-' + i + '-1';
            firstaa.push("012345".charAt(new Date(ss).getDay()))
        }
        this.setState({
            weekTime2: firstaa
        })
        var s = '2019-1-1';
        this.setState({
            weekTime: "012345".charAt(new Date(s).getDay())
        })
        this.setState({
            defualtTime: new Date().getFullYear(),
        })
    }

    //生命周期函数-更改props时调用
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.record)
        if(nextProps.data){
            this.receivePropsGetData(nextProps)
        }
    }
    //根据id获取信息
    receivePropsGetData = (value) => {
        // console.log(nextProps.record.id)
        axios.get(calendarInfo(value.data.id)).then(res=>{
            // console.log(res)
            if(res.data){
                this.setState({
                    exceptionData: res.data.data.exceptions
                })
            }
        })
    }

    changeColor(index, e) {
        if (e.target.style.backgroundColor == 'rgb(191, 191, 196)') {
            e.target.style.backgroundColor = '#cee2f6'
        } else if (e.target.style.backgroundColor == 'rgb(206, 226, 246)') {
            e.target.style.backgroundColor = '#bfbfc4'
        }
        var times = this.state.time
        for (let i = 0; i < times.length; i++) {
            if (times[i].hour == index) {
                if (times[i].interval == e.target.id) {
                    times.splice(i, 1)
                    this.setState({
                        time: times
                    })
                    return
                }
            }
        }
        var time = []
        time.hour = index
        time.interval = e.target.id
        times.push(time)
        this.setState({
            time: times
        })

    }
    changeNumb(e) {
        this.setState({
            defualtTime: e.target.value
        }, function () {
            var s = this.state.defualtTime + '-1-1';
            let aa = []
            for (let i = 1; i <= 12; i++) {
                var ss = this.state.defualtTime + '-' + i + '-1';
                aa.push("012345".charAt(new Date(ss).getDay()))
            }
            this.setState({
                weekTime2: aa
            })
            this.setState({
                weekTime: "012345".charAt(new Date(s).getDay())
            })
        })
    }
    keep() {
        console.log(this.state.time)
    }
    render() {
        return (
            <div className={style.main}>
                <div className={style.wrapper1190}>
                    <div className={style.left}>
                        <div className={style.head}>
                            <a>年份:</a><Input onChange={this.changeNumb.bind(this)} value={this.state.defualtTime} type="number" className={style.userName} />
                            <a>标准:</a><div className={style.color}></div>
                            <a>非工作:</a><div className={style.color1}></div>
                            <a>例外:</a><div className={style.color}></div>
                        </div>
                        <div className={style.center}>
                            <Calend year={this.state.defualtTime} weekTime={this.state.weekTime} weekTime2={this.state.weekTime2} exceptionData={this.state.exceptionData} />
                        </div>
                    </div>
                    <div className={style.right}>
                        <div className={style.head}>
                            <a>非工作日</a>
                            <a>标准日</a>
                        </div>
                        <div className={style.content}>
                            <li className={style.first}><div>:00-:30 :30-:60</div></li>
                            {
                                this.state.right.map((item, index) => {
                                    return <li key={index}>
                                        <div className={style.number}>{index}：</div>
                                        <div className={style.contentchild} id={1} style={{ backgroundColor: '#bfbfc4' }} onClick={this.changeColor.bind(this, index)}></div>
                                        <div className={style.contentchild} id={2} style={{ backgroundColor: '#bfbfc4' }} onClick={this.changeColor.bind(this, index)}></div>
                                    </li>
                                })
                            }
                        </div>
                        <button className={style.keep} onClick={this.keep.bind(this)}>保存</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Acm

