//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var LoadingMask = (function (_super) {
    __extends(LoadingMask, _super);
    function LoadingMask() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onUnload, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onLoad, _this);
        _this.graphics.beginFill(0, 0);
        _this.graphics.drawRect(0, 0, gardener.StageWidth, gardener.StageHeight);
        _this.graphics.endFill();
        return _this;
    }
    LoadingMask.prototype.onLoad = function () {
        var _this = this;
        var sw = gardener.StageWidth;
        var sh = gardener.StageHeight;
        var leftOrigin = sw * .5 - 45;
        var rightOrigin = sw * .5 + 45;
        this._timeoutId = egret.setTimeout(function () {
            var right = new egret.Shape();
            right.graphics.beginFill(0xfe2312);
            right.graphics.drawEllipse(0, 0, 44, 44);
            right.graphics.endFill();
            right.width = right.height = 44;
            right.anchorOffsetX = 22;
            right.anchorOffsetY = 22;
            right.x = rightOrigin;
            right.y = sh * .5;
            _this._right = right;
            _this.addChild(right);
            var left = new egret.Shape();
            left.graphics.beginFill(0x2423f2);
            left.graphics.drawEllipse(0, 0, 44, 44);
            left.graphics.endFill();
            left.width = left.height = 44;
            left.anchorOffsetX = 22;
            left.anchorOffsetY = 22;
            left.x = leftOrigin;
            left.y = sh * .5;
            _this._left = left;
            _this.addChild(left);
            var fn = function () {
                _this.swapChildren(left, right);
            };
            egret.Tween.get(left, { loop: true }).to({ x: rightOrigin }, 1000, egret.Ease.sineInOut).call(fn, _this).to({ x: leftOrigin }, 1000, egret.Ease.sineInOut).call(fn, _this);
            egret.Tween.get(right, { loop: true }).to({ x: leftOrigin }, 1000, egret.Ease.sineInOut).to({ x: rightOrigin }, 1000, egret.Ease.sineInOut);
            egret.Tween.get(left, { loop: true }).to({ scaleX: 1.2, scaleY: 1.2 }, 500, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.sineOut)
                .to({ scaleX: .8, scaleY: .8 }, 500, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.sineOut);
            egret.Tween.get(right, { loop: true }).to({ scaleX: .8, scaleY: .8 }, 500, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.sineOut)
                .to({ scaleX: 1.2, scaleY: 1.2 }, 500, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.sineOut);
            _this._timeoutId = egret.setTimeout(_this.closeAuto, _this, 8000);
        }, this, 500);
    };
    LoadingMask.prototype.closeAuto = function () {
        gardener.removeLoadingMask(this);
        gardener.showFloatTip(new FloatTipControl(gardener.getString("ERROR_SERVER_NO_RESPONSE")));
    };
    LoadingMask.prototype.onUnload = function () {
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
    return LoadingMask;
}(egret.Sprite));
__reflect(LoadingMask.prototype, "LoadingMask");
//# sourceMappingURL=LoadingMask.js.map