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
		gardener.showFloatTip(new FloatTipControl('this is a tip message', 2));
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
		let msg1: DemoMessageBox = new DemoMessageBox('MessageBoxes come out one by one, and no closing the previous. \'gardener.closeAllMessageBoxes()\ will clear them all right now.', 2);
		msg1.AllowCloseByTapBg = true;
		msg1.addConfirmListener(() => {
			let msg2: DemoMessageBox = new DemoMessageBox('Tap the backgroud can close them one by one if they set _allowCloseByTapBg = true.', 2);
			msg2.AllowCloseByTapBg = true;
			msg2.addConfirmListener(() => {
				this.openMessageBoxes();
			}, this);
			msg2.addCancelListener(() => {
				gardener.closeAllMessageBoxes();
			}, this)
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
		this.btnLoading.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLoading_Tap, this);
		this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose_Tap, this);
	}
}