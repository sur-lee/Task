! function () {
  var view = document.querySelector('section.postMessage')

  var model = {
    initAV: function () {
      AV.init({
        appId: "LnRBf5MFi6aErBL3upu3yMJe-gzGzoHsz",
        appKey: "x4fRswVJsOSXtnz82sqLPoLx",
        serverURL: "https://lnrbf5mf.lc-cn-n1-shared.com"
      });
    },
    fetch: function () {
      var query = new AV.Query('Message')
      return query.find()
    },
    save: function (name, content) {
      var Message = AV.Object.extend('Message');
      var message = new Message();
      return message.save({
        'name': name,
        'content': content
      })
    }
  }


  var controller = {
    view: null,
    model: null,
    messageList: null,
    init: function (view, model) {
      this.view = view
      this.model = model

      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('form')
      this.model.initAV()
      this.loadmessages()
      this.bindEvents()
    },

    loadmessages: function () {

      this.model.fetch().then(
        (messages) => {
          let array = messages.map((item) => item.attributes)
          array.forEach((item) => {
            let li = document.createElement('li')
            li.innerText = `${item.name}: ${item.content}`
            this.messageList.appendChild(li)
          })
        }
      )
    },
    bindEvents: function () {
      this.form.addEventListener('submit', function (e) {
        e.preventDefault()
        this.saveMessage()
      })
    },
    saveMessage: function () {
      let myForm = this.form
      let content = myForm.querySelector('input[name=content]').value
      let name = myForm.querySelector('input[name=name]').value
      this.model.save(name, content).then((object) => {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}: ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        myForm.querySelector('input[name=content]').value = ''
        myForm.querySelector('input[name=name]').value = ''
        console.log(object)
      })
    }
  }

  controller.init(view, model)









}.call()