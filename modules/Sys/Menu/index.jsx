import React, { Component } from 'react';
import intl from 'react-intl-universal';
import { Table } from 'antd';
// import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { changeMenuData } from '../../../store/menuData/action';
// import * as menuDataAction from '../../../store/menuData/action';
import * as sysMenuAction from '../../../store/sysMenu/action';
import style from './style.less';

// import store from '../../../store';
// import { saveCurrentData, resetRightCurrentData } from '../../../store/rightData/action';
// import { curdCurrentData, resetCurrentData } from '../../../store/curdData/action';
// import { changeLocaleProvider } from '../../../store/localeProvider/action';

import axios from '../../../api/axios';
import { menuTree, menuAdd } from '../../../api/api';
// import { maintainData, initStructureCode, findItemIndex } from '../../../api/function';
import TopTags from './TopTags/index';
import RightTags from '../../../components/public/RightTags/index';

import * as util from '../../../utils/util';
import StandardTable from '../../../components/Table/index';

const locales = {
  'en-US': require('../../../api/language/en-US.json'),
  'zh-CN': require('../../../api/language/zh-CN.json'),
};

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initDone: false,
      activeIndex: null,
      rightData: null,
      rightTags: [
        { icon: 'iconjibenxinxi', title: '基本信息', fielUrl: 'Sys/Menu/MenuInfo' },
        { icon: 'iconquanxianpeizhi1', title: '权限配置', fielUrl: 'Sys/Menu/Permission' },
      ],
      data: [],
      dataMap: [],
      // record: '',
    };

  }

  //点击Table行事件
  getInfo = (record, index) => {
    const { activeIndex } = this.state;
    const { id } = record;
    if (activeIndex === record.id) {
      this.props.actions.setSysMenuRecord(null);
      this.setState({
        // record: null,
        activeIndex: null,
      });
    } else {
      this.props.actions.setSysMenuRecord(record);
      this.setState({
        activeIndex: id,
      });
    }
  };

  //获取菜单list
  getList = () => {
    axios.get(menuTree).then(res => {
      const dataMap = util.dataMap(res.data.data);
      this.setState({
        data: res.data.data,
        dataMap,
      });
    });
  };

  componentDidMount() {
    // this.loadLocales();
    this.getList();
  }

  setClassName = (record, index) => {
    return record.id === this.state.activeIndex ? 'tableActivty' : '';
  };



  addSuccess = (value, type) => {
    const { data, dataMap } = this.state;
    const { record } = this.props;
    console.log(value);
    util.create(data, dataMap, record, value);
    this.props.actions.setSysMenu(data)
    this.setState({
      data,
      dataMap,
    });
  };

  delSuccess = () => {
    const { data, dataMap } = this.state;
    const { record } = this.props;
    util.deleted(data, dataMap, record);
    this.props.actions.setSysMenu(data)
    this.props.actions.setSysMenuRecord({});
    this.setState({
      data,
      // record: '',
    });
  };

  updateSuccess = (v) => {
    const { data, dataMap } = this.state;
    const { record } = this.props;
    util.modify(data, dataMap, record, v);
    // this.props.changeMenuData(data)
    this.props.actions.setSysMenuRecord(v);
    this.setState({
      data,
      // record: v,
    });
  };

  search = (val) => {
    console.log(val)
    this.setState({
      data: val
    })
  }

  render() {
    const {intl} = this.props.currentLocale;
    const columns = [
      {
        title: intl.get('wsd.i18n.sys.menu.menuname'),
        dataIndex: 'menuName',
        key: 'menuName',
      },
      {
        title: intl.get('wsd.i18n.sys.menu.menucode'),
        dataIndex: 'menuCode',
        key: 'menuCode',
      },
      {
        title: intl.get('wsd.i18n.sys.menu.menutype'),
        dataIndex: 'menuType',
        key: 'menuType',
        render: (text) => (
          <span>{text.name}</span>
        ),
      },

      {
        title: intl.get('wsd.i18n.sys.menu.active'),
        dataIndex: 'active',
        key: 'active',
      },
      {
        title: intl.get('wsd.i18n.sys.menu.hidden'),
        dataIndex: 'hidden',
        key: 'hidden',
      },
      {
        title: intl.get('wsd.i18n.sys.menu.share'),
        dataIndex: 'share',
        key: 'share',
      },
      {
        title: intl.get('wsd.i18n.sys.menu.ismenu'),
        dataIndex: 'isMenu',
        key: 'isMenu',
      },
      {
        title: intl.get('wsd.i18n.sys.menu.url'),
        dataIndex: 'url',
        key: 'url',
      },

    ];

    const { data, initDone, rightTags } = this.state;
    const { height, record } = this.props;
    return (
      <div>
        <TopTags
          record={record}
          success={this.addSuccess}
          delSuccess={this.delSuccess}
          search={this.search}
        />
        <div className={style.main}>
          <div className={style.leftMain} style={{ height: this.props.height }}>
            <div style={{ width: 'calc(100vw - 60px)' }}>
              <StandardTable
                data={{
                  dataSource: data,
                }}
                pagination={false}
                columns={columns}
                rowKey={_r => _r.id}
                rowClassName={this.setClassName}
                onRow={(_r) => {
                  return {
                    onClick: this.getInfo.bind(this, _r),
                  };
                }}
              />
            </div>
          </div>
          <div className={style.rightBox} style={{ height }}>
            <RightTags
              rightTagList={rightTags}
              rightData={record}
              updateSuccess={this.updateSuccess}
            />
          </div>
        </div>

      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    currentLocale: state.localeProviderData,
    menuData: state.menuData,
    record: state.sysMenu.record,
  }
};
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, sysMenuAction), dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);

