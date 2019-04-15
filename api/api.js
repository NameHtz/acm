// 系统管理之ipt管理
export const iptTree = 'api/sys/ipt/tree' //系统管理-ipt管理-获取列表树形
export const iptTreeSearch = "api/sys/ipt/search" //搜索
export const iptInfo = iptId => `api/sys/ipt/${iptId}/info` //系统管理-ipt管理-获取ipt信息
export const iptDelete = 'api/sys/ipt/delete' //系统管理-ipt管理-右键删除
export const iptAdd = 'api/sys/ipt/add' //系统管理-ipt管理-右键添加
export const iptUpdate = 'api/sys/ipt/update' //系统管理-ipt管理-右边基本信息报存
export const iptgetUser = (iptId, pageSize, currentPageNum) => `api/sys/user/select/${iptId}/iptusers/${pageSize}/${currentPageNum}` //系统管ipt管理-右边用户列表
export const selectiptUsers = (pageSize, currentPageNum) => `api/sys/user/select/iptusers/${pageSize}/${currentPageNum}` //系统管理之ipt-搜索ipt用户列表
export const userAdd = iptId => `api/sys/ipt/${iptId}/user/add` //ipt-人员管理分配保存接口
export const deleteIptUser = iptId => `api/sys/ipt/${iptId}/user/delete` //删除IPT用户
// 项目立项
export const prepaList = (pageSize, currentPageNum) => `api/plan/prepa/list/${pageSize}/${currentPageNum}` //策划管理-项目立项-列表
export const prepaSeek = (pageSize, currentPageNum, paCodeOrName) => `api/plan/prepa/list/${pageSize}/${currentPageNum}/${paCodeOrName}` //策划管理-项目立项-搜索
export const prepaBas = (id) => `api/plan/prepa/${id}` //策划管理-项目立项-基础信息
export const planPrepa = 'api/plan/prepa' //策划管理-项目立项-新增(修改)项目
export const epsTree = 'api/plan/eps/select/tree' //策划管理-项目立项-新增项目-所属项目群
export const orgTree = 'api/sys/org/select/tree' //策划管理-项目立项-新增项目-责任主体
export const orgPer = (id) => `api/sys/user/${id}/select/list` //策划管理-项目立项-新增项目-责任人
export const planDel = (id) => `api/plan/prepa/${id}` //策划管理-项目立项-删除
export const prepaContactsList = (bizId, pageSize, currentPageNum) => `api/plan/contacts/list/prepa/${bizId}/${pageSize}/${currentPageNum}` //策划管理-项目立项-联系人list
export const prepaContactsAdd = 'api/plan/contacts' //策划管理-项目立项-联系人-增加(修改)联系人
export const prepaContactsById = (id) => `api/plan/contacts/${id}` //策划管理-项目立项-联系人-获取联系人信息
export const prepaContactsDel = 'api/plan/contacts/delete' //策划管理-项目立项-联系人-删除
export const prepaRelease = (id) => `api/plan/prepa/${id}/release` //策划管理-项目立项-发布
export const prepaTree = (bizId) => `api/sys/projectteam/prepa/${bizId}/tree` //策划管理-项目立项-项目团队-列表
export const prepaProjectteamAdd = 'api/sys/projectteam' //策划管理-项目立项-项目团队-新增
export const prepaProjectteamUpdata = (teamId) => `api/sys/projectteam/${teamId}/info` //策划管理-项目立项-项目团队-修改获取
export const prepaProjectteamDel = 'api/sys/projectteam/delete' //策划管理-项目立项-项目团队-删除
export const prepaProjectteamUserTreeAdd = (id) => `api/sys/projectteam/${id}/user/assign` //策划管理-项目立项-项目团队-分配获取
export const prepaProjectteamUserList = (id) => `api/sys/projectteam/${id}/user/list` //策划管理-项目立项-项目团队-用户列表
export const prepaProjectteamUserUpdate = (teamId, userId) => `api/sys/projectteam/${teamId}/user/${userId}/update` //策划管理-项目立项-项目团队-用户列表-角色修改
export const prepaProjectteamUserDel = 'api/sys/projectteam/user/delete' //策划管理-项目立项-项目团队-用户-删除
export const prepaProjectteamIpt = 'api/sys/ipt/search' //策划管理-项目立项-项目团队-ipt导入list(搜索)
export const prepaProjectteamOrg = 'api/sys/org/search' //策划管理-项目立项-项目团队-组织结构导入list(搜索)
export const prepaProjectteamImportAdd = (dataSource, bizType, bizId, parentId) => `api/sys/projectteam/${dataSource}/${bizType}/${bizId}/${parentId}/import` //策划管理-项目立项-项目团队-ipt导入(组织结构导入)保存
export const prepaProjectteamProjectList = 'api/plan/project/tree' //策划管理-项目立项-项目团队-其他项目团队导入list(搜索)
export const prepaProjectteamProjectAdd = (sourceBizType, sourceBizId, targetBizType, targetBizId) => `api/sys/projectteam/${sourceBizType}/${sourceBizId}/${targetBizType}/${targetBizId}/copy` //策划管理-项目立项-项目团队-其他项目团队导入保存
//项目群
export const epsTreeList = 'api/plan/eps/tree' //策划管理-项目群list
export const epsAdd = 'api/plan/eps' //策划管理-项目群-新增
export const epsDel = (id) => `api/plan/eps/${id}` //策划管理-项目群-删除
export const epsInfo = (id) => `api/plan/eps/${id}` //策划管理-项目群-获取信息
export const epsAlter = 'api/plan/eps' //策划管理-项目群-修改

