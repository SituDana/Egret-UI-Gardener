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
var WindowEUIDemo_2 = (function (_super) {
    __extends(WindowEUIDemo_2, _super);
    function WindowEUIDemo_2() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/demo/WindowEUIDemo_2Skin.exml";
        return _this;
    }
    WindowEUIDemo_2.prototype.onBtnNewWindow_Tap = function () {
        gardener.openWindowAndSavingPrevious(new WindowDemo_1());
    };
    WindowEUIDemo_2.prototype.onBtnPopup_Tap = function () {
        gardener.openPopup(new PopupEUIDemo());
    };
    WindowEUIDemo_2.prototype.onBtnBack_Tap = function () {
        gardener.closeWindow();
    };
    WindowEUIDemo_2.prototype.display = function () {
        _super.prototype.display.call(this);
        if (!this._isInitCompleted) {
            this._isInitCompleted = true;
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBack_Tap, this);
            this.btnNewWindow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnNewWindow_Tap, this);
            this.btnPopup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPopup_Tap, this);
            // let button2 = new eui.Button();
            // button2.label = "FloatTip";
            // button2.width = 180;
            // button2.x = 220;
            // button2.y = this.height - 200;
            // this.addChild(button2);
            // button2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFloatTipButtonClick, this);
            // this.btnFloatTip = button2;
        }
    };
    WindowEUIDemo_2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBack_Tap, this);
        this.btnNewWindow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnNewWindow_Tap, this);
        this.btnPopup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPopup_Tap, this);
    };
    return WindowEUIDemo_2;
}(gardener.EUIBaseWindow));
__reflect(WindowEUIDemo_2.prototype, "WindowEUIDemo_2", ["gardener.IWindow", "egret.DisplayObject"]);
//# sourceMappingURL=WindowEUIDemo_2.js.map