const { RestRemoteService } = require("cap-remote-service-rest");

class PetstoreService extends RestRemoteService {
  customizeHeaders(headers) {
    headers["api_key"] = process.env.API_KEY;
  }
}

module.exports = PetstoreService;
