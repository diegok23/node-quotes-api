const bcrypt = require('bcrypt');
const constantNumber = 10;
const generateJWT = require('./utils/jwt');

function getUsersApi(deps) {
  async function signUp(req, res) {
    const newUser = req.body;
    const users = deps.users.getUsersFile();
    const sameName = users.find((user) => user.userName === newUser.userName);

    if (sameName) {
      res.status(400).json({ message: 'There ia an existing user with this user Name.', userName: newUser.userName });
    } else {
      const maxUserId = Math.max.apply(
        null,
        users.map((user) => user.id)
      );
      newUser.id = maxUserId + 1;
      const salt = await bcrypt.genSalt(constantNumber);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      users.push(newUser);
      deps.users.saveUsersToFile(users);
      const jwtToken = generateJWT(newUser.id);
      res.status(201).json({
        jwtToken: jwtToken,
        username: newUser.userName,
        id: newUser.id
      });
    }
  }

  function invalidCredentials(res) {
    return res.status(401).json({ message: "invalid credentials" });
  }
  
  async function signIn(req, res) {
    const user = req.body;
    const users = deps.users.getUsersFile();
  
    const dbUser = users.find((u) => u.userName === user.userName);
    if (!dbUser) return invalidCredentials(res);
  
    const passwordIsValid = await bcrypt.compare(user.password, dbUser.password);
    if (!passwordIsValid) return invalidCredentials(res);
  
    const token = generateJWT(dbUser.id);
  
    res.status(201).json({
      id: dbUser.id,
      userName: dbUser.userName,
      token,
    });
  }

  return {
    signUp,
    signIn
  };
}
module.exports = getUsersApi;
