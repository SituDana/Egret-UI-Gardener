module gardener {
	export interface IMessageBox extends egret.DisplayObject {
		display();
		dispose();
		AllowCloseByTapBg: boolean;
	}

	export class BaseMessageBox extends egret.DisplayObjectContainer {

		// 点击背景是否允许关闭弹窗
		protected _allowCloseByTapBg: boolean = false;

		public set AllowCloseByTapBg(value: boolean) {
			this._allowCloseByTapBg = value;
		}

		public get AllowCloseByTapBg(): boolean{
			return this._allowCloseByTapBg;
		}

		// 弹出多个时候是否偏移显示
		protected _allowMultipleOffsetPosition: boolean = true;

		public set AllowMultipleOffsetPosition(value: boolean) {
			this._allowMultipleOffsetPosition = value;
		}

		public get AllowMultipleOffsetPosition(): boolean{
			return this._allowMultipleOffsetPosition;
		}

		public constructor(allowCloseBuyTapBg: boolean = false) {
			super();

			this._allowCloseByTapBg = allowCloseBuyTapBg;
		}

	}

	export class EUIBaseMessageBox extends eui.Component {

		// 点击背景是否允许关闭弹窗
		protected _allowCloseByTapBg: boolean = false;

		public set AllowCloseByTapBg(value: boolean) {
			this._allowCloseByTapBg = value;
		}

		public get AllowCloseByTapBg(): boolean{
			return this._allowCloseByTapBg;
		}

		// 弹出多个时候是否偏移显示
		protected _allowMultipleOffsetPosition: boolean = true;

		public set AllowMultipleOffsetPosition(value: boolean) {
			this._allowMultipleOffsetPosition = value;
		}

		public get AllowMultipleOffsetPosition(): boolean{
			return this._allowMultipleOffsetPosition;
		}

		public constructor(allowCloseBuyTapBg: boolean = false) {
			super();

			this._allowCloseByTapBg = allowCloseBuyTapBg;
		}

	}
}