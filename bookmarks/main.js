
// 1.初始化数据
var keys = {
    0: ['q','w','e','r','t','y','u','i','o','p'],
    1: {0:'a',1:'s',2:'d',3:'f',4:'g',5:'h',6:'j',7:'k',8:'l',length:9},
    2: ['z','x','c','v','b','n','m'],
    lenght: 3
}
var hash = {
    q: 'qq.com',
    w: 'weibo.com',
    e: 'ele.me',
    r: 'renren.com',
    t: 'taobao.com',
    y: 'youtobe.com',
    u: 'ubuntu.com',
    i: 'iqiyi.com',
    o: 'opera.com',
    p: undefined,
    a: 'acfun.tv',
    z: 'zhihu.com',
    m: 'mcdonalds.com.cn'
}
//取出 localStorage 中的suibianqi 对应的hash
var hashInLocalStorage = JSON.parse(localStorage.getItem('suibianqi') || 'null')
if(hashInLocalStorage){
    hash = hashInLocalStorage
}

//2.生成键盘
//遍历 keys,生成 kbd 标签
index = 0
while(index < keys['lenght']){
    var div = document.createElement('div')
    div.className = 'row'
    main.appendChild(div)
    var row = keys[index]
    var index2 = 0
    while(index2 < row.length){
        var kbd = document.createElement('kbd')
        var span = document.createElement('span')
        span.textContent = row[index2]
        kbd.appendChild(span)
        span.className = 'text'
        kbd.className = 'key'
        var button = document.createElement('button')
        button.textContent = 'Edit'
        button.id = row[index2]
        var img = document.createElement('img')
        if(hash[row[index2]]){
            img.src = 'https://' + hash[row[index2]] + '/favicon.ico'
        } else {
            img.src = 'https://i.loli.net/2020/06/04/uIMGArDivhfWJEZ.png'
        }
        img.onerror = function(e){
            e.target.src = 'https://i.loli.net/2020/06/04/uIMGArDivhfWJEZ.png'
        }
        button.onclick = function(suiyi){
            var button2 = suiyi['target']
            var img2 = button2.previousSibling
            var key = button2['id']
            var newweb = prompt('输入新网址')
            hash[key] = newweb  //  hash变更
            img2.src = 'http://' + newweb + '/favicon.ico'
            img2.onerror = function(e){
                e.target.src = 'https://i.loli.net/2020/06/04/uIMGArDivhfWJEZ.png'
            }
            localStorage.setItem('suibianqi', JSON.stringify(hash))
        }
        kbd.appendChild(img)
        kbd.appendChild(button)
        div.appendChild(kbd)
        index2 = index2 + 1
    }
index = index+1
}

//3.监听键盘
document.onkeypress = function(suiyi){
    // console.log('输入内容')
    var key = suiyi['key']
    var website = hash[key]
    //console.log(website)
    //location.href = 'http://' + website //当前窗口打开
    window.open('http://' + website, '_blank')//新窗口打开
}