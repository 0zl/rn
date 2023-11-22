import WebVideoCreator, { VIDEO_ENCODER } from 'web-video-creator'
import { ParsedArguments } from './args'

class WVC extends WebVideoCreator {
    args: ParsedArguments

    constructor(args: ParsedArguments) {
        super()
        this.args = args
    }

    async wvcInit() {
        this.config({
            mp4Encoder: this.args.gpu ? VIDEO_ENCODER.NVIDIA.H264 : VIDEO_ENCODER.CPU.H264,
            browserUseGPU: Boolean(this.args.gpu),
            browserDisableDevShm: true
        })
    }
}

export { WVC }