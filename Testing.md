# Testing:

### Andre Assadi:

- `Schedule.js`
  - Controls sub components and renders schedule page
  - Visual representation was manually tested by inspection
  - `useEffect`
    - Function for populating existing routes on the schedule page.
    - Manually tested by verifying information on schedule page was consistent with database routes via print statements
  - `convertDaysToBooleans`
    - Function for converting an array of string days (Mon, Tue, etc…) to a boolean array (e.g: false, false, true …) of size 7.
    - Manually tested by verifying inputs were converted to correct output via print statements
  - `convertDaysForRoutesToNumbers`
    - Function for converting all days of all routes to numeric fields
    - Manually tested by comparing existing route data stored in local state to output data from the function via print statements
  - Input handlers: `handleOnCampusLocation`, `handleOffCampusLocation`, `handleTime`, `handleToCampus`, `handleAddDay`, `handleRemoveRoute`:
    - Functions for updating local state
    - Tested by verifying local state variables reflected user input via print statements
- `ScheduleRoute.js`
  - Renders individual route cards
  - Visually/manually tested, non stateful/logical component.
- `App.js`
  - Renders the app, conditional logic whether to load the Authenticated App or UnauthenticatedApp
  - Tested manually by switching between authenticated users and non authenticated users and jumping to restricted routes
- `AuthenticatedApp.js`
  - Renders authenticated application
  - Visually/manually tested, non stateful/logical component
- `UnauthenticatedApp.js`
  - Renders unauthenticated application
  - Visually/manually tested, non stateful/logical component
- `RedirectFeed.js`
  - Component that redirects a user to the feed page
  - Visually/manually tested by going to a route that renders RedirectFeed and seeing if the page switched to the feed.
- `RedirectHome.js`
  - Component that redirects a user to the Home page
  - Visually/manually tested by going to a route that renders RedirectHome and seeing if the page switched to the home.
- `UserContext.js`
  - Added logic that prevented rendering the application unless a user object existed
  - Manually tested by disconnecting to database during an authenticated session

### Fernando Moreira Ruiz:

- `app.get(/feed/fill)` endpoint
  - Unit tested by inputting a hard coded route. Expected output was gotten by looking at the mongoDB and seeing what routes should be returned.
- `Backend/util/distance.js`
  - Unit tested by inputting hardcoded addresses as the parameters. The output was checked within App.js, ensuring that data was returned correctly

### Jason Ohanaga:

- `Homepage.js`
  - Home page of web app
  - Manually unit tested by observing expected redirect to feed page or account setup page after clicking “Sign up/Login”
- `FeedSingle.js`
  - Displays a single feed on feed page
  - Manually unit tested by inputting hardcoded data and validating that it is displayed as expected
  - Further tested later with fetched data from backend and verifying that the correct data was pulled and displayed as intended
- func `existingRoutes`
  - Verifies that user has routes
  - Manually unit tested by visually verifying that a user without routes will not be displayed and a user with route would be
- func `existingOnCampus`/ `existingOffCampus`
  - Verifies that user has the updated campus field
  - Tested by visually observing that only users with updated campus fields will be able to be displayed to the feed page
- `FeedPageUtils.js`
  - func `convertHMS`
    - Converts seconds to H:M format
    - Manually unit tested by verifying random assortment of inputted seconds gave the corrent time in H:M format displayed on the site
  - func `convertDays`
    - Converts numerical representation of days to character representation
    - Manually unit tested by looking at the feed page and seeing the correct days deisplayed
  - func `randomEmojis`
    - Returns a random emoji from an emojis list
    - Manually tested by seeing the random emojis on the feed page per displayed user
- `FeedPageRouteDropdown.js`
  - Dropdown for all of user’s routes
  - Manually unit tested by observing a change in displayed feeds based on a clicked route from the drop down, verifying that the displayed feeds coincide with the clicked route by observing and seeing if they make sense to be shown based off of our matching algorithm
  - Manually tested by two people trying numerous routes with each other and seeing if we get the expected changes displayed to the feed page
- `FeedPage.js`

  - Feed page of a user
  - Manually unit tested by testing the prior feed components and observing the expected display of the entire feed page

  - func `feedFill`
    - get request for pulling a users list of matching feeds from the database and populating their feed, was tested visually