//协作团队
export const cprtmList = (bizId, bizType) => `api/plan/cprtm/${bizId}/${bizType}/list` //协作团队list
export const cprtmAdd = 'api/plan/cprtm/assign' //协作团队分配
export const cprtmDel = 'api/plan/cprtm/delete' //协作团队删除
// -->项目交付物
export const planProAuthTree = `api/plan/project/user/auth/tree` //项目列表
//@delvId delvId @pageSize 分页大小 @currentPageNum 当前页数 @查询条件 codeOrname
export const getPlanDelvListByCond = (delvId, pageSize = 10, currentPageNum = 1, codeOrname = '') => `api/plan/delv/${delvId}/task/list/${pageSize}/${currentPageNum}/${codeOrname}` //获取项目交付物相关的任务列表 - 查询条件
//@delvId delvId @pageSize 分页大小 @currentPageNum 当前页数
export const getPlanDelvListByConds = (delvId, pageSize = 10, currentPageNum = 1) => `api/plan/delv/${delvId}/task/${pageSize}/${currentPageNum}/list` //获取项目交付物相关的任务列表
export const addPlanPbs = `api/plan/pbs/add` //增加PBS
export const updatePlanPbs = `api/plan/pbs/update` //修改PBS
export const getPlanPbsById = id => `api/plan/pbs/${id}` //获取PBS
export const addPlanDelv = `api/plan/delv/add` //增加交付物
export const updatePlanDelv = `api/plan/delv/update` //修改交付物
export const deletePlanDelv = delvId => `api/plan/delv/${delvId}/delete` //删除交付列表包括（PBS，交付物）
export const getPlanDelvList = id => `api/plan/delv/${id}` //获取交付物
export const getPlanDelvTreeList = projectId => `api/plan/delv/${projectId}/tree` //获取交付物树形结构
export const getPlanDelvFeedbackList = feedbackId => `api/plan/delv/assign/feedback/${feedbackId}/list` //获取进展反馈交付清单列表
export const getPlanDelvAssignTaskList = taskId => `api/plan/delv/assign/task/${taskId}/list` //获取交付清单列表
export const getPlanDelvAssignList = projectId => `api/plan/delv/${projectId}/assign/list` //获取交付清单分配列表
export const getPlanDelvAssignFileList = delvId => `api/plan/delv/assign/${delvId}/file/list` //获取交付清单的文件信息
export const addPlanDelvAssign = `api/plan/delv/assign/add` //增加交付清单
export const planDelvTaskAssign = taskId => `api/plan/delv/task/${taskId}/assign` //分配交付清单
export const updatePlanDelvAssign = `api/plan/delv/assign/update` //修改交付清单
export const deletePlanDelvAssign = `api/plan/delv/assign/delete` //删除交付清单

