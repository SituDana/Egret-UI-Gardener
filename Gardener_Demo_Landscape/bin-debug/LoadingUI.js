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
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onUnload, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onLoad, _this);
        _this.graphics.beginFill(0, 0);
        _this.graphics.drawRect(0, 0, gardener.StageWidth, gardener.StageHeight);
        _this.graphics.endFill();
        return _this;
    }
    LoadingUI.prototype.onLoad = function () {
        var _this = this;
        var sw = gardener.StageWidth;
        var sh = gardener.StageHeight;
        this._timeoutId = egret.setTimeout(function () {
            var left = new egret.Shape();
            left.graphics.beginFill(0xfe2312);
            left.graphics.drawEllipse(0, 0, 44, 44);
            left.graphics.endFill();
            left.anchorOffsetX = 22;
            left.anchorOffsetY = 22;
            left.x = 410;
            left.y = sh * .5 - 22;
            _this._left = left;
            _this.addChild(left);
            var right = new egret.Shape();
            right.graphics.beginFill(0xfe2312);
            right.graphics.drawEllipse(0, 0, 44, 44);
            right.graphics.endFill();
            right.anchorOffsetX = 22;
            right.anchorOffsetY = 22;
            right.x = 310;
            right.y = sh * .5 - 22;
            _this._right = right;
            _this.addChild(right);
            var fn = function () {
                _this.swapChildren(left, right);
            };
            egret.Tween.get(left, { loop: true }).to({ x: 410 }, 1000, egret.Ease.sineInOut).call(fn, _this).to({ x: 310 }, 1000, egret.Ease.sineInOut).call(fn, _this);
            egret.Tween.get(right, { loop: true }).to({ x: 310 }, 1000, egret.Ease.sineInOut).to({ x: 410 }, 1000, egret.Ease.sineInOut);
            egret.Tween.get(left, { loop: true }).to({ scaleX: 1.2, scaleY: 1.2 }, 500, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.sineOut)
                .to({ scaleX: .8, scaleY: .8 }, 500, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.sineOut);
            egret.Tween.get(right, { loop: true }).to({ scaleX: .8, scaleY: .8 }, 500, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.sineOut)
                .to({ scaleX: 1.2, scaleY: 1.2 }, 500, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.sineOut);
            _this._timeoutId = egret.setTimeout(_this.closeAuto, _this, 15000);
        }, this, 1000);
    };
    LoadingUI.prototype.closeAuto = function () {
        gardener.removeLoadingMask(this);
        gardener.showFloatTip(gardener.getString("ERROR_SERVER_NO_RESPONSE"));
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        // this.textField.text = `Loading...${value}%`;
        // this.textField.text = `Loading...${current}/${total}`;
    };
    LoadingUI.prototype.onUnload = function () {
        this.graphics.clear();
        if (this._left) {
            egret.Tween.removeTweens(this._left);
        }
        if (this._right) {
            egret.Tween.removeTweens(this._right);
        }
        if (this._timeoutId) {
            egret.clearTimeout(this._timeoutId);
        }
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onUnload, this);
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onLoad, this);
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//# sourceMappingURL=LoadingUI.js.map