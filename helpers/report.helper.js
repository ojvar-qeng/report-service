const fs = require("fs");
const path = require("path");
const carbone = require("carbone");

const ReportHelper = {};
module.exports = ReportHelper;

/**
 * Test
 */
ReportHelper.generate = function (reportName, data) {
  return new Promise((resolve, reject) => {
    let file = path.resolve("reports", reportName + ".odt");

    if (!fs.existsSync(file)) {
      file = path.resolve("reports", reportName + ".doc");
    }
    
    carbone.render(file, data, { convertTo: "pdf" }, function (err, result) {
      if (err) {
        console.error("reprot error", err);
        reject(err);
      }
      resolve(result);
    });
  });
};
