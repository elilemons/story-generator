'use strict';
$(() => {

  class Character {
    constructor(name, attachments, type, notes) {

    }
  }

  class Airtable {
    constructor() {
      this.API_KEY = 'keyI4Afu109cHCMAF';
      this.BASE_ID = 'appeojnGH3er8aNQB';
      this.API = `https://api.airtable.com/v0/${this.BASE_ID}`;
    }

    get(tableName, callback) {
      $.ajax({
        url: `${this.API}/${tableName}`,
        type: 'GET',
        headers: {
          Authorization: `Bearer ${this.API_KEY}`
        },
      }).then((data) => {
        callback(data);
      });
    }
  }

  let base = new Airtable;
  let characters = base.get('Characters', (data) => {
    console.log(data);
  });
});