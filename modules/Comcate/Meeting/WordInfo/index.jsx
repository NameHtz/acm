import React, { Component } from 'react'
import style from './style.less'
import {Form, Row, Col, Input, Button, Icon, Select, DatePicker} from 'antd';
import MeetWordInfo from '../../../Components/FileInfo'
import intl from 'react-intl-universal'
const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
//会议问题->基本信息
export class ComcateMeetingWordInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            info: {
                name:1,
                iptName:1,
                userName:1,
                status:1,
                creator:1,
                creatTime:1,
            }
        }
    }
    componentDidMount() {
        this.loadLocales();
        console.log('加载')
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
                this.setState({initDone: true});
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {

        return (
            <div className={style.main}>
                <div className={style.title}>
                    <h3 >文件信息</h3>
                </div>
                <div className={style.infoform}>
                    {/* {基本信息表单} */}
                    <MeetWordInfo></MeetWordInfo>
                </div>
            </div>
        )
    }
}

export default ComcateMeetingWordInfo