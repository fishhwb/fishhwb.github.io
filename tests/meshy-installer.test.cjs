const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const installer = require("../install/meshy/installer.js");
const edge = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0 Edg/126.0";
const chrome = "Mozilla/5.0 (X11; Linux x86_64) Chrome/126.0 Safari/537.36";
test("Edge is detected before Chrome", () => {
  const platform = installer.detect(edge, "Win32", false);
  assert.equal(platform.browser,"edge");
  assert.equal(installer.route(platform).kind,"zip");
});
test("Chrome receives the official v1.5.2 archive", () => {
  const download = installer.route(installer.detect(chrome,"Linux",false));
  assert.equal(download.kind,"zip");
  assert.match(download.link, /releases\/download\/v1\.5\.2\/Meshy-Importer-Browser\.zip$/);
});
test("mobile and unsupported browsers never receive a misleading download", () => {
  const android = installer.detect("Mozilla/5.0 (Linux; Android 15) Chrome/126.0 Mobile Safari/537.36","Linux",false);
  const firefox = installer.detect("Mozilla/5.0 Firefox/127.0","Linux",false);
  assert.equal(installer.route(android).kind,"unsupported");
  assert.equal(installer.route(firefox).kind,"unsupported");
});
test("store URLs must be approved official hosts", () => {
  const platform = installer.detect(edge,"Win32",false);
  assert.equal(installer.route(platform,{edge:"https://example.com/fake"}).kind,"zip");
  assert.equal(installer.route(platform,{edge:"https://microsoftedge.microsoft.com/addons/detail/verified"}).kind,"store");
});
test("existing site and generator link to the same installer route", () => {
  const read = p => fs.readFileSync(path.join(root,p),"utf8");
  const ov = JSON.parse(read("assets/project-overrides.json"));
  const slug = "dedzedofficial/Meshy-Importer-for-Blender-Unity";
  const route = "https://fishhwb.github.io/install/meshy/";
  assert.equal(ov[slug].install_url,route);
  const projects = JSON.parse(read("assets/projects.json"));
  assert.equal(projects.repos.find(r=>r.full_name===slug).install_url,route);
  const generator = read(".github/scripts/build-site-content.mjs");
  assert.match(generator,/install_url: override\.install_url/);
  assert.match(generator,/browserInstall/);
  assert.match(generator,/install\/meshy\//);
  assert.match(read("assets/site-v2.js"),/r\.install_url/);
  assert.match(read("sitemap.xml"),/install\/meshy\//);
  assert.match(read("projects/dedzedofficial-meshy-importer-for-blender-unity/index.html"),/Install browser extension/);
});
test("installer is a self-contained local script with no tracking", () => {
  const js = fs.readFileSync(path.join(root,"install/meshy/installer.js"),"utf8");
  const html = fs.readFileSync(path.join(root,"install/meshy/index.html"),"utf8");
  assert.doesNotMatch(js,/fetch\s*\(|XMLHttpRequest|sendBeacon|gtag\s*\(/);
  assert.doesNotMatch(js,/\u2014/);
  assert.match(html,/src="installer\.js"/);
  assert.match(html,/id="steps"/);
  assert.doesNotMatch(html,/<script[^>]+src="https?:/);
});
