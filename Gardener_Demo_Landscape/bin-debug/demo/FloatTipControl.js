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
/**
 * 漂浮消息
 */
var FloatTipControl = (function (_super) {
    __extends(FloatTipControl, _super);
    function FloatTipControl(msg, type, x, y) {
        if (type === void 0) { type = 1; }
        var _this = _super.call(this) || this;
        _this.width = gardener.StageWidth * 0.75;
        _this.x = x || (gardener.StageWidth - _this.width) * 0.5;
        _this.y = y || (gardener.StageHeight - _this.height) * 0.5;
        var txtMessage = new egret.TextField();
        txtMessage.bold = true;
        txtMessage.textAlign = egret.HorizontalAlign.CENTER;
        txtMessage.wordWrap = false;
        txtMessage.width = _this.width - 50;
        txtMessage.text = msg;
        txtMessage.x = 25;
        txtMessage.y = 30;
        if (type == 1) {
            // 普通白字
            txtMessage.size = 32;
            txtMessage.textColor = 0xf8a783;
            txtMessage.stroke = 2;
            txtMessage.strokeColor = 0x3e2a04;
        }
        else if (type == 2) {
            // 红字
            txtMessage.size = 32;
            txtMessage.textColor = 0xFE0110;
            txtMessage.stroke = 2;
            txtMessage.strokeColor = 0xFEFEEF;
        }
        else if (type == 3) {
            // 黄字
            txtMessage.size = 32;
            txtMessage.textColor = 0xFEFE89;
            txtMessage.stroke = 2;
            txtMessage.strokeColor = 0x98a930;
        }
        _this.addChild(txtMessage);
        return _this;
    }
    FloatTipControl.prototype.dispose = function () {
    };
    return FloatTipControl;
}(gardener.BaseFloatTip));
__reflect(FloatTipControl.prototype, "FloatTipControl", ["gardener.IFloatTip", "egret.DisplayObject"]);
//# sourceMappingURL=FloatTipControl.js.map