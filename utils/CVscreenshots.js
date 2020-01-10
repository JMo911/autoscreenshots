require('dotenv').config()
const {  Client } = require('pg')
const takeScreenshot = require('./puppeteer');

const config = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    // this object will be passed to the TLSSocket constructor
    ssl: {
    rejectUnauthorized: false
    }
}

const getCVModuleScreenshots = (assessment_slug, id, internal_name) => {
    // EventEmitter.setMaxListeners(100);
    
    const client = new Client(config)
    client.connect()
    client
    .query(`select q.id, q.canonical_code, a.internal_name from questions q join steps s on q.step_id = s.id join assessments a on s.assessment_id = a.id where a.id = ${id} group by q.id, q.canonical_code, a.internal_name;`)
    .then(res => {
        const itemNumbers = res.rows;
        // console.log(res);
        itemNumbers.forEach(element => {
            takeScreenshot(assessment_slug, element.id, element.canonical_code, element.internal_name)
        });
        client.end();
    })
    .catch(e => {
        client.end();
        console.error(e.stack)})
}

// getModuleScreenshots(81457);
module.exports = getCVModuleScreenshots;
