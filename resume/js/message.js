AV.init({
  appId: "LnRBf5MFi6aErBL3upu3yMJe-gzGzoHsz",
  appKey: "x4fRswVJsOSXtnz82sqLPoLx",
  serverURL: "https://lnrbf5mf.lc-cn-n1-shared.com"
});

const query = new AV.Query('Message');
query.find()
.then(
  function (messages) {
    let array = messages.map((item) => item.attributes)
    array.forEach((item) => {
      let li = document.createElement('li')
      li.innerText = `${item.name}: ${item.content}`
      let messageList = document.querySelector('#messageList')
      messageList.appendChild(li)

    })
  }
)




let myForm = document.querySelector('#postMessageForm')

myForm.addEventListener('submit', function(e){
  e.preventDefault()
  let content = myForm.querySelector('input[name=content]').value
  let name = myForm.querySelector('input[name=name]').value
  var Message = AV.Object.extend('Message');
  var message = new Message();
  message.save({
    'name': name,
    'content': content
  }).then((object) => {
    let li = document.createElement('li')
    li.innerText = `${object.attributes.name}: ${object.attributes.content}`
    let messageList = document.querySelector('#messageList')
    messageList.appendChild(li)
    myForm.querySelector('input[name=content]').value = ''
    myForm.querySelector('input[name=name]').value = ''
    console.log(object)
  })
})


