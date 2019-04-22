var mvs = require("Matchvs");
var gameData = require('ExamplesData');


function NetWorkEngine() {
}

/**
 * 初始化
 * @param channel 渠道 例如Matchvs
 * @param platform 平台 例如'alpha ,release'
 * @param gameID 游戏ID
 * @param {string} appKey
 */
NetWorkEngine.prototype.init = function (channel, platform, gameID,appKey) {
    var result = mvs.engine.init(mvs.response,channel,platform,gameID,appKey,1);
    console.log("初始化result"+result);
    return result;
}
/**
 * 独立部署使用的初始化接口
 * @param {string} endPoint
 * @param {number} gameID
 * @param {string} appKey
 */
NetWorkEngine.prototype.premiseInit = function (endPoint, gameID,appKey) {
    let result = mvs.engine.premiseInit(mvs.response, endPoint, gameID,appKey);
    console.log("独立部署初始化result"+result);
    return result;
};
/**
 * 注册
 * @returns {number|*}
 */
NetWorkEngine.prototype.registerUser = function() {
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
NetWorkEngine.prototype.login = function(userID,token){
    var DeviceID = 'matchvs';
    var result = mvs.engine.login(userID,token,DeviceID);
    console.log("登录result"+result);
    return result;
};

/**
 * 随机匹配
 * @param mxaNumer 房间最大人数
 * @returns {number}
 */
NetWorkEngine.prototype.joinRandomRoom = function(mxaNumer){
    var result = mvs.engine.joinRandomRoom(mxaNumer,gameData.userName+'进入了房间');
    console.log("随机匹配result"+result);
    return result;
};

/**
 * 关闭房间
 * @returns {number}
 */
NetWorkEngine.prototype.joinOver = function(){
    var result = mvs.engine.joinOver("关闭房间");
    console.log("joinOver result"+result);
    return result;
};

/**
 * 发送消息
 * @param msg
 * @returns {*}
 */
NetWorkEngine.prototype.sendEvent = function (msg) {
    var data =  mvs.engine.sendEvent(msg);
    // console.log("发送信息 result"+ data.result);
    return data.result;
};

/**
 * 离开房间
 * @returns {*|void|number}
 */
NetWorkEngine.prototype.leaveRoom = function () {
    // var obj = {name:Glb.name,profile:'主动离开了房间'};
    var result = mvs.engine.leaveRoom('离开房间');
    // console.log(Glb.name+"主动离开房间result"+result);
    return result;
};

NetWorkEngine.prototype.logout = function () {
    var result = mvs.engine.logout('注销');
    return result;
};


/**
 * 离开房间
 * @returns {*|void|number}
 */
NetWorkEngine.prototype.unInit = function () {
    // var obj = {name:Glb.name,profile:'主动离开了房间'};
    var result = mvs.engine.uninit();
    // console.log(Glb.name+"主动离开房间result"+result);
    return result;
};


module.exports = NetWorkEngine;