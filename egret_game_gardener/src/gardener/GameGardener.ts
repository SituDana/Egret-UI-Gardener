/**
 * GameGardener —— An Egret Game UI Framework
 * @version 1.0
 * @author jiajun
 */

module gardener {
	/**
	 * gardener 全局配置
	 */
	export var Configuration;
	/**
	 * 字符串模板json对象
	 */
	export var StringResourceJson;
	/**
	 * 全局高度
	 */
	export var StageHeight;
	/**
	 * 全局宽度
	 */
	export var StageWidth;
	/**
	 * Scene容器
	 */
	export var SceneContainer;
	/**
	 * Window容器
	 */
	export var WindowContainer;
	/**
	 * Popup容器
	 */
	export var PopupContainer;
	/**
	 * MessageBox容器
	 */
	export var MessageContainer;
	/**
	 * 导航层
	 */
	export var NavigatorContainer;
	/**
	 * gardener全局单例对象
	 */
	export var _instance: gardener.Gardener;

	/**
	 * 获取文本字符串模板
	 * @param key string 字符串对应的键值
	 * @param replaceValues string[] 动态替换字符串模板中的参数。模板例子：欢迎{0}来到游戏{1}区...
	 * @return 文本字符串
	 */
	export function getString(key: string, ...replaceValues: string[]) {
		if (gardener.StringResourceJson) {
			return replaceValues ? gardener.StringResourceJson[key].format(...replaceValues) : gardener.StringResourceJson[key];
		} else {
			return '';
		}
	}

	/**
	 * Gardner，游戏框架主类，轻量级游戏UI框架，兼容横屏竖屏
	 */
	export class Gardener extends egret.EventDispatcher {

		/**
		 * 单例对象
		 */
		private static __instance: gardener.Gardener;

		/**
		 * 全局Main对象
		 */
		public __mainContainer: egret.DisplayObjectContainer;
		/**
		 * Scene层容器，游戏最底层
		 */
		public __sceneContainer: egret.DisplayObjectContainer;
		/**
		 * Window层容器，Sprite类型，可以设置底色，在Scene层之上，导航层之下
		 */
		public __windowContainer: egret.Sprite;
		/**
		 * 导航层，在Scene,Window层之上，popup层之下
		 */
		public __navigatorContainer: egret.DisplayObjectContainer;
		/**
		 * Popup层，在导航层之上，message层之下
		 */
		public __popupContainer: egret.Sprite;
		/**
		 * messagebox 层，Popup层之上
		 */
		public __messageContainer: egret.Sprite;

		// window历史列表，不包含当前当前打开的window
		public __windowHistoryList: Array<IWindow> = new Array<IWindow>();


		private constructor(main: egret.DisplayObjectContainer, config?: any) {
			super();
			this.__mainContainer = main;

			// 初始化各层容器
			this.__initContainers(main, config);
		}

		/**
		 * 初始化所有容器
		 */
		private __initContainers(main: egret.DisplayObjectContainer, config: any) {
			let sceneContainer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
			sceneContainer.width = config.stageWidth;
			sceneContainer.height = config.stageHeight;
			gardener.SceneContainer = this.__sceneContainer = sceneContainer;
			main.addChild(this.__sceneContainer);

			let windowContainer = new egret.Sprite();
			windowContainer.width = config.stageWidth;
			windowContainer.height = config.stageHeight;
			windowContainer.graphics.beginFill(config.windowContainerMaskColor, config.windowContainerMaskAlpha);
			windowContainer.graphics.drawRect(0, 0, windowContainer.width, windowContainer.height);
			windowContainer.graphics.endFill();
			windowContainer.touchEnabled = true;
			main.addChild(windowContainer);
			gardener.WindowContainer = this.__windowContainer = windowContainer;

			if (config.navigatorContainerAvailable === true) {
				let navigatorContainer = new egret.DisplayObjectContainer();
				navigatorContainer.width = config.stageWidth;
				navigatorContainer.height = config.stageHeight;
				navigatorContainer.touchEnabled = false;
				navigatorContainer.touchChildren = true;
				main.addChild(navigatorContainer);
				gardener.NavigatorContainer = this.__navigatorContainer = navigatorContainer;
			}

			let popupContainer = new egret.Sprite();
			popupContainer.width = config.stageWidth;
			popupContainer.height = config.stageHeight;
			popupContainer.graphics.beginFill(config.popupContainerMaskColor, config.popupContainerMaskAlpha);
			popupContainer.graphics.drawRect(0, 0, popupContainer.width, popupContainer.height);
			popupContainer.graphics.endFill();
			popupContainer.touchEnabled = true;
			popupContainer.visible = false;
			main.addChild(popupContainer);
			gardener.PopupContainer = this.__popupContainer = popupContainer;

			let messageContainer = new egret.Sprite();
			messageContainer.width = config.stageWidth;
			messageContainer.height = config.stageHeight;
			messageContainer.graphics.beginFill(config.messageContainerMaskColor, config.messageContainerMaskAlpha);
			messageContainer.graphics.drawRect(0, 0, messageContainer.width, messageContainer.height);
			messageContainer.graphics.endFill();
			messageContainer.touchEnabled = true;
			messageContainer.visible = false;
			messageContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onMessageContainerBg_Tap, this);
			main.addChild(messageContainer);
			gardener.MessageContainer = this.__messageContainer = messageContainer;
		}

