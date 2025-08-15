import { BaseModifier, registerModifier } from "../../utils/dota_ts_adapter";

@registerModifier()
class monster_death extends BaseModifier {
    DeclareFunctions(): modifierfunction[] {
        return [ModifierFunction.ON_DEATH]
    }

    OnDeath(event: ModifierInstanceEvent): void {
    }
}