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
        var bg = new egret.Shape();
        bg.graphics.beginFill(0xf2d296);
        bg.graphics.drawRect(0, 0, _this.width, _this.height);
        bg.graphics.endFill();
        _this.addChild(bg);
        var title = new egret.TextField();
        title.text = 'Demo Scene 1';
        title.size = 45;
        title.bold = true;
        title.textColor = 0x91490f;
        title.width = 400;
        title.textAlign = egret.HorizontalAlign.CENTER;
        title.anchorOffsetX = 200;
        title.x = gardener.StageWidth * .5;
        title.y = 50;
        _this.addChild(title);
        return _this;
    }
    SceneDemo_1.prototype.onFloatTipButtonClick = function () {
        gardener.showFloatTip(new FloatTipControl('this is a tip message', 2));
    };
    /**
     * 点击按钮
     * Click the button
     */
    SceneDemo_1.prototype.onMessageBoxButtonClick = function (e) {
        var _this = this;
        var msg1 = new DemoMessageBox('How about to show another message box?', 2);
        msg1.addConfirmListener(function () {
            var msg2 = new DemoMessageBox('I think you do know how to show a message box.');
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
            des.text = 'Call the interface - \'gardener.loadScene()\' for Loading a scene or switching to another scene.';
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
    SceneDemo_1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.btnMessageBox.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMessageBoxButtonClick, this);
        this.btnFloatTip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFloatTipButtonClick, this);
    };
    return SceneDemo_1;
}(gardener.BaseScene));
__reflect(SceneDemo_1.prototype, "SceneDemo_1", ["gardener.IScene", "egret.DisplayObject"]);
//# sourceMappingURL=SceneDemo_1.js.map