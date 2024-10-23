const md5 = require("md5");
const Account = require("../../models/account.model");

module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log({ email, password });

  const user = await Account.findOne({
    email: email,
    deleted: false,
  });

  console.log("user", user);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // If the user exists, you can check the password and proceed with login logic
  const hashedPassword = md5(password); // Assuming you're hashing the password with md5
  console.log(hashedPassword)
  console.log(md5(password))
  console.log(user.password)
  if (user.password !== hashedPassword) {
    return res.status(401).json({ message: "Incorrect password" });
  }
  if(user.status == "inactive"){
    return res.status(401).json({ message: "Tài Khoản đã bị khoá" });
  }

  // Continue with login process (e.g., generating JWT token, session, etc.)
  res.status(200).json({ message: "Login successful" });
};
