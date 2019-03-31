import React, { Component } from 'react'
import { Modal, Button, Table, Icon, Upload, message } from 'antd'
import style from './style.less'
import intl from 'react-intl-universal'


const locales = {
    'en-US': require('../../../../api/language/en-US.json'),
    'zh-CN': require('../../../../api/language/zh-CN.json')
}

const head = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
}

class UploadDoc extends Component {

    state = {
        initDone: false,
        modalInfo: {
            title: '上传文档'
        },
        columns: [{
            title: '文件名称',
            dataIndex: 'name',
        }, {
            title: '文件类型',
            dataIndex: 'type',
        }, {
            title: '文件大小',
            dataIndex: 'size',
        }, {
            title: '',
            dataIndex: 'dele',
            render: () => <Icon type="close" />
        }],
        data: [{
            key: '1',
            name: '产品研发计划',
            type: 'Excel',
            size: '371.6KB',
            dele: ''
        }, {
            key: '2',
            name: '产品需求说明',
            type: 'Word',
            size: '2.03M',
            dele: ''
        }]
    }

    componentDidMount() {
        this.loadLocales();
    }

    loadLocales() {
        intl.init({
            currentLocale: 'zh-CN',
            locales,
        }).then(() => {
            this.setState({ initDone: true })
        })
    }
    handleCancel() {
        this.props.handleCancel('UploadVisible')
    }


    render() {
        return (
            <div>
                {this.state.initDone && (
                    <Modal
                        className={style.main}
                        width="850px"
                        title={this.state.modalInfo.title}
                        forceRender={true} centered={true}
                        visible={this.props.modalVisible}
                        onCancel={this.handleCancel.bind(this)}
                        footer={
                            <div className='modalbtn'>
                                <Button key="b" type="submit" >保存</Button>
                                <Button key="saveAndSubmit" type="primary">保存并继续</Button>
                            </div>
                        }
                    >

                        <div className={style.content}>

                            <Table columns={this.state.columns} dataSource={this.state.data} size="small" pagination={false} />

                            <div className={style.bottext}>
                                <Upload {...head} className={style.upload}>
                                    <Button className={style.selectBut}>
                                        <Icon type="upload" /> 选择文件
                                    </Button>
                                </Upload>
                                <span className={style.remark}> 备注:单个文件大小不超过100M，上传多个文件大小总共不超过1G </span>
                            </div>
                        </div>


                    </Modal>
                )}
            </div>
        )
    }

}


export default UploadDoc





