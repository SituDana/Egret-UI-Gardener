module gardener {
	export interface IPopup extends egret.DisplayObject {
		display();
		dispose();
	}
	/**
	 * 弹出窗口基类
	 */
	export class BasePopup extends egret.DisplayObjectContainer {

		// 初始化完成
		protected _isInitCompleted: boolean = false;

		public showPopAnime: boolean = true;

		public constructor() {
			super();
		}

		protected display() {

		}

		protected dispose() {

		}
	}
	/**
	 * eui窗口基类
	 */
	export class EUIBasePopup extends eui.Component {

		// 初始化完成
		protected _isInitCompleted: boolean = false;

		public showPopAnime: boolean = true;

		public constructor() {
			super();
		}

		protected display() {

		}

		protected dispose() {

		}
	}
}