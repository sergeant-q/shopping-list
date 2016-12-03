$(document).ready(function() {
  // listen on the input field for a return or
  // listen on the submit button

  // initialize state object
  var state = {
    items: []
  }

  // add item function
  function addItem(state, itemObj) {
    state.items.push(itemObj);
  }

  // renderList(state, $('.shopping-list'));

  // remove item function
  function removeItem(state, itemName) {
    var itemsArray = state.items;
    var index;
    for (var i = 0; i < itemsArray.length; i++) {
      if (itemsArray[i].name == itemName) {
        index = i;
      }
    }
    itemsArray.splice(index,1);
  }
  // check/uncheck item function

  // render list function
  function renderList(state, JQueryElement) {
    var renderedHTML = state.items.map(function(item) {
      return '<li> <span class="shopping-item">' + item.name + '</span> \
                <div class="shopping-item-controls">  \
                  <button class="shopping-item-toggle"> \
                    <span class="button-label">check</span> \
                  </button> \
                  <button class="shopping-item-delete"> \
                  <span class="button-label">delete</span> \
                  </button> \
              </div> \
              </li>'

    });
    JQueryElement.html(renderedHTML);
    $('#shopping-list-entry').val('')
  }


  $('#js-shopping-list-form').on('submit keypress', function(event) {
     var type = event.type;
     var keyCode = event.which
     if (type === 'keypress' && keyCode === 13 || type === 'submit') {
       event.preventDefault();
       var itemName = $('#shopping-list-entry').val(); // ships
       var shoppingItem = {
         name: itemName,
         checked: false
       }
       if (itemName) {
         addItem(state, shoppingItem);
         renderList(state, $('.shopping-list'));
       }
     }
  });

  $('ul').on('click', 'button.shopping-item-toggle', function(event){
    $(this).closest('li').find('.shopping-item').toggleClass('shopping-item__checked');
  });

  $('ul').on('click', 'button.shopping-item-delete', function(event){
    var itemName = $(this).closest('li').find('.shopping-item').text();
    removeItem(state, itemName);
    renderList(state, $('.shopping-list'));
  });

});
