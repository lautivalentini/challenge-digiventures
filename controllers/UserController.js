class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async post(req, res) {
    const { body } = req;
    const { path } = req.params
    try {
      if (path === 'login') {
        const user = await this.userService.signIn(body.username)
        if (user) {
          return res.status(200).json({ account: true, msg: 'Successfully logged in' });
        }
        return res.status(404).json({ account: false, msg: 'You do not have an account' })
      }
      const created = await this.userService.create(body);
      if (created) {
        return res.status(201).json({ msg: 'Your account has been created successfully', created })
      }
      return res.status(400)
    } catch (e) {
      return res.status(500).json(e.errors.name.properties);
    }
  }
}

module.exports = UserController;