
document.addEventListener('DOMContentLoaded', function() {
    console.log("Script loaded successfully!");
    
    const headerTitle = document.querySelector('.logo h1');
    if (headerTitle) {
        headerTitle.style.color = '#2c3e50';
        headerTitle.style.padding = '10px';
        headerTitle.style.backgroundColor = '#f8f9fa';
        headerTitle.style.borderRadius = '5px';
        console.log("Styled header title");
    }
    
    const viewToursButtons = document.getElementsByClassName('view-tours');
    for (let button of viewToursButtons) {
        button.style.fontWeight = 'bold';
        button.style.fontSize = '1.1em';
    }
    console.log(`Styled ${viewToursButtons.length} tour buttons`);
    

    const heroSection = document.querySelector('#hero');
    if (heroSection) {
        heroSection.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        console.log("Styled hero section");
    }

    

    const welcomeBanner = document.querySelector('.welcome-message');
    if (welcomeBanner) {
        setTimeout(() => {
            welcomeBanner.textContent = "Ready for your next adventure? Start exploring now!";
            console.log("Updated welcome message");
        }, 2000);
        
    
        const closeBtn = welcomeBanner.querySelector('#close-welcome');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                welcomeBanner.style.display = 'none';
                console.log("Closed welcome banner");
            });
        }
    }
    

    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach((link, index) => {
        if (index === 0) {
            link.href = "https://facebook.com/travelexplorer";
            link.textContent = "Like us on Facebook";
        } else if (index === 1) {
            link.href = "https://instagram.com/travelexplorer";
            link.textContent = "Follow us on Instagram";
        } else if (index === 2) {
            link.href = "https://twitter.com/travelexplorer";
            link.textContent = "Tweet us on Twitter";
        }
    });
    console.log("Updated social media links");
    

    const specialOfferBtn = document.createElement('button');
    specialOfferBtn.textContent = 'Get Special Offer';
    specialOfferBtn.className = 'btn-more';
    specialOfferBtn.style.margin = '20px auto';
    specialOfferBtn.style.display = 'block';
    

    const hotTours = document.getElementById('hot-tours');
    if (hotTours) {
        hotTours.prepend(specialOfferBtn);
        
        specialOfferBtn.addEventListener('click', function() {
            alert('🎉 Exclusive 15% discount! Use code: EXPLORE15');
            console.log("Special offer clicked");
        });
    }
    
 
    const tourButtons = document.querySelectorAll('.view-tours');
    tourButtons.forEach(btn => {
        btn.addEventListener('dblclick', function(e) {
            e.preventDefault();
            const originalText = this.textContent;
            this.textContent = 'Loading premium options...';
            
            setTimeout(() => {
                this.textContent = originalText;
            }, 1500);
            
            console.log("Double clicked tour button");
        });
    });
    

    
    function handleInteraction(element, eventType, callback) {
        element.addEventListener(eventType, callback);
        console.log(`Added ${eventType} event to element`);
    }

    const exploreBtn = document.createElement('button');
    exploreBtn.textContent = 'Explore More';
    exploreBtn.className = 'btn-more';
    

    const featuredSection = document.getElementById('featured');
    if (featuredSection) {
        featuredSection.appendChild(exploreBtn);

        handleInteraction(exploreBtn, 'click', function() {
            featuredSection.style.backgroundColor = '#f0f8ff';
            featuredSection.style.padding = '25px';
            console.log("Explore button clicked");
        });
    }
    
    function playClickSound() {
        const clickSound = new Audio('sounds/click.mp3');
        clickSound.play().catch(e => {
            console.log("Audio couldn't play:", e);
        });
    }
    
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            playClickSound();
        });
    });
    

    const featuredPackage = {
        name: "European Adventure",
        price: 1499,
        destinations: ["Paris", "Rome", "Barcelona"],
        duration: "14 days",
        updatePrice: function(newPrice) {
            this.price = newPrice;
            this.displayInfo();
            console.log(`Updated price to $${newPrice}`);
        },
        addDestination: function(destination) {
            this.destinations.push(destination);
            this.displayInfo();
            console.log(`Added destination: ${destination}`);
        },
        displayInfo: function() {
            const packageDiv = document.createElement('div');
            packageDiv.className = 'package';
            packageDiv.innerHTML = `
                <h3>${this.name}</h3>
                <p><strong>Price:</strong> $${this.price}</p>
                <p><strong>Duration:</strong> ${this.duration}</p>
                <p><strong>Destinations:</strong> ${this.destinations.join(', ')}</p>
                <button class="btn-more update-pkg">Update Package</button>
            `;
            
            const existingDisplay = document.getElementById('package-display');
            if (existingDisplay) {
                existingDisplay.replaceWith(packageDiv);
            } else if (hotTours) {
                hotTours.appendChild(packageDiv);
            }
            packageDiv.id = 'package-display';
            
            packageDiv.querySelector('.update-pkg').addEventListener('click', () => {
                const newPrice = prompt("Enter new price:", this.price);
                if (newPrice) this.updatePrice(newPrice);
                
                const newDest = prompt("Add a destination:", "");
                if (newDest) this.addDestination(newDest);
            });
        }
    };
// ======================
// 8. Price Comparison Tool (Restored Feature)
// ======================

// Create comparison section
const compareSection = document.createElement('div');
compareSection.id = 'compare-section';
compareSection.className = 'package';
compareSection.innerHTML = `
    <h3>Compare Travel Options</h3>
    <div class="compare-inputs">
        <input type="number" id="price1" placeholder="First destination price ($)" min="0">
        <input type="number" id="price2" placeholder="Second destination price ($)" min="0">
        <button id="compare-btn" class="btn-more">Compare Prices</button>
    </div>
    <div id="compare-result" style="margin-top: 15px; padding: 10px;"></div>
`;

// Add to hot tours section
if (hotTours) {
    hotTours.appendChild(compareSection);
    
    // Comparison functionality
    document.getElementById('compare-btn').addEventListener('click', function() {
        const price1 = parseFloat(document.getElementById('price1').value);
        const price2 = parseFloat(document.getElementById('price2').value);
        const resultDiv = document.getElementById('compare-result');
        
        // Validate inputs
        if (isNaN(price1)) {
            resultDiv.innerHTML = '<p class="text-danger">Please enter a valid first price</p>';
            return;
        }
        if (isNaN(price2)) {
            resultDiv.innerHTML = '<p class="text-danger">Please enter a valid second price</p>';
            return;
        }
        
        // Compare prices
        let resultMessage = '';
        const difference = Math.abs(price1 - price2);
        
        if (price1 > price2) {
            resultMessage = `First option ($${price1}) is $${difference} more expensive than second ($${price2})`;
        } else if (price1 < price2) {
            resultMessage = `Second option ($${price2}) is $${difference} more expensive than first ($${price1})`;
        } else {
            resultMessage = `Both options cost the same ($${price1})`;
        }
        
        // Add recommendation
        if (difference > 1000) {
            resultMessage += '<p class="text-info mt-2">That\'s a big difference! Consider your budget carefully.</p>';
        } else if (difference > 500) {
            resultMessage += '<p class="text-info mt-2">Significant price difference - compare inclusions.</p>';
        } else if (difference > 100) {
            resultMessage += '<p class="text-info mt-2">Moderate price difference - check what\'s included.</p>';
        } else {
            resultMessage += '<p class="text-info mt-2">Prices are similar - consider other factors like dates and reviews.</p>';
        }
        
        resultDiv.innerHTML = resultMessage;
        console.log("Price comparison completed");
    });
}

    featuredPackage.displayInfo();
    
    console.log("All DOM manipulations completed!");
});