		/**
		 * 初始化Gardener
		 * main 白鹭项目启动类 Main
		 * config {
				navigatorContainerAvailable: boolean,	是否启用导航层
				stringResName: string,					全局本地化文本字符串配置文件，json格式， 通过gardener.getString(key)来获取
				orientation: string,					App窗口方向，默认是项目设定的方向
				stageWidth: number,						自定义游戏窗口宽度，默认是全屏窗口宽度
				stageHeight: number,					自定义游戏窗口高度，默认是全屏窗口高度
				windowContainerMaskColor: number,		Window层遮罩颜色，默认是黑色0x000000
				windowContainerMaskAlpha: number,		Window层这招不透明度，默认是0
				popupContainerMaskColor: number,		Popup层遮罩颜色，默认是黑色0x000000
				popupContainerMaskAlpha: number,		Popup层遮罩不透明度，默认是0
				messageContainerMaskColor: number,		MessageBox层遮罩颜色，默认0x000000
				messageContainerMaskAlpha: number,		MessageBox层遮罩不透明度，默认0
				popupPositionHori: number,				Popup对象全局水平位置，默认是中间0.5
				popupPositionVert: number,				Popup对象全局垂直位置，默认是中间0.5
				allowMultipleMessageBoxes: boolean,		是否允许MessageBox可以弹出多层，每层独立，默认是true，如果为false，新弹出的messagebox会关闭前一个
				showMultipleMessageBoxesOffset: number	当allowMultipleMessageBoxes=true的时候，后一个相比前一个messagebox是否有错位显示，默认是10}
		* @param main 白鹭项目启动类 Main
		* @param config {
				navigatorContainerAvailable?: boolean,	// 是否启用导航层
				stringResName?: string,					// 全局本地化文本字符串配置文件，json格式， 通过gardener.getString(key)来获取
				orientation?: string,					// App窗口方向，默认是项目设定的方向
				stageWidth?: number,					// 自定义游戏窗口宽度，默认是全屏窗口宽度
				stageHeight?: number,					// 自定义游戏窗口高度，默认是全屏窗口高度
				windowContainerMaskColor?: number,		// Window层遮罩颜色，默认是黑色0x000000
				windowContainerMaskAlpha?: number,		// Window层这招不透明度，默认是0
				popupContainerMaskColor?: number,		// Popup层遮罩颜色，默认是黑色0x000000
				popupContainerMaskAlpha?: number,		// Popup层遮罩不透明度，默认是0
				messageContainerMaskColor?: number,		// MessageBox层遮罩颜色，默认0x000000
				messageContainerMaskAlpha?: number,		// MessageBox层遮罩不透明度，默认0
				popupPositionHori?: number,				// Popup对象全局水平位置，默认是中间0.5
				popupPositionVert?: number,				// Popup对象全局垂直位置，默认是中间0.5
				allowMultipleMessageBoxes?: boolean,	// 是否允许MessageBox可以弹出多层，每层独立，默认是true，如果为false，新弹出的messagebox会关闭前一个
				showMultipleMessageBoxesOffset?: number	// 当allowMultipleMessageBoxes=true的时候，后一个相比前一个messagebox是否有错位显示，默认是10}
		*/
		public static __init(main: egret.DisplayObjectContainer, config?: {
			navigatorContainerAvailable?: boolean,
			stringResName?: string,
			orientation?: string,
			stageWidth?: number,
			stageHeight?: number,
			windowContainerMaskColor?: number,
			windowContainerMaskAlpha?: number,
			popupContainerMaskColor?: number,
			popupContainerMaskAlpha?: number,
			messageContainerMaskColor?: number,
			messageContainerMaskAlpha?: number,
			popupPositionHori?: number,
			popupPositionVert?: number,
			allowMultipleMessageBoxes?: boolean,
			showMultipleMessageBoxesOffset?: number
		}) {

			// 初始化参数
			config = config || {};
			config.orientation = config.orientation || main.stage.orientation;
			if (config.stringResName) {
				gardener.StringResourceJson = RES.getRes(config.stringResName);
			}
			config.stageHeight = gardener.StageHeight = config.stageHeight || main.stage.stageHeight;
			config.stageWidth = gardener.StageWidth = config.stageWidth || main.stage.stageWidth;

			config.windowContainerMaskColor = config.windowContainerMaskColor || 0;
			config.windowContainerMaskAlpha = config.windowContainerMaskAlpha || 0;
			config.popupContainerMaskColor = config.popupContainerMaskColor || 0;
			config.popupContainerMaskAlpha = config.popupContainerMaskAlpha || .1;
			config.messageContainerMaskColor = config.messageContainerMaskColor || 0;
			config.messageContainerMaskAlpha = config.messageContainerMaskAlpha || .1;
			config.popupPositionHori = config.popupPositionHori || .5;
			config.popupPositionVert = config.popupPositionVert || .5;

			config.allowMultipleMessageBoxes = config.allowMultipleMessageBoxes === undefined ? true : config.allowMultipleMessageBoxes;
			config.showMultipleMessageBoxesOffset = config.showMultipleMessageBoxesOffset || 10;

			config.navigatorContainerAvailable = config.navigatorContainerAvailable === undefined ? false : config.navigatorContainerAvailable;

			gardener.Configuration = config;

			return gardener._instance || new gardener.Gardener(main, config);
		}

