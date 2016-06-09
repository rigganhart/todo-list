$(document).ready(function() {
  toDoPage.init();
})

var toDoPage = {
  url: 'http://tiny-tiny.herokuapp.com/collections/riggantodo',
  thingsToDo: [],
  init: function() {
    toDoPage.styling();
    toDoPage.events();
  },
  styling: function(){
    toDoPage.getToDo();
  },
  events: function(){

  //subit item to do event
$('form ').on('submit', function(event){
  event.preventDefault();
  var newToDo = {
    content: $('input[name="toDo"]').val()
  };
  console.log(newToDo);
  $.ajax({
    url: 'http://tiny-tiny.herokuapp.com/collections/riggantodo',
    method: "POST",
    data: newToDo,
    success: function(data) {
      console.log("ItWorks", data);
      $('.read ul').append(`<li><input type='checkbox'> ${newToDo.content} </li>`);
      toDoPage.getToDo();
    },
    error: function(err) {
      console.error("WTF",err);
    }
  })
})

// //find delete id
$(document).on('click', 'a',function(event){
  event.preventDefault();
    console.log($(this));
      var toDoId = $(this).parent().data('id');
      console.log(toDoId);
      toDoPage.deleteToDo(toDoId);

  })
// update a todo item
$(document).on('dblclick', 'li', function(event){
  event.preventDefault();
  var updateId = $(this).data('id');
  $(this).text('').replaceWith('<form><input name="update"></form>')
  $('li form').on('submit', function(event) {
    event.preventDefault();
    var updateContent = {
      content: $('input[name="update"]').val()
    };
      console.log(newToDo);
      toDoPage.updateToDo(updateId);

  })
})


},
//end of events

getToDo: function () {
  $.ajax({
    url: 'http://tiny-tiny.herokuapp.com/collections/riggantodo',
    method: "GET",
    success: function(data) {
      console.log("we got something", data);
      $('.read ul').html("");
      data.forEach(function(todo) {
        $('.read ul').append(`<li data-id=${todo._id}><a href="#"><input type='checkbox'></a> ${todo.content} </li>`);
      })
    },
    error: function(err) {
      console.error("WTF",err);
    }
  })
},

updateToDo: function (updateId) {
  $.ajax({
    method: "PUT",
    url: toDoPage.url + "/" + updateId,
    data: updateContent,
    success: function(data){
      $('.read ul').append(`<li><input type='checkbox'> ${newToDo.content} </li>`);
      console.log("updated YAY!", data);
      toDoPage.getToDo();
    },
    error: function (err) {
      console.log("updating sucks", err);
    }
  })

},

deleteToDo: function (toDoId) {
  var deleteUrl = toDoPage.url + "/" + toDoId;
  $.ajax({
    url: deleteUrl,
    method:"DELETE",
    success: function(data) {
      console.log("IT IS GONE",data);
      toDoPage.getToDo();
    },
    error: function(err) {
      console.error("you blew it", err);
    }



  })


}








}
