import archiver from "archiver";
import fs from "fs";
import data from "./package.json" assert { type: "json" };

const output = fs.createWriteStream(`${data.name}.zip`);

const archive = archiver("zip");

archive.pipe(output);

archive.append(fs.createReadStream("manifest.json"), { name: "manifest.json" });
archive.append(fs.createReadStream("popup.html"), { name: "popup.html" });
archive.directory("icons/", "icons/");
archive.directory("src/", "src/");

archive.finalize();
