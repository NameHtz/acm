import React, { Component } from 'react';
import intl from 'react-intl-universal';
import { Table, Button, Select, Checkbox, Modal } from 'antd';
import style from './style.less';
import Search from '../../../../components/public/Search';
import { connect } from 'react-redux';
import { curdCurrentData } from '../../../../store/curdData/action';

const locales = {
  'en-US': require('../../../../api/language/en-US.json'),
  'zh-CN': require('../../../../api/language/zh-CN.json'),
};
const Option = Select.Option;

class ImportTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initDone: false,
      visible: true,
      data: [
        {
          name: '项目总裁办',
          role: <Select mode="multiple" defaultValue="jack" style={{ width: '100%' }}><Option value="jack">计划员</Option>
            <Option value="lucy">项目经理</Option></Select>,
          select: <Checkbox></Checkbox>,
          key: 1,
          children: [
            {
              name: '项目总裁办',
              role: <Select mode="multiple" defaultValue="jack" style={{ width: '100%' }}><Option
                value="jack">计划员</Option>
                <Option value="lucy">项目经理</Option></Select>,
              select: <Checkbox></Checkbox>,
              key: 11,
            },
            {
              name: '项目总裁办',
              role: <Select mode="multiple" defaultValue="jack" style={{ width: '100%' }}><Option
                value="jack">计划员</Option>
                <Option value="lucy">项目经理</Option></Select>,
              select: <Checkbox></Checkbox>,
              key: 12,
              children: [
                {
                  name: '项目总裁办',
                  role: <Select mode="multiple" defaultValue="jack" style={{ width: '100%' }}><Option
                    value="jack">计划员</Option>
                    <Option value="lucy">项目经理</Option></Select>,
                  select: <Checkbox></Checkbox>,
                  key: 21,
                },
                {
                  name: '项目总裁办',
                  role: <Select mode="multiple" defaultValue="jack" style={{ width: '100%' }}><Option
                    value="jack">计划员</Option>
                    <Option value="lucy">项目经理</Option></Select>,
                  select: <Checkbox></Checkbox>,
                  key: 22,
                },
              ],
            },
          ],
        },
      ],
    };
  }

  componentDidMount() {
    this.loadLocales();
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
  };
  handleOk = (e) => {
    this.props.handleCancel();
  };
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
      },
      {
        title: '角色',
        dataIndex: 'role',
        key: 'role',
        width: '60%',
      },
      {
        title: '选择',
        dataIndex: 'select',
        width: '10%',
        key: 'select',
      },

    ];

    return (
      <div>
        {this.state.initDone &&
        <Modal title="从组织导入" visible={this.props.visible}
               onCancel={this.props.handleCancel}
               footer={<div className="modalbtn">
                 <Button key={1} onClick={this.props.handleCancel}>取消</Button>
                 <Button key={2} onClick={this.handleOk} type="primary">保存</Button>
               </div>}
               width="800px"
               className={style.main}
        >
          <div className={style.content}>
            <Search></Search>
            <Table columns={columns} dataSource={this.state.data} pagination={false} name={this.props.name} />
          </div>

        </Modal>

        }

      </div>
    );
  }
}


export default connect(null, {
  curdCurrentData,
})(ImportTable);
