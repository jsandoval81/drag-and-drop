
var expect = chai.expect;

mocha.setup('bdd');

//==============================
//== Application state object ==
//==============================
describe('Application state object', function() {

    it('should exist', function () {
        expect(App.dragInfo).to.exist;
    });

    it('should contain correct properties', function() {
        expect(App.dragInfo).to.have.property('numComplete');
        expect(App.dragInfo).to.have.property('dropArea');
        expect(App.dragInfo).to.have.property('dropTarget');
        expect(App.dragInfo).to.have.property('startText');
        expect(App.dragInfo).to.have.property('endText');
    });

    it('should have correct default property values', function() {
        expect(App.dragInfo.numComplete).to.equal(0);
        expect(App.dragInfo.dropArea).to.equal(false);
        expect(App.dragInfo.dropTarget).to.equal(false);
        expect(App.dragInfo.startText).to.equal('Place the dots in their correct locations');
        expect(App.dragInfo.endText).to.equal('CONGRATULATIONS!!!');
    });

});

//=======================
//== Draggable methods ==
//=======================
describe('Draggable methods', function () {

    //== Create event object
    var eventObj;

    //== Set the event-like properties
    beforeEach(function () {
        eventObj = { target: '#drag' };
    });

    //== Test beginDrag() method
    describe('beginDrag() method', function () {
        it('should reset the dropArea and dropTarget values', function () {
            App.dragInfo.dropArea = true;
            App.dragInfo.dropTarget = true;
            App.beginDrag(eventObj);
            expect(App.dragInfo.dropArea).to.equal(false);
            expect(App.dragInfo.dropTarget).to.equal(false);
        });
    });
});

//=======================
//== Droppable methods ==
//=======================
describe('Droppable methods', function () {

    //== Create event objects and temporary DOM container
    var eventObj,
        uiObj,
        $container = $(document.createElement('div'));

    //== Add the temporary DOM elements
    before(function () {
        $container.appendTo(document.body);
        $container.append($('<img>').attr('id', 'drag'));
        $container.append($('<div></div>').attr('id', 'drop'));
        $container.append($('<div></div>').attr('id', 'alert-box').addClass('alert'));
        $container.append($('<div></div>').attr('id', 'alert-text'));
        $container.append($('<div></div>').attr('id', 'complete-count'));
        $('#drag').draggable();
        $('#drop').droppable();
    });

    //== Set the event-like properties
    beforeEach(function () {
        eventObj = { target: $('#drop') };
        uiObj = { draggable: $('#drag') };
        App.init();
    });

    //== Remove the temporary DOM elements when finished
    after(function () {
        $container.remove();
    });

    //== Test isValidTarget() method
    describe('isValidTarget() method', function () {
        it('should return true when element data matches', function () {
            //== Set test values
            eventObj.target.data('dotColor', 'black');
            uiObj.draggable.data('dotColor', 'black');
            //== Evaluate
            expect(App.isValidTarget(eventObj, uiObj)).to.be.true();
        });
        it('should return false when element data does not match', function () {
            //== Set test values
            eventObj.target.data('dotColor', 'black');
            uiObj.draggable.data('dotColor', 'red');
            //== Evaluate
            expect(App.isValidTarget(eventObj, uiObj)).to.be.false();
        });
    });

    //== Test hoverHelper() method
    describe('hoverHelper() method', function () {
        it('should remove hover classes when direction is "Off"', function () {
            //== Call method
            App.hoverHelper(eventObj, 'off');
            //== Evaluate
            expect(eventObj.target.hasClass('hover-target-good')).to.be.false();
            expect(eventObj.target.hasClass('hover-target-bad')).to.be.false();
        });
        it('should add falsy class when drag colors do not match', function () {
            //== Set test values
            App.hoverHelper(eventObj, 'off');
            App.dragInfo.dropTarget = false;
            //== Call method
            App.hoverHelper(eventObj, 'on');
            //== Evaluate
            expect(eventObj.target.hasClass('hover-target-bad')).to.be.true();
        });
        it('should add truthy class when drag colors match', function () {
            //== Set test values
            App.hoverHelper(eventObj, 'off');
            App.dragInfo.dropTarget = true;
            //== Call method
            App.hoverHelper(eventObj, 'on');
            //== Evaluate
            expect(eventObj.target.hasClass('hover-target-good')).to.be.true();
        });
    });

    //== Test snapDot() method
    describe('snapDot() method', function () {
        it('should calculate the correct relative offset', function () {
            //== Set test values
            eventObj.target.offset({ top: 110, left: 110 });
            uiObj.draggable.offset({ top: 100, left: 100 });
            //== Call method
            var result = App.snapDot(eventObj, uiObj);
            //== Evaluate
            expect(result.topSnap).to.equal(11);
            expect(result.leftSnap).to.equal(11);
        });
    });

    //== Test toggleListeners() method
    describe('toggleListeners() method', function () {
        it('should correctly disable drag and drop events', function () {
            //== Call method
            App.toggleListeners(uiObj.draggable, eventObj.target, 'disable');
            //== Evaluate
            expect(uiObj.draggable.draggable('option', 'disabled')).to.be.true();
            expect(eventObj.target.droppable('option', 'disabled')).to.be.true();
        });
        it('should correctly enable drag and drop events', function () {
            //== Call method
            App.toggleListeners(uiObj.draggable, eventObj.target, 'enable');
            //== Evaluate
            expect(uiObj.draggable.draggable('option', 'disabled')).to.be.false();
            expect(eventObj.target.droppable('option', 'disabled')).to.be.false();
        });
    });

    //== Test incrementCount() method
    describe('incrementCount() method', function () {
        it('should correctly update the state object', function () {
            //== Set test values
            App.dragInfo.numComplete = 2;
            App.dragInfo.dropArea = true;
            App.dragInfo.dropTarget = true;
            //== Call method
            App.incrementCount();
            //== Evaluate
            expect(App.dragInfo.numComplete).to.equal(3);
            expect(App.dragInfo.dropArea).to.equal(false);
            expect(App.dragInfo.dropTarget).to.equal(false);
        });
    });

    //== Test updateMessage() method
    describe('updateMessage() method', function () {
        it('should correctly update the count element', function () {
            //== Set test values
            App.dragInfo.numComplete = 4;
            //== Call method
            App.updateMessage();
            //== Evaluate
            expect($('#complete-count').text()).to.equal('4');
        });
        it('should correctly reset the message on App reset', function () {
            //== Set test values
            var startText = App.dragInfo.startText;
            App.dragInfo.numComplete = 0;
            $('#alert-box').addClass('alert-success');
            //== Call method
            App.updateMessage();
            //== Evaluate
            expect($('#alert-box').hasClass('alert-info')).to.be.true();
            expect($('#alert-box').hasClass('alert-success')).to.be.false();
            expect($('#alert-text').text()).to.equal(startText);
        });
        it('should correctly congratulate the user upon complete', function () {
            //== Set test values
            var endText = App.dragInfo.endText;
            App.dragInfo.numComplete = 5;
            //== Call method
            App.updateMessage();
            //== Evaluate
            expect($('#alert-box').hasClass('alert-success')).to.be.true();
            expect($('#alert-box').hasClass('alert-info')).to.be.false();
            expect($('#alert-text').text()).to.equal(endText);
        });
    });

});