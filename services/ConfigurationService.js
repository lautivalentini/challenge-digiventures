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

  create(data) {
    const configuration = new this.model(data);
    return configuration.save()
  }
}

module.exports = ConfigurationService;