- `NavBar.js`
  - Navbar throughout the app
  - Manually unit tested by verifying correct route to desired page was taken after clicking the page you wanted to go to

### Brandon Luu:

- `Schedule.js`
  - Function `Schedule`
    - Manually unit tested by adding multiple routes and the correct routes were showing up in the database
  - `loadGoogleMapScript`
    - Loads the google map script for autocomplete when the page is loaded
    - Manually unit tested by checking if the places that were autofilled were correct places
  - `schedule`
    - Gets called on submit, validates the form then if it is correct, converts the days in the routes from bools to numbers and sents the updated routes to the backend.
    - Manually tested by using console.log to display updated routes to make sure that it is sending the correct routes to the backend
  - `Return`
    - Returns jsx of all the buttons and each route input on the page.
    - Manually tested to see if the add route and submit buttons worked correctly
- `ScheduleRoute.js`
  - Function `ScheduleRoute`
    - Component that displays each individual route
    - Manually unit tested by checking if the dropdowns/checkbox displayed the correct info and correctly interacted with Schedule to send the correct routes to the backend
- `RouteValidator.js`
  - Function `validate`
    - Gets called on submit and displays an error message if some fields are empty in the routes
    - Manually unit tested by adding multiple routes and then checking if it validated the correct routes and fields.
- `GPlace.js`
  - `GPlace`
    - Initializes the google place autocomplete and returns the input form with autocomplete
    - Manually unit tested by checking if the places that were autofilled were correct places and sent the correct addresses to the backend.

### Joseph Kong:

- Geocoding function `getCoordsForAddress` in `Backend/util/location.js`
  - Function takes in an address (string) as input and returns the coordinates for that address and the formatted version of that address (i.e. Formatting an address: 1421 Mission Street Santa Cruz turns into 1421 Mission St, Santa Cruz, CA 95060, USA)
  - Unit test by running the endpoint on an address string (i.e. 1421 Mission Street Santa Cruz).
  - Take output coordinates (in this case, { lat: 36.9671128, lng: -122.0390627 }) and put them into google maps, expecting the coordinates to point to the address we fed in
  - Expect output formatted address to be 1421 Mission St, Santa Cruz, CA 95060, USA
- Account setup/account update endpoint: `app.put('/account/setup')` in `Backend/index.js`
  - Unit tested the endpoint by logging into a user and making a request with hard-coded data in the body.
  - Specifically: `{ setupFlag: true, hiddenFlag: false, userType: ‘Driver’, phoneNumber: ‘+17777777777’, bio: ‘hello world’, address: ‘1421 Mission Street, Santa Cruz’ }`
  - After calling the endpoint, ensure that the hard-coded data appears in the correct fields (and is accurate) by checking the user’s fields in the mongoDB database
  - Call the endpoint again with the same user, with new data in the request body: `{ setupFlag: true, hiddenFlag: true, userType: ‘Rider’, phoneNumber: ‘+19999999999’, bio: ‘hello earth’, address: ‘517 Cedar Street, Santa Cruz’ }`
  - Ensure that the user’s data in the database is updated with these new values
- Add route endpoint : `app.put('/account/addroute')` in `Backend/index.js`
  - Unit tested the endpoint by logging into a user and making a request with hard-coded data (an array of routes) in the body. specifically `{ routes: [ { toCampus: true, days: [0,1,2], time: 28800, offCampusLocation: ‘1421 Mission Street, Santa Cruz’, onCampusLocation: ‘East Remote Parking Lot’, }, { toCampus: false, days: [3,4,5], time: 57600, offCampusLocation: ‘517 Cedar Street, Santa Cruz’, onCampusLocation: ‘Science Hill}]}`
  - After calling the endpoint, ensure that the hard-coded data appears in the correct fields (and is accurate) by checking the user’s routes field in the mongoDB database now matches with the array of routes we input
  - Call the endpoint again with new data: `{ routes: [ { toCampus: false, days: [3,4,5], time: 57600, offCampusLocation: ‘517 Cedar Street, Santa Cruz’, onCampusLocation: ‘Science Hill }, { toCampus: true, days: [0,1,2], time: 28800, offCampusLocation: ‘1421 Mission Street, Santa Cruz’, onCampusLocation: ‘East Remote Parking Lot’ }]`
  - ensure that the user’s data in the database is updated with these new values
