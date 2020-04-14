class SceneEUIDemo_2 extends gardener.EUIBaseScene implements gardener.IScene {

	private btnWindow: eui.Button;
	private btnEUIWindow: eui.Button;

	public constructor() {
		super();

		this.skinName = "resource/eui_skins/demo/SceneEUIDemo_2Skin.exml";
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

	private onBtnWindow_Tap(){
		gardener.openWindow(new WindowDemo_1());
	}

	private onBtnEUIWindow_Tap(){
		gardener.openWindow(new WindowEUIDemo_2());
	}

	public display() {
		super.display();
		if (!this._isInitCompleted) {
			this._isInitCompleted = true;

			this.btnWindow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnWindow_Tap, this);
			this.btnEUIWindow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnEUIWindow_Tap, this);
		}
	}

	public dispose() {
		super.dispose();
		this.btnWindow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnWindow_Tap, this);
        this.btnEUIWindow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnEUIWindow_Tap, this);
	}
}