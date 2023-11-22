import { program } from 'commander'

interface ParsedArguments {
    gpu: true | undefined
    ffmpeg: string | undefined
    ffprobe: string | undefined
    chrome: string | undefined
}

function parseArgs() {
    const args = program
        .option('--gpu', 'Use GPU Accelerator')
        .option('--ffmpeg [VALUE]', 'Path to ffmpeg executable')
        .option('--ffprobe [VALUE]', 'Path to ffprobe executable')
        .option('--chrome [VALUE]', 'Path to chrome executable')
        .parse(process.argv)
        .opts() as ParsedArguments

    console.log(args)
    return args
}

export {
    parseArgs,
    ParsedArguments
}