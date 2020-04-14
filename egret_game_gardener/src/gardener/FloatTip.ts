module gardener {

	export interface IFloatTip extends egret.DisplayObject {
		dispose();
	}

	export class BaseFloatTip extends egret.DisplayObjectContainer {
		public constructor() {
			super();
		}
	}

	export class EUIBaseFloatTip extends eui.Component {
		public constructor() {
			super();
		}
	}
}
