const bodyParcer = require('body-parser')
module.exports = (app) =>{
    app.use(bodyParcer.json())

}
