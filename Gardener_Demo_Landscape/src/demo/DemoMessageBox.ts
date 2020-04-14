class DemoMessageBox extends gardener.EUIBaseMessageBox {

	private rectBg: eui.Rect;
	private gpLayout: eui.Group;
	// 按钮容器
	private gpButtons: eui.Group;
	private lbMessage: eui.Label;

	// 确认事件
	public _btnConfirmEventFunction: Function;
	// 取消事件this对象
	public _btnCancelThisObject: any;
	// 取消事件
	public _btnCancelEventFunction: Function;
	// 确认事件this对象
	public _btnConfirmThisObject: any;

	private _type: number;


	// 确定按钮
	private btnConfirm: eui.Button;
	// 取消按钮
	private btnCancel: eui.Button;

	public constructor(msg: string, type: number = 1, param?: any) {
		super(true);

		this._type = type;
		if (type === 1) {
			this.skinName = "resource/eui_skins/demo/CommonMessageSkin.exml";
			this.btnConfirm.label = "是的";
			this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnConfirm_Tap, this);
			this.gpButtons.removeChild(this.btnCancel);
			this.lbMessage.text = msg;
		} else if (type === 2) {
			this.skinName = "resource/eui_skins/demo/CommonMessageSkin.exml";
			let lbMessage = this.lbMessage;
			lbMessage.textColor = 0x41514E;
			this.btnConfirm.label = "再弹一个";
			this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnConfirm_Tap, this);
			this.btnCancel.label = '取消'
			this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCancel_Tap, this);
			lbMessage.text = msg;
		}
	}

	public display(): void {
		let tw = egret.Tween.get(this.lbMessage, { loop: true });
		tw.to({ "alpha": 1 }, 200);
		tw.wait(2000);
		tw.to({ "alpha": 0 }, 200);
	}

	public dispose(): void {
		egret.Tween.removeTweens(this.lbMessage);
		this.btnConfirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnConfirm_Tap, this);
		this.btnCancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCancel_Tap, this);

		this._btnConfirmEventFunction = null;
		this._btnConfirmThisObject = null;
		this._btnCancelEventFunction = null;
		this._btnCancelThisObject = null;
	}

	/**
     * 添加确认监听事件
     */
	public addConfirmListener(f: Function, thisObj: any): void {
		this._btnConfirmEventFunction = f;
		this._btnConfirmThisObject = thisObj;
	}

	/**
     * 添加取消监听事件
     */
	public addCancelListener(f: Function, thisObj: any): void {
		this._btnCancelEventFunction = f;
		this._btnCancelThisObject = thisObj;
	}

	/**
	 * 确认
	 */
	private btnConfirm_Tap() {
		this.confirmEventCaller();
		this.closeMessage();
	}
	/**
	 * 取消
	 */
	private btnCancel_Tap() {
		this.cancelEventCaller();
		this.closeMessage();
	}
	/**
	 * 关闭
	 */
	public closeMessage(): void {
		gardener.closeMessageBox(this);
	}

	private confirmEventCaller() {
		if (this._btnConfirmThisObject && this._btnConfirmEventFunction) {
			this._btnConfirmEventFunction.call(this._btnConfirmThisObject);
		}
	}

	private cancelEventCaller() {
		if (this._btnCancelThisObject && this._btnCancelEventFunction) {
			this._btnCancelEventFunction.call(this._btnCancelThisObject);
		}
	}
}