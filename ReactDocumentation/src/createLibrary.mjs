"use strict";
import fs from "graceful-fs";
import _ from "lodash";

/**
 * _______________________
 * |                     |
 * |                     |
 * |    SECTION ZERO     |
 * |                     |
 * |_____________________|
 * |                     |
 * |                     |
 * |     RUN OPTIONS     |
 * |                     |
 * |_____________________|
 */
//LOLZ
/**
 * TODO
 */

/**
 * _______________________
 * |                     |
 * |                     |
 * |     SECTION ONE     |
 * |                     |
 * |_____________________|
 * |                     |
 * |                     |
 * |      CONFIGURE      |
 * |                     |
 * |_____________________|
 */
//The directory that the latest version of the components will be put in
//Remember to add this to the .gitignore
const targetDirectory = "latest-pull/";
//The path to the targetDirectory from pwd of package.json
const path = "src/";
//Location for the repo pull, this is not the final location of the components
const targetLocation = path + targetDirectory; // "src/latest-pull"
const gitCloneRepoUrl = "https://github.com/RobertLbebber/NukeReactor.git";
//The location of the components to be shown in Live Viewer
const componentDirecotoryForLive = targetLocation + "frontend/src/components/"; // "src/latest-pull/frontend/src/"
const cssExtension = ".scss";
const exportSCSS = "_export" + cssExtension;

/**
 * _______________________
 * |                     |
 * |                     |
 * |     SECTION TWO     |
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
 * |    SECTION THREE    |
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
  //This is dedicated to creating a Library component
  let template = ["//This is procedurally generated from createLibrary.mjs::generateLibraryClass"];
  //This is dedicated to holding the name of all the components
  let classNames = [];
  //This is dedicated to creating an object that holds all the Library components as an object
  let classObject = ["import {"];
  log(warColor, "-- Library Component Class must be default named and identical to its file name");
  _.map(componentsPaths, componentsPath => {
    let fileName = componentsPath.match(/([^/]*).jsx*/g);
    let className = fileName.pop().replace(/.jsx/g, "");
    classNames.push(className);
    console.log(className);
    template.push("import " + className + " from '../../" + componentsPath + "';");
  });
  template.push("export {");
  _.map(classNames, className => {
    template.push(className + ",");
    classObject.push(className + ",");
  });
  template.push("};");
  classObject.push("} from './Library.jsx';");
  fs.writeFile("./src/generated/Library.jsx", template.join("\n"), err => {
    if (err) throw err;
    console.log("The file has been saved!");
  });

  classObject.push("export default Object.freeze([");
  _.map(classNames, classes => {
    classObject.push("{  component:" + classes + ", path: '/" + classes + "' },");
  });
  classObject.push("]);");
  fs.writeFile("./src/generated/LibraryComponents.jsx", classObject.join("\n"), err => {
    if (err) throw err;
    console.log("The file has been saved!");
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
 * |      EXECUTION      |
 * |                     |
 * |_____________________|
 */
export default function execution() {
  log(staColor, "Creating Third Party Library");
  let componentsPaths = [];
  let response = walkSync(componentDirecotoryForLive, null);
  response = _.filter(response, path => path.match(/\w*.jsx/g));
  response = _.filter(response, path => !path.match(/\w*Context.jsx/g));
  componentsPaths.push(response);
  componentsPaths = _.flatten(componentsPaths);
  log(errColor, componentsPaths);
  generateLibraryClass(componentsPaths);
}
