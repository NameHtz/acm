import React, { Component } from 'react'
import style from './style.less'
import { Modal, Button, Icon } from 'antd'


class Drop extends Component {

    componentDidMount() {

    }

    handleCancel() {
        this.props.handleCancel
    }

    click = (v) => {
        this.props.handleCancel(v)
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
                    bodyStyle={{ padding: 0 }}
                >
                    <p><Icon type="highlight" /> 修改</p>
                    <p><Icon type="delete" /> 删除</p>
                    <p><Icon type="plus-circle" /> 新增文件夹</p>
                    <p onClick={this.click.bind(this, 'temToImport')} ><Icon type="delete" /> 模板导入</p>
                </Modal>
            </div>
        )
    }
}

export default Drop