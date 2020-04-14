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
var SceneDemo_1 = (function (_super) {
    __extends(SceneDemo_1, _super);
    function SceneDemo_1() {
        var _this = _super.call(this) || this;
        _this.sceneName = 'Egret 场景';
        var bg = new egret.Bitmap(RES.getRes("bg_jpg"));
        bg.width = gardener.StageWidth;
        _this.addChild(bg);
        return _this;
    }
    SceneDemo_1.prototype.onFloatTipButtonClick = function () {
        gardener.showFloatTip(new FloatTipControl(gardener.getString('FLOAT_TIP_DEMO'), 2));
    };
    /**
     * 点击按钮
     * Click the button
     */
    SceneDemo_1.prototype.onMessageBoxButtonClick = function (e) {
        var _this = this;
        var msg1 = new DemoMessageBox(gardener.getString('MESSAGE_SHOW_ANOTHER'), 2);
        msg1.addConfirmListener(function () {
            var msg2 = new DemoMessageBox(gardener.getString('MESSAGE_SHOW_ANOTHER_COVER'));
            msg2.AllowCloseByTapBg = false;
            msg2.addConfirmListener(function () {
                gardener.closeAllMessageBoxes();
            }, _this);
            gardener.showMessageBox(msg2);
        }, this);
        gardener.showMessageBox(msg1);
    };
    SceneDemo_1.prototype.display = function () {
        _super.prototype.display.call(this);
        if (!this._isInitCompleted) {
            this._isInitCompleted = true;
            var des = new egret.TextField();
            des.text = gardener.getString('LABEL_GARDENER_DES');
            des.size = 30;
            des.bold = true;
            des.wordWrap = true;
            des.lineSpacing = 10;
            des.textColor = 0x362e2b;
            des.width = 600;
            // des.textAlign = egret.HorizontalAlign.CENTER;
            des.anchorOffsetX = 300;
            des.x = this.width * .5;
            des.y = 150;
            this.addChild(des);
            var button = new eui.Button();
            button.label = "MessageBox";
            button.width = 220;
            button.height = 70;
            button.x = 132;
            button.y = this.height - 270;
            this.addChild(button);
            button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMessageBoxButtonClick, this);
            this.btnMessageBox = button;
            var button2 = new eui.Button();
            button2.label = "FloatTip";
            button2.width = 220;
            button2.height = 70;
            button2.x = this.width - 220 - 132;
            button2.y = this.height - 270;
            this.addChild(button2);
            button2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFloatTipButtonClick, this);
            this.btnFloatTip = button2;
        }
    };
    SceneDemo_1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.btnMessageBox.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMessageBoxButtonClick, this);
        this.btnFloatTip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFloatTipButtonClick, this);
    };
    return SceneDemo_1;
}(gardener.BaseScene));
__reflect(SceneDemo_1.prototype, "SceneDemo_1", ["gardener.IScene", "egret.DisplayObject"]);
//# sourceMappingURL=SceneDemo_1.js.map