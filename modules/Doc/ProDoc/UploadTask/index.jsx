import React, { Component } from 'react'
import { Modal, Form, Input, Button, Icon, Table } from 'antd'
import style from './style.less'
import intl from 'react-intl-universal'
import { connect } from 'react-redux'
import { curdCurrentData } from '../../../../store/curdData/action'


const locales = {
    'en-US': require('../../../../api/language/en-US.json'),
    'zh-CN': require('../../../../api/language/zh-CN.json')
}

const { TextArea } = Input;

class UploadDoc extends Component {

    state = {
        initDone: false,
        modalInfo: {
            title: 'WBS/任务'
        },
        LeftColumns: [{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: text => <span><Icon type="folder" className={style.leftTableIcon} />{text}</span>
        }, {
            title: '代码',
            dataIndex: 'code',
            key: 'code',
        }],
        LeftData: [{
            key: 1,
            name: '计划定义',
            code: 'zpsbs-111-1002',
            children: [{
                key: 11,
                name: 'WBS',
                code: 'test-01',
            }, {
                key: 12,
                name: '任务',
                code: 'test-01',
            }]
        }, {
            key: 2,
            name: '计划定义',
            code: 'zpsbs-111-1002',
            children: [{
                key: 21,
                name: 'WBS',
                code: 'test-02',
            }, {
                key: 22,
                name: '任务',
                code: 'test-02',
            }]
        }],

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
                        onCancel={this.props.handleCancel}
                        footer={
                            <div className='modalbtn'>
                                <Button key="b" type="submit" onClick={this.props.handleCancel} >关闭</Button>
                                <Button key="saveAndSubmit" type="primary" >保存</Button>
                            </div>
                        }
                    >

                        <div className={style.content}>

                            <Table columns={this.state.LeftColumns} dataSource={this.state.LeftData} pagination={false} />

                        </div>


                    </Modal>
                )}
            </div>
        )
    }

}


const UploadDocs = Form.create()(UploadDoc);
export default connect(null, {
    curdCurrentData
})(UploadDocs);



