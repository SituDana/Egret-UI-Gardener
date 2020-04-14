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

class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

    private _timeoutId: any;
    private _left: egret.Shape;
    private _right: egret.Shape;

    public constructor() {
        super();
        this.touchEnabled = true;
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onUnload, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onLoad, this);
        this.graphics.beginFill(0, 0);
        this.graphics.drawRect(0, 0, gardener.StageWidth, gardener.StageHeight);
        this.graphics.endFill();
    }

    private onLoad(): void {
        let sw: number = gardener.StageWidth;
        let sh: number = gardener.StageHeight;
        this._timeoutId = egret.setTimeout(() => {
            let left: egret.Shape = new egret.Shape();
            left.graphics.beginFill(0xfe2312);
            left.graphics.drawEllipse(0, 0, 44, 44);
            left.graphics.endFill();
            left.anchorOffsetX = 22;
            left.anchorOffsetY = 22;
            left.x = 410;
            left.y = sh * .5 - 22;
            this._left = left;
            this.addChild(left);

            let right: egret.Shape = new egret.Shape();
            right.graphics.beginFill(0xfe2312);
            right.graphics.drawEllipse(0, 0, 44, 44);
            right.graphics.endFill();
            right.anchorOffsetX = 22;
            right.anchorOffsetY = 22;
            right.x = 310;
            right.y = sh * .5 - 22;
            this._right = right;
            this.addChild(right);
            let fn = () => {
                this.swapChildren(left, right);
            }
            egret.Tween.get(left, { loop: true }).to({ x: 410 }, 1000, egret.Ease.sineInOut).call(fn, this).to({ x: 310 }, 1000, egret.Ease.sineInOut).call(fn, this);
            egret.Tween.get(right, { loop: true }).to({ x: 310 }, 1000, egret.Ease.sineInOut).to({ x: 410 }, 1000, egret.Ease.sineInOut);
            egret.Tween.get(left, { loop: true }).to({ scaleX: 1.2, scaleY: 1.2 }, 500, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.sineOut)
                .to({ scaleX: .8, scaleY: .8 }, 500, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.sineOut);
            egret.Tween.get(right, { loop: true }).to({ scaleX: .8, scaleY: .8 }, 500, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.sineOut)
                .to({ scaleX: 1.2, scaleY: 1.2 }, 500, egret.Ease.sineIn).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.sineOut);

            this._timeoutId = egret.setTimeout(this.closeAuto, this, 15000);
        }, this, 1000);
    }

    private closeAuto() {
        gardener.removeLoadingMask(this);
        gardener.showFloatTip(gardener.getString("ERROR_SERVER_NO_RESPONSE"));
    }

    public onProgress(current: number, total: number): void {
        // this.textField.text = `Loading...${value}%`;
        // this.textField.text = `Loading...${current}/${total}`;
    }

    public onUnload() {
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
    }
}
