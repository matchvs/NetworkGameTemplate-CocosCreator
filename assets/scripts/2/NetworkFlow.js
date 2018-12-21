var engine = require('../1/MatchvsEngine');
var response = require("../1/MatchvsResponse");
var msg = require("../1/MatvhsvsMessage");
var examplesData = require('../1/ExamplesData');

cc.Class({
    extends: cc.Component,

    properties: {
        initButton:cc.Button,
        registerButton:cc.Button,
        loginButton:cc.Button,
        joinRandomRoomButton:cc.Button,
        joinOverButton:cc.Button,
        sendEventButton:cc.Button,
        leaveRoomButton:cc.Button,
        logoutButton:cc.Button,
        unInitButton:cc.Button,
        clearLogButton:cc.Button,
        backHomeButton:cc.Button,

        logListView:{
            default:null,
            type:cc.ScrollView
        },
        logList :[],
        spacing: 0,
        totalCount: 0,
        itemTemplate:{
            default:null,
            type:cc.Node
        },

        userID:0,
        token:''

    },


    onLoad () {
        this.initMatchvsEvent(this);
        this.logList = new  Array();
        this.content = this.logListView.content;
        //初始化按钮点击监听事件
        this.initButton.node.on('click',this.init,this);
        this.registerButton.node.on('click',this.register,this);
        this.loginButton.node.on('click',this.login, this);
        this.joinRandomRoomButton.node.on('click',this.joinRandomRoom, this);
        this.joinOverButton.node.on('click',this.joinOver,this);
        this.sendEventButton.node.on('click',this.sendEvent,this);
        this.leaveRoomButton.node.on('click',this.leaveRoom, this);
        this.logoutButton.node.on('click',this.logout,this);
        this.unInitButton.node.on('click',this.unInit,this);
        this.backHomeButton.node.on('click',this.backHome,this);
        this.clearLogButton.node.on('click',this.clearLog,this);

        this.labelLog('您需要打开两个以上的浏览器进行测试使用');
    },

    /**
     * 注册对应的事件监听和把自己的原型传递进入，用于发送事件使用
     * @param self this
     */
    initMatchvsEvent(self) {
        //在应用开始时手动绑定一下所有的回调事件
        response.prototype.bind();
        response.prototype.init(self);
        this.node.on(msg.MATCHVS_INIT, this.initResponse, this);
        this.node.on(msg.MATCHVS_REGISTER_USER,this.registerUserResponse,this);
        this.node.on(msg.MATCHVS_LOGIN,this.loginResponse,this);
        this.node.on(msg.MATCHVS_JOIN_ROOM_RSP,this.joinRoomResponse,this);
        this.node.on(msg.MATCHVS_JOIN_ROOM_NOTIFY,this.joinRoomNotify,this);
        this.node.on(msg.MATCHVS_JOIN_OVER_RSP,this.joinOverResponse,this);
        this.node.on(msg.MATCHVS_JOIN_OVER_NOTIFY,this.joinOverNotify,this);
        this.node.on(msg.MATCHVS_SEND_EVENT_RSP,this.sendEventResponse,this);
        this.node.on(msg.MATCHVS_SEND_EVENT_NOTIFY,this.sendEventNotify,this);
        this.node.on(msg.MATCHVS_LEAVE_ROOM,this.leaveRoomResponse,this);
        this.node.on(msg.MATCHVS_LEAVE_ROOM_NOTIFY,this.leaveRoomNotify,this);
        this.node.on(msg.MATCHVS_LOGOUT,this.logoutResponse,this);
        this.node.on(msg.MATCHVS_ERROE_MSG,this.errorResponse,this);
    },

    /**
     * 移除监听
     */
    removeEvent() {
        this.node.off(msg.MATCHVS_INIT, this.initResponse, this);
        this.node.off(msg.MATCHVS_REGISTER_USER,this.registerUserResponse,this);
        this.node.off(msg.MATCHVS_LOGIN,this.loginResponse,this);
        this.node.off(msg.MATCHVS_JOIN_ROOM_RSP,this.joinRoomResponse,this);
        this.node.off(msg.MATCHVS_JOIN_ROOM_NOTIFY,this.joinRoomNotify,this);
        this.node.off(msg.MATCHVS_JOIN_OVER_RSP,this.joinOverResponse,this);
        this.node.off(msg.MATCHVS_JOIN_OVER_NOTIFY,this.joinOverNotify,this);
        this.node.off(msg.MATCHVS_SEND_EVENT_RSP,this.sendEventResponse,this);
        this.node.off(msg.MATCHVS_SEND_EVENT_NOTIFY,this.sendEventNotify,this);
        this.node.off(msg.MATCHVS_LEAVE_ROOM,this.leaveRoomResponse,this);
        this.node.off(msg.MATCHVS_LEAVE_ROOM_NOTIFY,this.leaveRoomNotify,this);
        this.node.off(msg.MATCHVS_LOGOUT,this.logoutResponse,this);
        this.node.off(msg.MATCHVS_ERROE_MSG,this.errorResponse,this);
    },

    /**
     * 返回首页
     */
    backHome() {
        cc.director.loadScene('index');
    },

    clearLog() {
        this.logList.length = 0;
        this.content.removeAllChildren(true);
    },

    /**
     * 初始化
     */
    init() {
        var result = engine.prototype.init(examplesData.channel,examplesData.platform,examplesData.gameID);
        this.labelLog('初始化使用的gameID是:'+examplesData.gameID,'如需更换为自己SDK，修改NetworkFlow.js 114行即可');
        this.engineCode(result,'init');
    },

    /**
     * 注册
     */
    register() {
        var result =  engine.prototype.registerUser();
        this.engineCode(result,'registerUser');
    },

    /**
     * 登录
     */
    login() {
        if (this.userID != 0  && this.token != '') {
            var result = engine.prototype.login(this.userID,this.token);
            this.labelLog('登录的账号userID是:'+this.userID);
            if (result == -6) {
                this.labelLog('已登录，请勿重新登录');
            } else if (result === -26){
                this.labelLog('[游戏账户与渠道不匹配，请使用cocos账号登录Matchvs官网创建游戏]：(https://www.matchvs.com/cocos)');
            } else {
                this.engineCode(result,'login');
            }
        } else {
            this.labelLog('请先注册，然后在尝试登录');
        }
    },

    /**
     * 进入房间
     */
    joinRandomRoom() {
        var result = engine.prototype.joinRandomRoom(examplesData.mxaNumer);
        this.engineCode(result,'joinRandomRoom');
    },

    /**
     * 关闭房间
     */
    joinOver() {
        var result = engine.prototype.joinOver();
        this.engineCode(result,'joinOver');
    },

    /**
     * 发送信息
     */
    sendEvent() {
        var eventMsg = ['万剑归宗',' 亢龙有悔','庐山升龙霸 ',' 天马流行拳' ,' 钻石星尘' ,' 凤翼天翔' ,
            '庐山亢龙霸 ','极冻冰棺',' 等离子光速拳','星云锁链'];
        var msg = eventMsg[Math.floor(Math.random()*10)];
        var result = engine.prototype.sendEvent('你使出一招:'+msg);
        this.labelLog('你准备使出一招：'+msg);
        this.engineCode(result,'sendEvent');
    },

    /**
     *  离开房间
     */
    leaveRoom() {
        var result = engine.prototype.leaveRoom();
        this.engineCode(result,'leaveRoom');
    },

    /**
     * 注销
     */
    logout() {
        var result = engine.prototype.logout();
        this.engineCode(result,'logout');
    },

    /**
     * 反初始化
     */
    unInit() {
        var result = engine.prototype.unInit();
        this.engineCode(result,'unInit');
    },


    /**
     * 初始化回调
     * @param info
     */
    initResponse(status) {
        if(status == 200) {
            this.labelLog('initResponse：初始化成功，status：'+status);
        } else {
            this.labelLog('initResponse：初始化失败，status：'+status)
        }
    },


    /**
     * 注册回调
     * @param userInfo
     */
    registerUserResponse(userInfo) {
        if (userInfo.status ==0) {
            this.labelLog('registerUserResponse：注册用户成功,id = '+userInfo.id+'token = '+userInfo.token+'name:'+userInfo.name+
            'avatar:'+userInfo.avatar);
            this.userID = userInfo.id;
            this.token = userInfo.token;
            examplesData.userName = userInfo.name;
        } else {
            this.labelLog('registerUserResponse: 注册用户失败');
        }
    },

    /**
     * 登陆回调
     * @param MsLoginRsp
     */
    loginResponse(MsLoginRsp) {
        if (MsLoginRsp.status == 200) {
            this.labelLog('loginResponse: 登录成功');
        } else if (MsLoginRsp.status == 402){
            this.labelLog('loginResponse: 应用校验失败，确认是否在未上线时用了release环境，并检查gameID、appkey 和 secret');
        } else if (MsLoginRsp.status == 403) {
            this.labelLog('loginResponse：检测到该账号已在其他设备登录');
        } else if (MsLoginRsp.status == 404) {
            this.labelLog('loginResponse：无效用户 ');
        } else if (MsLoginRsp.status == 500) {
            this.labelLog('loginResponse：服务器内部错误');
        }
    },

    /**
     * 进入房间回调
     * @param status
     * @param userInfoList
     * @param roomInfo
     */
    joinRoomResponse(status, userInfoList, roomInfo) {
        if (status == 200) {
            this.labelLog('joinRoomResponse: 进入房间成功：房间ID为：'+roomInfo.roomID+'房主ID：'+roomInfo.ownerId+'房间属性为：'+roomInfo.roomProperty);
            for(var i = 0; i < userInfoList.length;i++) {
                this.labelLog('joinRoomResponse：房间的玩家ID是'+userInfoList[i].userID);
            }
            if (userInfoList.length == 0) {
                this.labelLog('joinRoomResponse：房间暂时无其他玩家');
            }
        } else {
            this.labelLog('joinRoomResponse：进入房间失败');
        }
    },

    /**
     * 其他玩家加入房间通知
     * @param roomUserInfo
     */
    joinRoomNotify(roomUserInfo) {
        this.labelLog('joinRoomNotify：加入房间的玩家ID是'+roomUserInfo.userID);
    },

    /**
     * 关闭房间成功
     * @param joinOverRsp
     */
    joinOverResponse(joinOverRsp) {
        if (joinOverRsp.status == 200) {
            this.labelLog('joinOverResponse: 关闭房间成功');
        } else if (joinOverRsp.status == 400){
            this.labelLog('joinOverResponse: 客户端参数错误 ');
        } else if (joinOverRsp.status == 403) {
            this.labelLog('joinOverResponse: 该用户不在房间 ');
        } else if (joinOverRsp.status == 404) {
            this.labelLog('joinOverResponse: 用户或房间不存在');
        } else if (joinOverRsp.status == 500) {
            this.labelLog('joinOverResponse: 服务器内部错误');
        }
    },

    /**
     * 关闭房间通知
     * @param notifyInfo
     */
    joinOverNotify(notifyInfo) {
        this.labelLog('joinOverNotify：用户'+notifyInfo.srcUserID+'关闭了房间，房间ID为：'+notifyInfo.roomID);
    },

    /**
     * 发送消息回调
     * @param sendEventRsp
     */
    sendEventResponse(sendEventRsp) {
        if (sendEventRsp.status == 200) {
            this.labelLog('sendEventResponse：发送消息成功');
        } else {
            this.labelLog('sendEventResponse：发送消息失败');
        }
    },

    /**
     * 接收到其他用户消息通知
     * @param eventInfo
     */
    sendEventNotify(eventInfo) {
        this.labelLog('sendEventNotify：用户'+eventInfo.srcUserID+'对你使出了一招'+eventInfo.cpProto);
    },

    /**
     * 离开房间回调
     * @param leaveRoomRsp
     */
    leaveRoomResponse(leaveRoomRsp) {
        if (leaveRoomRsp.status == 200) {
            this.labelLog('leaveRoomResponse：离开房间成功，房间ID是'+leaveRoomRsp.roomID);
        } else if (leaveRoomRsp.status == 400) {
            this.labelLog('leaveRoomResponse：客户端参数错误,请检查参数');
        } else if (leaveRoomRsp.status == 404) {
            this.labelLog('leaveRoomResponse：房间不存在')
        } else if (leaveRoomRsp.status == 500) {
            this.labelLog('leaveRoomResponse：服务器错误');
        }
    },

    /**
     * 其他离开房间通知
     * @param leaveRoomInfo
     */
    leaveRoomNotify(leaveRoomInfo) {
        this.labelLog('leaveRoomNotify：'+leaveRoomInfo.userID+'离开房间，房间ID是'+leaveRoomInfo.roomID);
    },

    /**
     * 注销回调
     * @param status
     */
    logoutResponse(status) {
        if (status == 200) {
            this.labelLog('logoutResponse：注销成功');
        } else if (status == 500) {
            this.labelLog('logoutResponse：注销失败，服务器错误');
        }

    },

    /**
     * 错误信息回调
     * @param errorCode
     * @param errorMsg
     */
    errorResponse(errorCode,errorMsg) {
        this.labelLog('errorMsg:'+errorMsg+'errorCode:'+errorCode);
    },


    /**
     * 页面log打印
     * @param info
     */
    labelLog: function (info) {
        this.logList.push(info);
        this.totalCount  = this.logList.length;
        this.content.height = this.totalCount*(this.itemTemplate.height + this.spacing) + this.spacing;
        this.content.removeAllChildren(true);
        for(var i = 0; i < this.logList.length;i++) {
            var item = cc.instantiate(this.itemTemplate);
            this.content.addChild(item);
            item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
            item.getComponent('Item').updateItem(this.logList[i]);
        }

    },


    engineCode:function (code,engineName) {
        switch (code) {
            case 0:
                this.labelLog(engineName+'调用成功');
                break;
            case -1:
                this.labelLog(engineName+'调用失败');
                break;
            case -2:
                this.labelLog('尚未初始化，请先初始化再进行'+engineName+'操作');
                break;
            case -3:
                this.labelLog('正在初始化，请稍后进行'+engineName+'操作');
                break;
            case -4:
                this.labelLog('尚未登录，请先登录再进行'+engineName+'操作');
                break;
            case -5:
                this.labelLog('已经登录，请勿重复登陆');
                break;
            case -6:
                this.labelLog('尚未加入房间，请稍后进行'+engineName+'操作');
                break;
            case -7:
                this.labelLog('正在创建或者进入房间,请稍后进行'+engineName+'操作');
                break;
            case -8:
                this.labelLog('已经在房间中');
                break;
            case -20:
                this.labelLog('maxPlayer超出范围 0 < maxPlayer ≤ 20');
                break;
            case -21:
                this.labelLog('userProfile 过长，不能超过512个字符');
                break;
            case -25:
                this.labelLog(engineName+'channel 非法，请检查是否正确填写为 “Matchvs”');
                break;
            case -26:
                this.labelLog(engineName+'：platform 非法，请检查是否正确填写为 “alpha” 或 “release”');
                break;


        }
    },

    onDestroy() {
        this.removeEvent();
    }
    // start () {},
    // update (dt) {},
});
