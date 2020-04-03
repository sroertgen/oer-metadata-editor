import axios from 'axios';

var url = 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: url
});

const esClient = axios.create({});

export default {
  apiClient,
  competenceFrameworks: {
    getFrameworks() {
      const path = '/frameworks';
      return apiClient.get(path);
    }
  },
  vocabs: {
    getVocab(name) {
      const path = '/vocab/' + name;
      return apiClient.get(path);
    }
  },
  passToIndex: {
    postData(esData, entry) {
      const payload = entry;
      const path = esData.url + esData.index + '/_doc';
      if (esData.header) {
        const headers = {
          // eslint-disable-next-line prettier/prettier
          'Authorization': esData.header.split(': ')[1]
        };
        return esClient.post(path, payload, { headers: headers });
      } else {
        const headers = {
          'Authorization': 'Basic ' + btoa(esData.username + ':' + esData.password)
        }
        return esClient.post(path, payload, { headers: headers });
      }
    }
  }
};
