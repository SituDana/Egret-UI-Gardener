# Gardener框架介绍
Gardener作为一款轻型的白鹭游戏UI框架，提供丰富UI功能，满足绝大部分的游戏产品的需求。兼容EUI，适配横屏和竖屏项目，框架接口清晰简单，控制灵活，是从线上多款产品框架中总结提炼出来。此框架的意义在于解放开发者，让开发者把更多的精力用在游戏的核心玩法上。当前最低 egret engine 5.0.14 测试通过。

##### 内置龙骨动画控制器
Gardener内置一个龙骨动画控制器，支持二进制导出格式（json格式与二进制格式基本相同，扩展容易）、极速格式（已废弃），因为最新版本的dragonbones导出的二进制动画格式支持所有动画类型。此控制器特点是自动管理回收和资源缓存。

# Demo展示
![portraid_screenshot.png](https://upload-images.jianshu.io/upload_images/17499409-94111aef43581136.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![gardener_portrait_demo.gif](https://upload-images.jianshu.io/upload_images/17499409-ec041b63509f1e41.gif?imageMogr2/auto-orient/strip)

![landspace_screenshot.png](https://upload-images.jianshu.io/upload_images/17499409-e9313d88c514480a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![gardener_landspace_demo.gif](https://upload-images.jianshu.io/upload_images/17499409-4d52969173f64e49.gif?imageMogr2/auto-orient/strip)

# 框架层级
GardenerUI框架中，层级关系从下到上有：Scene层 -> Window层 -> Navigator层 -> Popup层 -> MessageBox层，它们相互独立，均为Main的子元素。所有层级容器都可以获取，并且可以直接修改他们的层次关系和布局属性。
### 各级容器
##### gardener.SceneContainer    ——scene场景容器，最底层，一般用来展示模块区域场景
##### gardener.WindowContainer    ——window窗口容器，一般用来展示功能相对独立的窗口，打开频率相对较高
##### gardener.NavigatorContainer    ——navigator导航容器
##### gardener.PopupContainer    ——popup弹窗容器，一般用来展示微小动作的确认或者小型功能模块
##### gardener.MessageContainer    ——message box消息弹窗容器 / 奖励弹窗容器
![ui_frame.jpg](https://upload-images.jianshu.io/upload_images/17499409-36727b76df1ca2a2.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 显示对象
##### Scene    ——scene场景
```
 /**
  * 非EUI 场景画面，必须继承gardener.BaseScene 和实现gardener.IScene 接口
  */
  class SceneDemo_1 extends gardener.BaseScene implements gardener.IScene;

 /**
  * EUI 场景画面，必须继承gardener.EUIBaseScene 和实现gardener.IScene 接口
  */
  class SceneEUIDemo_2 extends gardener.EUIBaseScene implements gardener.IScene
```
##### Window   ——window窗口
```
 /**
  * 非EUI Window画面，必须继承gardener.BaseWindow 和实现gardener.IWindow接口
  */
  class WindowDemo_1 extends gardener.BaseWindow implements gardener.IWindow;

 /**
  * EUI Window画面，必须继承gardener.EUIBaseWindow 和实现gardener.IWindow接口
  */
  class WindowEUIDemo_2 extends gardener.EUIBaseWindow implements gardener.IWindow
```
##### Navigator    ——navigator导航
```
 /**
  * egret.DisplayObject 导航控件 使用之前需要初始化开启 navigatorContainerAvailable = true, gardener.addNavigator(navi)
  */
  class NavigatorDemo extends egret.DisplayObject;  
```
##### Popup    ——popup弹窗
```
 /**
  * 非EUI Popup画面，必须继承gardener.BasePopup 和实现gardener.IPopup接口
  */
  class PopupDemo extends gardener.EUIBasePopup implements gardener.IPopup;

 /**
  * EUI Popup画面，必须继承gardener.EUIBasePopup 和实现gardener.IPopup接口
  */
  class PopupEUIDemo extends gardener.EUIBasePopup implements gardener.IPopup
```
##### MessageBox    ——message box消息弹窗
```
 /**
  * 非EUI MessageBox画面，必须继承gardener.BaseMessageBox
  */
  class DemoMessageBox extends gardener.BaseMessageBox;

 /**
  * EUI MessageBox画面，必须继承gardener.EUIBaseMessageBox
  */
  class DemoEUIMessageBox extends gardener.EUIBaseMessageBox
```

# 框架引入
将源码框架中bin目录中的gardener文件夹复制到白鹭项目中libs文件夹中，在egretProperties.json中配置modules.
```
      {
        "name": "gardener",
        "path": "./libs/gardener"
      }
```
# 启用Gardener 示例
```
        gardener.initGardener(this, {                                // 启动参数，参数详细请参照initGardener接口
            stringResName: "StringResource_cn_json",            // 全局本地化文本文件
            allowMultipleMessageBoxes: true,                    // 允许MessageBox多层覆弹
            showMultipleMessageBoxesOffset: 10,                  // 多层MessageBox错位显示
            navigatorContainerAvailable: true                    // 启用导航层
        });
        
        // 自定义Window容器属性
        gardener.WindowContainer.y = 130;
        gardener.WindowContainer.height = gardener.StageHeight - 100 - 130  // window高度 从全屏高度去除导航层头部和底部的高度

        // 自定义导航对象
        let navi: DemoNavigator = new DemoNavigator();
        navi.touchEnabled = false;
        navi.touchChildren = true;
        gardener.addNavigator(navi);
```
# 接口说明
##### 1. 初始化
```
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
    gardener.initGardener(main: egret.DisplayObjectContainer, config?: {
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
	}): void
```
##### 2. 验证组件是否可用
```
    /**
	 * 判断Gardener是否初始化完成
	 */
	gardener.checkGgValid(): boolean
```
##### 3. 打开一个Scene
```
    /**
	 * 打开一个Scene
	 * @param scene IScene 打开的对象
	 * @param showAnime boolean 是否显示切换Scene的过度动画
	 */
	gardener.loadScene(scene: gardener.IScene, showAnime?: boolean): void
```
##### 4. 打开一个window
```
    /**
	 * 打开一个window，如果当前有window已经打开，则自动关闭并dispose
	 * @param window IWindow
	 */
	gardener.openWindow(window: gardener.IWindow): void
```
##### 5. 打开一个window，同时保留上一个window
```
    /**
	 * 打开一个window，同时缓存上一个window，当此window关闭的时候，之前保存的window会自动弹回
	 * @param window IWindow
	 */
	gardener.openWindowAndSavingPrevious(window: gardener.IWindow): void
```
##### 6. 打开一个window，同时保留上一个window
```
    /**
	 * 打开一个window，同时缓存上一个window，当此window关闭的时候，之前保存的window会自动弹回
	 * @param window IWindow
	 */
	gardener.openWindowAndSavingPrevious(window: gardener.IWindow): void
```
##### 7. 关闭当前window
```
    /**
	 * 关闭当前window，如果closeAll=true，则dispose所有之前缓存的window历史
	 * @param closeAll 默认false
	 */
	gardener.closeWindow(closeAll?: boolean): void
```
##### 8. 清空并回收所有缓存的window
```
    /**
	 * 清空并回收所有缓存的window
	 */
	gardener.clearWindowHistory(): void
```
##### 9. 打开一个popup
```
    /**
	 * 打开一个popup
	 * @param popup IPopup
	 */
	gardener.openPopup(popup: gardener.IPopup): void
```
##### 10. 关闭当前popup
```
    /**
	 * 关闭当前popup
	 * @param immediate boolean 立即关闭，不显示动画，默认false
	 */
	gardener.closePopup(immediate?: boolean): void
```
##### 11. 弹出messagebox 消息弹窗， 一般游戏中即时弹出的消息，奖励，提醒等可以通过MessageBox实现
```
    /**
	 * 弹出messagebox
	 * @param messageBox IMessageBox
	 * @param closeOthers boolean 打开的同时是否关闭其他当前打开
	 */
	gardener.showMessageBox(messageBox: gardener.IMessageBox, closeOthers?: boolean): void
```
##### 12. 关闭所有已打开的messagebox
```
    /**
	 * 关闭所有已打开的messagebox
	 */
	gardener.closeAllMessageBoxes(): void
```
##### 13. 关闭指定的messagebox
```
    /**
	 * 关闭指定的messagebox
	 * @param target IMessageBox
	 */
	gardener.closeMessageBox(target: IMessageBox): void
```
##### 14. 显示飘字文本
```
    /**
	 * 显示飘字文本
	 * @param tip IFloatTip
	 */
	gardener.showFloatTip(tip: gardener.IFloatTip): void
```
##### 15. 添加导航模块，window层之上，popup层之下，可自定义层级
```
    /**
	 * 添加导航模块，window层之上，popup层之下
	 * @param navi egret.DisplayObject
	 */
	gardener.addNavigator(navi: egret.DisplayObject): void
```
##### 16. 查找当前已打开的Popup
```
    /**
	 * 查找当前已打开的Popup
	 * @return IPopup
	 */
	gardener.findCurrentPopup(): gardener.IPopup
```
##### 17. 根据类型查找当前已打开的popup，常用于判断当前打开的popup是否是指定类型，如果不是指定类型，则返回null
```
    /**
	 * 根据类型查找当前已打开的popup，常用于判断当前打开的popup是否是指定类型，如果不是指定类型，则返回null
	 * @param targetClass class
	 * @return IPopup
	 */
	gardener.findCurrentPopupByClass(targetClass): gardener.IPopup
```
##### 18. 查找当前已打开的window
```
    /**
	 * 查找当前已打开的window
	 * @return IWindow
	 */
	gardener.findCurrentWindow(): gardener.IWindow
```
##### 19. 根据类型查找当前已打开的window，常用于判断当前打开的window是否是指定类型，如果不是指定类型，则返回null
```
    /**
	 * 根据类型查找当前已打开的window，常用于判断当前打开的window是否是指定类型，如果不是指定类型，则返回null
	 * @param targetClass class
	 * @return IWindow
	 */
	gardener.findCurrentWindowByClass(targetClass): gardener.IWindow
```
##### 20. 查找当前已打开的scene
```
    /**
	 * 查找当前已打开的scene
	 * @return IScene
	 */
	gardener.findCurrentScene(): gardener.IScene
```
##### 21. 根据类型查找当前已打开的scene，常用于判断当前打开的scene是否是指定类型，如果不是指定类型，则返回null
```
    /**
	 * 根据类型查找当前已打开的scene，常用于判断当前打开的scene是否是指定类型，如果不是指定类型，则返回null
	 * @param targetClass class
	 * @return IScene
	 */
	gardener.findCurrentSceneByClass(targetClass): gardener.IScene
```
##### 22. 显示全局遮罩, 覆盖全屏，最上层
```
    /**
	 * 显示全局遮罩, 覆盖全屏，最上层
	 * @param loading egret.DisplayObject
	 */
	gardener.showLoadingMask(loading: egret.DisplayObject): void
```
##### 23. 移除遮罩
```
    /**
	 * 移除遮罩
	 * @param loading egret.DisplayObject 指定对象
	 */
	gardener.removeLoadingMask(loading: egret.DisplayObject): void
```
##### 24. 生成龙骨二进制动画对象
```
    /**
	 * 生成龙骨二进制动画
	 * @param resName string 资源文件名称 例如 resName_ske_dbbin, resName_tex_png
	 * @param disposeAfterUnload boolean 当动画被移除的时候，是否自动回收 默认true，如果设为false，则需要手动回收gardener.dbDisposeDbbinAnime(anime)
	 * @param removeAfterComplete boolean 当动画播放周期结束，是否自动从父容器中移除，默认为true
	 */
	gardener.dbGenerateDbbinAnime(resName: string, armatureName: string, disposeAfterUnload?: boolean, removeAfterComplete?: boolean)
```
##### 25. 回收指定的龙骨二进制动画对象
```
    /**
	 * 回收指定的龙骨二进制动画对象
	 * @param anime dragonBones.EgretAramtureDisplay
	 */
	gardener.dbDisposeDbbinAnime(anime: dragonBones.EgretArmatureDisplay): void
```
##### 25. 回收所有二进制龙骨动画资源缓存
```
    /**
	 * 回收所有二进制龙骨动画资源缓存
	 */
	gardener.dbDisposeAllDbbinFactoryData(): void
```
##### 26. 回收指定二进制龙骨动画资源缓存
```
    /**
	 * 回收指定二进制龙骨动画资源缓存
	 * @param resName string 资源文件名称
	 */
	gardener.dbDisposeDbbinFactoryData(resName: string): void
```
##### 27. 关闭龙骨谷歌动画计时器
```
    /**
	 * 关闭龙骨谷歌动画计时器
	 */
	gardener.dbStopDbWorldClock(): void
```
##### 28. 获取文本字符串模板
```
    /**
	 * 获取文本字符串模板
	 * @param key string 字符串对应的键值
	 * @param replaceValues string[] 动态替换字符串模板中的参数。模板例子：欢迎{0}来到游戏{1}区...
	 * @return 文本字符串
	 */
	gardener.getString(key: string, ...replaceValues: string[]) 
```
# 全局属性
```
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
```
