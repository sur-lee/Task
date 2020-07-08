let aTags = document.querySelectorAll('nav.menu > ul > li > a')
function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
requestAnimationFrame(animate);
for(let i = 0; i<aTags.length; i++){
    aTags[i].onclick = function(x){
        x.preventDefault()
        let a = x.currentTarget
        let href = a.getAttribute('href')
        let element = document.querySelector(href)
        let top = element.offsetTop
        
        let currentTop = window.scrollY
        let targetTop = top - 80
        let s = targetTop - currentTop
        var coords = { y: currentTop};
        var t = Math.abs((s/100)*200)
        if (t > 400) { t = 400 }
        var tween = new TWEEN.Tween(coords)
            .to({ y: targetTop}, t)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(() => { 
                window.scrollTo(0 , coords.y)
            })
            .start();
    }
}