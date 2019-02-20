$(function () {
  bindDropMenuEvent();
  initPagination();
})
function initPagination(){
  $('.pagination').pagination({
    items: 100,
    itemsOnPage: 10,
    prevText: '上一页',
    nextText: '下一页'
  })
}

function bindDropMenuEvent() {
  $('.fold-symbol').on('click', function () {
     if($(this).text() === '+'){
      $(this).parent().parent().height('162px');
      $(this).parent().parent().siblings().height('40px');
      $(this).text('-');
     }else{
      $(this).parent().parent().height('40px');
      $(this).text('+');
     }
  })
}
