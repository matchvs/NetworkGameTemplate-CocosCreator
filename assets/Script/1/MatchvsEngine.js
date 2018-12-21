var mvs = require("Matchvs");
var examplesData = require('ExamplesData');

function MatchvsEngine() {
}

/**
 * 初始化
 * @param channel 渠道 例如Matchvs
 * @param platform 平台 例如'alpha ,release'
 * @param gameID 游戏ID
 */
MatchvsEngine.prototype.init = function (channel, platform, gameID) {
    var result = mvs.engine.init(mvs.response,channel,platform,gameID);
    console.log("初始化result"+result);
    return result;
}

/**
 * 注册
 * @returns {number|*}
 */
MatchvsEngine.prototype.registerUser = function() {
    var result = mvs.engine.registerUser();
    console.log("注册result"+result);
    return result;
};

/**
 * 注册
 * @param userID
 * @param token
 * @returns {DataView|*|number|void}
 */
MatchvsEngine.prototype.login = function(userID,token){
    var DeviceID = 'abcdef';
    var gatewayID = 0;
    var result = mvs.engine.login(userID,token,examplesData.gameID,examplesData.gameVersion,
        examplesData.appKey,DeviceID,gatewayID);
    console.log("登录result"+result);
    return result;
};

/**
 * 随机匹配
 * @param mxaNumer 房间最大人数
 * @returns {number}
 */
MatchvsEngine.prototype.joinRandomRoom = function(mxaNumer){
    var result = mvs.engine.joinRandomRoom(mxaNumer,examplesData.userName+'进入了房间');
    console.log("随机匹配result"+result);
    return result;
};

/**
 * 关闭房间
 * @returns {number}
 */
MatchvsEngine.prototype.joinOver = function(){
    var result = mvs.engine.joinOver("关闭房间");
    console.log("joinOver result"+result);
    return result;
};

/**
 * 发送消息
 * @param msg
 * @returns {*}
 */
MatchvsEngine.prototype.sendEvent = function (msg) {
    var data =  mvs.engine.sendEvent(msg);
    // console.log("发送信息 result"+ data.result);
    return data.result;
};

/**
 * 离开房间
 * @returns {*|void|number}
 */
MatchvsEngine.prototype.leaveRoom = function () {
    // var obj = {name:Glb.name,profile:'主动离开了房间'};
    var result = mvs.engine.leaveRoom('离开房间');
    // console.log(Glb.name+"主动离开房间result"+result);
    return result;
};

MatchvsEngine.prototype.logout = function () {
    var result = mvs.engine.logout('注销');
    return result;
};


/**
 * 离开房间
 * @returns {*|void|number}
 */
MatchvsEngine.prototype.unInit = function () {
    // var obj = {name:Glb.name,profile:'主动离开了房间'};
    var result = mvs.engine.uninit();
    // console.log(Glb.name+"主动离开房间result"+result);
    return result;
};


module.exports = MatchvsEngine;