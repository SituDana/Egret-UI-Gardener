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
var SceneEUIDemo_2 = (function (_super) {
    __extends(SceneEUIDemo_2, _super);
    function SceneEUIDemo_2() {
        var _this = _super.call(this) || this;
        _this.sceneName = 'EUI 场景';
        _this.skinName = "resource/eui_skins/demo/SceneEUIDemo_2Skin.exml";
        return _this;
    }
    SceneEUIDemo_2.prototype.onBtnWindow_Tap = function () {
        gardener.openWindow(new WindowDemo_1());
    };
    SceneEUIDemo_2.prototype.onBtnEUIWindow_Tap = function () {
        gardener.openWindow(new WindowEUIDemo_2());
    };
    SceneEUIDemo_2.prototype.display = function () {
        _super.prototype.display.call(this);
        if (!this._isInitCompleted) {
            this._isInitCompleted = true;
            this.btnWindow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnWindow_Tap, this);
            this.btnEUIWindow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnEUIWindow_Tap, this);
        }
    };
    SceneEUIDemo_2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.btnWindow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnWindow_Tap, this);
        this.btnEUIWindow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnEUIWindow_Tap, this);
    };
    return SceneEUIDemo_2;
}(gardener.EUIBaseScene));
__reflect(SceneEUIDemo_2.prototype, "SceneEUIDemo_2", ["gardener.IScene", "egret.DisplayObject"]);
//# sourceMappingURL=SceneEUIDemo_2.js.map