class SceneEUIDemo_2 extends gardener.EUIBaseScene implements gardener.IScene {

	private btnWindow: eui.Button;
	private btnEUIWindow: eui.Button;

	public sceneName = 'EUI 场景';

	public constructor() {
		super();

		this.skinName = "resource/eui_skins/demo/SceneEUIDemo_2Skin.exml";
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