		/**
		 * 打开一个Scene
		 * @param scene IScene 打开的对象
		 * @param showAnime boolean 是否显示切换Scene的动画
		 */
		public __loadScene(scene: egret.DisplayObject, showAnime: boolean = true): boolean {
			this.__closeWindow(true);
			let container: egret.DisplayObjectContainer = this.__sceneContainer;
			let lastLayer: egret.DisplayObject = container.numChildren > 0 ? container.getChildAt(0) : undefined;

			if (lastLayer && egret.getQualifiedClassName(lastLayer) == egret.getQualifiedClassName(scene)) {
				return false;
			}
			if (!showAnime) {
				let fn = () => {
					(<any>scene).display();
					scene.removeEventListener(egret.Event.ADDED_TO_STAGE, fn, this);
					lastLayer && container.removeChild(lastLayer);
					egret.setTimeout(() => {
						lastLayer && (<any>lastLayer).dispose();
					}, this, 30);
				}
				scene.addEventListener(egret.Event.ADDED_TO_STAGE, fn, this);
				container.addChild(scene);
			} else {
				// if (gardener.Configuration.orientation == egret.OrientationMode.LANDSCAPE || gardener.Configuration.orientation == egret.OrientationMode.LANDSCAPE_FLIPPED) {
				// 	scene.y = gardener.StageHeight * .5;
				// 	scene.x = -gardener.StageWidth;
				// } else {
				scene.y = gardener.StageHeight;
				scene.x = 0;
				// }
				let fn = () => {
					scene.removeEventListener(egret.Event.ADDED_TO_STAGE, fn, self);
					egret.Tween.get(scene).wait(60).to({ y: 0, x: 0 }, 300, egret.Ease.circOut).call(() => {
						(<any>scene).display();
						if (lastLayer) {
							container.removeChild(lastLayer);
							(<any>lastLayer).dispose();
						}
					}, self);
					if (lastLayer && gardener.Configuration.orientation == egret.OrientationMode.LANDSCAPE || gardener.Configuration.orientation == egret.OrientationMode.LANDSCAPE_FLIPPED) {
						egret.Tween.get(lastLayer).to({ x: -20, y: 20 }, 100);
					}
				}
				scene.addEventListener(egret.Event.ADDED_TO_STAGE, fn, this);
				container.addChild(scene);
			}
			return true;
		}

		/**
		 * 清理所有window历史
		 */
		public __clearWindowHistory() {
			let windowList = this.__windowHistoryList.splice(0);
			windowList.forEach((window) => {
				(<any>window).dispose();
			});
			windowList = null;
		}

