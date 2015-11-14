'use strict';

$(document).ready(init);

function init() {
  console.log('Hello jQuery!');
  $('.submitRoom').on('click', submitRoom);
  $('.submitItem').on('click', submitItem);
  $('.moveItem').on('click', addItemToRoom);
  $(document).on('click', '.deleteRoom', deleteRoom)
  $(document).on('click', '.deleteItem', deleteItem)
}

function deleteRoom(){
  var room = $(this).closest('.room')
  var roomId = room.attr('id')
  console.log(roomId)
  var roomToDelete = room.siblings('.collapse').attr('id')
  console.log(roomToDelete)
  $.ajax({
    url: '/', 
    type: 'DELETE',
    data: {id: roomToDelete}
    })
  .done(function(data){
    console.log(data);
    $(`#${roomId}`).remove();
  })
}

function deleteItem(){
  var rowToDelete = $(this).closest('tr').index();
  var rowId = $(this).closest('tr').attr('id');
  var roomRemove = $(this).closest('.collapse').attr('id');
  var info = {rowId: rowToDelete, roomId: roomRemove}
  console.log(info)
  $.ajax({
    url: '/itemdelete',
    type: 'DELETE',
    data: info
  })
  .done(function(data){
    $(`#${rowId}`).remove();
  })
}

function submitRoom(){
  var roomName = $('#roomName').val()
  var room = {name: roomName}
  $.post('/', room)
  .done(function(data){
    console.log(data);
    location = location
  })
}

function addItemToRoom(){
  var roomName = $('#roomMove').val();
  var itemName = $('#itemMove').val();
  $.ajax({
    type: "PUT",
    url: encodeURI(`/${roomName}/addItem/${itemName}`)
  })
  .done(function(data){
    console.log(data)
    location = location
  })  
}

function submitItem(){
  var itemName = $('#itemName').val();
  var itemCost = $('#itemCost').val()
  var itemDescription = $('#itemDescription').val();
  var item = {};
  item.name = itemName;
  item.value = itemCost;
  item.description = itemDescription;
  $.post('/items', item)
  .done(function(data){
    console.log(data);
    location = location
  })

}
