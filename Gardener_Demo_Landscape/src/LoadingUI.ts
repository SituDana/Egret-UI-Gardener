
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
