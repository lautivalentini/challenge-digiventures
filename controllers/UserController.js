class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async post(req, res) {
    const { body } = req;
    const { path } = req.params
    try {
      const created = await this.userService.create(body);
      if (created) {
        if (path === 'login') return res.status(200).json({ msg: 'Successfully logged in' });
        return res.status(201).json({ msg: 'Your account has been created successfully', created })
      }
      return res.status(400);
    } catch (e) {
      return res.status(400).json(e.errors.name.properties);
    }
  }
}

module.exports = UserController;