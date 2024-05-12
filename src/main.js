import "../modules/drag-drop-touch.js";
console.log("drag-drop-touch loaded");
import "./shims.js";
console.log("shims loaded");
import "./merge-globals.js";
console.log("merge-globals loaded");
import { browserCheck, init } from "./game.js";
import { DEV } from "./env.js";

if (browserCheck()) init();