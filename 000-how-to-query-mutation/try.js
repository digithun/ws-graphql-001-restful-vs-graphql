const models = require('./models')
const jclrz = require('json-colorz')

let c = Object.keys(models).length

Object.keys(models).forEach((name) => {
  models[name].find().then((result) => {
    console.log('==============', name, '==============')
    result.forEach((r) => console.log(r.toJSON()))
    console.log('')
    if (--c === 0) {
      process.exit(0)
    }
  })
})
