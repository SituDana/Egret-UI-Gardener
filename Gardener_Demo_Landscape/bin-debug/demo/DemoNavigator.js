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
        _this.width = 70;
        _this.height = gardener.StageHeight;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onLoad, _this);
        var tab1 = new eui.RadioButton();
        tab1.skinName = 'resource/eui_skins/demo/NaviTabButtonSkin.exml';
        tab1.width = 70;
        tab1.height = gardener.StageHeight * .5 - 4;
        tab1.label = '场景一';
        tab1.groupName = 'scenetab';
        tab1.value = DemoNavigator.CURRENT_TAB_EGRET_SCENE;
        tab1.y = 1;
        _this.addChild(tab1);
        _this.btnTab1 = tab1;
        var tab2 = new eui.RadioButton();
        tab2.skinName = 'resource/eui_skins/demo/NaviTabButtonSkin.exml';
        tab2.width = 70;
        tab2.height = gardener.StageHeight * .5 - 2;
        tab2.label = 'EUI场景';
        tab2.groupName = 'scenetab';
        tab2.value = DemoNavigator.CURRENT_TAB_EUI_SCENE;
        tab2.y = gardener.StageHeight * .5 + 1;
        _this.addChild(tab2);
        _this.btnTab2 = tab2;
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
                gardener.loadScene(new SceneDemo_1());
                break;
            case DemoNavigator.CURRENT_TAB_EUI_SCENE:
                this.btnTab2.selected = true;
                gardener.loadScene(new SceneEUIDemo_2());
                break;
        }
    };
    DemoNavigator.prototype.onLoad = function () {
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