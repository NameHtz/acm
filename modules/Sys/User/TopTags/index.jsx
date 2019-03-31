import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import style from './style.less';
import Search from '../../../../components/public/Search';
import AddInfoModel from '../AddInfoModel'; // 新增用户弹窗
import BatchAddModel from '../BatchAddModel'; //批量新增用户
import { notification } from 'antd';
import axios from "../../../../api/axios"
export class SysUserTopTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,  // 控制新增员工弹窗
      batchVisible: false,   // 控制批量新增员工弹窗
      roleBtnData: [
        {
          id: 1,
          name: 'AddUserTopBtn',
          aliasName: '新增用户',
        },
        {
          id: 2,
          name: 'AddUserGroupTopBtn',
          aliasName: '批量新增用户',
        },
        {
          id: 3,
          name: 'ResetPwdTopBtn',
          aliasName: '重置密码',
        },
        {
          id: 4,
          name: 'LockUserTopBtn',
          aliasName: '锁定用户',
        },
        {
          id: 5,
          name: 'UnlockUserTopBtn',
          aliasName: '解锁用户',
        },
        {
          id: 6,
          name: 'DeleteTopBtn',
          aliasName: '删除',
        },

      ],
    };
  }

  // 新增用户modal取消
  handleCancel = () => {
    this.setState({
      modalVisible: false,

    });
  };

  // 批量新增Model取消
  cancelBacth = () => {
    this.setState({
      batchVisible: false,
    });
  };

  render() {
    let topTags = this.state.roleBtnData.map((v, i) => {
      return dynamic(import('../../../../components/public/TopTags/' + v.name));
    });
    // 显示新增用户弹窗
    let onClickHandle = (name) => {
      if (name == "AddUserTopBtn") {
        this.setState({
          modalVisible: true,
        });
        return
      }
      if (name == "AddUserGroupTopBtn") {
        this.setState({
          batchVisible: true,
        });
        return
      }
      if (!this.props.data) {
        notification.error(
          {
            placement: 'bottomRight',
            bottom: 50,
            duration: 1,
            message: '警告',
            description: '没有选择用户！'
          }
        )
        return
      } else {
        let idArray = this.props.data.map(item => item.id)
        if (name == "ResetPwdTopBtn") {
          axios.post("api/sys/user/reset/password", idArray, true).then(res => {

          })
          return
        }
        if (name == "LockUserTopBtn") {

          let idArray =[]
           this.props.data.forEach(item => {
            if (item.status.id == 1) {
              idArray.push(item.id)
            }
          })
          console.log(idArray)
          if(idArray.length==0){
            notification.error(
              {
                placement: 'bottomRight',
                bottom: 50,
                duration: 1,
                message: '警告',
                description: '没有要锁定的用户！'
              }
            )
            return
          }
          axios.post("api/sys/user/lock", idArray, true).then(res => {

            this.props.refresh()
          })
          return
        }
        if (name == "UnlockUserTopBtn") {
          let idArray =[]
          this.props.data.forEach(item => {
           if (item.status.id == 0) {
             idArray.push(item.id)
           }
         })
          if(idArray.length==0){
            notification.error(
              {
                placement: 'bottomRight',
                bottom: 50,
                duration: 1,
                message: '警告',
                description: '没有要解锁的用户！'
              }
            )
            return
          }
          axios.post("api/sys/user/unlock", idArray, true).then(res => {

            this.props.refresh()
          })
          return
        }
        if (name == "DeleteTopBtn") {
          let idArray=this.props.data.map(item=>item.id)
          axios.deleted("api/sys/user/delete", { data:idArray},true).then(res => {
          
            this.props.deleteData()
          })
          return
        }
      }

    };
    // // 显示批量新增用户弹窗
    // let showBatchModel = () => {
    //   this.setState({
    //     batchVisible: true,
    //   });
    // };
    return (
      <div className={style.main}>
        <div className={style.search}>
          <Search search={this.props.search}/>
        </div>
        <div className={style.tabMenu}>
          {
            topTags.map((Component, i) => {
              return <Component key={i} onClickHandle={onClickHandle} />;
            })
          }
        </div>

        {/* 新增员工 */}
        <AddInfoModel modalVisible={this.state.modalVisible} handleOk={this.handleOk}
          handleCancel={this.handleCancel} addBasicUser={this.props.addBasicUser} />

        {/* 批量新增用户 */}
        <BatchAddModel batchVisible={this.state.batchVisible} cancelBacth={this.cancelBacth} refresh={this.props.refresh} />
      </div>
    );
  }
}

export default SysUserTopTags;