//项目信息
export const getproTileInfo = (pageSize, currentPageNum) => `api/plan/project/list/${pageSize}/${currentPageNum}` //获取项目列表 平铺
export const getproTree = "api/plan/project/tree" //获取项目列表  树形
export const getproInfo = id => `api/plan/project/${id}` //获取项目基本信息
export const deleteprolist = id => `api/plan/project/${id}` //删除项目
export const updateproInfo = "api/plan/project" //更新项目信息 put
export const addproject = "api/plan/project" //新增项目信息
export const getvariable = id => `api/plan/project/variable/${id}` //获取项目变量
export const getCurrency = "api/base/currency/list" //获取货币列表
export const updateproVariable = "api/plan/project/variable" //更新项目变量

//基础数据
export const baseDigitDir = (boCode) => `api/base/dictType/${boCode}/list`
export const getToken = 'api/auth/jwt/token' //获取token     post
export const getUserInfo = 'api/sys/login/user/info' //登陆获取用户信息   get
export const addUserInfo = 'api/sys/user/add' //新增用户信息   get
export const getUserInfoList = (pageSize, currentPageNum) => `api/sys/user/list/${pageSize}/${currentPageNum}` //搜索用户列表
export const getUserInfoById = (userId) => `api/sys/user/${userId}/info` //获取用户信息   get
//--字典码值--
export const getDictTypeCodeList = dictTypeCode => `api/base/dict/${dictTypeCode}/treeList` //字典码值列表
export const deleteDictTypeCode = `api/base/dict/delete` //删除字典码值
export const addDictTypeCode = `api/base/dict/add` //新增字典码值
export const getDictTypeCodeInfoById = id => `api/base/dict/${id}/info` //字典码值基本信息
export const updateDictTypeCode = `api/base/dict/update` //修改字典码值
//--> 数据字典
export const getDigitDirBoList = 'api/base/digitDirBo/1/list' //获取业务对象列表
export const geteListByBoCod = boCode => `api/base/dictType/${boCode}/list` //根据业务对象获取数据字典列表
export const addDigitDirBo = 'api/base/dictType/add' //添加数据字典
export const deleteDigitDirBo = 'api/base/dictType/delete' //删除数据字典
export const getInfoByBoId = id => `api/base/dictType/${id}/info` //根据数据字典id获取详细信息
export const updateDigitDirBo = `api/base/dictType/update` //修改数据字典
// -->交付物模板
export const getTmpldelvList = (currentPageNum, pageSize) => `api/base/tmpldelv/tree/${currentPageNum}/${pageSize}` //交付物列表
export const deleteTmpldelvList = id => `api/base/tmpldelv/${id}` //删除交付物模板\PBS\交付物
export const addTmpldelvList = `api/base/tmpldelv/add` //新增交付物
export const updateTmpldelvList = `api/base/tmpldelv/update` //修改交付物
export const getTmpldelvInfoById = id => `api/base/tmpldelv/${id}/info` //交付物基本信息
export const getTmpldelvSetupInfo = id => `api/base/tmpldelv/${id}/setupinfo` //交付物设置
export const addTmpldelvPbs = `api/base/tmpldelv/pbs/add` //新增交付物PBS
export const addTmpldelvSub = `api/base/tmpldelv/sub/add` //新增下级交付物
//>>分类码
export const getClassifyWf = "api/base/classify/bo/list" //分类码业务对象集合
export const getClassifyByBoCode = (boCode) => `api/base/classify/${boCode}/list` //获取 分类码列表   get
export const addClassify = "api/base/classify/add" //新增分类码/码值
export const deleteClassify = "api/base/classify/delete" //删除分类码/码值
export const addClassifyValue = "api/base/classify/value/add" //新增分类码码值
export const getClassifyOrValueById = (id) => `api/base/classify/${id}/info ` //根据分类码/码值主键查找分类码/码值
export const updateClassifyOrValue = "api/base/classify/update" // 修改分类码/码值
export const getClassifyTags = (boCode, bizId) => `api/base/classify/assign/${boCode}/${bizId}/list` //根据业务ID查找分类码页签数据列表
export const distributeClassify = "api/base/classify/assign" //分配分类码
export const deleteclassifyassign = "api/base/classify/assign/delete" //删除分配的分配码
export const getclassifybyId = classifyId => `api/base/classify/${classifyId}/value/tree` //获取分类码码值树形列表
export const updateclassify = "api/base/classify/assign/update" //更新分配的分配码码值

