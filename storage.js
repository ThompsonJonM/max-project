const persist = require('node-persist');

class Storage {
  constructor() {
    this._init = false;
  }

  async init() {
    if (!this._init) {
      await persist.init();
      this._init = true;
    }
  }

  /**
   * @param {string} key 
   * @param {any} value 
   */
  async set(key, value) {
    await this.init();
    return await persist.set(key, value);
  }

  /**
   * @param {string} key 
   */
  async get(key) {
    await this.init();
    return await persist.get(key);
  }
}

module.exports = new Storage();
