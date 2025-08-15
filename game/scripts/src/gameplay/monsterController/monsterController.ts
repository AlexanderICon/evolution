import { Singleton } from '../../Core/Singleton/Singleton';
import { UnitFactory } from '../../Core/UnitFactory/UnitFactory';
import * as monsterCfg from '../../json/monster.json'
import { gameController } from '../gameConroller/gameController';

import '../modifier/monster_death'

type monsterCfgArray = typeof monsterCfg['1'];

export namespace monsterController {
    class controller {
        private _round: number // 第几波
        private _timer?: string; // 刷怪计时器

        constructor() {
            this._round = 1
        }

        private getCurCfg(round?: number): monsterCfgArray | undefined {
            return monsterCfg[round ? tostring(round) : tostring(this._round)]
        }

        start() {
            const cfg = this.getCurCfg()

            if (!cfg) return

            this._timer = Timers.CreateTimer(cfg.interval, () => {
                const interval = this.round()
                if (interval >= 1) return interval

                this.final()
            })
        }

        final() {
            Timers.RemoveTimer(this._timer) // 最后一波
            this._timer = void 0

            gameController.instance().event.emit('onVictory', { controller: gameController.instance() })
        }

        round() {
            // 开始创建怪物
            const cfg = this.getCurCfg(this._round)

            if (!cfg) return -1

            const point = Entities.FindByName(undefined, 'monsterPoint')
            UnitFactory.spawnUnit(cfg.monsterId, point.GetAbsOrigin(), undefined, undefined, DotaTeam.BADGUYS, (e) => {
                const targetPoint = Entities.FindByName(undefined, 'monsterTargetPoint')
                e.MoveToPosition(targetPoint.GetOrigin())

                // 这里需要绑定ai
            })

            this._round++
            return this.getCurCfg() ? this.getCurCfg().interval : -1
        }
    }

    export function instance() {
        return Singleton.Get<controller>('monsterController', controller)
    }
}