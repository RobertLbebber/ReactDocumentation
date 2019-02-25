"use strict";
import fs from "graceful-fs";
import _ from "lodash";

/**
 * _______________________
 * |                     |
 * |                     |
 * |     SECTION ONE     |
 * |                     |
 * |_____________________|
 * |                     |
 * |                     |
 * |      CONSTANTS      |
 * |                     |
 * |_____________________|
 */
const defColor = "\x1b[37m";
const errColor = "\x1b[31m";
const warColor = "\x1b[33m";
const sucColor = "\x1b[32m";
const staColor = "\x1b[94m";
const log = (color, message) => {
  console.log(color + message + defColor);
};
function chain(fn, cb) {
  new Promise(async resolve => {
    await fn();
    resolve();
  }).then(async () => {
    await cb();
  });
}
/**
 * _______________________
 * |                     |
 * |                     |
 * |     SECTION TWO     |
 * |                     |
 * |_____________________|
 * |                     |
 * |                     |
 * |      FUNCTIONS      |
 * |                     |
 * |_____________________|
 */
function walkSync(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + "/", filelist);
    } else {
      filelist.push(dir + file);
    }
  });
  return filelist;
}

function generateLibraryClass(componentsPaths) {
  let template = [];
  let classNames = [];
  log(warColor, "-- Library Component Class must be default named and identical to its file name");
  _.map(componentsPaths, componentsPath => {
    let fileName = componentsPath.match(/([^/]*).jsx*/g);
    let className = fileName.pop().replace(/.jsx/g, "");
    classNames.push(className);
    console.log(className);
    template.push("import " + className + " from '" + componentsPath + "';");
  });
  template.push("export {");
  _.map(classNames, className => {
    template.push(className + ",");
  });
  template.push("};");
  console.log(template);
  fs.writeFile("./src/client/Library.jsx", template.join("\n"), err => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
}
/**
 * _______________________
 * |                     |
 * |                     |
 * |    SECTION THREE    |
 * |                     |
 * |_____________________|
 * |                     |
 * |                     |
 * |      EXECUTION      |
 * |                     |
 * |_____________________|
 */
export default function execution() {
  log(staColor, "Creating Third Party Library");
  fs.readFile("./src/components.txt", "utf8", (err, data) => {
    let componentsPaths = [];
    if (err) {
      log(errColor, err);
    }
    data = data.split(",");
    data.pop();
    console.log(data);
    _.map(data, componentDirs => {
      let response = walkSync("./src/viewables/" + componentDirs + "/", null);
      componentsPaths.push(_.filter(response, path => path.match(/\w*.jsx/g)));
    });
    componentsPaths = _.flatten(componentsPaths);
    generateLibraryClass(componentsPaths);
  });
}

/**
 * _______________________
 * |                     |
 * |                     |
 * |    SECTION  FOUR    |
 * |                     |
 * |_____________________|
 * |                     |
 * |                     |
 * |      TEMPLATER      |
 * |                     |
 * |_____________________|
 */
const template = listOfComponents => {
  `
  import React from "react";
  `;
};
