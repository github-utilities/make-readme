#!/usr/bin/env node
'use strict';
const jsdoc2md = require('jsdoc-to-markdown');
const config = require('../jsdoc2md-config.json');
// const templateData: Array<Object> = jsdoc2md.getTemplateDataSync(config);
// templateData.forEach((item, index) => {
//   console.log(`index -> ${index}`);
//   console.log(item);
// });
jsdoc2md.render(config)
    .then((results) => {
    console.log(results);
})
    .catch((err) => {
    throw err;
});
//# sourceMappingURL=jsdoc2md.js.map