class ConfigurationService {
  constructor(model) {
    this.model = model; //configuration page model
  }

  //id = path name
  getByPath(path) {
    // const configuration = {};
    // return configuration;
    const configuration = this.model.findOne({ name: path });
    return configuration
  }
}

module.exports = ConfigurationService;
