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
    y: 'youtubo.cn',
    u: 'uc.com',
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
//遍历 keys,生成 kbd 标签
index = 0
while(index < keys['lenght']){
    div = document.createElement('div')
    div.className = 'row'
    main.appendChild(div)
    row = keys[index]
    index2 = 0
    while(index2 < row.length){
        kbd = document.createElement('kbd')
        kbd.textContent = row[index2]
        kbd.className = 'key'
        button = document.createElement('button')
        button.textContent = 'E'
        button.id = row[index2]
        button.onclick = function(suiyi){
            key = (suiyi.target.id)
            newweb = prompt('输入新网址')
            hash[key] = newweb  //  hash变更
            localStorage.setItem('suibianqi', JSON.stringify(hash))
            console.log(hash)
        }
        kbd.appendChild(button)
        div.appendChild(kbd)
        index2 = index2 + 1
    }
index = index+1
}

document.onkeypress = function(suiyi){
    // console.log('输入内容')
    key = suiyi['key']
    website = hash[key]
    //console.log(website)
    //location.href = 'http://' + website //当前窗口打开
    window.open('http://' + website, '_blank')//新窗口打开
}