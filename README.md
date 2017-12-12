# Specifications #
Write a contact management (address book) application, basically a CRUD app.  It can be as formal or informal as you like.  You are free to implement the application in whatever technology stack you like (with the following requirements), it’s best if you choose the tech stack that you feel will show your strongest/deepest knowledge. 
	·       At least one “layer” of the tech stack must use .NET.
	·       If you use Angular for the front-end, it must be Angular 2 or higher (no AngularJS).  You can of course use something else for the front-end (web: React, Vue, etc. Desktop, Mobile, etc)
For the in-person (or via skype) interview, please have a working solution loaded, application ready to run, and source code ready to show.  You will be presenting and walking us through the code, answering questions along the way.  We will look through your code and discuss your choices around implementation.

## Address Book Client: React for Web
Why? The component/service structure is conducive to feature toggling and incremental enhancements by functionality. React is also very fast and easily portable between React-native and React for web in case future considerations are to turn this application into a mobile application.

## Address Book Service: ASP.NET WebAPI 2
Why? .NET WebAPI has proven to be stable, secure and easy to set up. It also makes sense to have this as a separate service for future scalability. A separate API allows for a separate line of development, easier testing, and the ability to switch up our front-end technology in the case of a rewrite (i.e. move from React to Angular 2).
Additionally, WebAPI 2 provides some nice functionality over its predecessor.

## Back-End Database: Microsoft SQL Express 2017
Why? Relational over non-relational for the future considerations of application expansion. Say for example, we want to modify the kind of data stored in relation to each user (i.e. alternate address, nickname), or expand the usage of the application to recommend users based on networks. This would mean complex join queries on multiple tables and massive document updates for additional properties vs. column updates to lookup tables. 
Microsoft SQL over any other *.SQL language because it plays nicely with .NET 
At this point, we also do not need to prioritize speed so it does not make sense to use non-relational. 