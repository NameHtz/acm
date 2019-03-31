import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import { Modal, message } from 'antd';
import { connect } from 'react-redux';
import { curdCurrentData } from '../../../../store/curdData/action';
import Search from '../../../../components/public/Search';
import AddForm from '../Add/index';
import style from './style.less';
import axios from '../../../../api/axios';
import { menuAdd, menuDelete, menuSearch } from '../../../../api/api';

// import AddTopBtn  from '../../../../components/public/TopTags/AddTopBtn'
// import DeleteTopBtn  from '../../../../components/public/TopTags/DeleteTopBtn'
// import MoveTDTopBtn  from '../../../../components/public/TopTags/MoveTDTopBtn'

const confirm = Modal.confirm;
const roleBtnData = [
  {
    id: 1,
    name: 'AddTopBtn',
    aliasName: '新增',
  },
  {
    id: 2,
    name: 'DeleteTopBtn',
    aliasName: '删除',
  }];

const topTags = roleBtnData.map((v, i) => {
  return dynamic(import('../../../../components/public/TopTags/' + v.name));
});

export class PlanDefineTopTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      delModalVisible: false,
      noticeData: '',
      planDefineSelectData: [],
      type: '',
    };
  }


  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  // success = (value) => {
  // var obj = {};
  // obj.status = 'add';
  // obj.data = data;
  // if (this.state.noticeData.id) {           //判断是否有节点ID
  //   obj.rid = this.state.noticeData.id;
  // }
  // };

  btnClicks = (v, type) => {
    const { delSuccess, record } = this.props;
    switch (v) {
      case 'AddTopBtn':
        this.setState({
          modalVisible: true,
          type: 'ADD',
        });
        break;
      case 'DeleteTopBtn':
        if (record) {
          axios.deleted(menuDelete, { data: [record.id] }, true).then(res => {
            delSuccess();
          }).catch(err => {
          });
        } else {
          notification.warning(
            {
              placement: 'bottomRight',
              bottom: 50,
              duration: 2,
              message: '未选中数据',
              description: '请选择数据进行操作'
            }
          )
        }
        // record ? confirm({
        //   title: '删除',
        //   content: '您确认要删除 菜单?',
        //   onOk() {
        //     return new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         axios.post(menuDelete, [record.id]).then(res => {
        //           delSuccess();
        //           return resolve();
        //         }).catch(err => reject());
        //       }, 0);
        //     });
        //   },
        //   onCancel() {
        //   },
        // }) : message.warning('请选择数据');
        break;
      case 'MoveTDTopBtn':
      default:
        return;
    }
  };

  submit = (values) => {
    console.log('this.props.record', this.props.record)
    const data = {
      ...values,
      share: values.share ? 1 : 0,
      hidden: values.hidden ? 1 : 0,
      isMenu: values.isMenu ? 1 : 0,
      active: values.active ? 1 : 0,
      parentId: this.props.record && this.props.record.id ? this.props.record.id : 0,
    };
    console.log(data);
    axios.post(menuAdd, data, true).then(res => {

      if (res.data.status === 200) {
        // message.success('新增成功');
        // data.id = res.data.data.id;
        // this.props.curdCurrentData({
        //   title: localStorage.getItem('name'),
        //   status: 'add',
        //   data: data,
        // });
        this.handleCancel();
        this.props.success(res.data.data);
      }

    });
  };

  //搜索
  search = (val) => {
    axios.get(menuSearch+`?searcher=${val}`).then(res=>{
      // console.log(res)
      this.props.search(res.data.data)
    })
  }

  render() {
    const { modalVisible } = this.state;

    return (
      <div className={style.main}>
        <div className={style.search}>
          <Search search={this.search} />
        </div>
        <div className={style.tabMenu}>
          {
            topTags.map((Component, i) => {
              return <Component key={i} onClickHandle={this.btnClicks} />;
            })
          }
        </div>

        <AddForm
          modalVisible={modalVisible}
          success={this.props.success}
          submit={this.submit.bind(this)}
          handleCancel={this.handleCancel.bind(this)} />
      </div>

    );
  }
}

export default PlanDefineTopTags;

// export default connect(state =>
//   state, {
//   curdCurrentData,
// })(PlanDefineTopTags);
