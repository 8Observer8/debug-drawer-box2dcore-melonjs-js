[Live demo](https://8observer8.github.io/examples/box2dcore/melonjs/debug-draw-js/)

Playgrounds:

- [Plunker](https://plnkr.co/edit/KvkGgejqBojm81k8?preview)
- [Replit](https://replit.com/@8Observer8/Debug-drawer-using-box2dcore-Melonjs-JS)
- [Glitch](https://glitch.com/edit/#!/flax-befitting-caterpillar)

Topic and discussions:

- [Melon.js topic](https://melonjs.discourse.group/t/basic-examples-of-using-box2d-core-with-melon-js-in-javascript/59)
- [Melon.js discussion](https://github.com/melonjs/melonJS/discussions/1197)
- [box2d/core discussion](https://github.com/Lusito/box2d.ts/discussions/45)

![debug-drawer-box2dcore-melonjs-js](https://github.com/8Observer8/debug-drawer-box2dcore-melonjs-js/assets/3908473/05a99840-c5f3-4b8b-99d7-e13033dda0c6)

Instruction for building and running the project in debug and release using Rollup:

- Install these packages globally with the command:

> npm i -g http-server rollup uglify-js

- Add the Rollup bin folder to the Path. Type this command to know where npm was installed `npm config get prefix`. This command will show you the npm location. You will find the "node_modules" folder there. Go to the "rollup/bin" folder and copy this path, for example for me: `C:\Users\8Observer8\AppData\Roaming\npm\node_modules\rollup\dist\bin`. Add this folder to the path variable.

- Run http-server in the project directory:

> http-server -c-1

Note. The `-c-1` key allows you to disable caching.

- Start development mode with the following command:

> npm run dev

Note. Rollup will automatically keep track of saving changes to files and build a new index.js file ready for debugging. You can debug your project step by step in the browser by setting breakpoints.

- Go to the browser and type the address: localhost:8080/index.html

- Create a compressed file ready for publishing. Stop development mode, for example, with this command Ctrl + C in CMD, if it was launched before and enter the command:

> npm run release

Note. After this command, Rollup will create a compressed index.js file. Compression is done using the uglify-js package.

If you want to thank me: https://8observer8.github.io/donate.html
