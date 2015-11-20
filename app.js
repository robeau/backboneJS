$(function(){
  var ListView = Backbone.View.extend({
    el: $('body'), // el attaches to existing element

    events: {
      'click button#add': 'changeBg'
    },
    initialize: function(){
      _.bindAll(this, 'render', 'changeBg'); // every function that uses 'this' as the current object should be in here

      this.colors = ["red","orange","yellow","green","blue","purple"];
      this.bg = 0;
      this.render();
    },


    render: function(){
      $(this.el).append("<button id='add'>Change background color</button>");
    },


    changeBg: function(){
      if (this.bg < 5){
        this.bg++;
      }
      else this.bg = 0;
      console.log(this.colors[this.bg]);
    }
  });

  var listView = new ListView();
});