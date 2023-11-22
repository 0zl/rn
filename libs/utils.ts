import { tmpdir } from 'os'
import ffmpeg from 'fluent-ffmpeg'

function randomString(length = 7) {
    return Math.random().toString(36).slice(-length)
}

function allocOutFile(format = 'mp4') {
    return `${tmpdir()}/rn_${randomString()}.${format}`
}

function convertMp4ToWebp(path: string, loop = 0) {
    return new Promise((res, rej) => {
        const outFile = `${path}.webp`

        ffmpeg()
            .input(path)
            .output(outFile)
            .on('end', () => {
                res(outFile)
            })
            .on('error', (err: any) => {
                console.error(err)
                rej(err)
            })
            .videoCodec('libwebp')
            .native()
            .loop(loop)
            .noAudio()
            .inputOptions('-lossless 1')
            .run()
    })
}

export {
    randomString,
    allocOutFile,
    convertMp4ToWebp
}