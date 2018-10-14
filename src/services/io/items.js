import BaseIONode from '_baseIO'

export class Stats extends BaseIONode {
  totalSum({
    dateFrom,
    dateTo,
    interval
  }) {
    return fetch(`${this.root}/total_sum/?from=${dateFrom}&to=${dateTo}&interval=${interval}`, {
        credentials: 'same-origin',
      })
      .then(v => v.json())
  }

  tagSumOverTime({
    dateFrom,
    dateTo,
    interval,
    tags,
    baseTag,
    noBase
  }) {
    const params = new URLSearchParams();

    params.append('from', dateFrom);
    params.append('to', dateTo);
    params.append('interval', interval);
    params.append('base_tag', baseTag);
    params.append('no_base', noBase);

    for (let tag of tags) {
      params.append('tags', tag);
    }

    return fetch(`${this.root}/tag_sum_over_time/?${params}`, {
        credentials: 'same-origin',
      })
      .then(v => v.json())
  }

  tagSum({
    dateFrom,
    dateTo,
    tagCount,
    negativeFirst,
    tags = []
  }) {
    const params = new URLSearchParams();

    params.append('from', dateFrom);
    params.append('to', dateTo);
    params.append('tagCount', tagCount);
    params.append('negativeFirst', Number(negativeFirst));

    for (let tag of tags) {
      params.append('tags', tag);
    }

    return fetch(`${this.root}/tag_sum/?${params}`, {
        credentials: 'same-origin',
      })
      .then(v => v.json())
  }
}

export class Items extends BaseIONode {
  fetchMonth({
    year,
    month
  }) {
    return fetch(`${this.root}/items/?year=${year}&month=${month}`, {
        credentials: 'same-origin'
      })
      .then(v => v.json())
      .then(data => {
        data.forEach(date => {
          date.items.forEach(item => {
            item.date = date.date
          });
        });

        return data
      });
  }

  fetchRange({
    dateFrom,
    dateTo
  }) {
    return fetch(`${this.root}/items/?from=${dateFrom}&to=${dateTo}`, {
        credentials: 'same-origin'
      })
      .then(v => v.json())
  }

  add(item) {
    if (item) {
      return fetch(`${this.root}/items/`, {
          method: 'POST',
          credentials: 'same-origin',
          ...this.io.toJson(item)
        })
        .then(v => v.json())
        .then(data => {
          data.item.date = data.date;

          return data
        })
    } else {
      return Promise.resolve()
    }
  }

  addFromFile(file) {
    const data = new FormData();
    data.append('file', file);

    return fetch(`${this.root}/items/upload/`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: this.headers,
        body: data
      })
      .then(v => v.json())
  }

  remove(items) {
    if (items.length) {
      return fetch(`${this.root}/items/`, {
          method: 'DELETE',
          credentials: 'same-origin',
          ...this.io.toJson({
            'items': items
          })
        })
        .then(v => v.json())
    } else {
      return Promise.resolve()
    }
  }

  edit(item) {
    return fetch(`${this.root}/items/${item.id}/`, {
        method: 'PATCH',
        credentials: 'same-origin',
        ...this.io.toJson(item)
      })
      .then(v => v.json())
  }
}

<<<<<<< HEAD:src/services/io/items.js
export class Tags extends BaseIONode {
  autocomplete(term) {
    if (term) {
=======
class Tags extends BaseIONode {
  /**
   * @param  {} term
   */
  autocomplete(term){
    if(term){
>>>>>>> WIP tagutils:src/services/io.js
      return fetch(`${this.root}/autocomplete/?term=${term}`, {
          credentials: 'same-origin'
        })
        .then(v => v.json())
    } else {
      return []
    }
  }
  
  /**
   */
  fetchAll(){
    return fetch(`${this.root}/tags/`, {
      credentials: 'same-origin'
    })
      .then(v => v.json())
  }
  
  /**
   */
  remove(term){
    // ... 
  }

  /**
   */
  merge(term, targer){
    // ... 
  }

}
<<<<<<< HEAD:src/services/io/items.js
=======

/**
 * 
 */
class IO {
  constructor(){
    this.headers = null;
    this.root = '';

    this.items = null;
    this.tags = null;
    this.stats = null;

    this.initialized = fetch('./api/settings/', {
      credentials: 'same-origin'
    })
      .then(v => v.json())
      .then(data =>{
        this.root = `${data.root}/api`;

        this.headers = new Headers({'X-CSRFToken': data.csrftoken});

        this.items = new Items(this);
        this.tags = new Tags(this);
        this.stats = new Stats(this);
      })
  }

  /**
   * 
   * @param {*} data 
   */
  toJson(data){
    return {
      body: new Blob([JSON.stringify(data)], {type: 'application/json'}),
      headers: this.headers
    }
  }
}

export default new IO();
>>>>>>> WIP tagutils:src/services/io.js
