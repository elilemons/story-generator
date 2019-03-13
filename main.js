'use strict';
$(() => {

  class Character {
    constructor(name, image, type, notes) {
      this.name = name;
      this.image = image;
      this.type = type;
      this.notes = notes;
    }
  }

  class Airtable {
    constructor() {
      this.API_KEY = 'keyI4Afu109cHCMAF';
      this.BASE_ID = 'appeojnGH3er8aNQB';
      this.API = `https://api.airtable.com/v0/${this.BASE_ID}`;
    }

    get(tableName) {
      return $.ajax({
        url: `${this.API}/${tableName}`,
        type: 'GET',
        headers: {
          Authorization: `Bearer ${this.API_KEY}`
        },
      })
      .fail((error) => {
        console.error(`There was an error: ${error}`);
      })
      .done((data) => {
        localStorage.setItem(tableName, JSON.stringify(data.records));
      });
    }
  }

  function setupCharacters(characters) {
    for (let character of characters) {
      let char = new Character(
          character.fields.Name,
          character.fields.Image[0],
          character.fields.Type,
      );

      $('#list-of-characters').append(`<li id="${character.id}-list-item" class="list-group-item list-group-item-action">${char.name}</li>`);
      $(`#${character.id}-list-item`).on('click',() => {
        displayCharacter(char);
        $('.list-group-item').removeClass('active');
        $(`#${character.id}-list-item`).addClass('active');
      });

      if (char.name.indexOf('Steven') > -1) {
        $(`#${character.id}-list-item`).click();
      }
    }
  }

  function displayCharacter(character) {
    $('#character-image').attr('src', character.image.url);
    $('#character-name').text(character.name);
    $('#character-notes').text(character.notes);
    $('#character-types').html('');
    let typeHTML = '',
        typeCSSClass = '';
    for (let type of character.type) {
      if (type === 'Gem') {
        typeCSSClass += 'type-gem ';
      }

      if (type === 'Human') {
        typeCSSClass += 'type-human '
      }

      if (type === 'Mystical Creature') {
        typeCSSClass += 'type-mystical-creature ';
      }
      typeHTML += `<span class="badge mr-1 ${typeCSSClass}">${type}</span>`;
    }

    $('#character-types').append(typeHTML);
    
  }

  let base = new Airtable;
  if (localStorage.getItem('Characters')) {
    setupCharacters(JSON.parse(localStorage.getItem('Characters')));
  } else {
    base.get('Characters').then((data) => setupCharacters(data.records));
  }
});