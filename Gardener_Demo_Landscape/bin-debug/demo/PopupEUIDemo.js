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
var PopupEUIDemo = (function (_super) {
    __extends(PopupEUIDemo, _super);
    function PopupEUIDemo() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/demo/PopupEUIDemoSkin.exml";
        _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose_Tap, _this);
        _this.btnLoading.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnLoading_Tap, _this);
        return _this;
    }
    PopupEUIDemo.prototype.onFloatTipButtonClick = function () {
        gardener.showFloatTip(new FloatTipControl('this is a tip message', 2));
    };
    PopupEUIDemo.prototype.onBtnLoading_Tap = function () {
        gardener.showLoadingMask(new LoadingMask());
    };
    /**
     * 点击按钮
     * Click the button
     */
    PopupEUIDemo.prototype.onMessageBoxButtonClick = function (e) {
        this.openMessageBoxes();
    };
    PopupEUIDemo.prototype.openMessageBoxes = function () {
        var _this = this;
        var msg1 = new DemoMessageBox('MessageBoxes come out one by one, and no closing the previous. \'gardener.closeAllMessageBoxes()\ will clear them all right now.', 2);
        msg1.AllowCloseByTapBg = true;
        msg1.addConfirmListener(function () {
            var msg2 = new DemoMessageBox('Tap the backgroud can close them one by one if they set _allowCloseByTapBg = true.', 2);
            msg2.AllowCloseByTapBg = true;
            msg2.addConfirmListener(function () {
                _this.openMessageBoxes();
            }, _this);
            msg2.addCancelListener(function () {
                gardener.closeAllMessageBoxes();
            }, _this);
            gardener.showMessageBox(msg2);
        }, this);
        msg1.addCancelListener(function () {
            gardener.closeAllMessageBoxes();
        }, this);
        gardener.showMessageBox(msg1);
    };
    PopupEUIDemo.prototype.onBtnClose_Tap = function () {
        gardener.closePopup();
    };
    PopupEUIDemo.prototype.display = function () {
        _super.prototype.display.call(this);
        if (!this._isInitCompleted) {
            this._isInitCompleted = true;
            var button = new eui.Button();
            button.label = "MessageBox";
            button.width = 180;
            button.x = 20;
            button.y = this.height - 200;
            this.addChild(button);
            button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMessageBoxButtonClick, this);
            this.btnMessageBox = button;
            var button2 = new eui.Button();
            button2.label = "FloatTip";
            button2.width = 180;
            button2.x = 220;
            button2.y = this.height - 200;
            this.addChild(button2);
            button2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFloatTipButtonClick, this);
            this.btnFloatTip = button2;
        }
    };
    PopupEUIDemo.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.btnMessageBox.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMessageBoxButtonClick, this);
        this.btnFloatTip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFloatTipButtonClick, this);
        this.btnLoading.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLoading_Tap, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose_Tap, this);
    };
    return PopupEUIDemo;
}(gardener.EUIBasePopup));
__reflect(PopupEUIDemo.prototype, "PopupEUIDemo", ["gardener.IPopup", "egret.DisplayObject"]);
//# sourceMappingURL=PopupEUIDemo.js.map