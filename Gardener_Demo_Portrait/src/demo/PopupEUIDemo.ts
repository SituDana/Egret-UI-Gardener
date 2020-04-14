class PopupEUIDemo extends gardener.EUIBasePopup implements gardener.IPopup {

	private btnClose: eui.Button;
	private btnFloatTip: eui.Button;
	private btnMessageBox: eui.Button;
	private btnLoading: eui.Button;

	public constructor() {
		super();

		this.skinName = "resource/eui_skins/demo/PopupEUIDemoSkin.exml";

		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose_Tap, this);
		this.btnLoading.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLoading_Tap, this);
	}

	private onFloatTipButtonClick() {
		gardener.showFloatTip(new FloatTipControl(gardener.getString('FLOAT_TIP_DEMO'), 2));
	}

	private onBtnLoading_Tap(){
		gardener.showLoadingMask(new LoadingMask());
	}

    /**
     * 点击按钮
     * Click the button
     */
	private onMessageBoxButtonClick(e: egret.TouchEvent) {

		this.openMessageBoxes();
	}

	private openMessageBoxes() {
		let msg1: DemoMessageBox = new DemoMessageBox(gardener.getString('MESSAGE_CLOSE_MESSAGEBOX'), 2);
		msg1.AllowCloseByTapBg = true;
		msg1.addConfirmListener(() => {
			let msg2: DemoMessageBox = new DemoMessageBox(gardener.getString('MESSAGE_CLOSE_BY_TAP_BG'), 2);
			msg2.AllowCloseByTapBg = true;
			msg2.addConfirmListener(() => {
				this.openMessageBoxes();
			}, this);
			gardener.showMessageBox(msg2);
		}, this);
		msg1.addCancelListener(() => {
			gardener.closeAllMessageBoxes();
		}, this)
		gardener.showMessageBox(msg1);
	}

	private onBtnClose_Tap() {
		gardener.closePopup();
	}

	public display() {
		super.display();
		if (!this._isInitCompleted) {
			this._isInitCompleted = true;

			let button = new eui.Button();
			button.skinName = 'resource/eui_skins/demo/ButtonGreenSkin.exml'
			button.label = "MessageBox";
			button.width = 300;
			button.height = 70;
			button.x = (this.width - 300) * .5;
			button.y = this.height - 170;
			this.addChild(button);
			button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMessageBoxButtonClick, this);
			this.btnMessageBox = button;

			let button2 = new eui.Button();
			button2.skinName = 'resource/eui_skins/demo/ButtonGreenSkin.exml'
			button2.label = "FloatTip";
			button2.width = 300;
			button2.height = 70;
			button2.x = (this.width - 300) * .5;
			button2.y = this.height - 250;
			this.addChild(button2);
			button2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFloatTipButtonClick, this);
			this.btnFloatTip = button2;
		}
	}

	public dispose() {
		super.dispose();

		this.btnMessageBox.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMessageBoxButtonClick, this);
		this.btnFloatTip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFloatTipButtonClick, this);
		this.btnLoading.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLoading_Tap, this);
		this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose_Tap, this);
	}
}