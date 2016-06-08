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
$('form button[name="add"]').on('click', function(event){
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

updateToDo: function () {


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
