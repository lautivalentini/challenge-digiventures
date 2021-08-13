class ConfigurationController {
  constructor(configurationService) {
    this.configurationService = configurationService;
  }

  /*
  returns:
    200 if configuration exists
    404 if configuration doesn't exists
  */
  async get(req, res) {
    const { path } = req.params;

    const found = await this.configurationService.getByPath(path)

    if (found) {
      return res.status(200).json(found)
    }

    return res.status(404).json({ msg: 'Not found elements' })
  }

  async post(req, res) {
    const { body } = req;
    try {
      const created = await this.configurationService.create(body);
      if (created) {
        return res.status(201).json(created);
      }
      return res.status(400);
    } catch (e) {
      return res.status(400).json(e.errors.name.properties);
    }
  }
}

module.exports = ConfigurationController;
