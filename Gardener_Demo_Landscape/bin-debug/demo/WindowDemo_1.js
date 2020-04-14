var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var WindowDemo_1 = (function (_super) {
    __extends(WindowDemo_1, _super);
    function WindowDemo_1() {
        var _this = _super.call(this) || this;
        _this._animeIndex = 0;
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x80dcaf);
        bg.graphics.drawRect(0, 0, _this.width, _this.height);
        bg.graphics.endFill();
        _this.addChild(bg);
        var title = new egret.TextField();
        title.text = 'Demo Window 1';
        title.size = 40;
        title.bold = true;
        title.textColor = 0x91490f;
        title.width = 400;
        title.textAlign = egret.HorizontalAlign.CENTER;
        title.anchorOffsetX = 200;
        title.x = _this.width * .5;
        title.y = 100;
        _this.addChild(title);
        return _this;
    }
    WindowDemo_1.prototype.showDbbinAnime = function (resName, armatureName, animationName) {
        var anime = gardener.dbGenerateDbbinAnime(resName, armatureName, true, true);
        anime.x = gardener.StageWidth * .3 + 30 * this._animeIndex++;
        anime.y = gardener.StageHeight * .3 + 30 * this._animeIndex++;
        this.addChild(anime);
        egret.Tween.get(anime).wait(50).call(function () {
            anime.animation.play(animationName, 2);
        }, this);
    };
    WindowDemo_1.prototype.showMovieClipAnime = function (resName, animationName) {
        var anime = gardener.dbGenerateMovieClip(resName, true, true);
        anime.x = gardener.StageWidth * .3 + 30 * this._animeIndex++;
        anime.y = gardener.StageHeight * .3 + 30 * this._animeIndex++;
        this.addChild(anime);
        egret.Tween.get(anime).wait(50).call(function () {
            anime.animation.play(animationName, 0);
        }, this);
    };
    WindowDemo_1.prototype.onBtnBack_Tap = function () {
        gardener.closeWindow();
    };
    WindowDemo_1.prototype.onBtnDbbinAnime_Tap = function () {
        this.showDbbinAnime('daojishi', 'MovieClip', 'newAnimation');
    };
    // private onBtnMovieClipAnime_Tap(){
    // 	this.showMovieClipAnime('rengxueqiu02', 'newAnimation');
    // }
    WindowDemo_1.prototype.display = function () {
        _super.prototype.display.call(this);
        if (!this._isInitCompleted) {
            this._isInitCompleted = true;
            var des = new egret.TextField();
            des.text = 'When to close the current window, the previous window slides in if you saved it before.';
            des.size = 30;
            des.bold = true;
            des.wordWrap = true;
            des.lineSpacing = 10;
            des.textColor = 0x362e2b;
            des.width = 600;
            des.textAlign = egret.HorizontalAlign.CENTER;
            des.anchorOffsetX = 300;
            des.x = this.width * .5;
            des.y = (this.height - des.textHeight) * .5;
            this.addChild(des);
            var button = new eui.Button();
            button.label = "Go Back";
            button.width = 180;
            button.x = 20;
            button.y = 20;
            this.addChild(button);
            button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBack_Tap, this);
            this.btnBack = button;
            var button2 = new eui.Button();
            button2.label = "Dbbin Anime";
            button2.width = 220;
            button2.x = 100;
            button2.y = this.height - 200;
            this.addChild(button2);
            button2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDbbinAnime_Tap, this);
            this.btnShowAnime = button2;
            // let button3 = new eui.Button();
            // button3.label = "MoviClip Anime";
            // button3.width = 220;
            // button3.x = 350;
            // button3.y = this.height - 200;
            // this.addChild(button3);
            // button3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMovieClipAnime_Tap, this);
            // this.btnMovieClip = button3;
            gardener.dbStartDbWorldClock();
        }
    };
    WindowDemo_1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        // gardener.dbDisposeDbbinAnime(this.anime1);
        gardener.dbDisposeDbbinFactoryData('daojishi');
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBack_Tap, this);
    };
    return WindowDemo_1;
}(gardener.BaseWindow));
__reflect(WindowDemo_1.prototype, "WindowDemo_1", ["gardener.IWindow", "egret.DisplayObject"]);
//# sourceMappingURL=WindowDemo_1.js.map