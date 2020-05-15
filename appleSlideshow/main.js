var allButtons = $('#menuItems > .menuItem')

//点击轮播
for(let i = 0; i < allButtons.length; i++) {
  $(allButtons[i]).on('click', function(x) {
    var index = $(x.currentTarget).index() - 1
    console.log(index)
    var p = index * -920
    $('#slides').css({
      transform: 'translateX(' + p + 'px)'
    })
    n = index
    activeButton(allButtons.eq(n))
  })
}

function activeButton($button) {
  $button.addClass('act').siblings('.act').removeClass('act')
}