declare module gardener {
    interface IFloatTip extends egret.DisplayObject {
        dispose(): any;
    }
    class BaseFloatTip extends egret.DisplayObjectContainer {
        constructor();
    }
    class EUIBaseFloatTip extends eui.Component {
        constructor();
    }
}
/**
 * GameGardener —— An Egret Game UI Framework
 * @version 1.0
 * @author jiajun
 */
declare module gardener {
    /**
     * gardener 全局配置
     */
    var Configuration: any;
    /**
     * 字符串模板json对象
     */
    var StringResourceJson: any;
    /**
     * 全局高度
     */
    var StageHeight: any;
    /**
     * 全局宽度
     */
    var StageWidth: any;
    /**
     * Scene容器
     */
    var SceneContainer: any;
    /**
     * Window容器
     */
    var WindowContainer: any;
    /**
     * Popup容器
     */
    var PopupContainer: any;
    /**
     * MessageBox容器
     */
    var MessageContainer: any;
    /**
     * 导航层
     */
    var NavigatorContainer: any;
    /**
     * gardener全局单例对象
     */
    var _instance: gardener.Gardener;
    /**
     * 获取文本字符串模板
     * @param key string 字符串对应的键值
     * @param replaceValues string[] 动态替换字符串模板中的参数。模板例子：欢迎{0}来到游戏{1}区...
     * @return 文本字符串
     */
    function getString(key: string, ...replaceValues: string[]): any;
    /**
     * Gardner，游戏框架主类，轻量级游戏UI框架，兼容横屏竖屏
     */
    class Gardener extends egret.EventDispatcher {
        /**
         * 单例对象
         */
        private static __instance;
        /**
         * 全局Main对象
         */
        __mainContainer: egret.DisplayObjectContainer;
        /**
         * Scene层容器，游戏最底层
         */
        __sceneContainer: egret.DisplayObjectContainer;
        /**
         * Window层容器，Sprite类型，可以设置底色，在Scene层之上，导航层之下
         */
        __windowContainer: egret.Sprite;
        /**
         * 导航层，在Scene,Window层之上，popup层之下
         */
        __navigatorContainer: egret.DisplayObjectContainer;
        /**
         * Popup层，在导航层之上，message层之下
         */
        __popupContainer: egret.Sprite;
        /**
         * messagebox 层，Popup层之上
         */
        __messageContainer: egret.Sprite;
        __windowHistoryList: Array<IWindow>;
        private constructor();
        /**
         * 初始化所有容器
         */
        private __initContainers(main, config);
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
        static __init(main: egret.DisplayObjectContainer, config?: {
            navigatorContainerAvailable?: boolean;
            stringResName?: string;
            orientation?: string;
            stageWidth?: number;
            stageHeight?: number;
            windowContainerMaskColor?: number;
            windowContainerMaskAlpha?: number;
            popupContainerMaskColor?: number;
            popupContainerMaskAlpha?: number;
            messageContainerMaskColor?: number;
            messageContainerMaskAlpha?: number;
            popupPositionHori?: number;
            popupPositionVert?: number;
            allowMultipleMessageBoxes?: boolean;
            showMultipleMessageBoxesOffset?: number;
        }): Gardener;
        /**
         * 打开一个Scene
         * @param scene IScene 打开的对象
         * @param showAnime boolean 是否显示切换Scene的动画
         */
        __loadScene(scene: egret.DisplayObject, showAnime?: boolean): boolean;
        /**
         * 清理所有window历史
         */
        __clearWindowHistory(): void;
        /**
         * 打开一个window
         * @param window IWindow
         * @param savePreWindow boolean 是否缓存上一个打开的window
         * @param isPreWindow boolean 是否是打开之前缓存的window
         */
        __openWindow(window: IWindow, savePreWindow?: boolean, isPreWindow?: boolean): void;
        /**
         * 关闭Window
         * @param closeAll boolean 是否一同关闭window的缓存历史
        */
        __closeWindow(closeAll?: boolean): void;
        __openPopup(popup: IPopup): void;
        /**
         * 关闭当前popup
         * @param immediate boolean 立即关闭，不显示动画，默认false
         */
        __closePopup(immediate?: boolean): void;
        /**
         * 显示飘字文本
         * @param tip IFloatTip
         */
        __showFloatTip(tip: IFloatTip): void;
        /**
         * 弹出messagebox
         * @param messageBox IMessageBox
         * @param closeOthers boolean 打开的同时是否关闭其他当前打开
         */
        __showMessageBox(messageBox: egret.DisplayObject, closeOthers?: boolean): void;
        /**
         * 关闭指定的messagebox
         * @param target IMessageBox
         * @param closeAll boolean  关闭全部
         */
        __closeMessageBox(target: IMessageBox, closeAll?: boolean): void;
        /**
         * 点击messagebox背景触发事件
         */
        __onMessageContainerBg_Tap(e: egret.TouchEvent): void;
        /**
         * 添加导航模块，window层之上，popup层之下
         * @param navi egret.DisplayObject
         */
        __addNavigator(navi: egret.DisplayObject): void;
        __findCurrentPopup(): IPopup;
        __findCurrentPopupByClass(targetClass: any): IPopup;
        __findCurrentWindow(): IWindow;
        __findCurrentWindowByClass(targetClass: any): IWindow;
        __findCurrnetScene(): IScene;
        __findCurrentSceneByClass(targetClass: any): IScene;
        __removeLoadingMask(target: egret.DisplayObject): void;
        __showLoadingMask(loading: egret.DisplayObject): egret.DisplayObject;
    }
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
    function initGardener(main: egret.DisplayObjectContainer, config?: {
        navigatorContainerAvailable?: boolean;
        stringResName?: string;
        orientation?: string;
        stageWidth?: number;
        stageHeight?: number;
        windowContainerMaskColor?: number;
        windowContainerMaskAlpha?: number;
        popupContainerMaskColor?: number;
        popupContainerMaskAlpha?: number;
        messageContainerMaskColor?: number;
        messageContainerMaskAlpha?: number;
        popupPositionHori?: number;
        popupPositionVert?: number;
        allowMultipleMessageBoxes?: boolean;
        showMultipleMessageBoxesOffset?: number;
    }): void;
    /**
     * 判断Gardener是否初始化完成
     */
    function checkGgValid(): boolean;
    /**
     * 打开一个Scene
     * @param scene IScene 打开的对象
     * @param showAnime boolean 是否显示切换Scene的动画
     */
    function loadScene(scene: IScene, showAnime?: boolean): void;
    /**
     * 打开一个window，如果当前有window已经打开，则自动关闭并dispose
     * @param window IWindow
     */
    function openWindow(window: IWindow): void;
    /**
     * 打开一个window，同时缓存上一个window，当此window关闭的时候，之前保存的window会重新打开
     * @param window IWindow
     */
    function openWindowAndSavingPrevious(window: IWindow): void;
    /**
     * 关闭当前window，如果closeAll=true，则dispose所有之前缓存的window历史
     * @param closeAll 默认false
     */
    function closeWindow(closeAll?: boolean): void;
    /**
     * 清空并回收所有缓存的window
     */
    function clearWindowHistory(): void;
    /**
     * 打开一个popup
     * @param popup IPopup
     */
    function openPopup(popup: IPopup): void;
    /**
     * 关闭当前popup
     * @param immediate boolean 立即关闭，不显示动画，默认false
     */
    function closePopup(immediate?: boolean): void;
    /**
     * 弹出messagebox
     * @param messageBox IMessageBox
     * @param closeOthers boolean 打开的同时是否关闭其他当前打开
     */
    function showMessageBox(messageBox: IMessageBox, closeOthers?: boolean): void;
    /**
     * 关闭所有已打开的messagebox
     */
    function closeAllMessageBoxes(): void;
    /**
     * 关闭指定的messagebox
     * @param target IMessageBox
     */
    function closeMessageBox(target: IMessageBox): void;
    /**
     * 显示飘字文本
     * @param tip IFloatTip
     */
    function showFloatTip(tip: IFloatTip): void;
    /**
     * 添加导航模块，window层之上，popup层之下
     * @param navi egret.DisplayObject
     */
    function addNavigator(navi: egret.DisplayObject): void;
    /**
     * 查找当前已打开的Popup
     * @return IPopup
     */
    function findCurrentPopup(): IPopup;
    /**
     * 根据类型查找当前已打开的popup，常用于判断当前打开的popup是否是指定类型，如果不是指定类型，则返回null
     * @param targetClass class
     * @return IPopup
     */
    function findCurrentPopupByClass(targetClass: any): IPopup;
    /**
     * 查找当前已打开的window
     * @return IWindow
     */
    function findCurrentWindow(): IWindow;
    /**
     * 根据类型查找当前已打开的window，常用于判断当前打开的window是否是指定类型，如果不是指定类型，则返回null
     * @param targetClass class
     * @return IWindow
     */
    function findCurrentWindowByClass(targetClass: any): IWindow;
    /**
     * 查找当前已打开的scene
     * @return IScene
     */
    function findCurrentScene(): IScene;
    /**
     * 根据类型查找当前已打开的scene，常用于判断当前打开的scene是否是指定类型，如果不是指定类型，则返回null
     * @param targetClass class
     * @return IScene
     */
    function findCurrentSceneByClass(targetClass: any): IScene;
    /**
     * 显示全局遮罩, 覆盖全屏，最上层
     * @param loading egret.DisplayObject
     */
    function showLoadingMask(loading: egret.DisplayObject): void;
    /**
     * 移除遮罩
     * @param loading egret.DisplayObject 指定对象
     */
    function removeLoadingMask(loading: egret.DisplayObject): void;
    /**
     * 生成龙骨急速格式动画，已废弃，请导出二进制格式，并使用二进制动画方法
     */
    function dbGenerateMovieClip(resName: string, disposeAfterUnload?: boolean, removeAfterComplete?: boolean): dragonBones.Movie;
    /**
     * 生成龙骨急速格式动画，并缓存动画数据，已废弃，请导出二进制格式，并使用二进制动画方法
     */
    function dbGenerateMovieClipWithCache(resName: string, disposeAfterUnload?: boolean, removeAfterComplete?: boolean): dragonBones.Movie;
    /**
     * 回收所有急速格式的龙骨动画资源，已废弃
     */
    function dbDisposeAllMovieClipData(): void;
    /**
     * 回收指定急速格式的龙骨动画 已废弃
     * @param resName string 资源文件名称 例如 resName_ske_dbmv, resName_tex_png
     */
    function dbDisposeMovieClipData(resName: string): void;
    /**
     * 生成龙骨二进制动画
     * @param resName string 资源文件名称 例如 resName_ske_dbbin, resName_tex_png
     * @param disposeAfterUnload boolean 当动画被移除的时候，是否自动回收 默认true，如果设为false，则需要手动回收gardener.dbDisposeDbbinAnime(anime)
     * @param removeAfterComplete boolean 当动画播放周期结束，是否自动从父容器中移除，默认为true
     */
    function dbGenerateDbbinAnime(resName: string, armatureName: string, disposeAfterUnload?: boolean, removeAfterComplete?: boolean): dragonBones.EgretArmatureDisplay;
    /**
     * 回收指定的龙骨二进制动画对象
     * @param anime dragonBones.EgretAramtureDisplay
     */
    function dbDisposeDbbinAnime(anime: dragonBones.EgretArmatureDisplay): void;
    /**
     * 回收所有二进制龙骨动画资源缓存
     */
    function dbDisposeAllDbbinFactoryData(): void;
    /**
     * 回收指定二进制龙骨动画资源缓存
     */
    function dbDisposeDbbinFactoryData(resName: string): void;
    /**
     * 启动龙骨骨骼动画计时器，启动龙骨动画前，需要开启计时器
     */
    function dbStartDbWorldClock(): void;
    /**
     * 关闭龙骨谷歌动画计时器
     */
    function dbStopDbWorldClock(): void;
}
declare module gardener {
    interface IMessageBox extends egret.DisplayObject {
        display(): any;
        dispose(): any;
        AllowCloseByTapBg: boolean;
    }
    class BaseMessageBox extends egret.DisplayObjectContainer {
        protected _allowCloseByTapBg: boolean;
        AllowCloseByTapBg: boolean;
        protected _allowMultipleOffsetPosition: boolean;
        AllowMultipleOffsetPosition: boolean;
        constructor(allowCloseBuyTapBg?: boolean);
    }
    class EUIBaseMessageBox extends eui.Component {
        protected _allowCloseByTapBg: boolean;
        AllowCloseByTapBg: boolean;
        protected _allowMultipleOffsetPosition: boolean;
        AllowMultipleOffsetPosition: boolean;
        constructor(allowCloseBuyTapBg?: boolean);
    }
}
declare module gardener {
    interface IPopup extends egret.DisplayObject {
        display(): any;
        dispose(): any;
    }
    /**
     * 弹出窗口基类
     */
    class BasePopup extends egret.DisplayObjectContainer {
        protected _isInitCompleted: boolean;
        showPopAnime: boolean;
        constructor();
        protected display(): void;
        protected dispose(): void;
    }
    /**
     * eui窗口基类
     */
    class EUIBasePopup extends eui.Component {
        protected _isInitCompleted: boolean;
        showPopAnime: boolean;
        constructor();
        protected display(): void;
        protected dispose(): void;
    }
}
declare module gardener {
    interface IScene extends egret.DisplayObject {
        display(): any;
        dispose(): any;
    }
    /**
 * 场景
 */
    class BaseScene extends egret.DisplayObjectContainer {
        protected _isInitCompleted: boolean;
        constructor();
        protected display(): void;
        protected dispose(): void;
    }
    class EUIBaseScene extends eui.Component {
        protected _isInitCompleted: boolean;
        constructor();
        protected display(): void;
        protected dispose(): void;
    }
}
declare module gardener {
    interface IWindow extends egret.DisplayObject {
        display(): any;
        dispose(): any;
    }
    /**
     * 窗口基类
     */
    class BaseWindow extends egret.DisplayObjectContainer {
        protected _isInitCompleted: boolean;
        constructor();
        protected display(): void;
        protected dispose(): void;
    }
    /**
     * eui窗口基类
     */
    class EUIBaseWindow extends eui.Component {
        protected _isInitCompleted: boolean;
        constructor();
        protected display(): void;
        protected dispose(): void;
    }
}
/**
 * GameGardener DbAmimationGenerator —— A tool for using the dragonbones animations
 * @version 1.0
 * @author jiajun
 */
