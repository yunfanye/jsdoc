/**
 * @typedef {object} RealEstateListing
 * @property {string|null} url - The URL of the listing.
 * @property {number|null} price - The price of the property.
 * @property {string|null} address - The full address of the property.
 * @property {number|null} beds - The number of bedrooms.
 * @property {number|null} baths - The number of bathrooms.
 * @property {number|null} sqft - The square footage of the property.
 * @property {string|null} imageUrl - The URL of the primary image for the listing.
 * @property {string|null} status - The listing status (e.g., 'OPEN SUN, 2PM TO 4PM', 'LISTED BY REDFIN').
 */

/**
 * Extracts structured data about real estate listings from the page.
 * It iterates through each property card, gathering details like price, address,
 * beds, baths, square footage, image URL, property URL, and listing status.
 *
 * @returns {RealEstateListing[]} An array of objects, where each object represents a single real estate listing.
 *
 * @example
 * // Returns an array of listing objects like this:
 * [
 *   {
 *     "url": "https://www.redfin.com/CA/Roseville/6097-Crater-Lake-Dr-95678/home/19624990",
 *     "price": 799000,
 *     "address": "6097 Crater Lake Dr, Roseville, CA 95678",
 *     "beds": 3,
 *     "baths": 3,
 *     "sqft": 2707,
 *     "imageUrl": "https://ssl.cdn-redfin.com/system_files/media/1109183_JPG/genDesktopMapHomeCardUrl/item_1.jpg",
 *     "status": "REDFIN OPEN SUN, 2PM TO 4PM"
 *   },
 *   {
 *     "url": "https://www.redfin.com/CA/Sacramento/4200-Rose-Valley-Way-95826/home/19336633",
 *     "price": 445000,
 *     "address": "4200 Rose Valley Way, Sacramento, CA 95826",
 *     "beds": 3,
 *     "baths": 2,
 *     "sqft": 1113,
 *     "imageUrl": "https://ssl.cdn-redfin.com/system_files/media/1117374_JPG/genDesktopMapHomeCardUrl/item_3.jpg",
 *     "status": "LISTED BY REDFIN"
 *   }
 * ]
 */
function extractStructuredData() {
  const listings = [];
  const listingCards = document.querySelectorAll('.HomeCardContainer');

  listingCards.forEach(card => {
    try {
      const homecardLink = card.querySelector('a.bp-Homecard');
      if (!homecardLink) return;

      const relativeUrl = homecardLink.getAttribute('href');
      const url = relativeUrl ? new URL(relativeUrl, 'https://www.redfin.com').href : null;

      const priceText = card.querySelector('.bp-Homecard__Price--value')?.textContent;
      const price = priceText ? parseInt(priceText.replace(/[$,]/g, '')) : null;

      const address = card.querySelector('.bp-Homecard__Address')?.textContent.trim() || null;

      const bedsText = card.querySelector('.bp-Homecard__Stats--beds')?.textContent;
      const beds = bedsText ? parseFloat(bedsText) : null;

      const bathsText = card.querySelector('.bp-Homecard__Stats--baths')?.textContent;
      const baths = bathsText ? parseFloat(bathsText) : null;

      const sqftText = card.querySelector('.bp-Homecard__Stats--sqft .bp-Homecard__LockedStat--value')?.textContent;
      const sqft = sqftText ? parseInt(sqftText.replace(/,/g, ''), 10) : null;

      const imageUrl = card.querySelector('.bp-Homecard__Photo--image')?.src || null;
      
      const statusElement = card.querySelector('.Badge:not(.Badge--virtual-tour) span[data-rf-test-id="home-sash"] > span');
      const status = statusElement ? statusElement.textContent.trim() : 'Active';

      listings.push({
        url,
        price,
        address,
        beds,
        baths,
        sqft,
        imageUrl,
        status,
      });
    } catch (error) {
      console.error('Error processing a listing card:', error, card);
    }
  });

  return listings;
}

