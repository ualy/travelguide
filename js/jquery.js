$(document).ready(function() {
    
    $('header').css('border-bottom', '2px solid #3498db');
    
    
    $('.logo h1').css({
        'color': '#2c3e50',
        'text-shadow': '1px 1px 2px rgba(0,0,0,0.1)'
    });
    
    
    $('.social-links a:first').attr('href', 'https://facebook.com/travelexplorer');
    
    
    $('.destination').hover(
        function() {
            $(this).find('img').stop().fadeTo(200, 0.8);
            $(this).find('h3').stop().animate({ fontSize: '1.5em' }, 200);
        },
        function() {
            $(this).find('img').stop().fadeTo(200, 1);
            $(this).find('h3').stop().animate({ fontSize: '1.2em' }, 200);
        }
    );
    
    
    $('.view-tours').click(function(e) {
        e.preventDefault();
        $(this).text('Loading...').css('background-color', '#3498db');
        setTimeout(() => {
            window.location.href = 'destinations.html';
        }, 1000);
    });
    
    
    $('.navbar-toggler').click(function() {
        $('#navbarNav').slideToggle();
    });
    
    
    $('form').submit(function(e) {
        const email = $(this).find('input[type="email"]').val();
        if (!email.includes('@')) {
            e.preventDefault();
            $(this).append('<p class="error">Please enter a valid email address</p>');
        }
    });
    
    
    $('#featured').append('<button id="show-more" class="btn-more">Show More Destinations</button>');
    
    $('#show-more').click(function() {
        const newDestination = `
            <li>
                <img src="https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Barcelona">
                <h3>Barcelona</h3>
                <p>Experience the vibrant culture of Spain!</p>
                <a href="destinations.html" class="view-tours">View Tours</a>
            </li>
        `;
        $('#featured ul').append(newDestination);
        $(this).fadeOut();
    });
    
    
    function fetchWeather(city, callback) {
        
        setTimeout(() => {
            const weather = {
                city: city,
                temp: Math.floor(Math.random() * 30) + 10,
                condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)]
            };
            callback(weather);
        }, 1500);
    }
    
    $('#weather-btn').click(function() {
        fetchWeather('Paris', function(weather) {
            $('#weather-info').html(`
                <h4>Weather in ${weather.city}</h4>
                <p>Temperature: ${weather.temp}°C</p>
                <p>Condition: ${weather.condition}</p>
            `).fadeIn();
        });
    });
});
