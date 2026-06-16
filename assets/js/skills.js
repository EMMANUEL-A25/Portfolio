// ================================================
//  EMMANUEL SIZIBA — SKILLS SECTION
//  File: script.js
//  Linked at bottom of index.html like this:
//  <script src="script.js"></script>
//
//  MUST go just before </body> — not in <head>
//  This ensures all HTML exists before JS runs
// ================================================


// ================================================
//  FUNCTION 1: filterSkills
//
//  Called by onclick on each filter button.
//  Receives:
//    category   — string e.g. 'frontend'
//    clickedBtn — the actual <button> element
//                 passed using 'this' in HTML
//
//  In your HTML each button looks like:
//  <button onclick="filterSkills('frontend', this)">
//  'this' = the button element that was clicked
// ================================================

function filterSkills(category, clickedBtn) {

  // ---- STEP 1: Deactivate ALL buttons ----
  // querySelectorAll finds every element matching
  // the CSS selector '.filter-btn'
  // Returns a NodeList — like an array of elements
  var allButtons = document.querySelectorAll('.filter-btn');

  allButtons.forEach(function(btn) {
    btn.classList.remove('active');
    // classList = the list of CSS classes on this element
    // .remove('active') removes just the 'active' class
    // The button keeps its other classes (e.g. filter-btn)
  });


  // ---- STEP 2: Activate the clicked button ----
  // clickedBtn is the <button> we received from HTML
  // .classList.add('active') adds the active class
  // CSS .filter-btn.active then styles it blue
  clickedBtn.classList.add('active');


  // ---- STEP 3: Show or hide each card ----
  // Find every skill card on the page
  var allCards = document.querySelectorAll('.skill-card');

  allCards.forEach(function(card) {

    // card.dataset.cat reads the data-cat HTML attribute
    // <div data-cat="frontend"> → card.dataset.cat = 'frontend'
    // .dataset gives access to all data-* attributes
    // data-cat → dataset.cat (hyphen removed, camelCase)
    var cardCategory = card.dataset.cat;

    // Should we show or hide this card?
    // Show if: 'all' selected OR card matches filter
    // Hide if: card does NOT match the selected filter
    if (category === 'all' || cardCategory === category) {

      card.classList.remove('hidden');
      // Removes 'hidden' class → card becomes visible
      // CSS: .skill-card.hidden { display: none }
      // Removing 'hidden' reverses the display:none

    } else {

      card.classList.add('hidden');
      // Adds 'hidden' class → card disappears
      // CSS: .skill-card.hidden { display: none }
      // Card takes up zero space — fully removed from flow
    }

  });

}
// end filterSkills


// ================================================
//  FUNCTION 2: animateBars
//
//  Reads data-width from each card and sets the
//  fill bar width. CSS transition does the animation.
//
//  Each bar is staggered using setTimeout so they
//  fill up one after another — looks polished.
// ================================================

function animateBars() {

  var allCards = document.querySelectorAll('.skill-card');

  allCards.forEach(function(card, index) {
    // card  = the current card element in the loop
    // index = its position: 0, 1, 2, 3...
    //         used to stagger animation timing

    // Read data-width="80" from the card's HTML
    // card.dataset.width gives us the string "80"
    // parseInt converts "80" (string) → 80 (number)
    var targetWidth = parseInt(card.dataset.width);

    // Find the fill bar INSIDE this specific card
    // card.querySelector = search inside this card only
    // document.querySelector = search entire page (wrong here)
    var fillBar = card.querySelector('.skill-fill');

    // Only animate if a fill bar exists in this card
    if (fillBar) {

      // setTimeout delays the animation start
      // Creates a stagger effect — each card waits a bit longer:
      //   Card 0 → 150ms delay
      //   Card 1 → 230ms delay (150 + 80)
      //   Card 2 → 310ms delay (150 + 160)
      //   etc.
      setTimeout(function() {

        fillBar.style.width = targetWidth + '%';
        // Sets the CSS width property directly on the element
        // targetWidth + '%' joins number + string
        // e.g. 80 + '%' = '80%'
        //
        // CSS has: transition: width 1s ease-in-out
        // So the bar smoothly animates from 0% → 80%
        // over 1 second automatically

      }, 150 + (index * 80));
      // 150 = base delay in milliseconds before any bar moves
      // index * 80 = extra 80ms per card (stagger)
    }

  });

}
// end animateBars


// ================================================
//  STARTUP — runs when the page finishes loading
//
//  DOMContentLoaded fires when the browser has
//  finished reading all HTML and built the page.
//
//  We wait for this event before running JS because:
//  JS needs the HTML elements to exist first.
//  If JS runs before HTML is ready, querySelector
//  finds nothing — the cards don't exist yet.
// ================================================

document.addEventListener('DOMContentLoaded', function() {

  // Animate all skill bars on page load
  animateBars();

  // ---- BONUS: re-animate on scroll ----
  // If skills section is lower on the page,
  // wait until user scrolls to it, then animate
  var skillsSection = document.querySelector('#skills');

  if (skillsSection) {

    var observer = new IntersectionObserver(function(entries) {
      // IntersectionObserver fires when an element
      // enters or leaves the visible screen area

      entries.forEach(function(entry) {

        if (entry.isIntersecting) {
          // isIntersecting = true means it's on screen
          animateBars();

          // Stop watching after first trigger
          // We only want the animation to run once
          observer.unobserve(entry.target);
        }
      });

    }, { threshold: 0.2 });
    // threshold: 0.2 = fire when 20% of section is visible

    observer.observe(skillsSection);
    // Start watching the #skills section
  }

});
// end DOMContentLoaded


// ================================================
//  HOW THE 3 FILES CONNECT — quick reference
//
//  HTML (index.html)
//    Gives elements classes:   class="skill-card"
//    Gives elements data:      data-cat="frontend"
//    Calls JS on click:        onclick="filterSkills('frontend', this)"
//
//  CSS (style.css)
//    Reads class names:        .skill-card { ... }
//    Hides filtered cards:     .skill-card.hidden { display: none }
//    Styles active button:     .filter-btn.active { background: blue }
//    Animates bars:            .skill-fill { transition: width 1s }
//
//  JS (script.js) — THIS FILE
//    Adds/removes classes:     card.classList.add('hidden')
//    Reads data attributes:    card.dataset.cat
//    Sets bar widths:          fillBar.style.width = '80%'
//
//  GOLDEN RULE:
//  JS never draws or styles anything directly.
//  JS only adds and removes CSS class names.
//  CSS does all the actual visual work.
// ================================================
