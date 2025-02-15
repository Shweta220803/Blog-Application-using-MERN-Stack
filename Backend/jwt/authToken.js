import jwt from "jsonwebtoken";
import  User  from "../models/user.model.js";

/**
 * Creates a JWT token, saves it in cookies, and updates the user record with the token.
 * 
 * @param {string} userId - The ID of the user for whom the token is being created.
 * @param {object} res - The Express response object to set cookies.
 * @returns {string} The generated JWT token.
 */
const createTokenAndSaveCookies = async (userId, res) => {
  try {
    // Generate a JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d", // Token validity duration
    });

    // Set the token as a cookie
    res.cookie("jwt", token, {
      httpOnly: true, // Prevents client-side access to the cookie
      secure: process.env.NODE_ENV === "production", // Secure in production (HTTPS)
      sameSite: "lax", // Cookie sent with same-site requests and top-level navigation
      path: "/", // Cookie available throughout the website
    });

    // Update the user's record with the generated token
    await User.findByIdAndUpdate(userId, { token });

    return token; // Return the generated token
  } catch (error) {
    console.error("Error creating token and saving to cookies:", error);
    throw new Error("Token generation failed.");
  }
};

export default createTokenAndSaveCookies;
