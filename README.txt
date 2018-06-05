Creators: 	Dino Biel
		Clifford Mao
		Ayrin Golestanian
		Carlos Hernandez

Class: Comp680
Project Name: Mercury
Welcome to Mercury's Github page! This project is an application designed for students to manage student life during their school semester. It has a social aspect as well including a message board for communication and several handy features! 

Installation Notes: If you pull this project, make sure to run npm install (to get the proper node files) This project also uses "agm" for google maps, make sure to install that as well please see this link for installation notes for 
agm: https://angular-maps.com/api-docs/agm-core/

Technology Stack:
- Angular 4+ (For the front end of the application)
- ASP.NET CORE 2.0 (Handles the backend of the application and routing http requests to the database)
- MSSQL (Houses the database)
- Selenium (Our automated testing suite)
- Google Maps API (you will need to supply your own keys as the ones in this project are deactivated)
- Google Calendar API (You will need to supply your own keys as the ones in this project are deactivated)

Project Features:
-----------------------------
Message Board: 
-This allows users to post to a wall that everyone can see. 
-This project has the ability to add/remove/edit messages.
-You also have the ability to sort messages (by clicking on a users name)

Login/Logout/Resitration:
- Utilizes SHA-256 encryption to make sure data is secured during the above processes
- Added features to instruct user if information entered on screen matches criteria needed to login/register properly

Edit User Information:
Users have the ability to change their email, name, password from their account screen

Map:
- Users can plot their classes on their map and it is saved to the database
- Users can also delete classes plotted once done with class

Notes: 
- Users can save private notes which are not viewable by any other users

Search Message History:
- Users can search their message history