		/**
		 * 打开一个window
		 * @param window IWindow
		 * @param savePreWindow boolean 是否缓存上一个打开的window
		 * @param isPreWindow boolean 是否是打开之前缓存的window
		 */
		public __openWindow(window: IWindow, savePreWindow: boolean = false, isPreWindow: boolean = false): void {
			let container: egret.Sprite = this.__windowContainer;

			let lastWindow: IWindow = container.numChildren > 0 ? <IWindow>container.getChildAt(0) : undefined;
			let delay: number = lastWindow ? 200 : 80;

			if (lastWindow && savePreWindow) {
				this.__windowHistoryList.push(lastWindow);
			}

			let lastWindowDesX: number;
			let lastWindowDesY: number;
			if (gardener.Configuration.orientation == egret.OrientationMode.LANDSCAPE || gardener.Configuration.orientation == egret.OrientationMode.LANDSCAPE_FLIPPED) {
				if (isPreWindow) {
					window.y = -(gardener.StageHeight + window.height) * .5;
					window.x = (gardener.StageWidth * 2 - window.width) * .5;
				} else {
					window.y = (gardener.StageHeight * 3 - window.height) * .5;
					window.x = -window.width * .5;
				}
				if (lastWindow) {
					lastWindowDesY = -(gardener.StageHeight + lastWindow.height) * .5;
					lastWindowDesX = (gardener.StageWidth * 2 - lastWindow.width) * .5;
				}
			} else {
				if (isPreWindow) {
					window.y = (this.__windowContainer.height - window.height) * .5;
					window.x = -(gardener.StageWidth + window.width) * .5;
				} else {
					window.y = (this.__windowContainer.height - window.height) * .5;
					window.x = (3 * gardener.StageWidth - window.width) * .5;
				}
				if (lastWindow) {
					lastWindowDesX = -(gardener.StageWidth + lastWindow.width) * .5;
					lastWindowDesY = (this.__windowContainer.height - lastWindow.height) * .5;
				}
			}
			if (lastWindow) {
				egret.Tween.removeTweens(lastWindow);
				egret.Tween.get(lastWindow).to({ x: lastWindowDesX, y: lastWindowDesY }, delay, egret.Ease.circIn).call(() => {
					container.removeChild(lastWindow);
				}, this);
			}

			let fn = () => {
				window.removeEventListener(egret.Event.ADDED_TO_STAGE, fn, this);
				let desX = (this.__windowContainer.width - window.width) * .5;
				let desY = (this.__windowContainer.height - window.height) * .5;
				egret.Tween.get(window).wait(delay).to({ x: desX, y: desY }, 300, egret.Ease.circOut).call(() => {
					(<any>window).display();
					if (!savePreWindow) {
						lastWindow && (<any>lastWindow).dispose();
						this.__clearWindowHistory();
					}
				}, this);
			}
			window.addEventListener(egret.Event.ADDED_TO_STAGE, fn, this);
			container.addChild(window);
			container.visible = true;
		}

		/** 
		 * 关闭Window
		 * @param closeAll boolean 是否一同关闭window的缓存历史
		*/
		public __closeWindow(closeAll: boolean = false): void {
			let container: egret.Sprite = this.__windowContainer;
			let windowList = this.__windowHistoryList;
			if (container.numChildren > 0) {
				let currentWindow: egret.DisplayObject = container.numChildren > 0 ? container.getChildAt(0) : undefined;

				let desX: number;
				let desY: number;
				if (gardener.Configuration.orientation == egret.OrientationMode.LANDSCAPE || gardener.Configuration.orientation == egret.OrientationMode.LANDSCAPE_FLIPPED) {
					if (!closeAll && windowList.length > 0) {
						desY = (gardener.StageHeight * 3 - currentWindow.height) * .5;
						desX = -currentWindow.width * .5;
					} else {
						desY = -(gardener.StageHeight + currentWindow.height) * .5;
						desX = (gardener.StageWidth * 2 - currentWindow.width) * .5;
					}
				} else {
					if (!closeAll && windowList.length > 0) {
						desY = (this.__windowContainer.height - currentWindow.height) * .5;
						desX = (3 * gardener.StageWidth - currentWindow.width) * .5;
					} else {
						desY = (this.__windowContainer.height - currentWindow.height) * .5;
						desX = -(gardener.StageWidth + currentWindow.width) * .5;
					}
				}

				egret.Tween.get(currentWindow).to({ x: desX, y: desY }, 200, egret.Ease.circIn).call(() => {
					container.visible = false;
					egret.Tween.removeTweens(currentWindow);
					container.removeChild(currentWindow);
					(<any>currentWindow).dispose();
					if (closeAll) {
						this.__clearWindowHistory();
					} else {
						if (windowList.length > 0) {
							let preWindow = windowList.pop();
							this.__openWindow(preWindow, false, true);
						}
					}
				}, this);
			} else {
				container.visible = false;
			}
		}

