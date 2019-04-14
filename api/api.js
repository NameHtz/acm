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
// 项目立项
export const prepaList = (pageSize, currentPageNum) => `api/plan/prepa/list/${pageSize}/${currentPageNum}` //策划管理-项目立项-列表
export const prepaSeek = (pageSize, currentPageNum, paCodeOrName) => `api/plan/prepa/list/${pageSize}/${currentPageNum}/${paCodeOrName}`//策划管理-项目立项-搜索
export const prepaBas = (id) => `api/plan/prepa/${id}` //策划管理-项目立项-基础信息
export const planPrepa = 'api/plan/prepa' //策划管理-项目立项-新增(修改)项目
export const epsTree = 'api/plan/eps/select/tree' //策划管理-项目立项-新增项目-所属项目群
export const orgTree = 'api/sys/org/select/tree' //策划管理-项目立项-新增项目-责任主体
export const orgPer = (id) => `api/sys/user/${id}/select/list` //策划管理-项目立项-新增项目-责任人
export const planDel = (id) => `api/plan/prepa/${id}`//策划管理-项目立项-删除
export const prepaContactsList = (bizId, pageSize, currentPageNum) => `api/plan/contacts/list/prepa/${bizId}/${pageSize}/${currentPageNum}`//策划管理-项目立项-联系人list
export const prepaContactsAdd = 'api/plan/contacts'//策划管理-项目立项-联系人-增加(修改)联系人
export const prepaContactsById = (id) => `api/plan/contacts/${id}`//策划管理-项目立项-联系人-获取联系人信息
export const prepaContactsDel = 'api/plan/contacts/delete'//策划管理-项目立项-联系人-删除
export const prepaRelease = (id) => `api/plan/prepa/${id}/release`//策划管理-项目立项-发布
export const prepaTree = (bizId) =>`api/sys/projectteam/prepa/${bizId}/tree`//策划管理-项目立项-项目团队-列表
export const prepaProjectteamAdd = 'api/sys/projectteam'//策划管理-项目立项-项目团队-新增
export const prepaProjectteamUpdata = (teamId)=>`api/sys/projectteam/${teamId}/info`//策划管理-项目立项-项目团队-修改获取
export const prepaProjectteamDel = 'api/sys/projectteam/delete'//策划管理-项目立项-项目团队-删除
export const prepaProjectteamUserTreeAdd = (id) => `api/sys/projectteam/${id}/user/assign`//策划管理-项目立项-项目团队-分配获取
export const prepaProjectteamUserList = (id) => `api/sys/projectteam/${id}/user/list`//策划管理-项目立项-项目团队-用户列表
export const prepaProjectteamUserUpdate = (teamId, userId) =>`api/sys/projectteam/${teamId}/user/${userId}/update`//策划管理-项目立项-项目团队-用户列表-角色修改
export const prepaProjectteamUserDel = 'api/sys/projectteam/user/delete'//策划管理-项目立项-项目团队-用户-删除
export const prepaProjectteamIpt = 'api/sys/ipt/search'//策划管理-项目立项-项目团队-ipt导入list(搜索)
export const prepaProjectteamOrg = 'api/sys/org/search'//策划管理-项目立项-项目团队-组织结构导入list(搜索)
export const prepaProjectteamImportAdd = (dataSource, bizType, bizId, parentId)=>`api/sys/projectteam/${dataSource}/${bizType}/${bizId}/${parentId}/import` //策划管理-项目立项-项目团队-ipt导入(组织结构导入)保存
export const prepaProjectteamProjectList = 'api/plan/project/tree' //策划管理-项目立项-项目团队-其他项目团队导入list(搜索)
export const prepaProjectteamProjectAdd = (sourceBizType, sourceBizId, targetBizType, targetBizId) => `api/sys/projectteam/${sourceBizType}/${sourceBizId}/${targetBizType}/${targetBizId}/copy`//策划管理-项目立项-项目团队-其他项目团队导入保存
//项目群
export const epsTreeList = 'api/plan/eps/tree'//策划管理-项目群list
export const epsAdd = 'api/plan/eps'//策划管理-项目群-新增
export const epsDel = (id) => `api/plan/eps/${id}`//策划管理-项目群-删除
export const epsInfo = (id) => `api/plan/eps/${id}`//策划管理-项目群-获取信息
export const epsAlter = 'api/plan/eps'//策划管理-项目群-修改

