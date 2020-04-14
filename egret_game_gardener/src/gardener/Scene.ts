module gardener {
	export interface IScene extends egret.DisplayObject {
		display();
		dispose();
	}
	/**
 * 场景
 */
	export class BaseScene extends egret.DisplayObjectContainer {

		// 是否初始化完成
		protected _isInitCompleted: boolean = false;

		public constructor() {
			super();

			this.height = gardener.StageHeight;
			this.width = gardener.StageWidth;
		}

		protected display() {

		}

		protected dispose() {

		}
	}

	export class EUIBaseScene extends eui.Component {

		// 初始化完成
		protected _isInitCompleted: boolean = false;

		public constructor() {
			super();

			this.height = gardener.StageHeight;
			this.width = gardener.StageWidth;
		}

		protected display() {

		}

		protected dispose() {

		}
	}
}