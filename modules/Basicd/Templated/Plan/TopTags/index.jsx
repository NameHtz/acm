import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import Search from '../../../../../components/public/Search/index'
import style from './style.less'
import AddTask from '../AddTask'
import AddWbs from '../AddWbs'
import AddTemplate from "../AddTemplate"
export class BasicdTemplatePlanTopTags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roleBtnData: [
                {
                    id: 5,
                    name: 'NewTemplateBtn',
                    aliasName: '新增模板'
                },
                {
                    id: 1,
                    name: 'WbsTopBtn',
                    aliasName: 'WBS'
                },
                {
                    id: 2,
                    name: 'TaskTopBtn',
                    aliasName: '任务'
                },
                {
                    id: 3,
                    name: 'DeleteTopBtn',
                    aliasName: '删除'
                },
                {
                    id: 4,
                    name: "ImportTopBtn",
                    aliasName: '导入'
                }

            ],
            modalVisible: false,
            modalVisible1: false
        }
    }

    handleCancel = () => {
        this.setState({
            modalVisible: false
        })
    };
    handleCancelWbs = () => {
        this.setState({
            modalVisible1: false
        })
    };
    handleCancelTemplate = () => {
        this.setState({
            modalVisible2: false
        })
    };
    render() {
        console.log('11111111');

        let topTags = this.state.roleBtnData.map((v, i) => {
            return dynamic(
                import('../../../../../components/public/TopTags/' + v.name))
        })



        // 显示添加AddTask表单
        let showFormModal = (name) => {
            console.log(name);
            let that = this;
            // 新增任务AddTask
            if (name === 'TaskTopBtn') {
                this.setState({
                    modalVisible: true
                })
                return
            }
            // 新增任务AddWBS
            if (name === 'WbsTopBtn') {
                this.setState({
                    modalVisible1: true
                })
                return
            }
             // 新增模板
             if (name === 'NewTemplateBtn') {
                this.setState({
                    modalVisible2: true
                })
                return
            }
        }

        return (
            <div className={style.main}>
                {/*搜索框*/}
                <div className={style.search}>
                    <Search />
                </div>
                <div className={style.tabMenu}>
                    {
                        topTags.map((Component, key) => {
                            return <Component key={key} onClickHandle={showFormModal} />
                        })
                    }
                </div>
                {/*计划模板->添加任务*/}
                <AddTask modalVisible={this.state.modalVisible} handleOk={this.handleOk}
                    handleCancel={this.handleCancel} />
                {/*计划模板->WBS*/}
                <AddWbs modalVisible={this.state.modalVisible1} handleOk={this.handleOk}
                    handleCancel={this.handleCancelWbs} />
                {/*新增模板*/}
                <AddTemplate modalVisible={this.state.modalVisible2} handleOk={this.handleOk}
                    handleCancel={this.handleCancelTemplate} />
            </div>)
    }
}

export default BasicdTemplatePlanTopTags
