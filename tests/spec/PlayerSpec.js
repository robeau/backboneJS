describe("ItemView", function() {

  it("renders a button.swap", function() {
    var view = new ItemView();
    expect (view.render().$el).toBe('button.swap');
  });

});
