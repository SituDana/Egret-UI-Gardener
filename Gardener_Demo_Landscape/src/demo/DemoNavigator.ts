class DemoNavigator extends eui.Component {

	public static CURRENT_TAB_EGRET_SCENE = 'egret';
	public static CURRENT_TAB_EUI_SCENE = 'eui';

	private btnTab1: eui.RadioButton;
	private btnTab2: eui.RadioButton;

	private _currentTab: string;
	public constructor() {
		super();

		this.width = 70;
		this.height = gardener.StageHeight;
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onLoad, this);

		let tab1: eui.RadioButton = new eui.RadioButton();
		tab1.skinName = 'resource/eui_skins/demo/NaviTabButtonSkin.exml';
		tab1.width = 70;
		tab1.height = gardener.StageHeight * .5 - 4;
		tab1.label = '场景一';
		tab1.groupName = 'scenetab';
		tab1.value = DemoNavigator.CURRENT_TAB_EGRET_SCENE;
		tab1.y = 1;
		this.addChild(tab1);
		this.btnTab1 = tab1;

		let tab2: eui.RadioButton = new eui.RadioButton();
		tab2.skinName = 'resource/eui_skins/demo/NaviTabButtonSkin.exml';
		tab2.width = 70;
		tab2.height = gardener.StageHeight * .5 - 2;
		tab2.label = 'EUI场景';
		tab2.groupName = 'scenetab';
		tab2.value = DemoNavigator.CURRENT_TAB_EUI_SCENE;
		tab2.y = gardener.StageHeight * .5 + 1;
		this.addChild(tab2);
		this.btnTab2 = tab2;

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
				gardener.loadScene(new SceneDemo_1());
				break;
			case DemoNavigator.CURRENT_TAB_EUI_SCENE:
				this.btnTab2.selected = true;
				gardener.loadScene(new SceneEUIDemo_2());
				break;
		}
	}

	private onLoad(){
		let tabGroup: eui.RadioButtonGroup = this.btnTab1.group;
		tabGroup.addEventListener(egret.Event.CHANGE, this.onTabSelect, this);
		this.switchScene(DemoNavigator.CURRENT_TAB_EGRET_SCENE);
	}
}