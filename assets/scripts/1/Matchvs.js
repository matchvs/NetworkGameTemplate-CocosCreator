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
    engine = new window.MatchvsEngine();
    response = new window.MatchvsResponse();
    MsMatchInfo = window.MsMatchInfo;
    MsCreateRoomInfo = window.MsCreateRoomInfo;
    MsRoomFilterEx  = window.MsRoomFilterEx ;
    LocalStore_Clear = window.LocalStore_Clear;

    console.log(this);
    if(typeof BK != "undefined" ||typeof FBInstant != "undefined"){
        MVS.SetWss&&MVS.SetWss(true);
        console.log("use wss");
    }

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