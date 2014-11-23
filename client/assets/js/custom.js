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

    //========================================
    //== Create an application state object ==
    //========================================
    var dragInfo = {
        numComplete: 0,
        dropArea: false,
        dropTarget: false
    };

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
            if (dragInfo.dropTarget) {
                $(e.target).addClass('hover-target-good');
            } else {
                $(e.target).addClass('hover-target-bad');
            }
        }
    }

    //============================
    //== Snap dot into position ==
    //============================
    function snapDot(e, ui) {
        var dragPos = $(ui.draggable).offset(),
            dropPos = $(e.target).offset(),
            topSnap = dropPos.top - dragPos.top + 1,
            leftSnap = dropPos.left - dragPos.left + 1;
        $(ui.draggable).animate({
            top: '+=' + topSnap,
            left: '+=' + leftSnap
        });
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
        //== Snap the dot into exact position for the user
        snapDot(e, ui);
        //== Disable the draggable element
        $(ui.draggable).draggable('disable');
        //== Disbale the droppable element
        $(e.target).droppable('disable');
        //== Update the dragInfo object
        dragInfo.numComplete += 1;
        dragInfo.dropArea = false;
        dragInfo.dropTarget = false;
        //== Update the count label
        updateMessage();
    }

    //===============================
    //== Update the complete count ==
    //===============================
    function updateMessage() {
        //== Update the dragInfo object
        $('#complete-count').fadeOut().text(dragInfo.numComplete.toString()).fadeIn();
        //== Congratulate user when complete
        if (dragInfo.numComplete >= 5) {
            $('#alert-box-start').hide(0);
            $('#alert-box-finish').fadeIn();
        }
    }

    //==================================
    //== Configure draggable elements ==
    //==================================
    $('.logo-dot').draggable({
        containment: '.drag-container',
        stack: '.logo-dot',
        start: function (e, ui) {
            dragInfo.dropArea = false;
            dragInfo.dropTarget = false;
        },
        stop: function (e, ui) {
            if (!dragInfo.dropArea) {
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
            if (dragInfo.dropTarget) {
                completeDrop(e, ui);
            } else {
                resetDot(ui.draggable);
            }
            dragInfo.dropArea = true;
            hoverHelper(e, 'off');
        },
        over: function (e, ui) {
            dragInfo.dropTarget = isValidTarget(e, ui);
            hoverHelper(e, 'on');
        },
        out: function (e, ui) {
            dragInfo.dropTarget = false;
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