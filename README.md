# Battle Matcher
Tired of Tinder? Battle Matcher combines the struggle of matching with the fun of gaming! You can match with people based on their character and skills and fight together to gain higher levels and fight greater enemies.

If you've ever had trouble starting conversations, this is the app for you.

## What is this project? What is it for?
In this repository I'll be working on a feature for a matching application. This feature is part of Project Tech which is a project included in the [Communication and Multimedia Design](https://www.hva.nl/opleiding/communication-and-multimedia-design/communication-and-multimedia-design.html) course.

To learn more about tech, checkout the [repository](https://github.com/cmda-bt/pt-course-21-22).

## How was Battle Matcher created?
My goal was to create a feature in which you can swipe through cards liking and disliking people.

I started off by installing Node.js and the npm cli. To get things running on a local server I installed Express and added app.js as my main backend file. I made express listen to my port of 3000 and got it going. 

After doing the basics, I started writing my html using Handlebars. Handlebars is a templating engine in which I can make different partials that I can combine and serve as one html file. Handlebars offers some handy options like forEach and ifElse.

In my app.js I created different routes using app.get and post and displayed the html pages using res.render with handlebars as the rendering engine.

I wanted to display several cards with content pulled from a database so I installed mongoDB and mongoose and created a mongoDb Atlas account and database. 

I added different users to the database and an admin user I would use as the "logged in" user. The admin user has an empty array of matches in which i can add objectId's of users.

In the backend I made sure to check if the liked user likes the admin user back, in which case there would be a match. Handlebars would check if a match has happened, and would display a popup in which the user can choose to chat(not included in this feature) or continue swiping.

When a user has been added to matches they will no longer be displayed while swiping.

On a different page, the admin user can check out their matches in a list and remove them if needed. For demo purposes, a link is available in the menu to reset the admin users matches.

## Installing this project

to install this project, clone the repository using [git](https://git-scm.com/)

```
$git clone https://github.com/sasjakoning/blok-tech-2022.git
```

and install it's packages using [npm](https://www.npmjs.com/)

```
$npm install
```

This project uses Atlas [MongoDB](https://www.mongodb.com/) as it's database. To connect your own database make sure to create a .env file and unclude the link to your own database.

```
ATLAS_URI = "YOUR DATABASE LINK HERE"
```

### Packages

Used packages are: 

- [nodemon](https://www.npmjs.com/package/nodemon)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [express](https://www.npmjs.com/package/express)
- [express-handlebars](https://www.npmjs.com/package/express-handlebars)
- [handlebars](https://www.npmjs.com/package/handlebars)
- [mongodb](https://www.npmjs.com/package/mongodb)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [multer](https://www.npmjs.com/package/multer)

## Usage

### Starting the app
Once you've cloned the repository and installed all packages, you can start running the app.

To run with Node normally:
```
npm run start
```

To run with Nodemon:
```
npm run startdev
```

### Closing the app
To close the app, press `ctrl + C`

## Wiki
If you want to read more about this project and it's process, check out the [wiki](https://github.com/sasjakoning/blok-tech-2022/wiki)

## Helpful links
Below are some links to resources I found helpful during this project:

- https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65
- https://www.youtube.com/watch?v=5QEwqX5U_2M
- https://www.youtube.com/watch?v=cu6VQgT3EEI
- https://www.youtube.com/watch?v=kjKR0q8EBKE
- https://www.youtube.com/watch?v=3p0wmR973Fw
- https://www.youtube.com/watch?v=b59Pdt5LJG8
- https://www.youtube.com/watch?v=DZBGEVgL2eE
- https://www.npmjs.com/
- https://docs.mongodb.com/
- https://mongoosejs.com/docs/api.html
- https://nodejs.org/en/docs/
- https://expressjs.com/
- https://devcenter.heroku.com/
- https://handlebarsjs.com/
- And many, many, many articles from https://stackoverflow.com/

## License
MIT license