//系统管理
export const menuTree = 'api/sys/menu/tree' //系统管理-菜单管理
export const menuAdd = 'api/sys/menu/add' //系统管理-菜单管理-新增
export const menuGetById = id => `api/sys/menu/${id}/info` //系统管理-菜单管理-获取菜单信息
export const menuUpdate = 'api/sys/menu/update' //系统管理-菜单管理-修改菜单
export const menuDelete = 'api/sys/menu/delete' //系统管理-菜单管理-删除菜单
export const roleTree = 'api/sys/org/tree' //系统管理-组织机构-全部树形数据
export const roleInfo = (orgId) => `api/sys/org/${orgId}/info` //系统管理-组织机构-机构信息
export const roleUpdate = 'api/sys/org/update' //系统管理-组织机构-修改机构信息
export const addRole = 'api/sys/org/add' //系统管理-组织机构-新增组织
export const deleteRole = 'api/sys/org/delete' //系统管理-组织机构-删除组织
export const menuSearch = 'api/sys/menu/search' //系统管理-菜单管理-搜索
export const orgSearch = 'api/sys/org/search' //系统管理-组织机构-搜索

export const roleLevel = 'api/base/dict/sys.org.level/select/tree ' //系统管理-组织机构-获取机构等级
export const userList = (orgId, pageSize, currentPageNum) => `api/sys/user/select/${orgId}/orgusers/${pageSize}/${currentPageNum}` //系统管理-组织机构-用户列表
export const addUser = 'api/sys/user/add' //系统管理-组织机构-新增用户
export const updateUserInfo = 'api/sys/user/update' //系统管理-组织机构-新增用户
export const roleList = 'api/sys/role/list' //系统管理-角色列表
export const roleSearchList = (pageSize=10, currentPageNum=1) => `api/sys/role/search/${pageSize}/${currentPageNum}`  //搜索角色列表
export const userInfo = (userId) => `api/sys/user/${userId}/info` //系统管理-用户信息
export const deleteUser = 'api/sys/user/delete' //系统管理-删除用户
//系统管理-菜单管理
export const funcFuncs = (id) => `api/sys/func/${id}/funcs` //系统管理-菜单管理-权限配置表
export const funcAdd = 'api/sys/func/add' //系统管理-菜单管理-权限配置表-新增
export const funcDel = 'api/sys/func/delete' //系统管理-菜单管理-权限配置表-删除
export const funcInfo = (id) => `api/sys/func/${id}/funcinfo` //系统管理-菜单管理-权限配置表-修改查询
export const funcUpdate = 'api/sys/func/updatefunc' //系统管理-菜单管理-权限配置表-修改提交
export const getUserByOrgId = orgId => `api/sys/user/${orgId}/select/list` //get 根据OrgId查找User
//系统管理之三元管理

export const tmmAuditlist = (pageSize, currentPageNum) => `api/sys/tmm/audit/list/${pageSize}/${currentPageNum}` //系统管理之三元管理--操作日志
export const tmmOpen = (isopen) => `api/sys/tmm/${isopen}` //三元管理之管理权限开启
export const tmmList = 'api/sys/tmm/ipaccess/list' //三元管理之获取ip访问列表
export const tmmAdd = 'api/sys/tmm/ipaccess/add' //三元管理之增加ip访问
export const tmmUpdate = 'api/sys/tmm/ipaccess/update' //三元管理之编辑ip访问
export const tmmDelete = 'api/sys/tmm/ipaccess/delete' //三元管理之删除ip访问设置
export const tmmInfo = 'api/sys/tmm/pwdrule/info' //三元管理之获取密码设置
export const tmmRuleset = 'api/sys/tmm/pwdrule/update' //三元管理之密码规则设置

