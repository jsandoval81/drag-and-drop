drag-and-drop
=============

This is a simple web app that asks the user to reconstruct a logo image via the web browser.

### To use the app:
1. Clone the repo (https://github.com/jsandoval81/drag-and-drop.git)
2. Navigate to `drag-and-drop/client/`
3. Open index.html with Chrome

### To continue development (in Windows):
1. Clone the repo (https://github.com/jsandoval81/drag-and-drop.git)
2. From Git bash in the root directory:
* Run `npm cache clean && npm install`
* Run `bower cache clean && bower install`
* Run `git checkout -b your-branch-name`
4. From a new command window in the root directory:
* Run `grunt test-server`
5. From a new command window in the root directory:
* Run `grunt dev`

You are now able to develop freely against the app. As you edit the JS, LESS, and HTML all of the preprocessing, linting, testing, concatenation, minification is taken care of automatically.

You can modify the linter settings in the `.jshintrc` file.