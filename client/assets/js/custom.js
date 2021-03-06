//==========================================//
//  IA Logo Drag and Drop                   //
//                                          //
//  Author: John Sandoval                   //
//==========================================//

var App;
App = (function ($) {
    'use strict';

    //================================================
    //== Create an application state object factory ==
    //================================================
    var newState = function () {
            return {
                numComplete: 0,
                dropArea: false,
                dropTarget: false,
                startText: 'Place the dots in their correct locations',
                endText: 'CONGRATULATIONS!!!'
            };
        },
    //============================================
    //== Create an application interface object ==
    //============================================
        AppModule = {
            //== Create an application state object
            init: function () {
                this.dragInfo = newState();
            },
            //== Begin drag
            beginDrag: function (e) {
                AppModule.dragInfo.dropArea = false;
                AppModule.dragInfo.dropTarget = false;
                $(e.target).css('opacity', '0.7');
            },
            //== Check if drop area is valid
            isValidTarget: function (e, ui) {
                var dragColor = $(ui.draggable).data('dotColor'),
                    dropColor = $(e.target).data('dotColor');
                return dragColor === dropColor;
            },
            //== Hover styles
            hoverHelper: function (e, direction) {
                if (direction === 'off') {
                    $(e.target).removeClass('hover-target-good hover-target-bad');
                } else {
                    if (AppModule.dragInfo.dropTarget) {
                        $(e.target).addClass('hover-target-good');
                    } else {
                        $(e.target).addClass('hover-target-bad');
                    }
                }
            },
            //== Snap dot into position
            snapDot: function (e, ui) {
                var dragPos = $(ui.draggable).offset(),
                    dropPos = $(e.target).offset(),
                    topSnap = dropPos.top - dragPos.top + 1,
                    leftSnap = dropPos.left - dragPos.left + 1;
                $(ui.draggable).css('opacity', '1');
                $(ui.draggable).animate({
                    top: '+=' + topSnap,
                    left: '+=' + leftSnap
                });
                return { topSnap: topSnap, leftSnap: leftSnap };
            },
            //== Reset dot to original position
            resetDot: function (dot) {
                $(dot).animate({
                    top: '0px',
                    left: '0px',
                    opacity: '1'
                });
                return dot;
            },
            //== Toggle event listeners
            toggleListeners: function (logo, dest, toggle) {
                $(logo).draggable(toggle);
                $(dest).droppable(toggle);
            },
            incrementCount: function () {
                AppModule.dragInfo.numComplete += 1;
                AppModule.dragInfo.dropArea = false;
                AppModule.dragInfo.dropTarget = false;
            },
            //== Update the message label
            updateMessage: function () {
                $('#complete-count').fadeOut().text(AppModule.dragInfo.numComplete.toString()).fadeIn();
                if (AppModule.dragInfo.numComplete === 0 && $('#alert-box').hasClass('alert-success')) {
                    $('#alert-box').removeClass('alert-success').addClass('alert-info');
                    $('#alert-text').text(AppModule.dragInfo.startText);
                } else if (AppModule.dragInfo.numComplete >= 5) {
                    $('#alert-box').removeClass('alert-info').addClass('alert-success');
                    $('#alert-text').text(AppModule.dragInfo.endText);
                }
            }
        };

    //==================================================
    //== Initialize the AppModule object with a state ==
    //==================================================
    AppModule.init();

    //===============================
    //== Initialize the alert text ==
    //===============================
    $(document).ready(function () {
        $('#alert-text').text(AppModule.dragInfo.startText);
    });

    //=======================================
    //== Initialize the draggable elements ==
    //=======================================
    /* istanbul ignore next */
    $('.logo-dot').draggable({
        containment: '.drag-container',
        stack: '.logo-dot',
        start: function (e) {
            AppModule.beginDrag(e);
        },
        stop: function () {
            if (!AppModule.dragInfo.dropArea) {
                AppModule.resetDot(this);
            }
        }
    });

    //=======================================
    //== Initialize the droppable elements ==
    //=======================================
    /* istanbul ignore next */
    $('.dest-dot').droppable({
        accept: '.logo-dot',
        tolerance: 'intersect',
        drop: function (e, ui) {
            if (AppModule.dragInfo.dropTarget) {
                AppModule.snapDot(e, ui);
                AppModule.toggleListeners(ui.draggable, e.target, 'disable');
                AppModule.incrementCount();
                AppModule.updateMessage();
            } else {
                AppModule.resetDot(ui.draggable);
            }
            AppModule.dragInfo.dropArea = true;
            AppModule.hoverHelper(e, 'off');
        },
        over: function (e, ui) {
            AppModule.dragInfo.dropTarget = AppModule.isValidTarget(e, ui);
            AppModule.hoverHelper(e, 'on');
        },
        out: function (e) {
            AppModule.dragInfo.dropTarget = false;
            AppModule.hoverHelper(e, 'off');
        }
    });

    //=================================
    //== Initialize the reset button ==
    //=================================
    /* istanbul ignore next */
    $('#start-over').on('click', function () {
        AppModule.resetDot('.logo-dot');
        AppModule.toggleListeners('.logo-dot', '.dest-dot', 'enable');
        AppModule.init(newState());
        AppModule.updateMessage();
    });

    //=================================
    //== Expose the AppModule object ==
    //=================================
    return AppModule;

}(jQuery));