//基础数据-编码规则
export const businessAdd = 'api/base/coderulebo/add' //基础数据-
export const baseCoderuleboList = 'api/base/coderulebo/list' //编码规则-业务对象列表
export const addCoderulebo = "api/base/coderulebo/add" //新增业务对象
export const updateCoderulebo = "api/base/coderulebo/update" //更新业务对象
export const deleteCoderulebo = id => `api/base/coderulebo/${id}` //删除业务对象
export const getCoderuleboInfo = id => `api/base/coderulebo/${id}/info` //获取业务对象
export const ruleAdd = 'api/base/coderule/add' //基础数据-编码规则-新增规则
export const ruleList = (boId) => `api/base/coderule/${boId}/list` //基础数据-编码规则-规则列表
export const deleteRule = "api/base/coderule/delete" //删除规则
export const checkRule = ruleId => `api/base/coderule/${ruleId}/check` //校验规则
export const checkTableName = "api/base/coderule/tables" //查询表名
export const findTableFileds = tableName => `api/base/coderule/${tableName}/fields` //查询表的field
export const coderulecell = (ruleId, position) => `api/base/coderulecell/${ruleId}/${position}/info` //规则元素基本信息
export const addCoderulecell = "api/base/coderulecell/add" //新增规则元素
export const updateCoderulecell = "api/base/coderulecell/update" //更新规则元素信息
export const getcoderuletype = boId => `api/base/coderuletype/${boId}/list` //维护规则类型列表
export const addcoderuletype = "api/base/coderuletype/add" //新增维护规则
export const getdigitDirBo = botype => `api/base/digitDirBo/${botype}/list` //重定向到字典下拉
export const getcoderuletypeinfo = id => `api/base/coderuletype/${id}/info` //获取维护规则类型信息
export const updateCoderuletype = "api/base/coderuletype/update" //更新维护规则信息
export const deleteCoderuletype = `api/base/coderuletype/delete` //删除维护规则信息-逗号隔开删除多条
//基础数据-日历设置
export const calendarList = 'api/base/calendar/list' //基础数据-日历设置-日历设置列表
export const calendarDef = (id) => `api/base/calendar/${id}/default` //基础数据-日历设置-设置默认日历
export const calendarDel = (id) => `api/base/calendar/${id}/delete` //基础数据-日历设置-删除日历设置信息
export const calendarAdd = 'api/base/calendar/add' //基础数据-日历设置-新增日历设置
export const calendarInfo = (id) => `api/base/calendar/${id}/info` //基础数据-日历设置-日历基本信息
export const calendarDefInfo = 'api/base/calendar/default/info' //基础数据-日历设置-日历默认基本信息
export const calendarUpdate = 'api/base/calendar/update' //基础数据-日历设置-修改日历基本信息
export const calendarCopy = (id) => `api/base/calendar/${id}/copy` //基础数据-日历设置-复制
export const calendarweekdaysupdate = "api/base/calendar/weekdays/update" //修改日历标准周期

//基础数据-货币设置
export const currencyList = 'api/base/currency/list' //货币列表查询
export const currencyAdd = 'api/base/currency/add' //货币新增
export const currencyDelete = 'api/base/currency/delete' //货币删除
export const currencySeach = 'api/base/currency/list' //货币查找
export const currencyInfo = id => `api/base/currency/${id}/info` //货币基本信息
export const currencyUpdata = 'api/base/currency/updata' //更新货币基本信息


//计划管理-计划定义
export const defineTree = (projectIds) => `api/plan/define/${projectIds}/tree` //计划定义列表
export const defineOrgTree = (projectId) => `api/sys/org/${projectId}/select/tree` //责任主体
export const defineOrgUserList = (orgId) => `api/sys/user/${orgId}/select/list` //责任人
export const defineAdd = 'api/plan/define/add' //新增
export const defineInfo = (id) => `api/plan/define/${id}/info` //获取计划定义
export const defineDel = (ids) => `api/plan/define/${ids}/delete` //删除

