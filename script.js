$(function(){
  var Item = Backbone.Model.extend({
    defaults: {
      part1: 'hello',
      part2: 'world'
    }
  });

  var ItemView = Backbone.View.extend({
    tagName: 'li', // name of the orphan (root) tag in this.el

    events: {
      'click button.swap': 'swap',
      'click button.delete': 'remove'
    },

    initialize: function (){
      _.bindAll(this, 'render', 'unrender', 'swap', 'remove'); // every function that uses 'this' as the current object should be in here
      this.model.bind('change', this.render);
      this.model.bind('remove', this.unrender);
    },

    render: function (){
      $(this.el).html('<span>' + this.model.get('part1') + ' ' + this.model.get('part2') + '</span> <button class="swap btn btn-default">Swap</button><button class="delete btn btn-default">Delete</button>');
      return this; // for chainable calls, like .render().el
    },

    unrender: function (){ // makes Model remove itself from the DOM
      $(this.el).remove();
    },

    swap: function (){ // interchanges an Item's attributes
      var swapped = {
        part1: this.model.get('part2'),
        part2: this.model.get('part1')
      };
      this.model.set(swapped);
    },

    remove: function (){ // use destroy() to remove a model from its collection
      this.model.destroy();
    }

  });

  Backbone.sync = function(method, model, success, error){
    success(); // overrides persistance storage with dummy function
  }

  var List = Backbone.Collection.extend({
    model: Item
  });

  var ListView = Backbone.View.extend({
    el: $('div#buttons'), // el attaches to existing element

    events: {
      'click button#change': 'changeBg',
      'click button#remove': 'rmvBg',
      'click button#add': 'addItem'
    },
    initialize: function(){
      _.bindAll(this, 'render', 'changeBg', 'rmvBg', 'addItem', 'appendItem'); // every function that uses 'this' as the current object should be in here

      this.collection = new List();
      this.collection.bind('add', this.appendItem); //collection event binder

      this.colors = ["red","orange","yellow","green","blue","purple"];
      this.bg = -1;
      this.render();
    },


    render: function(){
      var self = this;

      $(this.el).append('<div id="bg-container">');
      $('div#bg-container').append('<button id="change" class="btn btn-default">Change border color</button>');
      $('div#bg-container').append('<button id="remove" class="btn btn-default">Reset border color</button>');
      $(this.el).append('<button id="add" class="btn btn-default">Add list item</button>');
      $('div#box').append('<ul>');
      
      $('button#remove').hide();
      _(this.collection.models).each(function(item){ // in case collection is not empty
        self.appendItem(item);
      }, this);
    },

    changeBg: function(){
      if (this.bg < 5){
        this.bg++;
      }
      else this.bg = 0;
      $('div#box').css("border-color",this.colors[this.bg]);
      $('button#remove').show('fast');
    },

    rmvBg: function(){
      $('div#box').css("border-color", "#E0E0E0");
      $('button#remove').hide('fast');
      this.bg = -1;
    },

    addItem: function (){
      var item = new Item();
      item.set({
        part2: item.get('part2') + ' ' + (this.colors[this.bg]||'none') // modify item defaults
      });

      this.collection.add(item); //add item to collection; view is updated via event 'add'
    },

    appendItem: function (item){
      var itemView = new ItemView({
        model: item
      });
      $('ul').append(itemView.render().el); // rendering individual items is delegated to the render() method of each ItemView instance
    }

  });

  var listView = new ListView();
});
