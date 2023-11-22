import WebVideoCreator, { VIDEO_ENCODER } from 'web-video-creator'
import { ParsedArguments } from './args'

class WVC extends WebVideoCreator {
    RN_ARGS: ParsedArguments

    constructor(args: ParsedArguments) {
        super()
        this.RN_ARGS = args
    }

    async wvcInit() {
        this.config({
            mp4Encoder: this.RN_ARGS.gpu ? VIDEO_ENCODER.NVIDIA.H264 : VIDEO_ENCODER.CPU.H264,
            browserUseGPU: Boolean(this.RN_ARGS.gpu),
            browserDisableDevShm: true
        })
    }
}

export { WVC }