// --> 角色管理
// export const roleList = 'api/sys/role/list'                         //系统管理-角色管理-列表
export const roleAdd = 'api/sys/role/add' //系统管理-角色管理-新增
export const roleDelete = 'api/sys/role/delete' //系统管理-角色管理-删除
export const searchRole = 'api/sys/role/search' //搜索角色
export const roleUpdate2 = 'api/sys/role/update' //系统管理-角色管理-修改
export const getRoleInfoById = id => `api/sys/role/${id}/info` //系统管理-角色管理-根据id获取用户信息
export const getAuthListByRoleId = roleId => `api/sys/auth/${roleId}/list` //根据roleId获取权限列表
export const updateRoleAuth = roleId => `api/sys/auth/${roleId}/update/auth` //修改roleAuth的信息
//交付物模板
export const gettmpldelv = (currentPageNum, pageSize) => `api/base/tmpldelv/tree/${currentPageNum}/${pageSize}` //交付物列表
// --> 全局设置
export const updateSetProject = `api/base/set/project/update` //保存更新全局设置
export const updateSetDoc = `api/base/set/doc/update` //修改文档全局设置
export const updateSetTime = `api/base/set/time/update` //修改时间设置
export const getProjectInfo = `api/base/set/project/info` //项目全局设置信息
export const getDocInfo = `api/base/set/doc/info` //文档全局设置信息
export const getTimeInfo = `api/base/set/time/info` //时间全局设置信息
export const setBolist = `api/base/set/bo/list` //业务编码

//--> 字典表
export const getBaseSelectTree = typeCode => `api/base/dict/${typeCode}/select/tree` //保存更新全局设置

//文档管理-临时文档
export const docTempList = (pageSize, currentPageNum) => `api/doc/temp/${pageSize}/${currentPageNum}/list` //列表
export const docTempFile = (ids) => `api/doc/temp/completefile/${ids}/list` //完善信息list
export const docTempDel = 'api/doc/temp/delete' //完善信息删除

export const docCorpSel = 'api/doc/corp/folder/select/tree' //企业文件夹
export const docProjectSel = (projectId) => `api/doc/project/folder/${projectId}/select/tree` //项目文件夹
export const docPlanProject = 'api/plan/project/user/auth/select/tree' //选择项目
export const docOrgSel = (id) => `api/sys/org/${id}/select/tree` //部门
export const docTempAdd = 'api/doc/temp/completefile/add' //完善信息
//文档管理-企业文档
export const docCompFolderList = 'api/doc/corp/folder/tree' //文件夹list
export const docCompList = (folderId, pageSize, pageNum) => `api/doc/corp/${folderId}/${pageSize}/${pageNum}/list` //企业文档列表

//资源管理 
export const getRsrcrole = "api/rsrc/rsrcrole/treeList" //获取资源角色
export const addrsrcrole = "api/rsrc/rsrcrole/add" //新增资源角色
export const deletersrcrole = `api/rsrc/rsrcrole/delete` //删除资源角色
export const getrsrcroleInfo = id => `api/rsrc/rsrcrole/${id}/info` //获取资源角色详情
export const updatersrcrole = "api/rsrc/rsrcrole/update" //修改资源角色
export const getUserRsrc = "api/rsrc/user/tree" //获取人力资源列表
export const getuserRsrcInfo = id => `api/rsrc/user/${id}/info` //获取人力资源详情
export const importUserRsrc = (addnewusers, updateexists, deleteinexistent) => `/rsrc/user/importUserRsrc/${addnewusers}/${updateexists}/${deleteinexistent}` //导入资源用户

export const geteuipRsrc = "api/rsrc/equip/tree" //获取设备资源
export const addeuipRsrc = "api/rsrc/equip/add" //新增设备资源
export const deleteEuipRsrc = ids => `api/rsrc/equip/delete/${ids}` //删除设备资源
export const addEquipType = "api/rsrc/equip/addEquipType" //新增设备资源类别
export const deleteEquipType = ids => `api/rsrc/equip/deleteEquipType/${ids}` //删除设备资源类别
export const getequipInfo = id => `api/rsrc/equip/${id}/info` //获取数据设备资源信息
export const updateEquip = "api/rsrc/equip/update" //修改修改设备资源
export const getequipTypeInfo = id => `api/rsrc/equip/${id}/equipTypeInfo` //获取数据设备资源类型信息
export const updateEquipType = "api/rsrc/equip/updateEquipType" //修改设备资源类别
export const rsrcAssign = (rsrcId, rsrcType) => `api/rsrc/rsrcAssign/${rsrcId}/${rsrcType}/list` //查询资源角色
//材料资源
export const getmaterial = "api/rsrc/material/tree" //获取材料资源


