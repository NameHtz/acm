import React, { Component } from 'react';
import intl from 'react-intl-universal';
import { Table, notification, Modal } from 'antd';
import style from './style.less';
import dynamic from 'next/dynamic';
import AddTopBtn from '../../../../components/public/TopTags/AddTopBtn';
import ModifyTopBtn from '../../../../components/public/TopTags/ModifyTopBtn';
import DeleteTopBtn from '../../../../components/public/TopTags/DeleteTopBtn';
import PermissionModal from '../PermissionModal';
import axios from '../../../../api/axios'
import { funcFuncs, funcDel } from '../../../../api/api'

const confirm = Modal.confirm;
const locales = {
  'en-US': require('../../../../api/language/en-US.json'),
  'zh-CN': require('../../../../api/language/zh-CN.json'),
};

class Permission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initDone: false,
      isShowModal: false,
      activeIndex: '',
      record: '',
      selectData: null,
      addOrModify: 'add',//新增或修改
      modalTitle: null,
      data: [],
    };
  }
  //请求接口函数
  reqFun = () => {
    axios.get(funcFuncs(this.props.data.id)).then(res => {
      // console.log(res)
      this.setState({
        data: res.data.data
      })
    })
  }

  componentDidMount() {

    this.reqFun()

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

  onClickHandle = (name) => {
    if (name == 'AddTopBtn') {
      this.setState({
        isShowModal: true,
        addOrModify: 'add',
        modalTitle: '新增权限配置',
      });
    }
    if (name == 'ModifyTopBtn') {
      if (!this.state.activeIndex) {
        notification.warning(
          {
            placement: 'bottomRight',
            bottom: 50,
            duration: 2,
            message: '未选中数据',
            description: '请选择数据进行操作'
          }
        )
      } else {
        this.setState({
          isShowModal: true,
          addOrModify: 'modify',
          modalTitle: '修改权限配置',
        });
      }
    }
    if (name == 'DeleteTopBtn') {
      if (!this.state.activeIndex) {
        notification.warning(
          {
            placement: 'bottomRight',
            bottom: 50,
            duration: 2,
            message: '未选中数据',
            description: '请选择数据进行操作'
          }
        )
      } else {
        if (this.state.record) {

          var id = this.state.record.id
          axios.deleted(funcDel, { data: [id] }, true).then(res => {
            //删除
            let index = this.state.data.findIndex(v => v.id == id)

            this.setState((preState, props) => ({
              data: [...preState.data.slice(0, index), ...preState.data.slice(index + 1)]
            }))

          })
        }


      }
    }
  };
  //更新
  updateSuccess = (data) => {
    let index = this.state.data.findIndex(v => v.id == data.id)
    this.setState((preState, props) => ({
      data: [...preState.data.slice(0, index), data, ...preState.data.slice(index + 1)],
    }))
  }

  getInfo = (record, index) => {
    let id = record.id;
    if (this.state.activeIndex == id) {
      this.setState({
        activeIndex: null,
        selectData: null,
        addOrModify: 'add',
      });
    } else {
      this.setState({
        activeIndex: id,
        selectData: record,
        record: record
      });
    }

  };

  closePermissionModal = (v) => {
    if (v) {
      this.setState({
        isShowModal: false,
        data: [v, ...this.state.data]
      });
    } else {
      this.setState({
        isShowModal: false
      });
    }


  };
  setClassName = (record, index) => {
    //判断索引相等时添加行的高亮样式
    return record.id === this.state.activeIndex ? `${style['clickRowStyl']}` : '';
  };

  render() {
    const columns = [
      {
        title: intl.get('wsd.i18n.sys.menu.menuname'),
        dataIndex: 'funcName',
        key: 'funcName',
      },
      {
        title: intl.get('wsd.i18n.sys.menu.menucode'),
        dataIndex: 'funcCode',
        key: 'funcCode',
      },
      {
        title: intl.get('wsd.i18n.sys.menu.active'),
        dataIndex: 'del',
        key: 'del',
        render: (text) => <span>{text.id == 0 ? '未激活' : '激活'}</span>
      },
      {
        title: intl.get('wsd.i18n.sys.menu.creattime'),
        dataIndex: 'creatTime',
        key: 'creatTime',
      },
      {
        title: intl.get('wsd.i18n.sys.menu.lastuptime'),
        dataIndex: 'lastUpdTime',
        key: 'lastUpdTime',
      },

    ];
    // const rowSelection = {
    //     onChange: (selectedRowKeys, selectedRows) => {
    //         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //     },
    //     onSelect: (record, selected, selectedRows) => {
    //         console.log(record, selected, selectedRows);
    //     },
    //     onSelectAll: (selected, selectedRows, changeRows) => {
    //         console.log(selected, selectedRows, changeRows);
    //     },
    // };

    return (
      <div className={style.main}>
        {this.state.initDone &&
          <div className={style.mainHeight}>
            <h3 className={style.listTitle}>权限配置</h3>
            <div className={style.rightTopTogs}>
              <AddTopBtn onClickHandle={this.onClickHandle.bind(this)} />
              <ModifyTopBtn onClickHandle={this.onClickHandle.bind(this)} />
              <DeleteTopBtn onClickHandle={this.onClickHandle.bind(this)} />
              {this.state.isShowModal &&
                <PermissionModal
                  visible={this.state.isShowModal}
                  handleCancel={this.closePermissionModal.bind(this)}
                  title={this.state.modalTitle}
                  addOrModify={this.state.addOrModify}
                  data={this.state.addOrModify == 'add' ? this.props.data : this.state.record}
                  updateSuccess={this.updateSuccess}
                />}
            </div>
            <div className={style.mainScorll}>
              <Table className={style.table} rowKey={record => record.id} columns={columns} dataSource={this.state.data} pagination={false}
                name={this.props.name}
                // rowSelection={rowSelection}
                rowClassName={this.setClassName}
                onRow={(record, index) => {
                  return {
                    onClick: (event) => {
                      this.getInfo(record, index);
                    },
                  };
                }
                } />
            </div>
          </div>}
      </div>
    );
  }
}

export default Permission;
