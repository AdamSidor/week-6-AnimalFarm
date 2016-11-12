//initial array with animals

var animalArray = ['PIG', 'HORSE', 'COW', 'RAVEN', 'CAT'];


//function for displaying animal data
function renderButtons(){ 

// Deletes the movies prior to adding new animals
		$('#animalView').empty();

//loops through animal array 

		for (var i = 0; i < animalArray.length; i++){

			var a = $('<button>'); 

		    a.addClass('animal'); // Added a class 
		    
		    a.attr('data-animal', animalArray[i]); // Added a data-attribute
		    
		    a.text(animalArray[i]); // Provided the initial button text
		    
		    $('#animalView').append(a); // Added the button to the HTML
		}
	}


//click handler to add buttons

$('#addAnimals').on('click', function(){

	var animal = $('#animal-input').val().trim();

	//pushes to the animal array
	animalArray.push(animal);

	//rends the buttons to animal array
	renderButtons();

	//so users can hit "enter"
	return false;

});


	//calls the renderButtons() function
	renderButtons();

//functions for button
	//for loop required
function fetchGifs() {
        var animal = $(this).data('animal');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        //AJAX CAll
        $.ajax({
                url: queryURL,
                method: 'GET'
            })
        //function to add to array
            .done(function(response) {

                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    
                    var animalDiv = $('<div>');

                    var p = $('<p>').text("Rating: " + results[i].rating);

                    var animalImage = $('<img>').addClass('giphy-animals');
                    animalImage.attr('src', results[i].images.fixed_height_still.url).attr('data-state', 'still').attr('data-still', results[i].images.fixed_height_still.url).attr('data-animate', results[i].images.fixed_height.url);

                    animalDiv.append(p);
                    animalDiv.append(animalImage);

                    $('#animalsAppear').prepend(animalDiv);
            }	
   		 });
		}


    $('#animalView').on('click', '.animal', fetchGifs);



//pausing and playing gifs
$('#animalsAppear').on('click', '.giphy-animals', function(){
	 var state = $(this).attr('data-state');
	  if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
     });
