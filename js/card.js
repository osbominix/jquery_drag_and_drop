// JavaScript will go here
var correctCards = 0;
$( init );

function shuffle(array) {
    array.sort(function() {
        return Math.random() - .5;
    });
}
function init() {


    // Hide the success message
    $('#successMessage').hide();
    $('#successMessage').css( {
        left: '580px',
        top: '250px',
        width: 0,
        height: 0
    } );

    // Reset the game
    correctCards = 0;
    $('#cardPile').html( '' );
    $('#cardSlots').html( '' );

    // Create the pile of shuffled cards

    //var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
    //numbers.sort( function() { return Math.random() - .5 } );

    var numbers = [ 1, 2, 3 ];
    shuffle(numbers);//http://bost.ocks.org/mike/shuffle/compare.html

    for ( var i=0; i<3; i++ ) {

        var cardContent;
        switch(numbers[i]) {
            case 1:
                cardContent = "calm";
                break;
            case 2:
                cardContent = "angry";
                break;
            case 3:
                cardContent = "crazy";
                break;
            default:
                cardContent = "more";
                break;
        }

        $('<div>' + cardContent + '</div>').attr( 'id', 'card'+numbers[i] ).data( "number", numbers[i]).appendTo( '#cardPile' ).draggable( {
            containment: '#content',
            stack: '#cardPile div',
            cursor: 'move',
            revert: true
        } );
    }

    // Create the card slots
    //var words = [ 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten' ];
    var words = [ 'Step 1', 'Step 2', 'Step 3' ];
    for ( var i=1; i<4; i++ ) {

        $('<div>' + words[i-1] + '</div>').attr( 'id', 'slot'+ i ).data( "number", i ).appendTo( '#cardSlots' ).droppable( {
            accept: '#cardPile div',
            hoverClass: 'hovered',
            drop: handleCardDrop
        } );
    }

}

function handleCardDrop( event, ui ) {
    var slotNumber = $(this).data( 'number' );
    var cardNumber = ui.draggable.data( 'number' );

    // If the card was dropped to the correct slot,
    // change the card colour, position it directly
    // on top of the slot, and prevent it being dragged
    // again

    if ( slotNumber == cardNumber ) {
        ui.draggable.addClass( 'correct' );
        ui.draggable.draggable( 'disable' );
        $(this).droppable( 'disable' );
        ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
        ui.draggable.draggable( 'option', 'revert', false );
        correctCards++;
    }

    // If all the cards have been placed correctly then display a message
    // and reset the cards for another go

    if ( correctCards == 3 ) {
        $('#successMessage').show();
        $('#successMessage').animate( {
            left: '380px',
            top: '200px',
            width: '400px',
            height: '100px',
            opacity: 1
        } );
    }

}
