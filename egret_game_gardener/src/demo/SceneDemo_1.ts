class SceneDemo_1 extends gardener.BaseScene implements gardener.IScene {

	private btnFloatTip: eui.Button;
	private btnMessageBox: eui.Button;

	public constructor() {
		super();

		let bg: egret.Shape = new egret.Shape();
		bg.graphics.beginFill(0xf2d296);
		bg.graphics.drawRect(0, 0, this.width, this.height);
		bg.graphics.endFill();
		this.addChild(bg);

		let title: egret.TextField = new egret.TextField();
		title.text = 'Demo Scene 1';
		title.size = 45;
		title.bold = true;
		title.textColor = 0x91490f;
		title.width = 400;
		title.textAlign = egret.HorizontalAlign.CENTER;
		title.anchorOffsetX = 200;
		title.x = gardener.StageWidth * .5;
		title.y = 50;
		this.addChild(title);
	}

	private onFloatTipButtonClick() {
		gardener.showFloatTip(new FloatTipControl('this is a tip message', 2));
	}

    /**
     * 点击按钮
     * Click the button
     */
	private onMessageBoxButtonClick(e: egret.TouchEvent) {
		let msg1: DemoMessageBox = new DemoMessageBox('How about to show another message box?', 2);
		msg1.addConfirmListener(() => {
			let msg2: DemoMessageBox = new DemoMessageBox('I think you do know how to show a message box.');
			msg2.AllowCloseByTapBg = false;
			msg2.addConfirmListener(() => {
				gardener.closeAllMessageBoxes();
			}, this);
			gardener.showMessageBox(msg2);
		}, this);
		gardener.showMessageBox(msg1);

	}

	public display() {
		super.display();
		if (!this._isInitCompleted) {
			this._isInitCompleted = true;

			let des: egret.TextField = new egret.TextField();
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

			let button = new eui.Button();
			button.label = "MessageBox";
			button.width = 180;
			button.x = 20;
			button.y = this.height - 200;
			this.addChild(button);
			button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMessageBoxButtonClick, this);
			this.btnMessageBox = button;

			let button2 = new eui.Button();
			button2.label = "FloatTip";
			button2.width = 180;
			button2.x = 220;
			button2.y = this.height - 200;
			this.addChild(button2);
			button2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFloatTipButtonClick, this);
			this.btnFloatTip = button2;
		}
	}

	public dispose() {
		super.dispose();
		this.btnMessageBox.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMessageBoxButtonClick, this);
		this.btnFloatTip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFloatTipButtonClick, this);
	}
}