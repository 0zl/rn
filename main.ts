import { parseArgs, ParsedArguments } from './libs/args'
import { WVC } from './libs/wvc'

class RN {
    args: ParsedArguments = parseArgs()
    wvc!: WVC

    async init() {
        this.wvc = new WVC(this.args)
        await this.wvc.wvcInit()
    }
}

if ( import.meta.main ) {
    const rn = new RN()
    await rn.init()
}