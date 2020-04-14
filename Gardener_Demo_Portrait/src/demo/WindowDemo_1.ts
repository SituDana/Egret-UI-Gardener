class WindowDemo_1 extends gardener.BaseWindow implements gardener.IWindow {

	private btnBack: eui.Button;
	private btnShowAnime: eui.Button;
	private btnMovieClip: eui.Button;

	private anime1: dragonBones.EgretArmatureDisplay;

	private _animeIndex: number = 0;

	public constructor() {
		super();

		let bg: egret.Shape = new egret.Shape();
		bg.graphics.beginFill(0xEAE1E4);
		bg.graphics.drawRect(0, 0, this.width, this.height);
		bg.graphics.endFill();
		this.addChild(bg);

		let title: egret.TextField = new egret.TextField();
		title.text = 'Demo Window 1';
		title.size = 40;
		title.bold = true;
		title.textColor = 0x91490F;
		title.width = 400;
		title.textAlign = egret.HorizontalAlign.CENTER;
		title.anchorOffsetX = 200;
		title.x = this.width * .5;
		title.y = 100;
		this.addChild(title);
	}

	private showDbbinAnime(resName: string, armatureName: string, animationName: string) {
		let anime: dragonBones.EgretArmatureDisplay = gardener.dbGenerateDbbinAnime(resName, armatureName, true, true);
		anime.x = gardener.StageWidth * .3 + 30 * this._animeIndex++;
		anime.y = gardener.StageHeight * .3 + 30 * this._animeIndex++;
		this.addChild(anime);
		egret.Tween.get(anime).wait(50).call(() => {
			anime.animation.play(animationName, 2);
		}, this);
	}

	private showMovieClipAnime(resName: string, animationName: string){
		let anime: dragonBones.Movie = gardener.dbGenerateMovieClip(resName, true, true);
		anime.x = gardener.StageWidth * .3 + 30 * this._animeIndex++;
		anime.y = gardener.StageHeight * .3 + 30 * this._animeIndex++;
		this.addChild(anime);
		egret.Tween.get(anime).wait(50).call(() => {
			anime.animation.play(animationName, 0);
		}, this);
	}

	private onBtnBack_Tap() {
		gardener.closeWindow();
	}

	private onBtnDbbinAnime_Tap(){
		this.showDbbinAnime('daojishi', 'MovieClip', 'newAnimation');
	}

	// private onBtnMovieClipAnime_Tap(){
	// 	this.showMovieClipAnime('rengxueqiu02', 'newAnimation');
	// }

	public display() {
		super.display();
		if (!this._isInitCompleted) {
			this._isInitCompleted = true;

			let des: egret.TextField = new egret.TextField();
			des.text = gardener.getString('LABEL_DB_DES');
			des.size = 30;
			des.bold = true;
			des.wordWrap = true;
			des.lineSpacing = 10;
			des.textColor = 0x362e2b;
			des.width = 600;
			// des.textAlign = egret.HorizontalAlign.CENTER;
			des.anchorOffsetX = 300;
			des.x = this.width * .5;
			des.y = 229;
			this.addChild(des);

			let button = new eui.Button();
			button.skinName = 'resource/eui_skins/demo/ButtonYellowSkin.exml'
			button.label = "返回";
			button.width = 120;
			button.height = 70;
			button.x = 20;
			button.y = 20;
			this.addChild(button);
			button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBack_Tap, this);
			this.btnBack = button;

			let button2 = new eui.Button();
			button2.skinName = 'resource/eui_skins/demo/ButtonGreenSkin.exml'
			button2.label = gardener.getString('BUTTON_LABEL_DB');
			button2.width = 300;
			button2.height = 70;
			button2.x = 132;
			button2.y = this.height - 200;
			this.addChild(button2);
			button2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDbbinAnime_Tap, this);
			this.btnShowAnime = button2;

			// let button3 = new eui.Button();
			// button3.label = "MoviClip Anime";
			// button3.width = 220;
			// button3.x = 350;
			// button3.y = this.height - 200;
			// this.addChild(button3);
			// button3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMovieClipAnime_Tap, this);
			// this.btnMovieClip = button3;

			gardener.dbStartDbWorldClock();
		}
	}

	public dispose() {
		super.dispose();

		// gardener.dbDisposeDbbinAnime(this.anime1);
		gardener.dbDisposeDbbinFactoryData('daojishi');
		this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBack_Tap, this);
	}
}