		/*
		* 打开Popup
		*/
		public __openPopup(popup: IPopup): void {
			this.__closePopup(true);
			let container: egret.Sprite = this.__popupContainer;

			if (true === (<any>popup).showPopAnime) {
				popup.x = gardener.StageWidth * gardener.Configuration.popupPositionHori;
				popup.y = gardener.StageHeight * (gardener.Configuration.popupPositionVert - .13);
				popup.alpha = 0;
				let fn = () => {
					popup.removeEventListener(egret.Event.ADDED_TO_STAGE, fn, this);
					egret.Tween.get(popup).wait(80).to({ y: gardener.StageHeight * gardener.Configuration.popupPositionVert, alpha: 1 }, 300, egret.Ease.sineOut).call(() => {
						(<any>popup).display();
					}, this);
				}
				popup.addEventListener(egret.Event.ADDED_TO_STAGE, fn, this);
				popup.anchorOffsetX = popup.width * .5;
				popup.anchorOffsetY = popup.height * .5;
			}

			container.addChild(popup);
			container.visible = true;
		}

		/**
		 * 关闭当前popup
		 * @param immediate boolean 立即关闭，不显示动画，默认false
		 */
		public __closePopup(immediate: boolean = false): void {
			let container: egret.Sprite = this.__popupContainer;
			if (container.numChildren > 0) {
				let lastPopup: egret.DisplayObject = container.numChildren > 0 ? container.getChildAt(0) : undefined;
				if (immediate) {
					egret.Tween.removeTweens(lastPopup);
					container.removeChildren();
					(<any>lastPopup).dispose();
					container.visible = false;
				} else {
					egret.Tween.get(lastPopup).to({ y: gardener.StageHeight * (gardener.Configuration.popupPositionVert - .13), alpha: 0 }, 200, egret.Ease.sineIn).call(() => {
						container.removeChildren();
						container.visible = false;
						(<any>lastPopup).dispose();
					}, this);
				}
			} else {
				container.visible = false;
			}
		}
		/**
		 * 显示飘字文本
		 * @param tip IFloatTip
		 */
		public __showFloatTip(tip: IFloatTip) {
			tip.alpha = 0;
			this.__mainContainer.stage.addChild(tip);
			egret.Tween.get(tip).wait(30).to({ alpha: 1 }, 300).wait(500).to({ y: tip.y - 100 }, 1000).to({ y: tip.y - 150, alpha: 0 }, 500).call(() => {
				tip.parent && tip.parent.removeChild(tip);
				(<any>tip).dispose();
			}, this);
		}

		/**
		 * 弹出messagebox
		 * @param messageBox IMessageBox
		 * @param closeOthers boolean 打开的同时是否关闭其他当前打开
		 */
		public __showMessageBox(messageBox: egret.DisplayObject, closeOthers: boolean = false) {
			this.__messageContainer.visible = true;
			let container = this.__messageContainer;
			if (container.numChildren > 0 && (closeOthers || !gardener.Configuration.allowMultipleMessageBoxes)) {
				let msgs: any[] = container.$children;
				container.removeChildren();
				msgs.forEach((msg) => {
					egret.Tween.removeTweens(msg);
					(<any>msg).dispose();
				});
				msgs = null;
			}
			messageBox.anchorOffsetX = messageBox.width * .5;
			messageBox.anchorOffsetY = messageBox.height * .5;
			messageBox.scaleX = messageBox.scaleY = 0;
			let offset = (<any>messageBox).AllowMultipleOffsetPosition ? container.numChildren * gardener.Configuration.showMultipleMessageBoxesOffset : 0;
			messageBox.x = gardener.StageWidth * .5 + offset;
			messageBox.y = gardener.StageHeight * .5 + offset;
			container.addChild(messageBox);
			egret.Tween.get(messageBox).wait(30).to({ scaleX: 1, scaleY: 1 }, 260, egret.Ease.backOut).call(() => {
				(<any>messageBox).display();
			});
		}
		/**
		 * 关闭指定的messagebox
		 * @param target IMessageBox
		 * @param closeAll boolean  关闭全部
		 */
		public __closeMessageBox(target: IMessageBox, closeAll: boolean = false) {
			let container = this.__messageContainer;
			if (!target && container.numChildren <= 0) {
				container.visible = false;
				return;
			}
			if (closeAll) {
				if (container.numChildren > 0) {
					let msgs: any[] = container.$children;
					container.removeChildren();
					msgs.forEach((msg) => {
						egret.Tween.removeTweens(msg);
						(<any>msg).dispose();
					});
					msgs = null;
				}
			} else if (target) {
				egret.Tween.removeTweens(target);
				if (target.parent)
					target.parent.removeChild(target);
				(<any>target).dispose();
			}
			if (container.numChildren <= 0) {
				container.visible = false;
			}
		}

