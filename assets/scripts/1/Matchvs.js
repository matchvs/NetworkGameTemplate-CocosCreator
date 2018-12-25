/**
 * Matchvs JSB加载与Js加载
 */
var engine;
var response;
var MsMatchInfo;
var MsCreateRoomInfo;
var MsRoomFilterEx;
var LocalStore_Clear;

try{
    var jsMatchvs = require("../matchvs/matchvs.all");
    engine = new jsMatchvs.MatchvsEngine();
    response = new jsMatchvs.MatchvsResponse();
    MsMatchInfo = jsMatchvs.MsMatchInfo;
    MsCreateRoomInfo = jsMatchvs.MsCreateRoomInfo;
    MsRoomFilterEx  = jsMatchvs.MsRoomFilterEx ;
    LocalStore_Clear = jsMatchvs.LocalStore_Clear;
    console.log("load matchvs.all.js success");
} catch(error){
    console.error("try load matchvs JS fail,"+error.message);
}



module.exports = {
    engine: engine,
    response: response,
    MsMatchInfo: MsMatchInfo,
    MsCreateRoomInfo: MsCreateRoomInfo,
    MsRoomFilterEx :MsRoomFilterEx ,
    LocalStore_Clear:LocalStore_Clear,
};