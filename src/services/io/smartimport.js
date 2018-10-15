export class Smartimport extends BaseIONode {
  addFromFile(file) {
    const data = new FormData();
    data.append('file', file);

    return fetch(`${this.root}/smartimport/upload/`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: this.headers,
        body: data
      })
      .then(v => v.json())
  }
}
