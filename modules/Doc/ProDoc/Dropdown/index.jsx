import React, { Component } from 'react'
import style from './style.less'
import { Modal, Button, Icon } from 'antd'


class Drop extends Component {

    componentDidMount(){
       
    }

    handleCancel(){
        this.props.handleCancel
    }

    click = (v, id)=>{
        this.props.handleCancel(v, id)
    }

    render() {
        const X = this.props.X;
        const Y = this.props.Y;
        return (
            <div >

                <Modal
                    className={style.main}
                    width='150px'
                    maskClosable={true}
                    forceRender={true}
                    mask={false} closable={false}
                    style={{ top: Y, left: X }}
                    visible={this.props.visible}
                    onCancel={this.props.handleCancel}
                    footer={null}
                    bodyStyle={{padding: 0}}
                >
                    <p onClick={this.click.bind(this, 'exdandDoc', this.props.rowKey)} ><Icon type="highlight" /> 展开文件夹</p>
                    <p onClick={this.click.bind(this, 'mangageDoc')} ><Icon type="delete" /> 管理文件夹</p>
                </Modal>
            </div>
        )
    }
}

export default Drop