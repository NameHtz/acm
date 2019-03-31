import React, {Component} from 'react'
import style from './style.less'
import AddInfo from '../AddInfo'
import { Modal, Button } from 'antd';


export class Add extends Component {
    constructor (props) {
        super (props)
        this.state = {
            title:'基本信息'
        }
    }

    render () {
        return (
            <div className={style.main}>
                <Modal
                    title={this.props.modelTitle}
                    visible={this.props.modalVisible}
                    onCancel={this.props.handleCancel}
                    footer= {null}
                    width="850px"
                    centered={true}
                    className={style.addFormInfo}
                    footer={ 
                        <div className="modalbtn">
                      
                        <Button key={3} onClick={this.handleSubmit} type="primary"  ghost>保存并继续</Button>
                        <Button key={2}  onClick={this.handleSubmit} type="primary" >保存</Button>
                        </div>
                    }
                >
                    <AddInfo />
            </Modal>
            </div>
        )
    }
}


export default Add