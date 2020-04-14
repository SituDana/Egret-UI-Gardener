module gardener {
	export interface IWindow extends egret.DisplayObject {
		display();
		dispose();
	}
	/**
	 * 窗口基类
	 */
	export class BaseWindow extends egret.DisplayObjectContainer {

		// 初始化完成
		protected _isInitCompleted: boolean = false;

		public constructor() {
			super();

			this.width = gardener.WindowContainer.width;
			this.height = gardener.WindowContainer.height;
		}

		protected display() {

		}

		protected dispose() {

		}
	}

	/**
	 * eui窗口基类
	 */
	export class EUIBaseWindow extends eui.Component {

		// 初始化完成
		protected _isInitCompleted: boolean = false;

		public constructor() {
			super();

			this.width = gardener.WindowContainer.width;
			this.height = gardener.WindowContainer.height;
		}

		protected display() {

		}

		protected dispose() {

		}
	}
}