import { Singleton } from "../../Core/Singleton/Singleton"
import { gameController } from "../gameConroller/gameController"
import { monsterController } from "../monsterController/monsterController"
import '../../Core/Dump/Dump'
import '../../Core/AI/AI'
import '../ai/monsterNormalAI'

export namespace app {
    export class App {
        constructor() {
            print('进入了游戏入口 开始游戏逻辑', IsServer())
            monsterController.instance().start()  // 刷怪管理器
        }
        // 再来一局
        private restart() {
            gameController.instance().status = gameController.eStatus.init
        }

        static instance() {
            return Singleton.Get<App>('appController', App)
        }
    }
}