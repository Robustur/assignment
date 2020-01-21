# Architecture and Design
The architecture of the app is quite simple. It has two main parts: 

a) Search Form
The search form is being used to take input from the user. When user enters a query(artist name), first we make sure that no empty value is entered by checking the input. After that, api is called with input artist name and app_id assigned by BandsInTown.com. If the api call returns a valid artist details, it passed to Artist Details section otherwise error is displayed to user based on the api result.
Two types of errors are displayed:
 i) "Artist not found", if api call yields no results
ii) Critical error, if the api call doesn't work or network connection is not working. The user displayed is with a generic error and technical error is logged into console for developer review

The way bandsintown.com api works, there wasn't much requirement sanitizing the input query. It also accepts special characters like '@' as varius artists have this character in their name.

b) Artist Details section
The artist details section has two sub-sections:
 i) Left section containing artist basic details; name, thumbnail, and facebook link
ii) Right section containing displaying number of events and their details; venue name, location, and date

If the api call is successful and it returs a valid artist details. It is passed to this section for display.

The app design is also responsive. All elements are stacked on mobile for easy navigation.

 # App ID
 The bandsintown.com no longer allows usage of their api for generic use. Now,it only allows artists, people associated with artists, and students. Only these users are assigned with app_id to be used with api call: https://www.artists.bandsintown.com/support/api-installation and https://intercom.help/bandsintown-manager/en/articles/3372745-can-i-have-access-to-the-api-and-an-app-id-if-i-m-not-an-artist

 An email was sent to api@bandsintown.com to request an app_id without any reference of Keeptruckin or interview assignment. The support agent provided me with the temporary app_id. The email conversation can be provided, if requested.


 ------------------------------------------------------------------
 ------------------------------------------------------------------
# Framework
The Javascript framework "Vuejs" was used to manage the content on the frontend. The Vuejs a progressive and reactive Javascript framework to build user interfaces: https://vuejs.org/
Alongwith Vuejs, Axios, an promised based http client and compatible with Vuejs was used to for api call: https://github.com/axios/axios



