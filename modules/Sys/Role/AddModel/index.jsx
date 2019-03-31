import React, {Component} from 'react'
import style from './style.less'
import RoleInfo from './../RoleInfo'
import { Modal, Button } from 'antd';


export class RoleAddModel extends Component {
    constructor (props) {
        super (props)
        this.state = {
            title:'新增顶级机构'
        }
    }
  addSuccess=(data)=>{
    this.props.addSuccess(data)
  }
    render () {

      // console.log(this.props.rightData)
        return (
            <div className={style.main}>
                <Modal
                title={this.props.modelTitle}
                visible={this.props.roleVisible}
                onCancel={this.props.handleCancel}
                footer= {null}
                width="850px"
                centered={true}
                className={style.addFormInfo}
                >
                   <RoleInfo addSuccess={this.addSuccess} parentData={this.props.rightData} api={'add'}/>
                </Modal>
            </div>
        )
    }
}


export default RoleAddModel
