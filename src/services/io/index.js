import {
  Items,
  Tags,
  Stats
} from 'items';

import SmartImport from 'smartimport';

class IO {
  constructor() {
    this.headers = null;
    this.root = '';

    this.items = null;
    this.tags = null;
    this.stats = null;
    this.smartimport = null;

    this.initialized = fetch('./api/settings/', {
        credentials: 'same-origin'
      })
      .then(v => v.json())
      .then(data => {
        this.root = `${data.root}/api`;

        this.headers = new Headers({
          'X-CSRFToken': data.csrftoken
        });

        this.items = new Items(this);
        this.tags = new Tags(this);
        this.stats = new Stats(this);
        this.smartImport = new SmartImport(this);
      })
  }

  toJson(data) {
    return {
      body: new Blob([JSON.stringify(data)], {
        type: 'application/json'
      }),
      headers: this.headers
    }
  }
}

export default new IO();
