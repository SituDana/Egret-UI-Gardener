/**
 * 漂浮消息
 */
class FloatTipControl extends gardener.BaseFloatTip implements gardener.IFloatTip {
	public constructor(msg: string, type = 1, x?: number, y?: number) {
		super();

		this.width = gardener.StageWidth * 0.75;

		this.x = x || (gardener.StageWidth - this.width) * 0.5;
		this.y = y || (gardener.StageHeight - this.height) * 0.5;

		let txtMessage: egret.TextField = new egret.TextField();
		txtMessage.bold = true;
		txtMessage.textAlign = egret.HorizontalAlign.CENTER;
		txtMessage.wordWrap = false;
		txtMessage.width = this.width - 50;
		txtMessage.text = msg;
		txtMessage.x = 25;
		txtMessage.y = 30;

		if (type == 1) {
			// 普通白字
			txtMessage.size = 32;
			txtMessage.textColor = 0xf8a783;
			txtMessage.stroke = 2;
			txtMessage.strokeColor = 0x3e2a04;
		} else if (type == 2) {
			// 红字
			txtMessage.size = 32;
			txtMessage.textColor = 0xFE0110;
			txtMessage.stroke = 2;
			txtMessage.strokeColor = 0xFEFEEF;
		} else if (type == 3) {
			// 黄字
			txtMessage.size = 32;
			txtMessage.textColor = 0xFEFE89;
			txtMessage.stroke = 2;
			txtMessage.strokeColor = 0x98a930;
		}

		this.addChild(txtMessage);
	}

	public dispose(){
		
	}
}