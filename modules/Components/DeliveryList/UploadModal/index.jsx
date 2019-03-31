import React, { Component } from 'react'
import style from './style.less'
import {  Button, Icon, Modal ,Table} from 'antd';
import intl from 'react-intl-universal'



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
                    fileName: "需求计划",
                    fileType: "word",
                    oprate: <Icon type="close" />
                }, {
                    key: "[1]",
                    id: "2",
                    fileName: "需求计划",
                    fileType: "word",
                    operate: <Icon type="close" />
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
                    <Modal title="上传文件" visible={this.state.visible}
                        className={style.main}
                        onOk={this.handleOk} onCancel={this.handleCancel}
                        okText="确定"
                        cancelText="取消"
                        width="800px"
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>取消</Button>,
                            <Button key="submit" type="primary" onClick={this.handleSubmit}>
                                确定
                            </Button>,
                        ]}
                    >
                        <div className={style.UploadModal}>
                            <div className={style.tip}>
                                <span>备注：文件支持Word、excal格式</span>
                                <p><Icon type="unlock" />上传文件</p>
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