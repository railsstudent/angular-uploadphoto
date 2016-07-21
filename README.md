# angular-uploadphoto

Create a simple MEAN application to upload photo, list all photos and query photo dimensions by id.

Photo is stored in /uploads directory in the server.
Photo attributes are stored in local mongodb, database photodb, collection photos and port 27017.

Technology used:
Environment:
Angular 1.4.x
Node 5.12.0
Mongodb
Browser tested: Chrome 51 and FireFox 47.0

Framework:
Express 4.5.1

Libraries used:
Lodash:  collection utility
ng-file-upload: to up select image file and upload to server via nodejs url
Mongoose: Node ORM
node-uuid:  generate pseudo random uuid and use the value to rename image file on server side
image-size: read image and return dimensions of the file
multiparty: upload image file as multi-parts

Installation:
1) Create uploads folder under angular-uploadphoto/app
2) Type npm install on command line to download modules to node_modules directory
3) Type bower insall on command line to download libraries to public/libs directory
4) Start local mongodb
5) Type node server.js to start node server
6) Type localhost:8080 in browser to navigate to index page
