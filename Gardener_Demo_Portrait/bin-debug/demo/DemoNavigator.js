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
var DemoNavigator = (function (_super) {
    __extends(DemoNavigator, _super);
    function DemoNavigator() {
        var _this = _super.call(this) || this;
        _this.skinName = 'resource/eui_skins/demo/NavigatorSkin.exml';
        _this.height = gardener.StageHeight;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onLoad, _this);
        return _this;
    }
    DemoNavigator.prototype.onTabSelect = function (e) {
        var value = e.target.selectedValue;
        this.switchScene(value);
    };
    DemoNavigator.prototype.switchScene = function (tab) {
        if (this._currentTab === tab) {
            return;
        }
        this._currentTab = tab;
        switch (tab) {
            case DemoNavigator.CURRENT_TAB_EGRET_SCENE:
                this.btnTab1.selected = true;
                var scene1 = new SceneDemo_1();
                this.lbSceneName.text = scene1.sceneName;
                gardener.loadScene(scene1);
                break;
            case DemoNavigator.CURRENT_TAB_EUI_SCENE:
                this.btnTab2.selected = true;
                var scene2 = new SceneEUIDemo_2();
                this.lbSceneName.text = scene2.sceneName;
                gardener.loadScene(scene2);
                break;
        }
    };
    DemoNavigator.prototype.onLoad = function () {
        this.btnTab1.value = DemoNavigator.CURRENT_TAB_EGRET_SCENE;
        this.btnTab2.value = DemoNavigator.CURRENT_TAB_EUI_SCENE;
        var tabGroup = this.btnTab1.group;
        tabGroup.addEventListener(egret.Event.CHANGE, this.onTabSelect, this);
        this.switchScene(DemoNavigator.CURRENT_TAB_EGRET_SCENE);
    };
    DemoNavigator.CURRENT_TAB_EGRET_SCENE = 'egret';
    DemoNavigator.CURRENT_TAB_EUI_SCENE = 'eui';
    return DemoNavigator;
}(eui.Component));
__reflect(DemoNavigator.prototype, "DemoNavigator");
//# sourceMappingURL=DemoNavigator.js.map