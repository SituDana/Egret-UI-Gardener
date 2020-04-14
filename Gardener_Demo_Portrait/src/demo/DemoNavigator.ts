class DemoNavigator extends eui.Component {

	public static CURRENT_TAB_EGRET_SCENE = 'egret';
	public static CURRENT_TAB_EUI_SCENE = 'eui';

	private btnTab1: eui.RadioButton;
	private btnTab2: eui.RadioButton;
	private lbSceneName: eui.Label;

	private _currentTab: string;
	public constructor() {
		super();

		this.skinName = 'resource/eui_skins/demo/NavigatorSkin.exml';

		this.height = gardener.StageHeight;
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onLoad, this);
	}

	private onTabSelect(e: egret.Event){
		let value = (<eui.RadioButtonGroup>e.target).selectedValue;
		this.switchScene(value);
	}

	public switchScene(tab){
		if(this._currentTab === tab){
			return;
		}
		this._currentTab = tab;
		switch(tab){
			case DemoNavigator.CURRENT_TAB_EGRET_SCENE:
				this.btnTab1.selected = true;
				let scene1 = new SceneDemo_1();
				this.lbSceneName.text = scene1.sceneName
				gardener.loadScene(scene1);
				break;
			case DemoNavigator.CURRENT_TAB_EUI_SCENE:
				this.btnTab2.selected = true;
				let scene2 = new SceneEUIDemo_2();
				this.lbSceneName.text = scene2.sceneName
				gardener.loadScene(scene2);
				break;
		}
	}

	private onLoad(){
		this.btnTab1.value = DemoNavigator.CURRENT_TAB_EGRET_SCENE;
		this.btnTab2.value = DemoNavigator.CURRENT_TAB_EUI_SCENE;
		let tabGroup: eui.RadioButtonGroup = this.btnTab1.group;
		tabGroup.addEventListener(egret.Event.CHANGE, this.onTabSelect, this);
		this.switchScene(DemoNavigator.CURRENT_TAB_EGRET_SCENE);
	}
}