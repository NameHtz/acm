import React, {Component} from 'react'
import { Modal, Button} from 'antd';
import style from './style.less'
import EditDevTem from '../EditDevTem'

class Add extends Component {
    constructor (props) {
        super (props)
        this.state = {
            visible:false,
        }
    }
    handleOk = (e) => {
        this.setState( {visible: false,
                       } );
        this.props.handleCancel()
    }
    handleCancel = (e) => {
        this.setState({visible: false,},()=>{console.log( this.state.flag );});
        this.props.onCancel();
    }

    render () {
        const flag=this.props.title;
        return (
          <div className={style.main}>
              <Modal
                title={this.props.title}
                visible={this.props.visible}
                onCancel={this.handleCancel}
                footer= {null}
                width="850px"
                centered={true}
                className={style.addFormInfo}
                footer={
                    <div className='modalbtn'>
                    <Button key="submit2" type="primary" onClick={this.props.handleCancel}>保存并继续</Button>
                    <Button key="submit3" type="primary" onClick={this.props.onCancel}>关闭</Button>
                    </div>
                }
              >

                <EditDevTem />
              </Modal>
          </div>
        )
    }
}


export default Add