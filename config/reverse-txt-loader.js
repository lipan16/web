function loader(source) {
    const logger = this.getLogger()
    const options = this.getOptions()

    logger.info('[custom-loader] running...')
    logger.info('options: ', options)
    logger.info('source: ', source)

    return source.split('').reverse().join('')
}


module.exports = loader;
