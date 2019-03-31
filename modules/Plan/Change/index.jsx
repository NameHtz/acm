import React, { Component } from 'react'
import { Modal, message } from 'antd';
import TopTags from './TopTags/index'
import RightTags from '../../../components/public/RightTags/index'
import style from './style.less'

import { connect } from 'react-redux'
import store from '../../../store'
import { saveCurrentData, resetRightCurrentData } from '../../../store/rightData/action'
import { curdCurrentData, resetCurrentData } from '../../../store/curdData/action'
import { changeLocaleProvider } from '../../../store/localeProvider/action'

let gantt = new CreateGantt();
const confirm = Modal.confirm;

export class PlanChange extends Component {
	constructor(props) {
		super(props)
		this.state = {
			contentWidth: '',
			borderLeft: '',
			left: '',
			ganttHeight: '',
			currentData: {}, //选中行数据
			activeIndex: "",
			rightData: [],
			rightTags: [
				{ icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Plan/Change/Info' },
				{ icon: 'iconiconziyuan6', title: '资源计划', fielUrl: 'Plan/Components/ResPlan' },
				{ icon: 'iconjiaofuqingdan', title: '交付清单', fielUrl: 'Plan/Change/DeliveryList' },
				{ icon: 'iconguanxitu', title: '逻辑关系', fielUrl: 'Plan/Components/Logic' },
				{ icon: 'iconbiangengjishi', title: '变更记事', fielUrl: 'Plan/Prepared/ChangeInfo' },
				{ icon: 'iconliuchengxinxi', title: '流程信息', fielUrl: 'Plot/Approval/Process' }, //原来是 Components/Process
			],
			rightTag: [
				{
					id: 0, list: [
						{ icon: 'right-square', title: '基本信息', fielUrl: 'Plan/Change/Info' },
						{ icon: 'right-square', title: '资源计划', fielUrl: 'Plan/Components/ResPlan' },
						{ icon: 'right-square', title: '交付清单', fielUrl: 'Components/DeliveryList' },
						{ icon: 'right-square', title: '逻辑关系', fielUrl: 'Plan/Components/Logic' },
						{ icon: 'right-square', title: '变更记事', fielUrl: 'Plan/Prepared/ChangeInfo' },
						{ icon: 'right-square', title: '流程信息', fielUrl: 'Plot/Approval/Process' }, //原来是 Components/Process
					]
				}
			],
		}

		store.subscribe(() => {
			let storeState = store.getState();
			if (localStorage.getItem('name') == storeState.curdData.title) {
				if (storeState.curdData.status != '') {
					this.curdData(storeState.curdData.status, storeState.curdData.data)
				}
			}
		})
	}

	/**
     * curd data数据
     * @param {*} status curd
     * @param {*} data curd
     */
	curdData = (status, data) => {
		// 新增
		if (status == 'add') {
			alert(JSON.stringify(data))
		}

		// 修改
		if (status == 'update') {
			alert(JSON.stringify(data))
		}

		// 删除
		if (status == 'delete') {
			alert(JSON.stringify(data))
		}
		this.props.resetCurrentData()
		//let tempData
		// this.setState({
		//     width: this.props.width,
		//     data: tempData
		// })
	}

	componentDidMount() {
		let h = document.documentElement.clientHeight || document.body.clientHeight;   //浏览器高度，用于设置gantt高度作用
		let w = document.documentElement.clientWidth / 2 || document.body.clientWidth / 2; //右侧弹出框高度
		this.setState({
			contentWidth: w - 41,
			borderLeft: w,
			left: w,
			ganttHeight: h - 200
		})
		// 实例化gantt，将gantt赋值到state中，以便全局操作，获取gantt。
		gantt.setStyle("width:100%; height:100%;");
		gantt.setMultiSelect(true);
		$.ajax({
			url: "/static/plugin/plusgantt/demo/data/taskList-temp.txt",
			cache: false,
			success: function (text) {
				var data = mini.decode(text);
				console.log(data)
				//列表转树形
				data = mini.arrayToTree(data, "children", "UID", "ParentTaskUID");
				//console.log(data)
				gantt.loadTasks(data);
				gantt.unmask();
				gantt.render(document.getElementById('ganttCt2'));
				gantt.setRowHeight(gantt.rowHeight + 25)
				// 开启只读模式
				gantt.setReadOnly(true);
			}
		});

		/* -------------以下进行自定义列------------- */
		let columns = []
		//String => 名称
		let ganttColumn = {
			name: "name",
			header: "名称<br/>String",
			field: "name",
			width: 260,
			editor: {
				type: "textbox"
			}
		};
		columns.push(ganttColumn);

		//String => 代码
		let ganttColumn2 = {
			name: "code",
			header: "代码<br/>String",
			field: "code",
			width: 80,
			editor: {
				type: "textbox"
			}
		};
		columns.push(ganttColumn2);

		//String => 责任主体
		let ganttColumn3 = {
			name: "orgName",
			header: "责任主体<br/>String",
			field: "orgName",
			width: 80,
			editor: {
				type: "textbox"
			}
		};
		columns.push(ganttColumn3);

		//String => 责任人
		let ganttColumn4 = {
			name: "userName",
			header: "责任人<br/>String",
			field: "userName",
			width: 80,
			editor: {
				type: "textbox"
			}
		};
		columns.push(ganttColumn4);

		//Date => 计划开始时间
		let ganttColumn5 = {
			header: "计划开始时间<br/>Date",
			field: "Start",
			width: 100,
			renderer: function (e) {
				var date = e.value;
				if (!date) return "";
				//return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
				return date
			},
			editor: {
				type: "datepicker"
			}

		};
		columns.push(ganttColumn5);

		//Date => 计划完成时间
		let ganttColumn6 = {
			header: "计划完成时间<br/>Date",
			field: "Finish",
			width: 100,
			renderer: function (e) {
				var date = e.value;
				if (!date) return "";
				//return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
				return date
			},
			editor: {
				type: "datepicker"
			}

		};
		columns.push(ganttColumn6);

		//String => 计划工期
		let ganttColumn7 = {
			name: "oldDay",
			header: "计划工期<br/>String",
			field: "oldDay",
			width: 80,
			editor: {
				type: "textbox"
			}
		};
		columns.push(ganttColumn7);

		//String => 计划工时
		let ganttColumn8 = {
			name: "wartingDay",
			header: "计划工时<br/>String",
			field: "wartingDay",
			width: 100,
			editor: {
				type: "textbox"
			}
		};
		columns.push(ganttColumn8);

		//String => 计划类型
		let ganttColumn11 = {
			name: "planType",
			header: "计划类型<br/>String",
			field: "planType",
			width: 80,
			editor: {
				type: "textbox"
			}
		};
		columns.push(ganttColumn11);

		//String => 计划级别
		let ganttColumn12 = {
			name: "planLever",
			header: "计划级别<br/>String",
			field: "planLever",
			width: 80,
			editor: {
				type: "textbox"
			}
		};
		columns.push(ganttColumn12);

		//String => 作业类型
		let ganttColumn13 = {
			name: "jobType",
			header: "作业类型<br/>String",
			field: "jobType",
			width: 80,
			editor: {
				type: "textbox"
			}
		};
		columns.push(ganttColumn13);

		//String => 工期类型
		let ganttColumn14 = {
			name: "durationType",
			header: "工期类型<br/>String",
			field: "durationType",
			width: 120,
			editor: {
				type: "textbox"
			}
		};
		columns.push(ganttColumn14);

		//CheckBoxColumn => 控制账户
		let ganttColumn15 = {
			header: "控制账户<br/>Boolean",
			field: "controlAccount",
			width: 70,
			type: "checkboxcolumn",
			trueValue: 1,
			falseValue: 0
		};
		columns.push(ganttColumn15);

		//String => 创建人
		let ganttColumn16 = {
			name: "creator",
			header: "创建人<br/>String",
			field: "creator",
			width: 80,
			editor: {
				type: "textbox"
			}
		};
		columns.push(ganttColumn16);

		//Date => 创建日期
		let ganttColumn17 = {
			header: "创建日期<br/>Date",
			field: "creattime",
			width: 100,
			renderer: function (e) {
				var date = e.value;
				if (!date) return "";
				//return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
				return date
			},
			editor: {
				type: "datepicker"
			}

		};
		columns.push(ganttColumn17);

		//String => 发布人
		let ganttColumn18 = {
			name: "publictor",
			header: "发布人<br/>String",
			field: "publictor",
			width: 100,
			editor: {
				type: "textbox"
			}
		};
		columns.push(ganttColumn18);

		//Date => 发布日期
		let ganttColumn19 = {
			header: "发布日期<br/>Date",
			field: "publicTime",
			width: 100,
			renderer: function (e) {
				var date = e.value;
				if (!date) return "";
				//return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
				return date
			},
			editor: {
				type: "datepicker"
			}

		};
		columns.push(ganttColumn19);

		//String => 计划状态
		let ganttColumn20 = {
			name: "status",
			header: "发布人<br/>String",
			field: "status",
			width: 100,
			editor: {
				type: "textbox"
			}
		};
		columns.push(ganttColumn20);

		//String => 变更类型
		let ganttColumn21 = {
			name: "changeType",
			header: "变更类型<br/>String",
			field: "changeType",
			width: 100,
			editor: {
				type: "textbox"
			}
		};
		columns.push(ganttColumn21);

		//String => 变更次数
		let ganttColumn22 = {
			name: "changeNum",
			header: "变更次数<br/>String",
			field: "changeNum",
			width: 100,
			editor: {
				type: "textbox"
			}
		};
		columns.push(ganttColumn22);

		//String => 备注
		let ganttColumn23 = {
			name: "remark",
			header: "备注<br/>String",
			field: "remark",
			width: 100,
			editor: {
				type: "textbox"
			}
		};
		columns.push(ganttColumn23);

		//将列集合数组设置给甘特图
		gantt.setColumns(columns);
		gantt.setTreeColumn("name");

		/* -------------设置Column结束------------- */

		/* -------------创建右键菜单开始------------- */
		let menu = new GanttMenu()
		gantt.setContextMenu(menu)

		//监听菜单的opening事件，此事件在菜单显示前激发。可以控制菜单项的显示和可操作。
		menu.on("beforeopen", function (e) {
			let gantt = this.owner;       //PlusProject对象
			let task = gantt.getSelected();
			if (!task) {
				e.cancel = true;
				return;
			}

			//显示和可编辑所有菜单项
			this.addwbs.show();
			this.addtask.show();
			this.remove.show();
			this.copy.show();
			this.stick.show();
			this.tasktowbs.show();
			this.wbstotask.show();
			this.expansion.show();
			this.closeplan.show();
			this.showOrHidecolum.show();

			/*this.add.show();
			this.edit.show();
			this.remove.show();

			this.upgrade.enable();
			this.downgrade.enable();

			if (task.Summary) {
				this.edit.hide();
				this.remove.hide();

				this.upgrade.disable();
				this.downgrade.disable();
			} else {
				this.add.hide();
			}
			*/
		});
		/* -------------创建右键菜单结束------------- */

		// 选中行设置选中行内容
		gantt.on('beforeselect', (e) => {
			this.setState({
				rightData: gantt.getSelected()
			}, () => {
			
				this.props.saveCurrentData({
					title: localStorage.getItem('name'),
					rightTag: this.state.rightTag[0].list,
					data: this.state.rightData
				})
			})
		})

	}

	// 删除选中甘特图行
	deleteTask = () => {
		var task = gantt.getSelected();
		if (task) {
			confirm({
				title: '删除选中项',
				okText: '确定',
				cancelText: '取消',
				content: "确定删除计划 \"" + task.name + "\" ？",
				onOk() {
					gantt.removeTask(task);
					message.success('删除成功')
				},
				onCancel() { },
			});
		} else {
			message.warning('请选中计划')
		}
	}

	render() {
		return (

			<div>
				<TopTags />
				<div className={style.main}>
					<div className={style.leftMain} style={{ height: this.props.height }}>
						<div className="miniFit" style={{ height: this.state.ganttHeight }}>
							<div ref="ganttCt2" id="ganttCt2" style={{ width: '100%', height: '100%' }}></div>
						</div>

					</div>
					<div className={style.rightBox} style={{ height: this.props.height }}>
						<RightTags rightTagList={this.state.rightTags} rightData={this.state.rightData} />
					</div>
				</div>

			</div>
		)
	}
}

export default connect(state => ({
	currentLocale: state.localeProviderData
}), {
		saveCurrentData,
		curdCurrentData,
		resetRightCurrentData,
		resetCurrentData,
		changeLocaleProvider
	})(PlanChange);