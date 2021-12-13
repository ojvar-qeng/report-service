const path = require("path");
const fs = require("fs");
const carbone = require("carbone");

const ReportHelper = {};
module.exports = ReportHelper;

/**
 * Test
 */
ReportHelper.generate = function (reportName, data) {
  return new Promise((resolve, reject) => {
    const file = path.resolve("reports", reportName + ".odt");

    carbone.render(file, data, { convertTo: "pdf" }, function (err, result) {
      if (err) {
        console.error("reprot error", err);
        reject(err);
      }
      resolve(result);
    });
  });
};
