$( document ).ready(function() {

    // This code is called when jquery is ready to be used
    $.getJSON( "https://api.detskeriaarhus.dk/api/events?items_per_page=35", function( eventsData ) {
        console.log(eventsData);

        // get handlebars html template from HTML (DOM)
        var source = $("#events-list-template").html(); 
        // handlebars does some magic
        var template = Handlebars.compile(source); 
        // create new data object, that is going to be used in handlerbars template afterwards
        var data = {};
        // settings events array on data. To access in HTML template we use #events without saying "data."
        data.events = eventsData;

        /*
            isFavorite is a custom helper (actually a function), which is being used
            in our HTML, to display some content conditionally.
        */
        Handlebars.registerHelper('isFavorite', function(eventName, block) {

            // checks if particular event is a favorite in local storage
            if (localStorage.getItem(eventName) === 'favorite') {
                 return block.fn(); // pokazatj to chto vnutri v HTML
            }
            else if (block) {
                // sometimes block is null, and thats an issue (i dont know why it is null)
                return block.inverse(); // nechevo ne pokazatj
            }
        });

        // generates html based on template and data, sets as a content of .events div
        $('.events').append(template(data));
      });
    
  });

// function that is being called on favorite/unfavorite button click
// eventName parameter - is string containing event name
// button parameter - is HTML object of clicked button
function favoriteFunction(eventName, button) {
    // find icon element inside button
    var icon = button.querySelector('i');
    // check if particular event is not favorite in local storage
    if (localStorage.getItem(eventName) !== 'favorite'){
        // set it as a favorite
        localStorage.setItem(eventName, 'favorite');
        // toggle classes
        icon.classList.remove('far');
        icon.classList.add('fas');
    }
    else {
        // event must be removed from local storage so it is not favorite anymore
        localStorage.removeItem(eventName);
        // toggle classes
        icon.classList.remove('fas');
        icon.classList.add('far');
    }
}