//协作团队
export const cprtmList = (bizId, bizType) => `api/plan/cprtm/${bizId}/${bizType}/list`//协作团队list
export const cprtmAdd = 'api/plan/cprtm/assign'//协作团队分配
export const cprtmDel = 'api/plan/cprtm/delete'//协作团队删除
//项目信息
export const getproTileInfo = (pageSize, currentPageNum) => `api/plan/project/list/${pageSize}/${currentPageNum}` //获取项目列表 平铺
export const getproTree = "api/plan/project/tree"   //获取项目列表  树形
export const getproInfo = id => `api/plan/project/${id}`    //获取项目基本信息
export const deleteprolist = id => `api/plan/project/${id}` //删除项目
export const updateproInfo = "api/plan/project"       //更新项目信息 put
export const addproject = "api/plan/project"         //新增项目信息
//基础数据
export const baseDigitDir = (boCode) => `api/base/dictType/${boCode}/list`
export const getToken = 'api/auth/jwt/token' //获取token     post
export const getUserInfo = 'api/sys/login/user/info' //登陆获取用户信息   get
export const addUserInfo = 'api/sys/user/add' //新增用户信息   get
export const getUserInfoList = (pageSize, currentPageNum) => `api/sys/user/list/${pageSize}/${currentPageNum}` //搜索用户列表
export const getUserInfoById = (userId) => `api/sys/user/${userId}/info` //获取用户信息   get
//--字典码值--
export const getDictTypeCodeList = dictTypeCode => `api/base/dict/${dictTypeCode}/treeList`   //字典码值列表
export const deleteDictTypeCode = `api/base/dict/delete`   //删除字典码值
export const addDictTypeCode = `api/base/dict/add`   //新增字典码值
export const getDictTypeCodeInfoById = id => `api/base/dict/${id}/info`   //字典码值基本信息
export const updateDictTypeCode = `api/base/dict/update`   //修改字典码值
//--> 数据字典
export const getDigitDirBoList = 'api/base/digitDirBo/1/list'   //获取业务对象列表
export const geteListByBoCod = boCode => `api/base/dictType/${boCode}/list`   //根据业务对象获取数据字典列表
export const addDigitDirBo = 'api/base/dictType/add'   //添加数据字典
export const deleteDigitDirBo = 'api/base/dictType/delete'   //删除数据字典
export const getInfoByBoId = id => `api/base/dictType/${id}/info`   //根据数据字典id获取详细信息
export const updateDigitDirBo = `api/base/dictType/update`   //修改数据字典
// -->交付物模板
export const getTmpldelvList = (currentPageNum, pageSize) => `api/base/tmpldelv/tree/${currentPageNum}/${pageSize}`   //交付物列表
export const deleteTmpldelvList = id => `api/base/tmpldelv/${id}`   //删除交付物模板\PBS\交付物
export const addTmpldelvList = `api/base/tmpldelv/add`   //新增交付物
export const updateTmpldelvList = `api/base/tmpldelv/update`   //修改交付物
export const getTmpldelvInfoById = id => `api/base/tmpldelv/${id}/info`   //交付物基本信息
export const getTmpldelvSetupInfo = id => `api/base/tmpldelv/${id}/setupinfo`   //交付物设置
export const addTmpldelvPbs = `api/base/tmpldelv/pbs/add`  //新增交付物PBS
export const addTmpldelvSub = `api/base/tmpldelv/sub/add`  //新增下级交付物
//>>分类码
export const getClassifyWf = "api/base/classify/bo/list"  //分类码业务对象集合
export const getClassifyByBoCode = (boCode) => `api/base/classify/${boCode}/list` //获取 分类码列表   get
export const addClassify = "api/base/classify/add"      //新增分类码/码值
export const deleteClassify = "api/base/classify/delete" //删除分类码/码值
export const addClassifyValue = "api/base/classify/value/add"  //新增分类码码值
export const getClassifyOrValueById = (id) => `api/base/classify/${id}/info ` //根据分类码/码值主键查找分类码/码值
export const updateClassifyOrValue = "api/base/classify/update"  // 修改分类码/码值
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
export const menuSearch = 'api/sys/menu/search'//系统管理-菜单管理-搜索
export const orgSearch = 'api/sys/org/search' //系统管理-组织机构-搜索

