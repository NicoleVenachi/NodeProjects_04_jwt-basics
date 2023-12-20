
const login = async (req, res) => {
  res.send('Fake login/register/signup route');
} // pa pedir el token

const dashboard = async(req, res) => {
  const luckyNumber = Math.floor(Math.random() *100);

  res.status(200).json(
    {msg:`Hello, $USERNAME`, 
    secret:`Here is your authorized data, your lucky nuymber is ${luckyNumber}`
  })
} // para probar la authorization

module.exports = {
  login,
  dashboard
}