import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import { Modal, message, Button } from 'antd';
import emitter from '../../../../api/ev'
import Search from '../../../../components/public/Search'
import style from './style.less'
import AddTask from '../../Prepared/AddTask'
import AddWbs from '../../Prepared/AddWbs'
import Public from '../Public' //发布
import ImportPlanTemp from '../../Prepared/ImportPlanTemp' //导入计划模板

import Schedule from '../../Prepared/Schedule' //导入计划模板
import Gantt from '../../Prepared/Gantt' //导入计划模板

const confirm = Modal.confirm;

export class PlanChangeTopTags extends Component {
	constructor(props) {
		super(props)
		this.state = {
			roleBtnData: [
				{
					id: 1,
					name: 'SelectPlanTopBtn',
					aliasName: '选择计划'
				},
				{
					id: 2,
					name: 'WbssTopBtn',
					aliasName: 'WBS'
				},
				{
					id: 3,
					name: 'TasksTopBtn',
					aliasName: '任务'
				},
				{
					id: 4,
					name: 'MoveTDLRTopBtn',
					aliasName: '移动'
				},
				{
					id: 5,
					name: 'DeleteTopBtn',
					aliasName: '删除'
				},
				{
					id: 6,
					name: 'PublicsTopBtn',
					aliasName: '发布'
				},
				{
					id: 7,
					name: 'CancelChangesTopBtn',
					aliasName: '取消变更'
				},
				{
					id: 8,
					name: 'ToolTopBtn',
					aliasName: '工具'
				}
			],
			addTaskModalVisible: false,  //Task弹窗visiable
			addWbsModalVisible1: false,  //Wbs弹窗visiable
			publicModalVisible: false, //Public弹窗 visiable
			importPTModalVisiable: false, //ImportPlanTemp 弹窗visiable
			scheduleModalVisible: false, //Schedule 弹窗visiable
			ganttModalVisible: false, //Gantt 弹窗visiable

			topSelectBtnType: 0, //头部下拉标签key值
		}
	}

	//Task弹窗关闭
	handleTaskCancel = () => {
		this.setState({
			addTaskModalVisible: false
		})
	}

	//TWbs弹窗关闭
	handleWbsCancel = () => {
		this.setState({
			addWbsModalVisible: false
		})
	}

	//Release弹窗关闭
	handleReleaseCancel = () => {
		this.setState({
			releaseModalVisible: false
		})
	}

	//Public弹窗关闭
	handlePublicCancel = () => {
		this.setState({
			publicModalVisible: false
		})
	}

	//ImportPlanTemp弹窗关闭
	handleImportPTCancel = () => {
		this.setState({
			importPTModalVisiable: false
		})
	}

	// 进度设置关闭
	handleScheduleCancel = () => {
		this.setState({
			scheduleModalVisible: false
		})
	}

	// 进度设置关闭
	handleGanttCancel  = () => {
		this.setState({
			ganttModalVisible: false
		})
	}

	componentDidMount() {
		// 监听右侧
		this.eventEmitter = emitter.addListener('noticeRightOrTop', (data) => {
			if (data) {
				if (localStorage.getItem('name') == '计划变更' && data.event) {
					// 接收删除事件
					this.deleteTask = data.event.deleteTask
				}
			}
		})
	}

	deleteTask = () => {
		message.warning('请选中计划')
	}

	componentwillunmount() {
		emitter.removeListener(this.eventEmitter)
	}

	render() {
		let topTags = this.state.roleBtnData.map((v, i) => {
			return dynamic(import('../../../../components/public/TopTags/' + v.name))
		})

		// 显示添加AddTask表单 e为点击项对象
		let showFormModal = (name, e) => {
			// 删除
			if (name === 'DeleteTopBtn') {
				this.deleteTask()
			}

			// 新增任务AddTask
			if (name === 'TasksTopBtn') {
				this.setState({
					addTaskModalVisible: true
				})
			}
			// 新增任务AddWBS
			if (name === 'WbssTopBtn') {
				this.setState({
					addWbsModalVisible: true
				})
			}

			// 发布
			if (name === 'PublicTopBtn') {
				// e.key 1批准变更 2变更审批
				this.setState({
					publicModalVisible: true,
					topSelectBtnType: e.key
				})
			}

			//取消变更
			if(name === 'CancelChangesTopBtn') {
				confirm({
					title: '取消变更',
					okText: '确定',
					cancelText: '取消',
					content: '您确定取消变更？',
					onOk() {
						alert('变更成功')
					},
					onCancel() {},
				});
			}

			// 工具
			if (name === 'ToolTopBtn') {
				// e.key 1进度计划 2横道设置 3导入计划模板 4导出excel计划 5导出Project计划 6保存成计划模板
				if (e.key == 3) {
					this.setState({
						importPTModalVisiable: true,
						topSelectBtnType: e.key
					})
				}
				if(e.key == 1) {
					this.setState({
						scheduleModalVisible: true
					})
				}
				if(e.key == 2) {
					this.setState({
						ganttModalVisible: true
					})
				}
				if (e.key == 6) {
					confirm({
						title: '保存计划模板',
						okText: '确定',
						cancelText: '取消',
						content: '您确定保存成计划模板？',
						onOk() {
							alert('保存成功')
						},
						onCancel() {},
					});
				}

			}
		}
		return (
			<div className={style.main}>
				<div className={style.search}>
					<Search />
				</div>
				<div className={style.tabMenu}>
					{
						topTags.map((Component, i) => {
							return <Component key={i} onClickHandle={showFormModal} />
						})
					}
				</div>
				{/*计划编制->添加任务*/}
				<AddTask modalVisible={this.state.addTaskModalVisible} handleCancel={this.handleTaskCancel} />
				{/*计划编制->WBS*/}
				<AddWbs modalVisible={this.state.addWbsModalVisible} handleCancel={this.handleWbsCancel} />
				{/* 计划编制 -> 发布 */}
				<Public selectType={this.state.topSelectBtnType} modalVisible={this.state.publicModalVisible} handleCancel={this.handlePublicCancel} />
				{/* 计划编制 -> 导入计划模板 */}
				<ImportPlanTemp selectType={this.state.topSelectBtnType} modalVisible={this.state.importPTModalVisiable} handleCancel={this.handleImportPTCancel} />
				<Schedule modalVisible={this.state.scheduleModalVisible} handleCancel={this.handleScheduleCancel} />
				<Gantt modalVisible={this.state.ganttModalVisible} handleCancel={this.handleGanttCancel} />
			</div>
		)
	}
}

export default PlanChangeTopTags