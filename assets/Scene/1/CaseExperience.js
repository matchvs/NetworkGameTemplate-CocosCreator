cc.Class({
    extends: cc.Component,

    properties: {
        web:cc.WebView,
        back:cc.Button
    },


    onLoad () {
        this.back.node.on('click',this.onBack,this);
    },


    onBack() {
        cc.director.loadScene('index');
    }
    // start () {},

    // update (dt) {},
});