		/**
		 * 点击messagebox背景触发事件
		 */
		public __onMessageContainerBg_Tap(e: egret.TouchEvent) {
			let container = this.__messageContainer;
			if (e.target != container) {
				return;
			}
			if (container.numChildren > 0) {
				let target = container.getChildAt(container.numChildren - 1);
				if (true === (<IMessageBox>target).AllowCloseByTapBg)
					this.__closeMessageBox(target as IMessageBox);
			} else {
				container.visible = false;
			}
		}
		/**
		 * 添加导航模块，window层之上，popup层之下
		 * @param navi egret.DisplayObject
		 */
		public __addNavigator(navi: egret.DisplayObject) {
			this.__navigatorContainer.addChild(navi);
		}

		// 查找当前打开的popup
		public __findCurrentPopup(): IPopup {
			return this.__popupContainer.numChildren > 0 ? this.__popupContainer.getChildAt(0) as IPopup : null;
		}

		// 查找当前打开的popup
		public __findCurrentPopupByClass(targetClass): IPopup {
			if (this.__popupContainer.numChildren > 0 && this.__popupContainer.getChildAt(0) instanceof targetClass) {
				return this.__popupContainer.getChildAt(0) as IPopup;
			} else {
				return null;
			}
		}

		// 查找当前打开的window
		public __findCurrentWindow(): IWindow {
			return this.__windowContainer.numChildren > 0 ? this.__windowContainer.getChildAt(0) as IWindow : null;
		}

		// 查找当前打开的window
		public __findCurrentWindowByClass(targetClass): IWindow {
			if (this.__windowContainer.numChildren > 0 && this.__windowContainer.getChildAt(0) instanceof targetClass) {
				return this.__windowContainer.getChildAt(0) as IWindow;
			} else {
				return null;
			}
		}

		// 查找当前打开的Scene
		public __findCurrnetScene(): IScene {
			return this.__sceneContainer.numChildren > 0 ? this.__sceneContainer.getChildAt(0) as IScene : null;
		}

		// 查找当前打开的Scene 指定类型
		public __findCurrentSceneByClass(targetClass): IScene {
			if (this.__sceneContainer.numChildren > 0 && this.__sceneContainer.getChildAt(0) instanceof targetClass) {
				return this.__sceneContainer.getChildAt(0) as IScene;
			} else {
				return null;
			}
		}

		public __removeLoadingMask(target: egret.DisplayObject) {
			if (target && this.__mainContainer.stage.contains(target)) {
				this.__mainContainer.stage.removeChild(target);
			}
		}

