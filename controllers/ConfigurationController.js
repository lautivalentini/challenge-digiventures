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
}

module.exports = ConfigurationController;
