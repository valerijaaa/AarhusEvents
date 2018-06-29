$( document ).ready(function() {
    
    // This code is called when jquery is ready to be used
    $.getJSON( "https://api.detskeriaarhus.dk/api/events?items_per_page=35", function( eventsData ) {
        console.log(eventsData);

        var source = $("#events-list-template").html(); 
        var template = Handlebars.compile(source); 

        var data = {};
        data.events = eventsData;

        Handlebars.registerHelper('isFree', function(block) {
            if (Array.isArray(this.customTags) && this.customTags.indexOf('Gratis') >= 0) {
                return block.fn(this); // pokazatj to chto vnutri v HTML
            }
            else{
                return block.inverse(this); // nechevo ne pokazatj
            }

        });

        $('.events').append(template(data));
      });
    
  });

