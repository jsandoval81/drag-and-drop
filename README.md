drag-and-drop
=============

This is a simple web app that asks the user to reconstruct a logo image via the web browser.

### To use the app:
1. Clone the repo (https://github.com/jsandoval81/drag-and-drop.git)
2. Navigate to the `drag-and-drop/client/` directory
3. Open `index.html` with Chrome

### To continue development (in Windows):

#### Dependencies
* Git Bash
* NPM
* Bower

#### Steps
1. Clone the repo (https://github.com/jsandoval81/drag-and-drop.git)
2. In Git Bash, navigate to the `drag-and-drop` directory
3. From Git bash, run `npm cache clean && npm install`
4. From Git bash, run `bower cache clean && bower install`
5. From Git bash, run `git checkout -b your-branch-name`
6. In a Command Window, navigate to the `drag-and-drop` directory
7. Run `grunt test-server`
8. In a _new_ Command Window, navigate to the `drag-and-drop` directory
9. Run `grunt dev`

You are now able to develop freely against the app. As you edit the JavaScript, LESS, and HTML all of the preprocessing, linting, testing, concatenation, minification is taken care of automatically.

You can modify the JavaScript linter settings in the `.jshintrc` file. You can modify the CSS linter settings in the `.csslintrc` file. You can modify any of the automation in the `Gruntfile.js` file.