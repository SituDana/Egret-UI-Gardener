var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var gardener;
(function (gardener) {
    var BaseFloatTip = (function (_super) {
        __extends(BaseFloatTip, _super);
        function BaseFloatTip() {
            return _super.call(this) || this;
        }
        return BaseFloatTip;
    }(egret.DisplayObjectContainer));
    gardener.BaseFloatTip = BaseFloatTip;
    __reflect(BaseFloatTip.prototype, "gardener.BaseFloatTip");
    var EUIBaseFloatTip = (function (_super) {
        __extends(EUIBaseFloatTip, _super);
        function EUIBaseFloatTip() {
            return _super.call(this) || this;
        }
        return EUIBaseFloatTip;
    }(eui.Component));
    gardener.EUIBaseFloatTip = EUIBaseFloatTip;
    __reflect(EUIBaseFloatTip.prototype, "gardener.EUIBaseFloatTip");
})(gardener || (gardener = {}));
/**
 * GameGardener —— An Egret Game UI Framework
 * @version 1.0
 * @author jiajun
 */
var gardener;
(function (gardener) {
    /**
     * 获取文本字符串模板
     * @param key string 字符串对应的键值
     * @param replaceValues string[] 动态替换字符串模板中的参数。模板例子：欢迎{0}来到游戏{1}区...
     * @return 文本字符串
     */
    function getString(key) {
        var replaceValues = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            replaceValues[_i - 1] = arguments[_i];
        }
        if (gardener.StringResourceJson) {
            return replaceValues ? (_a = gardener.StringResourceJson[key]).format.apply(_a, replaceValues) : gardener.StringResourceJson[key];
        }
        else {
            return '';
        }
        var _a;
    }
    gardener.getString = getString;
    /**
     * Gardner，游戏框架主类，轻量级游戏UI框架，兼容横屏竖屏
     */
    var Gardener = (function (_super) {
        __extends(Gardener, _super);
        function Gardener(main, config) {
            var _this = _super.call(this) || this;
            // window历史列表，不包含当前当前打开的window
            _this.__windowHistoryList = new Array();
            _this.__mainContainer = main;
            // 初始化各层容器
            _this.__initContainers(main, config);
            return _this;
        }
        /**
         * 初始化所有容器
         */
        Gardener.prototype.__initContainers = function (main, config) {
            var sceneContainer = new egret.DisplayObjectContainer();
            sceneContainer.width = config.stageWidth;
            sceneContainer.height = config.stageHeight;
            gardener.SceneContainer = this.__sceneContainer = sceneContainer;
            main.addChild(this.__sceneContainer);
            var windowContainer = new egret.Sprite();
            windowContainer.width = config.stageWidth;
            windowContainer.height = config.stageHeight;
            windowContainer.graphics.beginFill(config.windowContainerMaskColor, config.windowContainerMaskAlpha);
            windowContainer.graphics.drawRect(0, 0, windowContainer.width, windowContainer.height);
            windowContainer.graphics.endFill();
            windowContainer.touchEnabled = true;
            main.addChild(windowContainer);
            gardener.WindowContainer = this.__windowContainer = windowContainer;
            if (config.navigatorContainerAvailable === true) {
                var navigatorContainer = new egret.DisplayObjectContainer();
                navigatorContainer.width = config.stageWidth;
                navigatorContainer.height = config.stageHeight;
                navigatorContainer.touchEnabled = false;
                navigatorContainer.touchChildren = true;
                main.addChild(navigatorContainer);
                gardener.NavigatorContainer = this.__navigatorContainer = navigatorContainer;
            }
            var popupContainer = new egret.Sprite();
            popupContainer.width = config.stageWidth;
            popupContainer.height = config.stageHeight;
            popupContainer.graphics.beginFill(config.popupContainerMaskColor, config.popupContainerMaskAlpha);
            popupContainer.graphics.drawRect(0, 0, popupContainer.width, popupContainer.height);
            popupContainer.graphics.endFill();
            popupContainer.touchEnabled = true;
            popupContainer.visible = false;
            main.addChild(popupContainer);
            gardener.PopupContainer = this.__popupContainer = popupContainer;
            var messageContainer = new egret.Sprite();
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
        };
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
        Gardener.__init = function (main, config) {
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
        };
        /**
         * 打开一个Scene
         * @param scene IScene 打开的对象
         * @param showAnime boolean 是否显示切换Scene的动画
         */
        Gardener.prototype.__loadScene = function (scene, showAnime) {
            var _this = this;
            if (showAnime === void 0) { showAnime = true; }
            this.__closeWindow(true);
            var container = this.__sceneContainer;
            var lastLayer = container.numChildren > 0 ? container.getChildAt(0) : undefined;
            if (lastLayer && egret.getQualifiedClassName(lastLayer) == egret.getQualifiedClassName(scene)) {
                return false;
            }
            if (!showAnime) {
                var fn_1 = function () {
                    scene.display();
                    scene.removeEventListener(egret.Event.ADDED_TO_STAGE, fn_1, _this);
                    lastLayer && container.removeChild(lastLayer);
                    egret.setTimeout(function () {
                        lastLayer && lastLayer.dispose();
                    }, _this, 30);
                };
                scene.addEventListener(egret.Event.ADDED_TO_STAGE, fn_1, this);
                container.addChild(scene);
            }
            else {
                // if (gardener.Configuration.orientation == egret.OrientationMode.LANDSCAPE || gardener.Configuration.orientation == egret.OrientationMode.LANDSCAPE_FLIPPED) {
                // 	scene.y = gardener.StageHeight * .5;
                // 	scene.x = -gardener.StageWidth;
                // } else {
                scene.y = gardener.StageHeight;
                scene.x = 0;
                // }
                var fn_2 = function () {
                    scene.removeEventListener(egret.Event.ADDED_TO_STAGE, fn_2, self);
                    egret.Tween.get(scene).wait(60).to({ y: 0, x: 0 }, 300, egret.Ease.circOut).call(function () {
                        scene.display();
                        if (lastLayer) {
                            container.removeChild(lastLayer);
                            lastLayer.dispose();
                        }
                    }, self);
                    if (lastLayer && gardener.Configuration.orientation == egret.OrientationMode.LANDSCAPE || gardener.Configuration.orientation == egret.OrientationMode.LANDSCAPE_FLIPPED) {
                        egret.Tween.get(lastLayer).to({ x: -20, y: 20 }, 100);
                    }
                };
                scene.addEventListener(egret.Event.ADDED_TO_STAGE, fn_2, this);
                container.addChild(scene);
            }
            return true;
        };
        /**
         * 清理所有window历史
         */
        Gardener.prototype.__clearWindowHistory = function () {
            var windowList = this.__windowHistoryList.splice(0);
            windowList.forEach(function (window) {
                window.dispose();
            });
            windowList = null;
        };
        /**
         * 打开一个window
         * @param window IWindow
         * @param savePreWindow boolean 是否缓存上一个打开的window
         * @param isPreWindow boolean 是否是打开之前缓存的window
         */
        Gardener.prototype.__openWindow = function (window, savePreWindow, isPreWindow) {
            var _this = this;
            if (savePreWindow === void 0) { savePreWindow = false; }
            if (isPreWindow === void 0) { isPreWindow = false; }
            var container = this.__windowContainer;
            var lastWindow = container.numChildren > 0 ? container.getChildAt(0) : undefined;
            var delay = lastWindow ? 200 : 80;
            if (lastWindow && savePreWindow) {
                this.__windowHistoryList.push(lastWindow);
            }
            var lastWindowDesX;
            var lastWindowDesY;
            if (gardener.Configuration.orientation == egret.OrientationMode.LANDSCAPE || gardener.Configuration.orientation == egret.OrientationMode.LANDSCAPE_FLIPPED) {
                if (isPreWindow) {
                    window.y = -(gardener.StageHeight + window.height) * .5;
                    window.x = (gardener.StageWidth * 2 - window.width) * .5;
                }
                else {
                    window.y = (gardener.StageHeight * 3 - window.height) * .5;
                    window.x = -window.width * .5;
                }
                if (lastWindow) {
                    lastWindowDesY = -(gardener.StageHeight + lastWindow.height) * .5;
                    lastWindowDesX = (gardener.StageWidth * 2 - lastWindow.width) * .5;
                }
            }
            else {
                if (isPreWindow) {
                    window.y = (this.__windowContainer.height - window.height) * .5;
                    window.x = -(gardener.StageWidth + window.width) * .5;
                }
                else {
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
                egret.Tween.get(lastWindow).to({ x: lastWindowDesX, y: lastWindowDesY }, delay, egret.Ease.circIn).call(function () {
                    container.removeChild(lastWindow);
                }, this);
            }
            var fn = function () {
                window.removeEventListener(egret.Event.ADDED_TO_STAGE, fn, _this);
                var desX = (_this.__windowContainer.width - window.width) * .5;
                var desY = (_this.__windowContainer.height - window.height) * .5;
                egret.Tween.get(window).wait(delay).to({ x: desX, y: desY }, 300, egret.Ease.circOut).call(function () {
                    window.display();
                    if (!savePreWindow) {
                        lastWindow && lastWindow.dispose();
                        _this.__clearWindowHistory();
                    }
                }, _this);
            };
            window.addEventListener(egret.Event.ADDED_TO_STAGE, fn, this);
            container.addChild(window);
            container.visible = true;
        };
        /**
         * 关闭Window
         * @param closeAll boolean 是否一同关闭window的缓存历史
        */
        Gardener.prototype.__closeWindow = function (closeAll) {
            var _this = this;
            if (closeAll === void 0) { closeAll = false; }
            var container = this.__windowContainer;
            var windowList = this.__windowHistoryList;
            if (container.numChildren > 0) {
                var currentWindow_1 = container.numChildren > 0 ? container.getChildAt(0) : undefined;
                var desX = void 0;
                var desY = void 0;
                if (gardener.Configuration.orientation == egret.OrientationMode.LANDSCAPE || gardener.Configuration.orientation == egret.OrientationMode.LANDSCAPE_FLIPPED) {
                    if (!closeAll && windowList.length > 0) {
                        desY = (gardener.StageHeight * 3 - currentWindow_1.height) * .5;
                        desX = -currentWindow_1.width * .5;
                    }
                    else {
                        desY = -(gardener.StageHeight + currentWindow_1.height) * .5;
                        desX = (gardener.StageWidth * 2 - currentWindow_1.width) * .5;
                    }
                }
                else {
                    if (!closeAll && windowList.length > 0) {
                        desY = (this.__windowContainer.height - currentWindow_1.height) * .5;
                        desX = (3 * gardener.StageWidth - currentWindow_1.width) * .5;
                    }
                    else {
                        desY = (this.__windowContainer.height - currentWindow_1.height) * .5;
                        desX = -(gardener.StageWidth + currentWindow_1.width) * .5;
                    }
                }
                egret.Tween.get(currentWindow_1).to({ x: desX, y: desY }, 200, egret.Ease.circIn).call(function () {
                    container.visible = false;
                    egret.Tween.removeTweens(currentWindow_1);
                    container.removeChild(currentWindow_1);
                    currentWindow_1.dispose();
                    if (closeAll) {
                        _this.__clearWindowHistory();
                    }
                    else {
                        if (windowList.length > 0) {
                            var preWindow = windowList.pop();
                            _this.__openWindow(preWindow, false, true);
                        }
                    }
                }, this);
            }
            else {
                container.visible = false;
            }
        };
        /*
        * 打开Popup
        */
        Gardener.prototype.__openPopup = function (popup) {
            var _this = this;
            this.__closePopup(true);
            var container = this.__popupContainer;
            if (true === popup.showPopAnime) {
                popup.x = gardener.StageWidth * gardener.Configuration.popupPositionHori;
                popup.y = gardener.StageHeight * (gardener.Configuration.popupPositionVert - .13);
                popup.alpha = 0;
                var fn_3 = function () {
                    popup.removeEventListener(egret.Event.ADDED_TO_STAGE, fn_3, _this);
                    egret.Tween.get(popup).wait(80).to({ y: gardener.StageHeight * gardener.Configuration.popupPositionVert, alpha: 1 }, 300, egret.Ease.sineOut).call(function () {
                        popup.display();
                    }, _this);
                };
                popup.addEventListener(egret.Event.ADDED_TO_STAGE, fn_3, this);
                popup.anchorOffsetX = popup.width * .5;
                popup.anchorOffsetY = popup.height * .5;
            }
            container.addChild(popup);
            container.visible = true;
        };
        /**
         * 关闭当前popup
         * @param immediate boolean 立即关闭，不显示动画，默认false
         */
        Gardener.prototype.__closePopup = function (immediate) {
            if (immediate === void 0) { immediate = false; }
            var container = this.__popupContainer;
            if (container.numChildren > 0) {
                var lastPopup_1 = container.numChildren > 0 ? container.getChildAt(0) : undefined;
                if (immediate) {
                    egret.Tween.removeTweens(lastPopup_1);
                    container.removeChildren();
                    lastPopup_1.dispose();
                    container.visible = false;
                }
                else {
                    egret.Tween.get(lastPopup_1).to({ y: gardener.StageHeight * (gardener.Configuration.popupPositionVert - .13), alpha: 0 }, 200, egret.Ease.sineIn).call(function () {
                        container.removeChildren();
                        container.visible = false;
                        lastPopup_1.dispose();
                    }, this);
                }
            }
            else {
                container.visible = false;
            }
        };
        /**
         * 显示飘字文本
         * @param tip IFloatTip
         */
        Gardener.prototype.__showFloatTip = function (tip) {
            tip.alpha = 0;
            this.__mainContainer.stage.addChild(tip);
            egret.Tween.get(tip).wait(30).to({ alpha: 1 }, 300).wait(500).to({ y: tip.y - 100 }, 1000).to({ y: tip.y - 150, alpha: 0 }, 500).call(function () {
                tip.parent && tip.parent.removeChild(tip);
                tip.dispose();
            }, this);
        };
        /**
         * 弹出messagebox
         * @param messageBox IMessageBox
         * @param closeOthers boolean 打开的同时是否关闭其他当前打开
         */
        Gardener.prototype.__showMessageBox = function (messageBox, closeOthers) {
            if (closeOthers === void 0) { closeOthers = false; }
            this.__messageContainer.visible = true;
            var container = this.__messageContainer;
            if (container.numChildren > 0 && (closeOthers || !gardener.Configuration.allowMultipleMessageBoxes)) {
                var msgs = container.$children;
                container.removeChildren();
                msgs.forEach(function (msg) {
                    egret.Tween.removeTweens(msg);
                    msg.dispose();
                });
                msgs = null;
            }
            messageBox.anchorOffsetX = messageBox.width * .5;
            messageBox.anchorOffsetY = messageBox.height * .5;
            messageBox.scaleX = messageBox.scaleY = 0;
            var offset = messageBox.AllowMultipleOffsetPosition ? container.numChildren * gardener.Configuration.showMultipleMessageBoxesOffset : 0;
            messageBox.x = gardener.StageWidth * .5 + offset;
            messageBox.y = gardener.StageHeight * .5 + offset;
            container.addChild(messageBox);
            egret.Tween.get(messageBox).wait(30).to({ scaleX: 1, scaleY: 1 }, 260, egret.Ease.backOut).call(function () {
                messageBox.display();
            });
        };
        /**
         * 关闭指定的messagebox
         * @param target IMessageBox
         * @param closeAll boolean  关闭全部
         */
        Gardener.prototype.__closeMessageBox = function (target, closeAll) {
            if (closeAll === void 0) { closeAll = false; }
            var container = this.__messageContainer;
            if (!target && container.numChildren <= 0) {
                container.visible = false;
                return;
            }
            if (closeAll) {
                if (container.numChildren > 0) {
                    var msgs = container.$children;
                    container.removeChildren();
                    msgs.forEach(function (msg) {
                        egret.Tween.removeTweens(msg);
                        msg.dispose();
                    });
                    msgs = null;
                }
            }
            else if (target) {
                egret.Tween.removeTweens(target);
                if (target.parent)
                    target.parent.removeChild(target);
                target.dispose();
            }
            if (container.numChildren <= 0) {
                container.visible = false;
            }
        };
        /**
         * 点击messagebox背景触发事件
         */
        Gardener.prototype.__onMessageContainerBg_Tap = function (e) {
            var container = this.__messageContainer;
            if (e.target != container) {
                return;
            }
            if (container.numChildren > 0) {
                var target = container.getChildAt(container.numChildren - 1);
                if (true === target.AllowCloseByTapBg)
                    this.__closeMessageBox(target);
            }
            else {
                container.visible = false;
            }
        };
        /**
         * 添加导航模块，window层之上，popup层之下
         * @param navi egret.DisplayObject
         */
        Gardener.prototype.__addNavigator = function (navi) {
            this.__navigatorContainer.addChild(navi);
        };
        // 查找当前打开的popup
        Gardener.prototype.__findCurrentPopup = function () {
            return this.__popupContainer.numChildren > 0 ? this.__popupContainer.getChildAt(0) : null;
        };
        // 查找当前打开的popup
        Gardener.prototype.__findCurrentPopupByClass = function (targetClass) {
            if (this.__popupContainer.numChildren > 0 && this.__popupContainer.getChildAt(0) instanceof targetClass) {
                return this.__popupContainer.getChildAt(0);
            }
            else {
                return null;
            }
        };
        // 查找当前打开的window
        Gardener.prototype.__findCurrentWindow = function () {
            return this.__windowContainer.numChildren > 0 ? this.__windowContainer.getChildAt(0) : null;
        };
        // 查找当前打开的window
        Gardener.prototype.__findCurrentWindowByClass = function (targetClass) {
            if (this.__windowContainer.numChildren > 0 && this.__windowContainer.getChildAt(0) instanceof targetClass) {
                return this.__windowContainer.getChildAt(0);
            }
            else {
                return null;
            }
        };
        // 查找当前打开的Scene
        Gardener.prototype.__findCurrnetScene = function () {
            return this.__sceneContainer.numChildren > 0 ? this.__sceneContainer.getChildAt(0) : null;
        };
        // 查找当前打开的Scene 指定类型
        Gardener.prototype.__findCurrentSceneByClass = function (targetClass) {
            if (this.__sceneContainer.numChildren > 0 && this.__sceneContainer.getChildAt(0) instanceof targetClass) {
                return this.__sceneContainer.getChildAt(0);
            }
            else {
                return null;
            }
        };
        Gardener.prototype.__removeLoadingMask = function (target) {
            if (target && this.__mainContainer.stage.contains(target)) {
                this.__mainContainer.stage.removeChild(target);
            }
        };
        /*
        * 打开等待画面
        */
        Gardener.prototype.__showLoadingMask = function (loading) {
            this.__mainContainer.stage.addChild(loading);
            return loading;
        };
        return Gardener;
    }(egret.EventDispatcher));
    gardener.Gardener = Gardener;
    __reflect(Gardener.prototype, "gardener.Gardener");
    /**
     * 初始化Gardener
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
    function initGardener(main, config) {
        gardener._instance = gardener.Gardener.__init(main, config);
        if (dragonBones)
            gardener._dbAnimeGeneratorInstance = gardener.DbAnimeGenerator.__initAnimeGenerator();
    }
    gardener.initGardener = initGardener;
    /**
     * 判断Gardener是否初始化完成
     */
    function checkGgValid() {
        if (!gardener._instance) {
            egret.error('The Gardener is not initialized! \'gardener.initGardener()\' should be executed first.');
            return false;
        }
        else {
            return true;
        }
    }
    gardener.checkGgValid = checkGgValid;
    /**
     * 打开一个Scene
     * @param scene IScene 打开的对象
     * @param showAnime boolean 是否显示切换Scene的动画
     */
    function loadScene(scene, showAnime) {
        gardener._instance.__loadScene(scene, showAnime);
    }
    gardener.loadScene = loadScene;
    /**
     * 打开一个window，如果当前有window已经打开，则自动关闭并dispose
     * @param window IWindow
     */
    function openWindow(window) {
        gardener._instance.__openWindow(window, false, false);
    }
    gardener.openWindow = openWindow;
    /**
     * 打开一个window，同时缓存上一个window，当此window关闭的时候，之前保存的window会重新打开
     * @param window IWindow
     */
    function openWindowAndSavingPrevious(window) {
        gardener._instance.__openWindow(window, true);
    }
    gardener.openWindowAndSavingPrevious = openWindowAndSavingPrevious;
    /**
     * 关闭当前window，如果closeAll=true，则dispose所有之前缓存的window历史
     * @param closeAll 默认false
     */
    function closeWindow(closeAll) {
        gardener._instance.__closeWindow(closeAll);
    }
    gardener.closeWindow = closeWindow;
    /**
     * 清空并回收所有缓存的window
     */
    function clearWindowHistory() {
        gardener._instance.__clearWindowHistory();
    }
    gardener.clearWindowHistory = clearWindowHistory;
    /**
     * 打开一个popup
     * @param popup IPopup
     */
    function openPopup(popup) {
        gardener._instance.__openPopup(popup);
    }
    gardener.openPopup = openPopup;
    /**
     * 关闭当前popup
     * @param immediate boolean 立即关闭，不显示动画，默认false
     */
    function closePopup(immediate) {
        gardener._instance.__closePopup(immediate);
    }
    gardener.closePopup = closePopup;
    /**
     * 弹出messagebox
     * @param messageBox IMessageBox
     * @param closeOthers boolean 打开的同时是否关闭其他当前打开
     */
    function showMessageBox(messageBox, closeOthers) {
        gardener._instance.__showMessageBox(messageBox, closeOthers);
    }
    gardener.showMessageBox = showMessageBox;
    /**
     * 关闭所有已打开的messagebox
     */
    function closeAllMessageBoxes() {
        gardener._instance.__closeMessageBox(null, true);
    }
    gardener.closeAllMessageBoxes = closeAllMessageBoxes;
    /**
     * 关闭指定的messagebox
     * @param target IMessageBox
     */
    function closeMessageBox(target) {
        gardener._instance.__closeMessageBox(target);
    }
    gardener.closeMessageBox = closeMessageBox;
    /**
     * 显示飘字文本
     * @param tip IFloatTip
     */
    function showFloatTip(tip) {
        gardener._instance.__showFloatTip(tip);
    }
    gardener.showFloatTip = showFloatTip;
    /**
     * 添加导航模块，window层之上，popup层之下
     * @param navi egret.DisplayObject
     */
    function addNavigator(navi) {
        gardener._instance.__addNavigator(navi);
    }
    gardener.addNavigator = addNavigator;
    /**
     * 查找当前已打开的Popup
     * @return IPopup
     */
    function findCurrentPopup() {
        return gardener._instance.__findCurrentPopup();
    }
    gardener.findCurrentPopup = findCurrentPopup;
    /**
     * 根据类型查找当前已打开的popup，常用于判断当前打开的popup是否是指定类型，如果不是指定类型，则返回null
     * @param targetClass class
     * @return IPopup
     */
    function findCurrentPopupByClass(targetClass) {
        return gardener._instance.__findCurrentPopupByClass(targetClass);
    }
    gardener.findCurrentPopupByClass = findCurrentPopupByClass;
    /**
     * 查找当前已打开的window
     * @return IWindow
     */
    function findCurrentWindow() {
        return gardener._instance.__findCurrentWindow();
    }
    gardener.findCurrentWindow = findCurrentWindow;
    /**
     * 根据类型查找当前已打开的window，常用于判断当前打开的window是否是指定类型，如果不是指定类型，则返回null
     * @param targetClass class
     * @return IWindow
     */
    function findCurrentWindowByClass(targetClass) {
        return gardener._instance.__findCurrentWindowByClass(targetClass);
    }
    gardener.findCurrentWindowByClass = findCurrentWindowByClass;
    /**
     * 查找当前已打开的scene
     * @return IScene
     */
    function findCurrentScene() {
        return gardener._instance.__findCurrnetScene();
    }
    gardener.findCurrentScene = findCurrentScene;
    /**
     * 根据类型查找当前已打开的scene，常用于判断当前打开的scene是否是指定类型，如果不是指定类型，则返回null
     * @param targetClass class
     * @return IScene
     */
    function findCurrentSceneByClass(targetClass) {
        return gardener._instance.__findCurrentSceneByClass(targetClass);
    }
    gardener.findCurrentSceneByClass = findCurrentSceneByClass;
    /**
     * 显示全局遮罩, 覆盖全屏，最上层
     * @param loading egret.DisplayObject
     */
    function showLoadingMask(loading) {
        gardener._instance.__showLoadingMask(loading);
    }
    gardener.showLoadingMask = showLoadingMask;
    /**
     * 移除遮罩
     * @param loading egret.DisplayObject 指定对象
     */
    function removeLoadingMask(loading) {
        gardener._instance.__removeLoadingMask(loading);
    }
    gardener.removeLoadingMask = removeLoadingMask;
    /**
     * 生成龙骨急速格式动画，已废弃，请导出二进制格式，并使用二进制动画方法
     */
    function dbGenerateMovieClip(resName, disposeAfterUnload, removeAfterComplete) {
        return gardener._dbAnimeGeneratorInstance.__generateMovieClip(resName, disposeAfterUnload, removeAfterComplete);
    }
    gardener.dbGenerateMovieClip = dbGenerateMovieClip;
    /**
     * 生成龙骨急速格式动画，并缓存动画数据，已废弃，请导出二进制格式，并使用二进制动画方法
     */
    function dbGenerateMovieClipWithCache(resName, disposeAfterUnload, removeAfterComplete) {
        return gardener._dbAnimeGeneratorInstance.__generateMovieClip(resName, disposeAfterUnload, removeAfterComplete, false);
    }
    gardener.dbGenerateMovieClipWithCache = dbGenerateMovieClipWithCache;
    /**
     * 回收所有急速格式的龙骨动画资源，已废弃
     */
    function dbDisposeAllMovieClipData() {
        gardener._dbAnimeGeneratorInstance.__disposeMovieClipData();
    }
    gardener.dbDisposeAllMovieClipData = dbDisposeAllMovieClipData;
    /**
     * 回收指定急速格式的龙骨动画 已废弃
     * @param resName string 资源文件名称 例如 resName_ske_dbmv, resName_tex_png
     */
    function dbDisposeMovieClipData(resName) {
        gardener._dbAnimeGeneratorInstance.__disposeMovieClipData(resName);
    }
    gardener.dbDisposeMovieClipData = dbDisposeMovieClipData;
    /**
     * 生成龙骨二进制动画
     * @param resName string 资源文件名称 例如 resName_ske_dbbin, resName_tex_png
     * @param disposeAfterUnload boolean 当动画被移除的时候，是否自动回收 默认true，如果设为false，则需要手动回收gardener.dbDisposeDbbinAnime(anime)
     * @param removeAfterComplete boolean 当动画播放周期结束，是否自动从父容器中移除，默认为true
     */
    function dbGenerateDbbinAnime(resName, armatureName, disposeAfterUnload, removeAfterComplete) {
        return gardener._dbAnimeGeneratorInstance.__generateDbbinAnime(resName, armatureName, disposeAfterUnload, removeAfterComplete);
    }
    gardener.dbGenerateDbbinAnime = dbGenerateDbbinAnime;
    /**
     * 回收指定的龙骨二进制动画对象
     * @param anime dragonBones.EgretAramtureDisplay
     */
    function dbDisposeDbbinAnime(anime) {
        gardener._dbAnimeGeneratorInstance.__disposeDbbinAnime(anime);
    }
    gardener.dbDisposeDbbinAnime = dbDisposeDbbinAnime;
    /**
     * 回收所有二进制龙骨动画资源缓存
     */
    function dbDisposeAllDbbinFactoryData() {
        gardener._dbAnimeGeneratorInstance.__disposeDBFactoryData();
    }
    gardener.dbDisposeAllDbbinFactoryData = dbDisposeAllDbbinFactoryData;
    /**
     * 回收指定二进制龙骨动画资源缓存
     */
    function dbDisposeDbbinFactoryData(resName) {
        gardener._dbAnimeGeneratorInstance.__disposeDBFactoryData(resName);
    }
    gardener.dbDisposeDbbinFactoryData = dbDisposeDbbinFactoryData;
    /**
     * 启动龙骨骨骼动画计时器，启动龙骨动画前，需要开启计时器
     */
    function dbStartDbWorldClock() {
        gardener._dbAnimeGeneratorInstance.__startDbWorldClock();
    }
    gardener.dbStartDbWorldClock = dbStartDbWorldClock;
    /**
     * 关闭龙骨谷歌动画计时器
     */
    function dbStopDbWorldClock() {
        gardener._dbAnimeGeneratorInstance.__stopDbWorldClock();
    }
    gardener.dbStopDbWorldClock = dbStopDbWorldClock;
})(gardener || (gardener = {}));
var gardener;
(function (gardener) {
    var BaseMessageBox = (function (_super) {
        __extends(BaseMessageBox, _super);
        function BaseMessageBox(allowCloseBuyTapBg) {
            if (allowCloseBuyTapBg === void 0) { allowCloseBuyTapBg = false; }
            var _this = _super.call(this) || this;
            // 点击背景是否允许关闭弹窗
            _this._allowCloseByTapBg = false;
            // 弹出多个时候是否偏移显示
            _this._allowMultipleOffsetPosition = true;
            _this._allowCloseByTapBg = allowCloseBuyTapBg;
            return _this;
        }
        Object.defineProperty(BaseMessageBox.prototype, "AllowCloseByTapBg", {
            get: function () {
                return this._allowCloseByTapBg;
            },
            set: function (value) {
                this._allowCloseByTapBg = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseMessageBox.prototype, "AllowMultipleOffsetPosition", {
            get: function () {
                return this._allowMultipleOffsetPosition;
            },
            set: function (value) {
                this._allowMultipleOffsetPosition = value;
            },
            enumerable: true,
            configurable: true
        });
        return BaseMessageBox;
    }(egret.DisplayObjectContainer));
    gardener.BaseMessageBox = BaseMessageBox;
    __reflect(BaseMessageBox.prototype, "gardener.BaseMessageBox");
    var EUIBaseMessageBox = (function (_super) {
        __extends(EUIBaseMessageBox, _super);
        function EUIBaseMessageBox(allowCloseBuyTapBg) {
            if (allowCloseBuyTapBg === void 0) { allowCloseBuyTapBg = false; }
            var _this = _super.call(this) || this;
            // 点击背景是否允许关闭弹窗
            _this._allowCloseByTapBg = false;
            // 弹出多个时候是否偏移显示
            _this._allowMultipleOffsetPosition = true;
            _this._allowCloseByTapBg = allowCloseBuyTapBg;
            return _this;
        }
        Object.defineProperty(EUIBaseMessageBox.prototype, "AllowCloseByTapBg", {
            get: function () {
                return this._allowCloseByTapBg;
            },
            set: function (value) {
                this._allowCloseByTapBg = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EUIBaseMessageBox.prototype, "AllowMultipleOffsetPosition", {
            get: function () {
                return this._allowMultipleOffsetPosition;
            },
            set: function (value) {
                this._allowMultipleOffsetPosition = value;
            },
            enumerable: true,
            configurable: true
        });
        return EUIBaseMessageBox;
    }(eui.Component));
    gardener.EUIBaseMessageBox = EUIBaseMessageBox;
    __reflect(EUIBaseMessageBox.prototype, "gardener.EUIBaseMessageBox");
})(gardener || (gardener = {}));
var gardener;
(function (gardener) {
    /**
     * 弹出窗口基类
     */
    var BasePopup = (function (_super) {
        __extends(BasePopup, _super);
        function BasePopup() {
            var _this = _super.call(this) || this;
            // 初始化完成
            _this._isInitCompleted = false;
            _this.showPopAnime = true;
            return _this;
        }
        BasePopup.prototype.display = function () {
        };
        BasePopup.prototype.dispose = function () {
        };
        return BasePopup;
    }(egret.DisplayObjectContainer));
    gardener.BasePopup = BasePopup;
    __reflect(BasePopup.prototype, "gardener.BasePopup");
    /**
     * eui窗口基类
     */
    var EUIBasePopup = (function (_super) {
        __extends(EUIBasePopup, _super);
        function EUIBasePopup() {
            var _this = _super.call(this) || this;
            // 初始化完成
            _this._isInitCompleted = false;
            _this.showPopAnime = true;
            return _this;
        }
        EUIBasePopup.prototype.display = function () {
        };
        EUIBasePopup.prototype.dispose = function () {
        };
        return EUIBasePopup;
    }(eui.Component));
    gardener.EUIBasePopup = EUIBasePopup;
    __reflect(EUIBasePopup.prototype, "gardener.EUIBasePopup");
})(gardener || (gardener = {}));
var gardener;
(function (gardener) {
    /**
 * 场景
 */
    var BaseScene = (function (_super) {
        __extends(BaseScene, _super);
        function BaseScene() {
            var _this = _super.call(this) || this;
            // 是否初始化完成
            _this._isInitCompleted = false;
            _this.height = gardener.StageHeight;
            _this.width = gardener.StageWidth;
            return _this;
        }
        BaseScene.prototype.display = function () {
        };
        BaseScene.prototype.dispose = function () {
        };
        return BaseScene;
    }(egret.DisplayObjectContainer));
    gardener.BaseScene = BaseScene;
    __reflect(BaseScene.prototype, "gardener.BaseScene");
    var EUIBaseScene = (function (_super) {
        __extends(EUIBaseScene, _super);
        function EUIBaseScene() {
            var _this = _super.call(this) || this;
            // 初始化完成
            _this._isInitCompleted = false;
            _this.height = gardener.StageHeight;
            _this.width = gardener.StageWidth;
            return _this;
        }
        EUIBaseScene.prototype.display = function () {
        };
        EUIBaseScene.prototype.dispose = function () {
        };
        return EUIBaseScene;
    }(eui.Component));
    gardener.EUIBaseScene = EUIBaseScene;
    __reflect(EUIBaseScene.prototype, "gardener.EUIBaseScene");
})(gardener || (gardener = {}));
var gardener;
(function (gardener) {
    /**
     * 窗口基类
     */
    var BaseWindow = (function (_super) {
        __extends(BaseWindow, _super);
        function BaseWindow() {
            var _this = _super.call(this) || this;
            // 初始化完成
            _this._isInitCompleted = false;
            _this.width = gardener.WindowContainer.width;
            _this.height = gardener.WindowContainer.height;
            return _this;
        }
        BaseWindow.prototype.display = function () {
        };
        BaseWindow.prototype.dispose = function () {
        };
        return BaseWindow;
    }(egret.DisplayObjectContainer));
    gardener.BaseWindow = BaseWindow;
    __reflect(BaseWindow.prototype, "gardener.BaseWindow");
    /**
     * eui窗口基类
     */
    var EUIBaseWindow = (function (_super) {
        __extends(EUIBaseWindow, _super);
        function EUIBaseWindow() {
            var _this = _super.call(this) || this;
            // 初始化完成
            _this._isInitCompleted = false;
            _this.width = gardener.WindowContainer.width;
            _this.height = gardener.WindowContainer.height;
            return _this;
        }
        EUIBaseWindow.prototype.display = function () {
        };
        EUIBaseWindow.prototype.dispose = function () {
        };
        return EUIBaseWindow;
    }(eui.Component));
    gardener.EUIBaseWindow = EUIBaseWindow;
    __reflect(EUIBaseWindow.prototype, "gardener.EUIBaseWindow");
})(gardener || (gardener = {}));
/**
 * GameGardener DbAmimationGenerator —— A tool for using the dragonbones animations
 * @version 1.0
 * @author jiajun
 */
var gardener;
(function (gardener) {
    /**
     * 动画生成工具
     */
    var DbAnimeGenerator = (function (_super) {
        __extends(DbAnimeGenerator, _super);
        function DbAnimeGenerator() {
            var _this = _super.call(this) || this;
            /**
             * 动画工厂列表
             */
            _this.__dbFactoryTsMap = new TsMap;
            /**f
             * 工厂index
             */
            _this.__dbFactoryIndex = 0;
            return _this;
        }
        /**
         * 启动动画计时器
         */
        DbAnimeGenerator.prototype.__worlClock = function () {
            dragonBones.WorldClock.clock.advanceTime(-1);
        };
        /**
         * 快速获取动画
         */
        DbAnimeGenerator.prototype.__generateMovieClip = function (resName, disposeAfterUnload, removeAfterComplete, noCache) {
            if (disposeAfterUnload === void 0) { disposeAfterUnload = true; }
            if (removeAfterComplete === void 0) { removeAfterComplete = true; }
            if (noCache === void 0) { noCache = true; }
            var movie;
            try {
                if (!dragonBones.hasMovieGroup(resName)) {
                    dragonBones.addMovieGroup(RES.getRes(resName + "_ske_dbmv"), RES.getRes(resName + "_tex_png"), resName); // 添加动画数据和贴图
                }
                movie = dragonBones.buildMovie("MovieClip", resName);
                if (movie) {
                    movie.name = resName;
                    // 被移除后自动释放
                    removeAfterComplete && movie.addEventListener(dragonBones.AnimationEvent.COMPLETE, this.__removeMovieCilpAfterComplete, this);
                    // 动画播放完毕，自动移除 但不释放
                    disposeAfterUnload && movie.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.__disposeMovieAnimeAfterUnload, this);
                }
                else {
                    egret.error("__generateMovieClip error: no movie " + resName);
                }
                if (noCache)
                    dragonBones.removeMovieGroup(resName);
            }
            catch (e) {
                egret.error("__generateMovieClip error:" + resName);
            }
            return movie;
        };
        /**
         * 创建龙骨动画工厂 并获得龙骨对象
         */
        DbAnimeGenerator.prototype.__generateDbbinAnime = function (resName, armatureName, disposeAfterUnload, removeAfterComplete) {
            if (disposeAfterUnload === void 0) { disposeAfterUnload = true; }
            if (removeAfterComplete === void 0) { removeAfterComplete = false; }
            if (!this.hasEventListener(egret.Event.ENTER_FRAME))
                egret.warn('the dragonbones world clock is stop, try to start, call function: gardener.startDbWorldClock()');
            var armatureDisplay;
            var factory;
            var factoryMap = this.__dbFactoryTsMap;
            try {
                if (factoryMap.containsKey(resName)) {
                    factory = factoryMap.get(resName);
                }
                else {
                    var skeletonData = RES.getRes(resName + "_ske_dbbin");
                    var textureData = RES.getRes(resName + "_tex_json");
                    var texture = RES.getRes(resName + "_tex_png");
                    factory = new dragonBones.EgretFactory();
                    factory.parseDragonBonesData(skeletonData);
                    factory.parseTextureAtlasData(textureData, texture);
                    factoryMap.put(resName, factory);
                }
                armatureDisplay = factory.buildArmatureDisplay(armatureName);
                resName += ++this.__dbFactoryIndex;
                if (armatureDisplay) {
                    armatureDisplay.name = resName;
                    // 动画播放完毕，自动移除 但不释放
                    removeAfterComplete && armatureDisplay.addEventListener(dragonBones.AnimationEvent.COMPLETE, this.__removeDbbinAnimeAfterComplete, this);
                    // 被移除后自动释放
                    disposeAfterUnload && armatureDisplay.once(egret.Event.REMOVED_FROM_STAGE, this.__disposeDbbinAnimeAfterUnload, this);
                    dragonBones.WorldClock.clock.add(armatureDisplay.armature);
                }
                else {
                    egret.error("__generateDbbinAnime error: no armatureDisplay " + resName);
                }
            }
            catch (e) {
                egret.error("__generateDbbinAnime error: " + resName);
            }
            factoryMap = null;
            return armatureDisplay;
        };
        /**
         * 动画移除事件 移除并释放
         */
        DbAnimeGenerator.prototype.__disposeDbbinAnimeAfterUnload = function (e) {
            var armatureDisplay = e.target;
            this.__disposeDbbinAnime(armatureDisplay);
        };
        /**
         * 释放dbbin动画
         */
        DbAnimeGenerator.prototype.__disposeDbbinAnime = function (armatureDisplay) {
            try {
                if (armatureDisplay != null && armatureDisplay.animation && armatureDisplay.armature) {
                    dragonBones.WorldClock.clock.remove(armatureDisplay.armature);
                    armatureDisplay.removeEventListener(dragonBones.AnimationEvent.COMPLETE, this.__removeDbbinAnimeAfterComplete, this);
                    armatureDisplay.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.__disposeDbbinAnimeAfterUnload, this);
                    armatureDisplay.animation.stop();
                    armatureDisplay.armature.dispose();
                    armatureDisplay.dispose();
                    armatureDisplay = null;
                }
            }
            catch (e) {
                egret.error("__disposeDbbinAnime error: " + armatureDisplay.name);
            }
        };
        /**
         * 动画完成事件
         */
        DbAnimeGenerator.prototype.__removeDbbinAnimeAfterComplete = function (e) {
            var armatureDisplay = e.target;
            try {
                if (armatureDisplay != null) {
                    // armatureDisplay.removeEventListener(dragonBones.AnimationEvent.COMPLETE, this.__removeDbbinAnimeAfterComplete, this);
                    if (armatureDisplay.parent != null) {
                        armatureDisplay.parent.removeChild(armatureDisplay);
                    }
                }
            }
            catch (e) {
                egret.error("__removeDbbinAnimeAfterComplete error: " + armatureDisplay.name);
            }
        };
        /**
         * 动画移除
         */
        DbAnimeGenerator.prototype.__removeMovieCilpAfterComplete = function (e) {
            try {
                var movie = e.target;
                if (movie != null) {
                    // movie.removeEventListener(dragonBones.AnimationEvent.COMPLETE, this.__removeMovieCilpAfterComplete, this);
                    if (movie.parent != null) {
                        movie.parent.removeChild(movie);
                    }
                }
            }
            catch (e) {
                egret.error("AnimationCompleted error");
            }
        };
        /**
         * 动画移除
         */
        DbAnimeGenerator.prototype.__disposeMovieAnimeAfterUnload = function (e) {
            var movie = e.target;
            this.__disposeMovie(movie);
        };
        /**
         * 回收movie
         */
        DbAnimeGenerator.prototype.__disposeMovie = function (movie) {
            try {
                if (movie != null) {
                    movie.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.__disposeMovieAnimeAfterUnload, this);
                    movie.removeEventListener(dragonBones.AnimationEvent.COMPLETE, this.__removeMovieCilpAfterComplete, this);
                    if (movie.isPlaying) {
                        movie.stop();
                    }
                    movie.dispose();
                }
            }
            catch (e) {
                egret.error("__disposeMovie error");
            }
            movie = null;
        };
        /**
         * 清理Dbbin动画工厂
         */
        DbAnimeGenerator.prototype.__disposeDBFactoryData = function (resName) {
            var factoryMap = this.__dbFactoryTsMap;
            if (resName) {
                var factory = factoryMap.remove(resName);
                if (factory) {
                    factory.clear();
                    factory = null;
                }
            }
            else {
                for (var factoryName in factoryMap.entry) {
                    var factory = factoryMap.remove(factoryName);
                    if (factory) {
                        factoryMap.remove(factoryName);
                        factory.clear();
                        factory = null;
                    }
                }
            }
            factoryMap = null;
        };
        /**
         * 清理MovieClip二进制缓存
         */
        DbAnimeGenerator.prototype.__disposeMovieClipData = function (resName) {
            if (resName) {
                dragonBones.removeMovieGroup(resName);
            }
            else {
                dragonBones.removeAllMovieGroup();
            }
        };
        DbAnimeGenerator.prototype.__startDbWorldClock = function () {
            // 启动龙骨动画计时器
            if (this.hasEventListener(egret.Event.ENTER_FRAME))
                return;
            this.addEventListener(egret.Event.ENTER_FRAME, this.__worlClock, this);
        };
        DbAnimeGenerator.prototype.__stopDbWorldClock = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.__worlClock, this);
        };
        DbAnimeGenerator.__initAnimeGenerator = function () {
            return gardener._dbAnimeGeneratorInstance || new gardener.DbAnimeGenerator();
        };
        return DbAnimeGenerator;
    }(egret.DisplayObject));
    gardener.DbAnimeGenerator = DbAnimeGenerator;
    __reflect(DbAnimeGenerator.prototype, "gardener.DbAnimeGenerator");
})(gardener || (gardener = {}));
// 字符串格式化，替换变量
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}
//格式化日期时间
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
// 随机重排数组
Array.prototype.shuffle = function () {
    var input = this;
    for (var i = input.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
};
/**
 * 随机整数
 * @param min 最小整数字
 * @param max 最大整数字(上限，取不到)
 */
Number.prototype.getRandomInteger = function (max, min) {
    min = isNaN(min) ? 0 : min;
    max = isNaN(max) ? 0 : max;
    return Math.floor((max - min) * Math.random()) + min;
};
/**
 *
 * @author
 *
 */
var TsMap = (function () {
    function TsMap() {
        // Map大小/  
        this._size = 0;
        //对象/  
        this.entry = new Object();
    }
    //Map的存put方法/  
    TsMap.prototype.put = function (key, value) {
        if (!this.containsKey(key)) {
            this._size++;
            this.entry[key] = value;
        }
    };
    //Map的修改方法/
    TsMap.prototype.set = function (key, value) {
        if (this.containsKey(key)) {
            this.entry[key] = value;
        }
    };
    //Map取get方法/  
    TsMap.prototype.get = function (key) {
        return this.containsKey(key) ? this.entry[key] : null;
    };
    //Map删除remove方法/  
    TsMap.prototype.remove = function (key) {
        var val = this.entry[key];
        if (this.containsKey(key) && (delete this.entry[key])) {
            this._size--;
        }
        return val;
    };
    //是否包含Key/  
    TsMap.prototype.containsKey = function (key) {
        return (key in this.entry);
    };
    //是否包含Value/  
    TsMap.prototype.containsValue = function (value) {
        for (var prop in this.entry) {
            if (this.entry[prop] == value) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(TsMap.prototype, "values", {
        //所有的Value/  
        get: function () {
            var values = new Array();
            for (var prop in this.entry) {
                values.push(this.entry[prop]);
            }
            return values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TsMap.prototype, "keys", {
        //所有的 Key/  
        get: function () {
            var keys = new Array();
            for (var prop in this.entry) {
                keys.push(prop);
            }
            return keys;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TsMap.prototype, "size", {
        //Map size/  
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    //清空Map/  
    TsMap.prototype.clear = function () {
        this._size = 0;
        this.entry = new Object();
    };
    return TsMap;
}());
__reflect(TsMap.prototype, "TsMap");
