const isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admins only."
            });
        }
        next();
    } catch (error) {
        console.log(error);
    }

};

export default isAdmin;
