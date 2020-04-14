class WindowEUIDemo_2 extends gardener.EUIBaseWindow implements gardener.IWindow {

	private btnBack: eui.Button;
	private btnNewWindow: eui.Button;
	private btnPopup: eui.Button;

	public constructor() {
		super();

		this.skinName = "resource/eui_skins/demo/WindowEUIDemo_2Skin.exml";
	}

	private onBtnNewWindow_Tap(){
		gardener.openWindowAndSavingPrevious(new WindowDemo_1());
	}

	private onBtnPopup_Tap(){
		gardener.openPopup(new PopupEUIDemo());
	}

	private onBtnBack_Tap(){
		gardener.closeWindow();
	}

	public display(){
		super.display();
		if (!this._isInitCompleted) {
			this._isInitCompleted = true;

			this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBack_Tap, this);
			this.btnNewWindow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnNewWindow_Tap, this);
			this.btnPopup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPopup_Tap, this);

			// let button2 = new eui.Button();
			// button2.label = "FloatTip";
			// button2.width = 180;
			// button2.x = 220;
			// button2.y = this.height - 200;
			// this.addChild(button2);
			// button2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFloatTipButtonClick, this);
			// this.btnFloatTip = button2;
		}
	}

	public dispose(){
		super.dispose();

		this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBack_Tap, this);
		this.btnNewWindow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnNewWindow_Tap, this);
		this.btnPopup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPopup_Tap, this);
	}
}