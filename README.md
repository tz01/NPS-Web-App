# National Park Service Information Kiosk

In this web app, the user is first directed to a landing page with a drop down list of states to choose from. Once the user presses submit, two things happen.
  1. An empty page used to display parks and an empty tabs used to display the park's more specific information appears below the landing page.
  2. The user's selection is then passed in as a parameter into a GET request for parks to the National Park Service API. The request then returns the parks' names, descriptions, and their respective images. The park images, overlaid with their respective names, then fill in the empty page used to display parks. 
Once the user clicks on an image, the respective park's name is then used to find the park code using a key-value object. The park code is then passed in as a parameter into a GET request for the park's visitor centers, campgrounds, lesson plans, news, alerts, and events. The information returned from these requests is then appended to their respective tab. The user can click on any image to see the information for a different park or resubmit a different state to see that state's parks.