//计划反馈
export const getfeedbackTree = defineIds => `api/plan/feedback/${defineIds}/tree` //获取反馈页面树
export const getfeedbackList = defineIds => `api/plan/feedback/${defineIds}/list` //获取反馈页面列表
export const getfeedbackInfo = defineIds => `api/plan/feedback/${defineIds}/release/tree` //获取反馈批准页面树
export const getfeedbacktaskInfo = taskId => `api/plan/feedback/task/${taskId}/info` //反馈页签
export const addplanfeedback = "api/plan/feedback/add" //增加进展日志
//公共api
export const getdictTree = bocode => `api/base/dict/${bocode}/select/tree` //获取字典下拉菜单
export const getuserauthtree = "api/plan/define/user/auth/tree" //打开计划–获取用户权限内的计划定义集合，包括（queryDefineTreeByUser参与任务的的计划定义集合）


// 计划编制
export const getPreparedTreeList = `api/plan/task/tree` //获取计划编制树形列表
export const addPlanWbs = `api/plan/wbs/add` //增加WBS
export const updatePlanWbs = `api/plan/wbs/update` //修改WBS
export const getWbsInfoById = wbsId => `api/plan/wbs/${wbsId}/info` //获取WBS信息
export const addPlanTask = `api/plan/task/add` //增加任务
export const updatePlanTask = `api/plan/task/update` //修改任务
export const deletePlanTask = `api/plan/task/delete` //删除任务
export const getTaskInfoById = taskId => `api/plan/task/${taskId}/info` // 获取任务信息
export const getPlanTaskRelationTree = taskId => `api/plan/task/${taskId}/relation/tree` //获取Task计划关联列表
export const releasePlanTask = projectId => `api/plan/task/${projectId}/release` //发布计划
export const cancelReleasePlanTask = projectId => `api/plan/task/${projectId}/cancelRelease` //取消发布计划
export const confirmPlanTask = projectId => `api/plan/task/${projectId}/confirm` //确认计划
export const cancelConfirmPlanTask = projectId => `api/plan/task/${projectId}/cancelConfirm` // 取消确认计划
export const releasePlanTaskTree = projectId => `api/plan/task/${projectId}/release/tree` // 发布计划树
export const cancelReleasePlanTaskTree = projectId => `api/plan/task/${projectId}/cancelRelease/tree` // 取消发布计划树
export const confirmPlanTaskTree = projectId => `api/plan/task/${projectId}/confirm/tree` // 确认计划树
export const cancelConfirmPlanTaskTree = projectId => `api/plan/task/${projectId}/cancelConfirm/tree` // 取消确认计划树
export const getPlanTaskAssginTree = defineId => `api/plan/task/${defineId}/relation/assgin/tree` // 分配计划树
export const doPlanTaskAssgin = taskId => `api/plan/task/${taskId}/relation/assign` // 计划关联
export const updatePlanTaskAssgin = taskId => `api/plan/task/${taskId}/relation/update` // 计划关联修改
export const deletePlanTaskAssgin = `api/plan/task/relation/delete` // 删除计划关联
export const getPlanTaskPredList = taskId => `api/plan/task/${taskId}/pred/list` // 获取紧前任务列表
export const getPlanTaskFollowList = taskId => `api/plan/task/${taskId}/follow/list` // 获取后续任务列表
export const getPlanTaskPredAssginTree = defineId => `api/plan/task/${defineId}/pred/assgin/tree` // 逻辑关系分配任务树
export const addPlanTaskPred = taskId => `api/plan/task/${taskId}/pred/add` // 增加逻辑关系分配(前置任务)
export const updatePlanTaskPred = `api/plan/task/pred/update` // 修改逻辑关系
export const deletePlanTaskPred = `api/plan/task/pred/delete` // 删除逻辑关系分配
export const getPlanTaskrsrcList = taskId => `api/plan/taskrsrc/${taskId}/list` // 获取任务分配资源
export const getPlanTaskrsrcUserAssignTree = taskId => `api/plan/taskrsrc/user/assign/${taskId}/tree` // 人力资源分配树
export const getPlanTaskrsrcEquipAssignTree = taskId => `api/plan/taskrsrc/equip/assign/${taskId}/tree` // 设备资源分配树
export const addPlanTaskrsrc = `api/plan/taskrsrc/add` // 分配资源
export const updatePlanTaskrsrc = `api/plan/taskrsrc/update` // 修改资源分配
export const deletePlanTaskrsrc = `api/plan/taskrsrc/delete` // 删除资源分配

