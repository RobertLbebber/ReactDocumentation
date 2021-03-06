"use strict";

import git from "simple-git/promise";
import util from "util";
import { exec } from "child_process";
import fs from "graceful-fs";
import _ from "lodash";
import CreateLibrary from "./src/createLibrary.mjs";

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
//Remember to add this to the .gitignore
//The path to the targetDirectory from pwd of package.json
const path = "src/";
//The directory that the latest version of the components will be put in
const targetDirectory = "latest-pull/";
//Location for the repo pull, this is not the final location of the components
const targetLocation = path + targetDirectory; // "src/latest-pull"
const gitCloneRepoUrl = "https://github.com/RobertLbebber/NukeReactor.git";
//The location of the components to be shown in Live Viewer
const componentDirecotoryForLive = targetLocation + "frontend/src/components/"; // "src/latest-pull/frontend/src/"
const libraryPackageJsonDir = targetLocation + "frontend/package.json"; // "src/latest-pull/frontend/package.json"
const libraryCssBuild = targetLocation + "frontend/src/build/index.css"; // "src/latest-pull/frontend/src/"
// const cssExtension = ".scss";
// const exportSCSS = "_export" + cssExtension;
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

async function run(command, cb = () => {}) {
  await exec(command, (err, stdout, stderr) => {
    if (err) {
      log(errColor, "ERROR:: " + err);
    }
    cb(err, stdout, stderr);
  });
}
function chain(fn, cb) {
  return new Promise(resolve =>
    new Promise(async resolve => {
      await fn();
      resolve();
    }).then(async () => {
      await cb();
      resolve();
    })
  );
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
/**
 * This method is responsible for cloning the git repo of a third party component library
 */
async function gitCloneRepo() {
  return new Promise(async (resolve, reject) => {
    await git()
      .clone(gitCloneRepoUrl, targetLocation)
      .then(() => {
        resolve();
      });
  });
}

/**
 * Wipes the local version of the third party component library
 */
async function wipeLocalRepo() {
  await new Promise(async resolve => {
    await exec("rm -rf " + targetLocation + "* " + targetLocation + ".*", () => {
      resolve();
    });
  });
}

/**
 * This method is responsible for pulling the repo and properly wiping the local directory
 */
async function pullingRepo() {
  log(staColor, "Pulling From Git Latest Version");
  await new Promise(async resolve => {
    await run("ls -ah " + targetLocation, async (error, stdout, stderr) => {
      //If the stdout which is a list of files and directories finds the targetDirectory remove it
      if (stdout.length > 0) {
        console.log("Wiping up " + targetLocation);
        await wipeLocalRepo();
        console.log("Wiping " + targetLocation + " complete");
      }
      resolve();
    });
  }).then(async () => {
    await gitCloneRepo();
  });
  log(sucColor, "Done Pulling From Git");
}

// async function populateCSSExports(wasUpdated) {
//   let componentDirList = [];
//   await new Promise(resolve =>
//     run("ls ./src/viewables/", async (err, stdout, stderr) => {
//       componentDirList = _.split(stdout, /[\n]/g);
//       componentDirList = _.filter(componentDirList, item => item.length > 0);
//       let content = [];
//       await _.map(componentDirList, component => {
//         content.push('@import "./src/viewables/' + component + "/" + exportSCSS + '"; ');
//       });
//       let topComponents = content.join(" ");
//       console.log(topComponents);
//       await exec("echo " + topComponents + " >> ./src/" + exportSCSS, (err, stdout, stderr) => {
//         console.log("CSS File " + sucColor + (wasUpdated ? "Updated" : "Added") + defColor);
//         resolve();
//       });
//     })
//   );
// }

async function connectCSS() {
  log(staColor, "Connecting Third Party Lirbrary CSS");
  log(
    warColor,
    "-- in order for CSS connection to work, the third party must be using SCSS or LESS with _export in the component Directories"
  );
  let wasUpdated = false;
  // await new Promise(resolve =>
  //   run(" ls ./src/", async (error, stdout, stderr) => {
  //     wasUpdated = _.includes(stdout, exportSCSS);
  //     run(" rm -rf ./src/" + exportSCSS, async () => {
  //       console.log("Removed cached CSS files");
  //       await populateCSSExports(wasUpdated);
  //       log(sucColor, "Connected Third Party Lirbrary CSS");
  //       resolve();
  //     });
  //   })
  // );
  fs.copyFile(libraryCssBuild, "./src/generated/library.css", (err, data) => {
    console.log(err, data);
  });
}

async function updatePackageJson() {
  log(staColor, "Updating the 1st Party Package.json");
  let packageJsonDependencies = [];
  let packageJsonDevDependencies = [];
  await fs.readFile(libraryPackageJsonDir, "utf8", async (err, data) => {
    packageJsonDependencies = JSON.parse(data).dependencies;
    packageJsonDevDependencies = JSON.parse(data).devDependencies;
    await fs.readFile("./package.json", "utf8", async (err, data) => {
      let localJson = JSON.parse(data);
      localJson.devDependencies = localJson.devDependencies ? localJson.devDependencies : [];
      _.merge(localJson.dependencies, packageJsonDependencies);
      _.merge(localJson.devDependencies, packageJsonDevDependencies);
      console.log(localJson.toString());
      await fs.writeFile(
        "./package.temp.json",
        JSON.stringify(localJson),
        "utf8",
        async (err, data) => {
          if (_.isNil(err)) {
            await fs.rename("./package.temp.json", "./package.json", () => {});
          }
        }
      );
    });
  });
}

/**
 * This method creates a list of the top level directories from the thirs party library
 */
// async function generateList() {
//   log(staColor, "Generating a List of Components");
//   let componentDirList = [];
//   await new Promise(resolve =>
//     run("rm -rf ./src/components.txt", (a, b, c) =>
//       run("ls ./src/viewables/", async (err, stdout, stderr) => {
//         componentDirList = _.split(stdout, /[\n]/g);
//         await run(" echo " + componentDirList + " >> ./src/components.txt", () => {
//           log(sucColor, "List of Components Generated");
//           resolve();
//         });
//       })
//     )
//   );
// }

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

async function startScript() {
  await chain(
    pullingRepo,
    () =>
      // chain(findDesiredComponents, () =>
      // chain(generateList, () =>
      chain(connectCSS, () => chain(CreateLibrary, () => chain(updatePackageJson, () => {})))
    // )
    // );
  );
  log(
    warColor,
    "Make sure to run npm install before running npm start to update the package.json file!"
  );
}

startScript();
