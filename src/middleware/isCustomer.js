exports.isCustomer = (req, res, next) => {
    if (req.user.role === "customer") {
        next()
    } else {
        return res.status(400).json({
            error: "only customer can access this route"
        })
    }
}