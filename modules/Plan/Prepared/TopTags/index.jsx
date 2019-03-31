import React, { Component } from 'react'
import dynamic from 'next/dynamic'
import { Modal, message } from 'antd';
import emitter from '../../../../api/ev'
import Search from '../../../../components/public/Search'
import style from './style.less'
import AddTask from '../AddTask'
import AddWbs from '../AddWbs'
import Release from '../Release' //下达
import Reported from '../Reported' //上报
import Public from '../Public' //发布
import ImportPlanTemp from '../ImportPlanTemp' //导入计划模板
import Schedule from '../Schedule' //进度设置
import Gantt from '../Gantt' //横道设置

const confirm = Modal.confirm;

export class PlanPreparedTopTags extends Component {
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
					name: 'ReleaseTopBtn',
					aliasName: '下达'
				},
				{
					id: 7,
					name: 'ReportedTopBtn',
					aliasName: '上报'
				},
				{
					id: 8,
					name: 'PublicTopBtn',
					aliasName: '发布'
				},
				{
					id: 9,
					name: 'ToolTopBtn',
					aliasName: '工具'
				}
			],
			addTaskModalVisible: false,  //Task弹窗visiable
			addWbsModalVisible1: false,  //Wbs弹窗visiable
			releaseModalVisible: false, //Release弹窗visiable
			reportedModalVisible: false, //Reported弹窗visiable
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

	//Release弹窗关闭
	handleReleaseCancel = () => {
		this.setState({
			releaseModalVisible: false
		})
	}

	//Reported弹窗关闭
	handleReportedCancel = () => {
		this.setState({
			reportedModalVisible: false
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
			if(data) {
				if(localStorage.getItem('name') == '计划编制' && data.event) {
					// 接收删除事件
					this.deleteTask = data.event.deleteTask
				}
			}
        })
	}

	deleteTask = () => {
		// message.warning('请选中计划')
		confirm({
			title: '删除',
			okText: '确定',
			cancelText: '取消',
			content: '您确定要删除计划？',
			onOk() {
				alert('删除成功')
			},
			onCancel() { },
		});
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

			// 下达
			if (name === 'ReleaseTopBtn') {
				this.setState({
					releaseModalVisible: true
				})
			}

			// 上报
			if (name === 'ReportedTopBtn') {
				this.setState({
					reportedModalVisible: true
				})
			}

			// 发布
			if (name === 'PublicTopBtn') {
				// e.key 1发布计划 2发布审批
				this.setState({
					publicModalVisible: true,
					topSelectBtnType: e.key
				})
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
						onCancel() { },
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
				{/* 计划编制 -> 下达 */}
				<Release modalVisible={this.state.releaseModalVisible} handleCancel={this.handleReleaseCancel} />
				{/* 计划编制 -> 上报 */}
				<Reported modalVisible={this.state.reportedModalVisible} handleCancel={this.handleReportedCancel} />
				{/* 计划编制 -> 发布 */}
				<Public selectType={this.state.topSelectBtnType} modalVisible={this.state.publicModalVisible} handleCancel={this.handlePublicCancel} />
				{/* 计划编制 -> 导入计划模板 */}
				<ImportPlanTemp selectType={this.state.topSelectBtnType} modalVisible={this.state.importPTModalVisiable} handleCancel={this.handleImportPTCancel} />
				{/* 计划编制 -> 进度设置 */}
				<Schedule modalVisible={this.state.scheduleModalVisible} handleCancel={this.handleScheduleCancel} />
				<Gantt modalVisible={this.state.ganttModalVisible} handleCancel={this.handleGanttCancel} />
			</div>
		)
	}
}

export default PlanPreparedTopTags