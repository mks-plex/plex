# What is plex?

plex is an application that estimates the average-case time complexity of users’ sorting algorithms. Additionally, it reports other interesting analytics about these algorithms. With its intuitive interface, plex enables its users to gain insight into the performance of their code.

Visit our app at [plexit.co]("http://www.plexit.co")

# Install

To install plex onto your local machine you first must have a few dependencies globally installed:

  * Node.js
  * Git
  * npm
  * webpack
  * MongoDB

The remaining dependencies can be easily installed using npm. Just enter the following into terminal:

```
  npm install
```

# Usage

In order to run our code navigate to the plex directory. You must first create a webpack bundle
file. This can be done by running the following from the root directory:

```
  webpack --watch
```

Next, you must run the server. We recommend using nodemon to do this. To do this first navigate to the
root directory then run:

```
  nodemon server/server.js
```

# Team

This application was built with love and care by:
* Stephanie Raad || GitHub: [Stephyraad]("https://github.com/Stephyraad") ||  [LinkedIn]("https://www.linkedin.com/in/stephanieraad")
* Jonathan Tamsut || GitHub: [jtamsut]("https://github.com/jtamsut") ||  [LinkedIn]("https://www.linkedin.com/in/jtamsut")
* Michael Martin || GitHub: [martinms-usc]("https://github.com/martinms-usc") || [LinkedIn]("https://www.linkedin.com/in/martinms")
* Matthew Murkidjanian || GitHub: [mmurkidjanian]("https://github.com/mmurkidjanian") || [LinkedIn]("https://www.linkedin.com/in/matthewmurkidjanian")
