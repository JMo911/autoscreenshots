const getModuleScreenshots = require('./utils');
// getModuleScreenshots(74438);
const express = require('express')
const app = express()
const PORT = 4000;

app.get('/api/screenshots/:assessment_slug/:module_id', (req, res) => {
    getModuleScreenshots(req.params.assessment_slug, req.params.module_id)
    res.send("grabbing your screenshots.")
})

app.get('/api/cvscreenshots/:assessment_slug/:module_id', (req, res) => {
    getModuleScreenshots(req.params.assessment_slug, req.params.module_id)
    res.send("grabbing your CV screenshots.")
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))