import userAnimeListModel from "../Models/UserAnimeListModel.js";
import userModel from "../Models/userModel.js";
import generateToken from "../utility/generateToken.js";

// Register 
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!email || !password || !name) {
            return res.status(400).json({ message: "Provide credentials" });
        }
        let user = await userModel.findOne({ email });

        if (user) return res.status(400).json({ message: "User already exists" });

        user = new userModel({ name, email, password });

        const userAnimeList = await userAnimeListModel.create({
            user: user._id,
            animes: []
        });

        user.listId = userAnimeList._id;

        await user.save();

        res.status(201)
            .json({
                message: "Registered successfully",
                success: true,
                userData: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    listId: user.listId,
                    token:generateToken(user)
                }
            });

    } catch (err) {
        res.status(500).json({ message: "Server Side Error" });
        console.log(err.message);
    }
};

// Login 
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Provide credentials" });
        }
        const user = await userModel.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        if (password == user.password) {
            res.status(201)
                .json({
                    message: "Login successfully",
                    success: true,
                    userData: {
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        listId: user.listId,
                        token:generateToken(user)
                    }
                });
        }
        else {
            return res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server Side Error" });
        console.log(err.message);
    }
};

//Get User
export const getUser = async (req, res) => {
    try {
        const { id } = req.user;

        if (!id) {
            return res.status(400).json({ message: "token not available" });
        }

        const user = await userModel.findById(id);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        res.status(200)
            .json({
                message: "User Found successfully",
                success: true,
                userData: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    listId: user.listId
                }
            });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.log(error.message);
    }
}