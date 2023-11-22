import { merge } from 'lodash'

import WebVideoCreator, { VIDEO_ENCODER } from 'web-video-creator'
import { ParsedArguments } from './args'
import { allocOutFile } from './utils'

type snbn = string | number | boolean | null // goofy ahh

class WVC extends WebVideoCreator {
    RN_ARGS: ParsedArguments
    DefaultVideoOptions: Record<string, snbn> = {
        width: 1280,
        height: 720,
        fps: 30,
        duration: 3e3
    }

    constructor(args: ParsedArguments) {
        super()
        this.RN_ARGS = args
    }

    wvcInit() {
        this.config({
            mp4Encoder: this.RN_ARGS.gpu ? VIDEO_ENCODER.NVIDIA.H264 : VIDEO_ENCODER.CPU.H264,
            browserUseGPU: Boolean(this.RN_ARGS.gpu),
            browserDisableDevShm: true,
            ffmpegExecutablePath: this.RN_ARGS.ffmpeg || '/usr/bin/ffmpeg',
            ffprobeExecutablePath: this.RN_ARGS.ffprobe || '/usr/bin/ffprobe',
            browserExecutablePath: this.RN_ARGS.chrome,
            frameQuality: 100
        })
    }

    wvcRecord(options: Record<string, snbn>) {
        const opts = merge(this.DefaultVideoOptions, options, {
            outputPath: allocOutFile(options?.format as string | undefined ?? 'mp4')
        })

        return new Promise((res, rej) => {
            const video = this.createSingleVideo(opts)
            
            video.once('completed', () => {
                video.removeAllListeners() // probably already handled, idk.
                res(opts.outputPath)
            })

            video.once('error', (err: any) => {
                video.removeAllListeners() // probably already handled, idk.

                console.error(err)
                rej(err)
            })

            video.start()
        })
    }
}

export { WVC }