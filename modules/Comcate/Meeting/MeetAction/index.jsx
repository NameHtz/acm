import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { Table, Icon, Select ,Spin,Progress, message} from 'antd'
import style from './style.less'
import dynamic from 'next/dynamic'
import AddTopBtn from "../../../../components/public/TopTags/AddTopBtn"
import ModifyTopBtn from"../../../../components/public/TopTags/ModifyTopBtn"
import DeleteTopBtn from "../../../../components/public/TopTags/DeleteTopBtn"
import FeedBackBtn from "../../../../components/public/TopTags/FeedBackBtn"
import EditMeetModal from "./EditMeetModal"

import {meetingActionList, meetingActionDelete} from '../../../../api/api'
import axios from '../../../../api/axios';

const locales = {
  "en-US": require( '../../../../api/language/en-US.json' ),
  "zh-CN": require( '../../../../api/language/zh-CN.json' )
}
const Option = Select.Option;
class MeetActionForm extends Component {
  constructor(props) {
    super( props )
    this.state = {
      initDone: false,
      activeIndex: '',
      title:'',
      visible:false,
      selectDelId:[],
      data: [ {
        key: 1,
        id: 1,
        actionName: "会议项目计划",
        actionCode: "ssddd",
        planStartTime: "2018-12-12",
        planEndTime: "2019-1-9",
        iptName: "研发部门",
        userName: "孙渤海",
        completeStatus: 60,
        progresslog: "查看",
        remark: 1,
      } ]
    }
  }

  componentDidMount() {
    this.loadLocales();
    console.log('加载')
    //获取会议行动项目列表
    this.getMeetingAction()
  }

  static getDerivedStateFromProps(props, state){
    return state;
  }

  loadLocales() {
    intl.init( {
                 currentLocale: 'zh-CN',
                 locales,
               } )
      .then( () => {
        // After loading CLDR locale data, start to render
        this.setState( {initDone: true} );
      } );
  }

  onClickHandle = (name) => {
    console.log(name)
    if (name == "AddTopBtn") {
      console.log( name)
      this.setState(
        {title:'新增会议行动项',visible:true})
    }
    if (name == "ModifyTopBtn") {
      console.log( name)
      this.setState(
        {title:'修改会议行动项',visible:true})
    }
    if(name == 'DeleteTopBtn'){

      //删除会议行动项
      let selectDelId = this.state.selectDelId;
      if(selectDelId.length !== 0 ){
        axios.deleted(meetingActionDelete,selectDelId).then((result) => {
          console.log(result)
        }).catch((err) => {
          console.log(err)
        });
      }else{
        message.info('请选择要删除的会议行动项')
      }
    }
    if (name == "FeedBackBtn") {
      console.log( name)
      this.setState(
        {title:'进展反馈',visible:true})
    }
  }
  handleCancel=(e)=>{
    this.setState({visible:false})
  }


  getInfo = (record,index) => {
    let id = record.id,records = record
    if (this.state.activeIndex == id) {
      id = ''
      records = ''
    }
    this.setState( {
                     activeIndex: id
                   } )
  }
  setClassName = (record,index) => {
    //判断索引相等时添加行的高亮样式
    return record.id === this.state.activeIndex ? `${style[ 'clickRowStyl' ]}` : "";
  }


  // 获取会议行动项目
  getMeetingAction = () => {
    let {data} = this.props;
    axios.get(meetingActionList(data.id),'',true).then((result) => {
      let data = result.data.data;

      if(data.length !== 0){
        this.setState({
          data
        })
      }
    }).catch((err) => {
      console.log(err)
    });
  }

  render() {
    const columns = [
      {
        title: intl.get( 'wsd.i18n.comu.meetingaction.actionname' ),
        dataIndex: 'actionName',
        key: 'actionName',
      },
      {
        title: intl.get( 'wsd.i18n.comu.meetingaction.actioncode' ),
        dataIndex: 'actionCode',
        key: 'actionCode',
      },
      {
        title: intl.get( 'wsd.i18n.comu.meetingaction.planstarttime' ),
        dataIndex: 'planStartTime',
        key: 'planStartTime',
      },
      {
        title: intl.get( 'wsd.i18n.comu.meetingaction.planendtime' ),
        dataIndex: 'planEndTime',
        key: 'planEndTime',
      },
      {
        title: intl.get( 'wsd.i18n.comu.meetingaction.iptname' ),
        dataIndex: 'iptName',
        key: 'iptName',
      },
      {
        title: intl.get( 'wsd.i18n.comu.meetingaction.username' ),
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: intl.get( 'wsd.i18n.comu.meetingaction.completestatus' ),
        dataIndex: 'completeStatus',
        key: 'completeStatus',
        render: (text, record) => (
          <Progress percent={text} className={style.myProgress} strokeWidth={18}/>
        )
      },
      {
        title: intl.get( 'wsd.i18n.comu.meetingaction.progresslog' ),
        dataIndex: 'progresslog',
        key: 'progresslog',
      },
      {
        title: intl.get( 'wsd.i18n.comu.meetingaction.remark' ),
        dataIndex: 'remark',
        key: 'remark',
      },
    ];
    const rowSelection = {
      onChange: (selectedRowKeys,selectedRows) => {
        console.log( `selectedRowKeys: ${selectedRowKeys}`,'selectedRows: ',selectedRows );
      },
      onSelect: (record,selected,selectedRows) => {
        console.log( record,selected,selectedRows );
        this.setState({
          selectDelId:selectedRows.map(val=>val.id)
        })
      },
      onSelectAll: (selected,selectedRows,changeRows) => {
        console.log( selected,selectedRows,changeRows );
        this.setState({
          selectDelId:selectedRows.map(val=>val.id)
        })
      },
    };
    return (
      <div className={style.main}>
        <h3 className={style.listTitle}>会议行动项</h3>
        <div className={style.rightTopTogs}>
          <AddTopBtn onClickHandle={this.onClickHandle}></AddTopBtn>
          <ModifyTopBtn onClickHandle={this.onClickHandle}></ModifyTopBtn>
          <DeleteTopBtn onClickHandle={this.onClickHandle}></DeleteTopBtn>
          <FeedBackBtn  onClickHandle={this.onClickHandle} />
        </div>
        <div className={style.mainScorll} >
        <Table
          rowKey={record => record.id}
          defaultExpandAllRows={true}
          columns={columns}
          dataSource={this.state.data}
          pagination={false}
          name={this.props.name}
          rowSelection={rowSelection}
          rowClassName={this.setClassName}
          
          onRow={(record, index) => {
                    return {
                        onClick: (event) => {
                            this.getInfo(record, index)
                        }
                    }
                }}
        />
        </div>
      <EditMeetModal
        title={this.state.title}
        visible={this.state.visible}
        onCancel={this.handleCancel}
      />

      </div>
    )
  }
}

export default MeetActionForm


