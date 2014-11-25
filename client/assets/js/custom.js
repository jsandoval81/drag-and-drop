//==========================================//
//  IA Logo Drag and Drop                   //
//                                          //
//  Author: John Sandoval                   //
//==========================================//

var App;
App = (function ($) {
    'use strict';

    //====================================
    //== Create an App interface object ==
    //====================================
    var AppModule = {
            //== Create an application state object
            dragInfo: {
                numComplete: 0,
                dropArea: false,
                dropTarget: false
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
            },
            //== Reset dot to original position
            resetDot: function (dot) {
                $(dot).animate({
                    top: '0px',
                    left: '0px',
                    opacity: '1'
                });
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
                if (AppModule.dragInfo.numComplete === 0 && $('#alert-box-start').is(':hidden')) {
                    $('#alert-box-finish').hide(0);
                    $('#alert-box-start').fadeIn(600);
                } else if (AppModule.dragInfo.numComplete >= 5) {
                    $('#alert-box-start').hide(0);
                    $('#alert-box-finish').fadeIn(600);
                }
            },
            //== Reset the state object
            resetAppState: function () {
                AppModule.dragInfo.numComplete = 0;
                AppModule.dragInfo.dropArea = false;
                AppModule.dragInfo.dropTarget = false;
            }
        };

    //==================================
    //== Configure draggable elements ==
    //==================================
    $('.logo-dot').draggable({
        containment: '.drag-container',
        stack: '.logo-dot',
        start: function (e, ui) {
            AppModule.beginDrag(e, ui);
        },
        stop: function () {
            //== If 'drop' did not handle the reset, handle it here
            if (!AppModule.dragInfo.dropArea) {
                AppModule.resetDot(this);
            }
        }
    });

    //==================================
    //== Configure droppable elements ==
    //==================================
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

    //====================
    //== Reset the logo ==
    //====================
    $('#start-over').on('click', function () {
        //== Reset the dots
        AppModule.resetDot('.logo-dot');
        //== Reset the event listeners
        AppModule.toggleListeners('.logo-dot', '.dest-dot', 'enable');
        //== Reset the state object
        AppModule.resetAppState();
        //== Update the message label
        AppModule.updateMessage();
    });

    //== Expose the AppModule object
    return AppModule;

}(jQuery));