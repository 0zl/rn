import { tmpdir } from 'os'

function randomString(length = 7) {
    return Math.random().toString(36).slice(-length)
}

function allocOutFile(format = 'mp4') {
    return `${tmpdir()}/rn_${randomString()}.${format}`
}

export {
    randomString,
    allocOutFile
}