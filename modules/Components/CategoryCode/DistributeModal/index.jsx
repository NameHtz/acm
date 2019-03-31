import React, { Component } from 'react'
import style from './style.less'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker, Modal, Table } from 'antd';
import intl from 'react-intl-universal'
import emitter from '../../../../api/ev';
import moment from 'moment';
import Search from "../../../../components/public/Search/"

const locales = {
    "en-US": require('../../../../api/language/en-US.json'),
    "zh-CN": require('../../../../api/language/zh-CN.json')
}


class UploadModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initDone: false,
            visible: true,

            data: [
                {
                    key: "[0]",
                    id: "1",
                    categorycode: "GEABD",
                    intro: "设计"
                }, {
                    key: "[1]",
                    id: "2",
                    categorycode: "GEABD",
                    intro: "设计"
                }
            ]
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
                this.setState({ initDone: true });
            });
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
        this.props.handleCancel()
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
        this.props.handleCancel()
    }


    render() {

        const columns = [
            {
                title: intl.get('wsd.i18n.pre.eps.categorycode'),
                dataIndex: 'categorycode',
                key: 'categorycode',
            },
            {
                title: "说明",
                dataIndex: 'intro',
                key: 'intro',
            }
        ]
        return (
            <div className={style.main}>
                {this.state.initDone &&
                    <Modal title="分配分类码" visible={this.state.visible}
                        onOk={this.handleOk} onCancel={this.handleCancel}
                        okText="确定"
                        cancelText="取消"
                        width="700px"
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>取消</Button>,
                            <Button key="submit" type="primary" onClick={this.handleOk}>
                                分配
                            </Button>,
                        ]}
                    >
                        <div className={style.DistributeModal}>
                            <div className={style.search}>
                                <Search></Search>
                            </div>

                            <Table columns={columns} dataSource={this.state.data} pagination={false} name={this.props.name} />
                        </div>
                    </Modal>
                }
            </div>
        )
    }
}

export default UploadModal
// {
//               "wsd.i18n.plan.fileinfo.filename" : "文件名称",
//             "wsd.i18n.plan.fileinfo.fileversion" : "版本号",
//             "wsd.i18n.plan.fileinfo.creattime" : "创建时间",
//             "wsd.i18n.plan.fileinfo.creator" : "创建人",
//             "wsd.i18n.plan.fileinfo.remark" : "备注",
//     }