export const roleLevel = 'api/base/dict/sys.org.level/select/tree ' //系统管理-组织机构-获取机构等级
export const userList = (orgId, pageSize, currentPageNum) => `api/sys/user/select/${orgId}/orgusers/${pageSize}/${currentPageNum}` //系统管理-组织机构-用户列表
export const addUser = 'api/sys/user/add' //系统管理-组织机构-新增用户
export const updateUserInfo = 'api/sys/user/update' //系统管理-组织机构-新增用户
export const roleList = 'api/sys/role/list' //系统管理-角色列表
export const userInfo = (userId) => `api/sys/user/${userId}/info` //系统管理-用户信息
export const deleteUser = 'api/sys/user/delete' //系统管理-删除用户
//系统管理-菜单管理
export const funcFuncs = (id) => `api/sys/func/${id}/funcs`//系统管理-菜单管理-权限配置表
export const funcAdd = 'api/sys/func/add'//系统管理-菜单管理-权限配置表-新增
export const funcDel = 'api/sys/func/delete'//系统管理-菜单管理-权限配置表-删除
export const funcInfo = (id) => `api/sys/func/${id}/funcinfo`//系统管理-菜单管理-权限配置表-修改查询
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
export const baseCoderuleboList = 'api/base/coderulebo/list'//编码规则-业务对象列表
export const addCoderulebo="api/base/coderulebo/add"  //新增业务对象
export const updateCoderulebo="api/base/coderulebo/update" //更新业务对象
export const deleteCoderulebo=id=>`api/base/coderulebo/${id}` //删除业务对象
export const getCoderuleboInfo=id=>`api/base/coderulebo/${id}/info` //获取业务对象
export const ruleAdd = 'api/base/coderule/add' //基础数据-编码规则-新增规则
export const ruleList = (boId) => `api/base/coderule/${boId}/list` //基础数据-编码规则-规则列表
export const deleteRule="api/base/coderule/delete" //删除规则
export const checkRule=ruleId=>`api/base/coderule/${ruleId}/check` //校验规则
export const checkTableName="api/base/coderule/tables"   //查询表名
export const findTableFileds=tableName=>`api/base/coderule/${tableName}/fields` //查询表的field
export const coderulecell=(ruleId,position)=>`api/base/coderulecell/${ruleId}/${position}/info` //规则元素基本信息
export const addCoderulecell="api/base/coderulecell/add"  //新增规则元素
export const updateCoderulecell="api/base/coderulecell/update" //更新规则元素信息
export const getcoderuletype=boId=>`api/base/coderuletype/${boId}/list` //维护规则类型列表
export const addcoderuletype="api/base/coderuletype/add"  //新增维护规则
export const  getdigitDirBo =botype=>`api/base/digitDirBo/${botype}/list` //重定向到字典下拉
export const getcoderuletypeinfo=id=>`api/base/coderuletype/${id}/info` //获取维护规则类型信息
export const updateCoderuletype="api/base/coderuletype/update"    //更新维护规则信息
export const deleteCoderuletype=`api/base/coderuletype/delete`    //删除维护规则信息-逗号隔开删除多条
//基础数据-日历设置
export const calendarList = 'api/base/calendar/list'//基础数据-日历设置-日历设置列表
export const calendarDef = (id) => `api/base/calendar/${id}/default`//基础数据-日历设置-设置默认日历
export const calendarDel = (id) => `api/base/calendar/${id}/delete`//基础数据-日历设置-删除日历设置信息
export const calendarAdd = 'api/base/calendar/add'//基础数据-日历设置-新增日历设置
export const calendarInfo = (id) => `api/base/calendar/${id}/info`//基础数据-日历设置-日历基本信息
export const calendarDefInfo = 'api/base/calendar/default/info'//基础数据-日历设置-日历默认基本信息
export const calendarUpdate = 'api/base/calendar/update'//基础数据-日历设置-修改日历基本信息
export const calendarCopy = (id) => `api/base/calendar/${id}/copy`//基础数据-日历设置-复制
// --> 角色管理
// export const roleList = 'api/sys/role/list'                         //系统管理-角色管理-列表
export const roleAdd = 'api/sys/role/add'                           //系统管理-角色管理-新增
export const roleDelete = 'api/sys/role/delete'                     //系统管理-角色管理-删除
export const roleUpdate2 = 'api/sys/role/update'                     //系统管理-角色管理-修改
export const getRoleInfoById = id => `api/sys/role/${id}/info`       //系统管理-角色管理-根据id获取用户信息
export const getAuthListByRoleId = roleId => `api/sys/auth/${roleId}/list` //根据roleId获取权限列表
export const updateRoleAuth = roleId => `api/sys/auth/${roleId}/update/auth` //修改roleAuth的信息

// --> 全局设置
export const updateSetProject = `api/base/set/project/update`   //保存更新全局设置
export const updateSetDoc = `api/base/set/doc/update`   //修改文档全局设置
export const updateSetTime = `api/base/set/time/update`   //修改时间设置
export const getProjectInfo = `api/base/set/project/info`   //项目全局设置信息
export const getDocInfo = `api/base/set/doc/info`   //文档全局设置信息
export const getTimeInfo = `api/base/set/time/info`   //时间全局设置信息
export const setBolist = `api/base/set/bo/list`   //业务编码

//--> 字典表
export const getBaseSelectTree = typeCode => `api/base/dict/${typeCode}/select/tree`   //保存更新全局设置


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



export const  questionList = (projectId,pageSize,currentPageNum) => `api/comu/question/${projectId}/${pageSize}/${currentPageNum}/list`  //get 沟通管理-获取问题列表
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
export const questionCancelReleaselist = `api/comu/question/${projectId}/cancel/release/list`  // get 问题管理-取消发布列表
export const questionCloselist = projectId =>`api/comu/question/${projectId}/close/list` //get 问题管理 - 关闭列表
export const questionSolvelist = projectId => `api/comu/question/${projectId}/solve/list` //get 问题管理-解决列表
export const questionUpdate = `api/comu/question/update` // put 问题管理-修改问题
export const questionHandleList = questionId =>`api/comu/question/handle/${questionId}/list` // get 问题管理-处理记录
export const questionHandleAdd = `api/comu/question/handle/add` // post 问题管理-新增
export const questionHandleDelete = `api/comu/question/handle/delete`  // delete 问题管理-删除
export const questionHandleInfo = id => `api/comu/question/handle/${id}/info` // get 问题处理-基本信息
export const questionHandleUpdate = `api/comu/question/handle/update` // put 问题处理-修改



export const orgSelectTree = projectId => `api/sys/org/${projectId}/select/tree` //根据项目id获取组织


