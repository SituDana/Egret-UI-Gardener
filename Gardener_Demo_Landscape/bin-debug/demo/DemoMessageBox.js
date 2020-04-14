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
var DemoMessageBox = (function (_super) {
    __extends(DemoMessageBox, _super);
    function DemoMessageBox(msg, type, param) {
        if (type === void 0) { type = 1; }
        var _this = _super.call(this, true) || this;
        _this._type = type;
        if (type === 1) {
            _this.skinName = "resource/eui_skins/demo/CommonMessageSkin.exml";
            _this.btnConfirm.label = "是的";
            _this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.btnConfirm_Tap, _this);
            _this.gpButtons.removeChild(_this.btnCancel);
            _this.lbMessage.text = msg;
        }
        else if (type === 2) {
            _this.skinName = "resource/eui_skins/demo/CommonMessageSkin.exml";
            var lbMessage = _this.lbMessage;
            lbMessage.textColor = 0x41514E;
            _this.btnConfirm.label = "再弹一个";
            _this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.btnConfirm_Tap, _this);
            _this.btnCancel.label = '取消';
            _this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.btnCancel_Tap, _this);
            lbMessage.text = msg;
        }
        return _this;
    }
    DemoMessageBox.prototype.display = function () {
        var tw = egret.Tween.get(this.lbMessage, { loop: true });
        tw.to({ "alpha": 1 }, 200);
        tw.wait(2000);
        tw.to({ "alpha": 0 }, 200);
    };
    DemoMessageBox.prototype.dispose = function () {
        egret.Tween.removeTweens(this.lbMessage);
        this.btnConfirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnConfirm_Tap, this);
        this.btnCancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCancel_Tap, this);
        this._btnConfirmEventFunction = null;
        this._btnConfirmThisObject = null;
        this._btnCancelEventFunction = null;
        this._btnCancelThisObject = null;
    };
    /**
     * 添加确认监听事件
     */
    DemoMessageBox.prototype.addConfirmListener = function (f, thisObj) {
        this._btnConfirmEventFunction = f;
        this._btnConfirmThisObject = thisObj;
    };
    /**
     * 添加取消监听事件
     */
    DemoMessageBox.prototype.addCancelListener = function (f, thisObj) {
        this._btnCancelEventFunction = f;
        this._btnCancelThisObject = thisObj;
    };
    /**
     * 确认
     */
    DemoMessageBox.prototype.btnConfirm_Tap = function () {
        this.confirmEventCaller();
        this.closeMessage();
    };
    /**
     * 取消
     */
    DemoMessageBox.prototype.btnCancel_Tap = function () {
        this.cancelEventCaller();
        this.closeMessage();
    };
    /**
     * 关闭
     */
    DemoMessageBox.prototype.closeMessage = function () {
        gardener.closeMessageBox(this);
    };
    DemoMessageBox.prototype.confirmEventCaller = function () {
        if (this._btnConfirmThisObject && this._btnConfirmEventFunction) {
            this._btnConfirmEventFunction.call(this._btnConfirmThisObject);
        }
    };
    DemoMessageBox.prototype.cancelEventCaller = function () {
        if (this._btnCancelThisObject && this._btnCancelEventFunction) {
            this._btnCancelEventFunction.call(this._btnCancelThisObject);
        }
    };
    return DemoMessageBox;
}(gardener.EUIBaseMessageBox));
__reflect(DemoMessageBox.prototype, "DemoMessageBox");
//# sourceMappingURL=DemoMessageBox.js.map