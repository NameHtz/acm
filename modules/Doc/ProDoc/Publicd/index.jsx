import React, { Component } from 'react'
import { Modal, Button, Input, Icon, Table } from 'antd'
import style from './style.less'
import intl from 'react-intl-universal'



const locales = {
    'en-US': require('../../../../api/language/en-US.json'),
    'zh-CN': require('../../../../api/language/zh-CN.json')
}

const { TextArea } = Input;

class Publicd extends Component {

    state = {
        initDone: false,
        modalInfo: {
            title: '文档发布'
        },
        inputValue: 0,
        RightColumns: [{
            title: '文档标题',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '文档编号',
            dataIndex: 'num',
            key: 'num',
        }, {
            title: '版本',
            dataIndex: 'edition',
            key: 'edition',
        }],
        RightData: [{
            key: '1',
            num: '0000',
            edition: '1.0',
            name: 'EC00620-pmis.xls',
        }, {
            key: '2',
            num: '0000',
            edition: '1.0',
            name: 'EC00620.xls',
        }, {
            key: '3',
            num: '0000',
            edition: '1.0',
            name: 'EC00620.xls',
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
        this.props.handleCancel('PublicdVisible')
    }


    render() {

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },

        }

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
                                <Button key="b" type="submit" onClick={this.handleCancel.bind(this)} >关闭</Button>
                                <Button key="saveAndSubmit" type="primary">保存</Button>
                            </div>
                        }
                    >

                        <div className={style.content}>

                            <Table rowKey={record => record.key} rowSelection={rowSelection} columns={this.state.RightColumns} dataSource={this.state.RightData} pagination={false} />

                        </div>

                    </Modal>
                )}
            </div>
        )
    }

}


export default Publicd



