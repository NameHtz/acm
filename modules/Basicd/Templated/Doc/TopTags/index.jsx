import React, {Component} from 'react'
import dynamic from 'next/dynamic'
import Search from '../../../../../components/public/Search'
import style from './style.less'
import DocAddForm from "../Add"

export class PlanDefineTopTags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roleBtnData: [
                {
                    id: 1,
                    name: 'AddTopBtn',
                    aliasName: '新增'
                },
                {
                    id: 2,
                    name: 'DeleteTopBtn',
                    aliasName: '删除'
                },
            ]
        }
    }
    handleCancel = () => {
        this.setState({
            modalVisible: false
        })
    }

    render() {
        let topTags = this.state.roleBtnData.map((v, i) => {
            return dynamic(
            import
            ('../../../../../components/public/TopTags/' + v.name)
            )
        })

        let showFormModal = (name) => {
            let that = this
            // 新增文档模板按钮
            if (name === 'AddTopBtn') {
                this.setState({
                    modalVisible: true
                })
            }
        }
        return (
            <div className={style.main}>
                <div className={style.search}>
                    <Search/>
                </div>
                <div className={style.tabMenu}>
                    {
                        topTags.map((Component, key) => {
                            return <Component key={key} onClickHandle={showFormModal}/>
                        })
                    }
                </div>
             {/*   <DocAddForm modalVisible={this.state.modalVisible} handleOk={this.handleOk}
                            handleCancel={this.handleCancel}></DocAddForm>*/}
                <DocAddForm modalVisible={this.state.modalVisible} handleOk={this.handleOk}
                         handleCancel={this.handleCancel}/>
            </div>
        )
    }
}

export default PlanDefineTopTags
