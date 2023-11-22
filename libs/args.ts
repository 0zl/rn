import { program } from 'commander'

interface ParsedArguments {
    gpu: true | undefined
}

function parseArgs() {
    return program
        .option('--gpu', 'Use GPU Accelerator')
        .parse(process.argv)
        .opts() as ParsedArguments
}

export {
    parseArgs,
    ParsedArguments
}