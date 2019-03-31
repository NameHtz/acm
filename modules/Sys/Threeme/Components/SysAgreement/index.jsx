import React, { Component } from 'react'
import style from './style.less'
import { Icon, Button, Tooltip, Modal, Row, Col } from 'antd';
import axios from "../../../../../api/axios"
import {tmmOpen} from "../../../../../api/api"
export class SysAgreement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isagree: false
        }
    }
    //开启权限
    openOption=()=>{
        axios.get(tmmOpen(1),null,true).then(res=>{
            this.props.ishasagree()
        })
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
        axios.get(tmmOpen(0),null,true).then(res=>{
            this.props.ishasagree()
        })
     
    }

    handleCancel = (e) => {
      
        this.setState({
            visible: false,
        });
    }
    render() {
        const text = <span style={{ color: '#3c8dff' }}>退出管理</span>;
        return (

            <div className={style.main}>
                {this.props.isagree &&
                    <span className={style.agreementExit}>
                        <Tooltip placement="left" title={text} className={style.tip}>
                            <Icon type="poweroff" style={{ fontSize: 15, color: '#3c8dff' }} onClick={this.showModal} />
                        </Tooltip>
                        <Modal
                            title="退出三员管理"
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            footer={ 
                                <div className="modalbtn">
                                 <Button key={3} onClick={this.handleOk} type="primary">确定</Button>
                                <Button key={2}  onClick={this.handleCancel} >取消</Button>
                                </div>
                            }
                        >
                            <div className={style.tiptext}>
                                <h3>您确定退出三员管理吗？</h3>
                                <p>退出三员管理后，将无法保证涉密信息系统保密管理，
                                增加系统泄密风险。</p>
                            </div>

                        </Modal>
                    </span>}
                <div className={style.agreementAccredit}>
                    <Row>
                        <Col span={10} offset={7}>

                            <div className={style.agreementAccept}>
                                <img src="/static/images/members.png" />
                                <div className={style.setroleRules}>
                                    <p>按《保密》要求，需要设置系统管理员、安全保密管理员、安全审计员。</p>
                                    <p>职责：</p>
                                    <p>1.系统管理员，负责用户入职、离职、用户登录/登出日志跟踪</p>
                                    <p>2.安全保密管理员，负责角色管理、用户权限分配，并提交给审核</p>
                                    <p>3.安全审计员，审核安全保密管理员权限操作，同意后才能生效</p>
                                </div>
                                {!this.props.isagree &&
                                    <Button type="primary" block size="large" onClick={this.openOption}>三员授权管理开始</Button>
                                }
                                {
                                    this.props.isagree &&
                                    <div className={style.agreementIcon}>
                                        <Icon type="check" />
                                        <span><strong>您已开通三员管理</strong></span>
                                    </div>
                                }

                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default SysAgreement