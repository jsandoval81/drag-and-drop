//=============================//
//  Drag and Drop client JS    //
//                             //
//  Author: John Sandoval      //
//  Date: 11/23/2014           //
//  Libraries:                 //
//    - jQuery                 //
//    - jQueryUI               //
//=============================//
(function ($) {
    'use strict';

    var dropTarget = false;

    //=================================
    //== Check if drop area is valid ==
    //=================================
    function isValidTarget(e, ui) {
        var dragColor = $(ui.draggable).data('dotColor'),
            dropColor = $(e.target).data('dotColor');
        return dragColor === dropColor;
    }

    //===============================
    //== Hover styles to help user ==
    //===============================
    function hoverHelper(e, direction) {
        if (direction === 'off') {
            $(e.target).removeClass('hover-target-good hover-target-bad');
        } else {
            if (dropTarget) {
                $(e.target).addClass('hover-target-good');
            } else {
                $(e.target).addClass('hover-target-bad');
            }
        }
    }

    //====================================
    //== Reset dot to original position ==
    //====================================
    function resetDot(dot) {
        $(dot).animate({
            top: '0px',
            left: '0px'
        });
    }

    //===========================
    //== Complete a valid drop ==
    //===========================
    function completeDrop(e, ui) {
        //== *** Fix/snap the position for the user HERE
        //== *** Update the label count HERE

        $(ui.draggable).draggable('disable');
        dropTarget = false;
    }

    //==================================
    //== Configure draggable elements ==
    //==================================
    $('.logo-dot').draggable({
        containment: '.drag-container',
        start: function (e, ui) {
            ui.helper.data('dropArea', false);
        },
        stop: function (e, ui) {
            if (!ui.helper.data('dropArea')) {
               resetDot(this);
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
            if (dropTarget) {
                completeDrop(e, ui);
            } else {
                resetDot(ui.draggable);
            }
            ui.helper.data('dropArea', true);
            hoverHelper(e, 'off');
        },
        over: function (e, ui) {
            dropTarget = isValidTarget(e, ui);
            hoverHelper(e, 'on');
        },
        out: function (e, ui) {
            dropTarget = false;
            hoverHelper(e, 'off');
        }
    });

    //=====================
    //== Reload the page ==
    //=====================
    $('#start-over').on('click', function () {
        location.reload();
    });

})(jQuery);