declare module gardener {
    var _dbAnimeGeneratorInstance: gardener.DbAnimeGenerator;
    /**
     * 动画生成工具
     */
    class DbAnimeGenerator extends egret.DisplayObject {
        /**
         * 动画工厂列表
         */
        private __dbFactoryTsMap;
        /**f
         * 工厂index
         */
        private __dbFactoryIndex;
        constructor();
        /**
         * 启动动画计时器
         */
        private __worlClock();
        /**
         * 快速获取动画
         */
        __generateMovieClip(resName: string, disposeAfterUnload?: boolean, removeAfterComplete?: boolean, noCache?: boolean): dragonBones.Movie;
        /**
         * 创建龙骨动画工厂 并获得龙骨对象
         */
        __generateDbbinAnime(resName: string, armatureName: string, disposeAfterUnload?: boolean, removeAfterComplete?: boolean): dragonBones.EgretArmatureDisplay;
        /**
         * 动画移除事件 移除并释放
         */
        private __disposeDbbinAnimeAfterUnload(e);
        /**
         * 释放dbbin动画
         */
        __disposeDbbinAnime(armatureDisplay: dragonBones.EgretArmatureDisplay): void;
        /**
         * 动画完成事件
         */
        private __removeDbbinAnimeAfterComplete(e);
        /**
         * 动画移除
         */
        private __removeMovieCilpAfterComplete(e);
        /**
         * 动画移除
         */
        private __disposeMovieAnimeAfterUnload(e);
        /**
         * 回收movie
         */
        __disposeMovie(movie: dragonBones.Movie): void;
        /**
         * 清理Dbbin动画工厂
         */
        __disposeDBFactoryData(resName?: string): void;
        /**
         * 清理MovieClip二进制缓存
         */
        __disposeMovieClipData(resName?: string): void;
        __startDbWorldClock(): void;
        __stopDbWorldClock(): void;
        static __initAnimeGenerator(): DbAnimeGenerator;
    }
}
interface String {
    format(...replacements: string[]): string;
}
interface Date {
    format(fmt: string): string;
}
interface Array<T> {
    shuffle(): Array<T>;
}
interface Number {
    getRandomInteger(max: number, min: number): number;
}
/**
 *
 * @author
 *
 */
declare class TsMap {
    constructor();
    private _size;
    entry: Object;
    put(key: any, value: any): void;
    set(key: any, value: any): void;
    get(key: any): Object;
    remove(key: any): Object;
    containsKey(key: any): boolean;
    containsValue(value: any): boolean;
    readonly values: Array<any>;
    readonly keys: Array<any>;
    readonly size: number;
    clear(): void;
}
