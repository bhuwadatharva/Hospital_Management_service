export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  let cookieName;
  
  // Determine the cookie name based on the user role
  if (user.role === "Admin") {
    cookieName = "adminToken";
  } else if (user.role === "Doctor") {
    cookieName = "doctorToken";
  } else {
    cookieName = "patientToken";
  }

  res.status(statusCode).cookie(cookieName, token, {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true, // Ensure the cookie is only accessible via HTTP(S)
  })
  .json({
    success: true,
    message,
    user,
    token,
  });
};
