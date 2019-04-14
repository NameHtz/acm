import React, {Component} from 'react'
import style from './style.less'
import EditMeetTem from '../EditMeetTem'
import FeedBackTem from '../FeedBackTem'
import { Modal, Button} from 'antd';
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
        // this.props.handleCancel()
    }
    handleCancel = () => {
        this.setState({visible: false,},()=>{console.log( this.state.flag );});
        this.props.onCancel();
    }
    componentDidMount(){
        console.log(this.props)
    }
    getEdirMeetTem = (val)=>{
        console.log(val)
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
                    // footer={ 
                    //     <div className="modalbtn">
                    //     <Button key={2}  onClick={this.handleCancel} >关闭</Button>
                    //     <Button key={3} onClick={this.handleOk} type="primary">保存</Button>
                    //     </div>
                    // }
                >
                    {flag=="新增会议行动项" || flag =="修改会议行动项" ? <EditMeetTem handleCancel={this.handleCancel}  flag={flag}/>:
                        <FeedBackTem/>}
            </Modal>
            </div>
        )
    }
}


export default Add