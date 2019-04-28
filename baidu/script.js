var keyword = document.getElementById('keyword')
keyword.oninput = function(e){
    var value = keyword.value
    if(value){
        suggestion.classList.add('active')
    }
    else{
        suggestion.classList.remove('active')
    }
}