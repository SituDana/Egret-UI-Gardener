class SceneDemo_1 extends gardener.BaseScene implements gardener.IScene {

	private btnFloatTip: eui.Button;
	private btnMessageBox: eui.Button;

	public sceneName = 'Egret 场景';

	public constructor() {
		super();

		let bg: egret.Bitmap = new egret.Bitmap(RES.getRes("bg_jpg"));
		bg.width = gardener.StageWidth;
		this.addChild(bg);
	}

	private onFloatTipButtonClick() {
		gardener.showFloatTip(new FloatTipControl(gardener.getString('FLOAT_TIP_DEMO'), 2));
	}

    /**
     * 点击按钮
     * Click the button
     */
	private onMessageBoxButtonClick(e: egret.TouchEvent) {
		let msg1: DemoMessageBox = new DemoMessageBox(gardener.getString('MESSAGE_SHOW_ANOTHER'), 2);
		msg1.addConfirmListener(() => {
			let msg2: DemoMessageBox = new DemoMessageBox(gardener.getString('MESSAGE_SHOW_ANOTHER_COVER'));
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

			let button = new eui.Button();
			button.label = "MessageBox";
			button.width = 220;
			button.height = 70;
			button.x = 132;
			button.y = this.height - 270;
			this.addChild(button);
			button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMessageBoxButtonClick, this);
			this.btnMessageBox = button;

			let button2 = new eui.Button();
			button2.label = "FloatTip";
			button2.width = 220;
			button2.height = 70;
			button2.x = this.width - 220 - 132;
			button2.y = this.height - 270;
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