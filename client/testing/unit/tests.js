
var expect = chai.expect;

mocha.setup('bdd');

describe('Application state object', function() {

    it('should exist', function() {
        expect(App.dragInfo).to.exist;
    });

    it('should contain correct properties', function() {
        expect(App.dragInfo).to.have.property('numComplete');
        expect(App.dragInfo).to.have.property('dropArea');
        expect(App.dragInfo).to.have.property('dropTarget');
    });

    it('should have correct default property values', function() {
        expect(App.dragInfo.numComplete).to.equal(0);
        expect(App.dragInfo.dropArea).to.equal(false);
        expect(App.dragInfo.dropTarget).to.equal(false);
    });

});