//--> 沟通管理
export const meetingList = (projectId,pageSize,currentPageNum) => `api/comu/meeting/${projectId}/${pageSize}/${currentPageNum}/list` //get 沟通管理-会议管理列表
export const meetingWfList = (procInstId,pageSize,currentPageNum) => `api/comu/meeting/wf/${procInstId}/${pageSize}/${currentPageNum}/list` //get 沟通管理-流程处理
export const meetingAdd = `api/comu/meeting/add` // post 沟通管理-新增会议
export const meetingRelease = 'api/comu/meeting/release' //put 沟通管理-发布审批
export const meetingDelete = `api/comu/meeting/delete`  // delete 沟通管理-删除会议信息
export const meetingInfo = id => `api/comu/meeting/${id}/info` // get 沟通管理-会议基本信息
export const meetingUpdate = `api/comu/meeting/update` //put 沟通管理-更新会议基本信息
export const meetingActionList = meetingId => `api/comu/meeting/action/${meetingId}/list` // get 沟通管理-会议行动项
export const meetingActionAdd = `api/comu/meeting/action/add`  // post 沟通管理-增加会议行动项
export const meetingActionUpdate = `api/comu/meeting/action/update`  // put 沟通管理-修改项目会议行动项
export const meetingActionDelete = `api/comu/meeting/action/delete` // delete 沟通管理-删除会议行动项
export const meetingActionFeeDback = taskId => `api/comu/meeting/action/${taskId}/feedback` //get 查看进展日志

export const questionList = (projectId,pageSize,currentPageNum) => `api/comu/question/${projectId}/${pageSize}/${currentPageNum}/list`  //get 沟通管理-获取问题列表
export const questionlists = ( taskId ) => `api/comu/question/task/${taskId}/lists` // get 问题管理-
export const questionWfList = (procInstId,pageSize,currentPageNum) => `api/comu/question/wf/${procInstId}/${pageSize}/${currentPageNum}/list` // get 流程处理（问题流程）
export const questionAdd = `api/comu/question/add`  // post 问题管理-增加项目问题
export const questionDelete = `api/comu/question/delete`  // delete 问题管理-删除
export const questionRelease = `api/comu/question/release` // put 问题管理-发布
export const  questionCancelRelease = `api/comu/question/cancel/release` // put 问题管理-取消发布项目问题
export const questionSolve = `api/comuquestion/solve` //put 问题管理 -解决
export const questionClose = `api/comu/question/close` // put 问题管理-关闭
export const questionInfo = id => `api/comu/question/${id}/info`  // get 沟通管理-基本信息
export const questionReleaseList = projectId => `api/comu/question/${projectId}/release/list`  // get 问题管理-发布列表

export const questionCancelReleaselist = projectId => `api/comu/question/${projectId}/cancel/release/list`  // get 问题管理-取消发布列表
export const questionCloselist = projectId =>`api/comu/question/${projectId}/close/list` //get 问题管理 - 关闭列
export const questionSolvelist = projectId => `api/comu/question/${projectId}/solve/list` //get 问题管理-解决列表
export const questionUpdate = `api/comu/question/update` // put 问题管理-修改问题
export const questionHandleList = questionId =>`api/comu/question/handle/${questionId}/list` // get 问题管理-处理记录
export const questionHandleAdd = `api/comu/question/handle/add` // post 问题管理-新增
export const questionHandleDelete = `api/comu/question/handle/delete`  // delete 问题管理-删除
export const questionHandleInfo = id => `api/comu/question/handle/${id}/info` // get 问题处理-基本信息
export const questionHandleUpdate = `api/comu/question/handle/update` // put 问题处理-修改

export const orgSelectTree = projectId => `api/sys/org/${projectId}/select/tree` //根据项目id获取组织
