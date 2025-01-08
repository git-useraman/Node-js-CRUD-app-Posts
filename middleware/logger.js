function logger(req, res, next) {
    console.log(`${req.method}\t${req.headers.origin}://${req.url}`)
    next()
}

module.exports = logger