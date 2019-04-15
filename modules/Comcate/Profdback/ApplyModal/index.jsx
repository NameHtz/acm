import React, { Component } from 'react'
import { Table, Form, Row, Col, Input, Button, Icon, Select, DatePicker, Modal } from 'antd';
import intl from 'react-intl-universal'
import emitter from '../../../../api/ev';
import Search from '../../../../components/public/Search'
import moment from 'moment'
import style from './style.less'
const locales = {
  "en-US": require('../../../../api/language/en-US.json'),
  "zh-CN": require('../../../../api/language/zh-CN.json')
}
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
class ApplyModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initDone: false,
      visible: true,
      data: [
        // {
        //   id: 1,
        //   key: 1,
        //   name: 'ACM产品开发计划',
        //   code: 'XM',
        //   planStartTime: '2018-9-9',
        //   planEndTime: '2018-11-11',
        //   iptName: '研发部',
        //   userName: '孙博宇',
        //   children: [
        //     {
        //       id: 2,
        //       key: 2,
        //       name: '计划',
        //       code: 'ZGYF',
        //       planStartTime: '2018-08-10',
        //       planEndTime: '2018-12-10',
        //       iptName: '研发部',
        //       userName: '孙博宇',
        //       children: [
        //         {
        //           id: 3,
        //           key: 3,
        //           name: '计划',
        //           code: 'ZGYF',
        //           planStartTime: '2018-08-10',
        //           planEndTime: '2018-12-10',
        //           iptName: '研发部',
        //           userName: '孙博宇',
        //         }
        //       ]
        //     }
        //   ]
        // },
      ],

    }
  }

  componentDidMount() {
    this.loadLocales();

    this.setState({
      width: this.props.width,
      // info: this.props.data
    })
  }

  loadLocales() {
    intl.init({
      currentLocale: 'zh-CN',
      locales,
    })
      .then(() => {
        // After loading CLDR locale data, start to render
        this.setState({
          initDone: true,
          columns: [
            {
              title: intl.get('wsd.i18n.plan.feedback.name'),
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: intl.get("wsd.i18n.base.planTemAddTask.code"),
              dataIndex: 'code',
              key: 'code',
            },
            {
              title: intl.get('wsd.i18n.plan.feedback.planstarttime'),
              dataIndex: 'planStartTime',
              key: 'planStartTime',
            },
            {
              title: intl.get('wsd.i18n.plan.feedback.planendtime'),
              dataIndex: 'planEndTime',
              key: 'planEndTime',
            },
            {
              title: intl.get('wsd.i18n.plan.feedback.iptname'),
              dataIndex: 'iptName',
              key: 'iptName',
            },
            {
              title: intl.get('wsd.i18n.plan.feedback.username'),
              dataIndex: 'userName',
              key: 'userName',
            },


          ]
        });
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        var data = values;
        console.log(data)
        data.key = this.state.info['key']
        emitter.emit('noticeUpdateEvents', { status: 'update', data: data })
        console.log('Received values of form: ', values);
      }
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
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        this.setState({
          selectData: selectedRows
        })
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    };

    return (
      <div className={style.main}>
        {this.state.initDone &&
          <div>
            <Modal
              title={this.props.title}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              okText="确定"
              cancelText="取消"
              width="800px"
              footer={
                <div className="modalbtn">

                  <Button key={3}>取消</Button>
                  <Button key={2} type="primary" >确定</Button>
                </div>
              }
            >

              <div style={{ paddingBottom: '20px' }}>
                <Search />
              </div>
              <Table
                rowKey={record => record.id}
                defaultExpandAllRows={true}
                pagination={false}
                name={this.props.name}
                columns={this.state.columns}
                rowSelection={rowSelection}
                dataSource={this.state.data} />

            </Modal>
          </div>
        }
      </div>
    )

  }
}
const ApplyModals = Form.create()(ApplyModal);
export default ApplyModals
