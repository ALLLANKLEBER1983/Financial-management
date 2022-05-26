const knexLogger = require('knex-logger');
const bodyParcer = require('body-parser');

module.exports = (app) =>{
    app.use(bodyParcer.json())
    app.use(knexLogger(app.db));

}
