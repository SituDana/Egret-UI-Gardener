/**
 * GameGardener DbAmimationGenerator —— A tool for using the dragonbones animations
 * @version 1.0
 * @author jiajun
 */
module gardener {
    export var _dbAnimeGeneratorInstance: gardener.DbAnimeGenerator;
    /**
     * 动画生成工具
     */
    export class DbAnimeGenerator extends egret.DisplayObject {
        /**
         * 动画工厂列表
         */
        private __dbFactoryTsMap: TsMap = new TsMap;
        /**f
         * 工厂index
         */
        private __dbFactoryIndex: number = 0;

        public constructor() {
            super();
        }

        /**
         * 启动动画计时器
         */
        private __worlClock(): void {
            dragonBones.WorldClock.clock.advanceTime(-1);
        }

        /**
         * 快速获取动画
         */
        public __generateMovieClip(resName: string, disposeAfterUnload: boolean = true, removeAfterComplete: boolean = true, noCache: boolean = true): dragonBones.Movie {
            let movie: dragonBones.Movie;
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
                } else {
                    egret.error("__generateMovieClip error: no movie " + resName);
                }

                if (noCache)
                    dragonBones.removeMovieGroup(resName);

            } catch (e) {
                egret.error("__generateMovieClip error:" + resName);
            }
            return movie;
        }

        /**
         * 生成龙骨二进制动画
         * @param resName string 资源文件名称 例如 resName_ske_dbbin, resName_tex_png
         * @param armatureName string 骨架名称 （Armature）
         * @param disposeAfterUnload boolean 当动画被移除的时候，是否自动回收 默认true，如果设为false，则需要手动回收gardener.dbDisposeDbbinAnime(anime)
         * @param removeAfterComplete boolean 当动画播放周期结束，是否自动从父容器中移除，默认为true
         */
        public __generateDbbinAnime(resName: string, armatureName: string, disposeAfterUnload: boolean = true, removeAfterComplete: boolean = false): dragonBones.EgretArmatureDisplay {
            if (!this.hasEventListener(egret.Event.ENTER_FRAME))
                egret.warn('the dragonbones world clock is stop, try to start, call function: gardener.startDbWorldClock()');

            let armatureDisplay: dragonBones.EgretArmatureDisplay;
            let factory: dragonBones.EgretFactory;
            let factoryMap = this.__dbFactoryTsMap;
            try {
                if (factoryMap.containsKey(resName)) {
                    factory = factoryMap.get(resName) as dragonBones.EgretFactory;
                } else {
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
                } else {
                    egret.error("__generateDbbinAnime error: no armatureDisplay " + resName);
                }
            } catch (e) {
                egret.error("__generateDbbinAnime error: " + resName);
            }

            factoryMap = null;
            return armatureDisplay;
        }

        /**
         * 动画移除事件 移除并释放
         */
        private __disposeDbbinAnimeAfterUnload(e: egret.Event) {
            let armatureDisplay: dragonBones.EgretArmatureDisplay = <dragonBones.EgretArmatureDisplay>e.target;
            this.__disposeDbbinAnime(armatureDisplay);
        }

        /**
         * 释放dbbin动画
         */
        public __disposeDbbinAnime(armatureDisplay: dragonBones.EgretArmatureDisplay) {
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
            } catch (e) {
                egret.error("__disposeDbbinAnime error: " + armatureDisplay.name);
            }
        }

        /**
         * 动画完成事件
         */
        private __removeDbbinAnimeAfterComplete(e: dragonBones.AnimationEvent): void {
            let armatureDisplay: dragonBones.EgretArmatureDisplay = <dragonBones.EgretArmatureDisplay>e.target;
            try {
                if (armatureDisplay != null) {
                    // armatureDisplay.removeEventListener(dragonBones.AnimationEvent.COMPLETE, this.__removeDbbinAnimeAfterComplete, this);
                    if (armatureDisplay.parent != null) {
                        armatureDisplay.parent.removeChild(armatureDisplay);
                    }
                }
            } catch (e) {
                egret.error("__removeDbbinAnimeAfterComplete error: " + armatureDisplay.name);
            }
        }

        /**
         * 动画移除
         */
        private __removeMovieCilpAfterComplete(e: dragonBones.AnimationEvent): void {
            try {
                let movie: dragonBones.Movie = <dragonBones.Movie>e.target;
                if (movie != null) {
                    // movie.removeEventListener(dragonBones.AnimationEvent.COMPLETE, this.__removeMovieCilpAfterComplete, this);
                    if (movie.parent != null) {
                        movie.parent.removeChild(movie);
                    }
                }
            } catch (e) {
                egret.error("AnimationCompleted error");
            }
        }

        /**
         * 动画移除
         */
        private __disposeMovieAnimeAfterUnload(e: egret.Event): void {
            let movie: dragonBones.Movie = <dragonBones.Movie>e.target;
            this.__disposeMovie(movie);
        }

        /**
         * 回收movie
         */
        public __disposeMovie(movie: dragonBones.Movie): void {
            try {
                if (movie != null) {
                    movie.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.__disposeMovieAnimeAfterUnload, this);
                    movie.removeEventListener(dragonBones.AnimationEvent.COMPLETE, this.__removeMovieCilpAfterComplete, this);
                    if (movie.isPlaying) {
                        movie.stop();
                    }
                    movie.dispose();
                }
            } catch (e) {
                egret.error("__disposeMovie error");
            }
            movie = null;
        }

        /**
         * 清理Dbbin动画工厂
         */
        public __disposeDBFactoryData(resName?: string): void {
            let factoryMap = this.__dbFactoryTsMap;
            if (resName) {
                let factory = factoryMap.remove(resName);
                if (factory) {
                    (<dragonBones.EgretFactory>factory).clear();
                    factory = null;
                }

            } else {
                for (var factoryName in factoryMap.entry) {
                    let factory = factoryMap.remove(factoryName);
                    if (factory) {
                        factoryMap.remove(factoryName);
                        (<dragonBones.EgretFactory>factory).clear();
                        factory = null;
                    }
                }
            }
            factoryMap = null;
        }

        /**
         * 清理MovieClip二进制缓存
         */
        public __disposeMovieClipData(resName?: string) {
            if (resName) {
                dragonBones.removeMovieGroup(resName);
            } else {
                dragonBones.removeAllMovieGroup();
            }
        }

        public __startDbWorldClock() {
            // 启动龙骨动画计时器
            if (this.hasEventListener(egret.Event.ENTER_FRAME))
                return;
            this.addEventListener(egret.Event.ENTER_FRAME, this.__worlClock, this);
        }

        public __stopDbWorldClock() {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.__worlClock, this);
        }

        public static __initAnimeGenerator() {
            return gardener._dbAnimeGeneratorInstance || new gardener.DbAnimeGenerator();
        }

    }
}