		/*
		* 打开等待画面
		*/
		public __showLoadingMask(loading: egret.DisplayObject): egret.DisplayObject {
			this.__mainContainer.stage.addChild(loading);
			return loading;
		}
	}

	/**
	 * 初始化Gardener
	 * @param main 白鹭项目启动类 Main
	 * @param config {
			navigatorContainerAvailable?: boolean,	// 是否启用导航层
			stringResName?: string,					// 全局本地化文本字符串配置文件，json格式， 通过gardener.getString(key)来获取
			orientation?: string,					// App窗口方向，默认是项目设定的方向
			stageWidth?: number,					// 自定义游戏窗口宽度，默认是全屏窗口宽度
			stageHeight?: number,					// 自定义游戏窗口高度，默认是全屏窗口高度
			windowContainerMaskColor?: number,		// Window层遮罩颜色，默认是黑色0x000000
			windowContainerMaskAlpha?: number,		// Window层这招不透明度，默认是0
			popupContainerMaskColor?: number,		// Popup层遮罩颜色，默认是黑色0x000000
			popupContainerMaskAlpha?: number,		// Popup层遮罩不透明度，默认是0
			messageContainerMaskColor?: number,		// MessageBox层遮罩颜色，默认0x000000
			messageContainerMaskAlpha?: number,		// MessageBox层遮罩不透明度，默认0
			popupPositionHori?: number,				// Popup对象全局水平位置，默认是中间0.5
			popupPositionVert?: number,				// Popup对象全局垂直位置，默认是中间0.5
			allowMultipleMessageBoxes?: boolean,	// 是否允许MessageBox可以弹出多层，每层独立，默认是true，如果为false，新弹出的messagebox会关闭前一个
			showMultipleMessageBoxesOffset?: number	// 当allowMultipleMessageBoxes=true的时候，后一个相比前一个messagebox是否有错位显示，默认是10}
	 */
	export function initGardener(main: egret.DisplayObjectContainer, config?: {
		navigatorContainerAvailable?: boolean,
		stringResName?: string,
		orientation?: string,
		stageWidth?: number,
		stageHeight?: number,
		windowContainerMaskColor?: number,
		windowContainerMaskAlpha?: number,
		popupContainerMaskColor?: number,
		popupContainerMaskAlpha?: number,
		messageContainerMaskColor?: number,
		messageContainerMaskAlpha?: number,
		popupPositionHori?: number,
		popupPositionVert?: number,
		allowMultipleMessageBoxes?: boolean,
		showMultipleMessageBoxesOffset?: number
	}) {
		gardener._instance = gardener.Gardener.__init(main, config);
		if (dragonBones)
			gardener._dbAnimeGeneratorInstance = gardener.DbAnimeGenerator.__initAnimeGenerator();
	}

	/**
	 * 判断Gardener是否初始化完成
	 */
	export function checkGgValid(): boolean {
		if (!gardener._instance) {
			egret.error('The Gardener is not initialized! \'gardener.initGardener()\' should be executed first.');
			return false;
		} else {
			return true;
		}
	}
	/**
	 * 打开一个Scene
	 * @param scene IScene 打开的对象
	 * @param showAnime boolean 是否显示切换Scene的过度动画
	 */
	export function loadScene(scene: IScene, showAnime?: boolean): void {
		gardener._instance.__loadScene(scene, showAnime);
	}

	/**
	 * 打开一个window，如果当前有window已经打开，则自动关闭并dispose
	 * @param window IWindow
	 */
	export function openWindow(window: gardener.IWindow): void {
		gardener._instance.__openWindow(window, false, false);
	}
	/**
	 * 打开一个window，同时缓存上一个window，当此window关闭的时候，之前保存的window会自动弹回
	 * @param window IWindow
	 */
	export function openWindowAndSavingPrevious(window: gardener.IWindow): void {
		gardener._instance.__openWindow(window, true);
	}
	/**
	 * 关闭当前window，如果closeAll=true，则dispose所有之前缓存的window历史
	 * @param closeAll 默认false
	 */
	export function closeWindow(closeAll?: boolean): void {
		gardener._instance.__closeWindow(closeAll);
	}
	/**
	 * 清空并回收所有缓存的window
	 */
	export function clearWindowHistory(): void {
		gardener._instance.__clearWindowHistory();
	}
	/**
	 * 打开一个popup
	 * @param popup IPopup
	 */
	export function openPopup(popup: gardener.IPopup): void {
		gardener._instance.__openPopup(popup);
	}
	/**
	 * 关闭当前popup
	 * @param immediate boolean 立即关闭，不显示动画，默认false
	 */
	export function closePopup(immediate?: boolean): void {
		gardener._instance.__closePopup(immediate);
	}
	/**
	 * 弹出messagebox
	 * @param messageBox IMessageBox
	 * @param closeOthers boolean 打开的同时是否关闭其他当前打开
	 */
	export function showMessageBox(messageBox: gardener.IMessageBox, closeOthers?: boolean): void {
		gardener._instance.__showMessageBox(messageBox, closeOthers);
	}
	/**
	 * 关闭所有已打开的messagebox
	 */
	export function closeAllMessageBoxes(): void {
		gardener._instance.__closeMessageBox(null, true);
	}
	/**
	 * 关闭指定的messagebox
	 * @param target IMessageBox
	 */
	export function closeMessageBox(target: IMessageBox): void {
		gardener._instance.__closeMessageBox(target);
	}
	/**
	 * 显示飘字文本
	 * @param tip IFloatTip
	 */
	export function showFloatTip(tip: gardener.IFloatTip): void {
		gardener._instance.__showFloatTip(tip);
	}
	/**
	 * 添加导航模块，window层之上，popup层之下
	 * @param navi egret.DisplayObject
	 */
	export function addNavigator(navi: egret.DisplayObject): void {
		gardener._instance.__addNavigator(navi);
	}
	/**
	 * 查找当前已打开的Popup
	 * @return IPopup
	 */
	export function findCurrentPopup(): gardener.IPopup {
		return gardener._instance.__findCurrentPopup();
	}
	/**
	 * 根据类型查找当前已打开的popup，常用于判断当前打开的popup是否是指定类型，如果不是指定类型，则返回null
	 * @param targetClass class
	 * @return IPopup
	 */
	export function findCurrentPopupByClass(targetClass): gardener.IPopup {
		return gardener._instance.__findCurrentPopupByClass(targetClass);
	}
	/**
	 * 查找当前已打开的window
	 * @return IWindow
	 */
	export function findCurrentWindow(): gardener.IWindow {
		return gardener._instance.__findCurrentWindow();
	}
	/**
	 * 根据类型查找当前已打开的window，常用于判断当前打开的window是否是指定类型，如果不是指定类型，则返回null
	 * @param targetClass class
	 * @return IWindow
	 */
	export function findCurrentWindowByClass(targetClass): gardener.IWindow {
		return gardener._instance.__findCurrentWindowByClass(targetClass);
	}
	/**
	 * 查找当前已打开的scene
	 * @return IScene
	 */
	export function findCurrentScene(): gardener.IScene {
		return gardener._instance.__findCurrnetScene();
	}
	/**
	 * 根据类型查找当前已打开的scene，常用于判断当前打开的scene是否是指定类型，如果不是指定类型，则返回null
	 * @param targetClass class
	 * @return IScene
	 */
	export function findCurrentSceneByClass(targetClass): gardener.IScene {
		return gardener._instance.__findCurrentSceneByClass(targetClass);
	}
	/**
	 * 显示全局遮罩, 覆盖全屏，最上层
	 * @param loading egret.DisplayObject
	 */
	export function showLoadingMask(loading: egret.DisplayObject): void {
		gardener._instance.__showLoadingMask(loading);
	}
	/**
	 * 移除遮罩
	 * @param loading egret.DisplayObject 指定对象
	 */
	export function removeLoadingMask(loading: egret.DisplayObject): void {
		gardener._instance.__removeLoadingMask(loading);
	}
	/**
	 * 生成龙骨急速格式动画，已废弃，请导出二进制格式，并使用二进制动画方法
	 * @param resName string  
	 */
	export function dbGenerateMovieClip(resName: string, disposeAfterUnload?: boolean, removeAfterComplete?: boolean): dragonBones.Movie {
		return gardener._dbAnimeGeneratorInstance.__generateMovieClip(resName, disposeAfterUnload, removeAfterComplete);
	}
	/**
	 * 生成龙骨急速格式动画，已废弃，并缓存动画数据，已废弃，请导出二进制格式，并使用二进制动画方法
	 */
	export function dbGenerateMovieClipWithCache(resName: string, disposeAfterUnload?: boolean, removeAfterComplete?: boolean): dragonBones.Movie {
		return gardener._dbAnimeGeneratorInstance.__generateMovieClip(resName, disposeAfterUnload, removeAfterComplete, false);
	}
	/**
	 * 回收所有急速格式的龙骨动画资源，已废弃
	 */
	export function dbDisposeAllMovieClipData() {
		gardener._dbAnimeGeneratorInstance.__disposeMovieClipData();
	}
	/**
	 * 回收指定急速格式的龙骨动画 已废弃
	 * @param resName string 资源文件名称 例如 resName_ske_dbmv, resName_tex_png
	 */
	export function dbDisposeMovieClipData(resName: string) {
		gardener._dbAnimeGeneratorInstance.__disposeMovieClipData(resName);
	}
	/**
	 * 生成龙骨二进制动画
	 * @param resName string 资源文件名称 例如 resName_ske_dbbin, resName_tex_png
	 * @param armatureName string 骨架名称 （Armature）
	 * @param disposeAfterUnload boolean 当动画被移除的时候，是否自动回收 默认true，如果设为false，则需要手动回收gardener.dbDisposeDbbinAnime(anime)
	 * @param removeAfterComplete boolean 当动画播放周期结束，是否自动从父容器中移除，默认为true
	 */
	export function dbGenerateDbbinAnime(resName: string, armatureName: string, disposeAfterUnload?: boolean, removeAfterComplete?: boolean) {
		return gardener._dbAnimeGeneratorInstance.__generateDbbinAnime(resName, armatureName, disposeAfterUnload, removeAfterComplete);
	}
	/**
	 * 回收指定的龙骨二进制动画对象
	 * @param anime dragonBones.EgretAramtureDisplay
	 */
	export function dbDisposeDbbinAnime(anime: dragonBones.EgretArmatureDisplay): void {
		gardener._dbAnimeGeneratorInstance.__disposeDbbinAnime(anime);
	}
	/**
	 * 回收所有二进制龙骨动画资源缓存
	 */
	export function dbDisposeAllDbbinFactoryData(): void {
		gardener._dbAnimeGeneratorInstance.__disposeDBFactoryData();
	}
	/**
	 * 回收指定二进制龙骨动画资源缓存
	 * @param resName string 资源文件名称
	 */
	export function dbDisposeDbbinFactoryData(resName: string): void {
		gardener._dbAnimeGeneratorInstance.__disposeDBFactoryData(resName);
	}
	/**
	 * 启动龙骨骨骼动画计时器，启动龙骨动画前，需要开启计时器
	 */
	export function dbStartDbWorldClock(): void {
		gardener._dbAnimeGeneratorInstance.__startDbWorldClock();
	}
	/**
	 * 关闭龙骨谷歌动画计时器
	 */
	export function dbStopDbWorldClock(): void {
		gardener._dbAnimeGeneratorInstance.__stopDbWorldClock();
	}
}

