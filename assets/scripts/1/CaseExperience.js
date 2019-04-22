cc.Class({
    extends: cc.Component,

    properties: {
        web:cc.WebView,
        back:cc.Button,
        btnOpenWithBrowser:cc.Button
    },


    onLoad () {
        this.back.node.on('click',this.onBack,this);
        this.btnOpenWithBrowser.node.on('click',this.openWithBrowser,this);
    },


    onBack() {
        cc.director.loadScene('index');
    },
    openWithBrowser(){
        console.log("open ",this.web.url);
        window.open(this.web.url);
    }
    // start () {},

    // update (dt) {},
});
