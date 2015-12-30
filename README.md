# What is plex?

plex is an application that estimates the average-case time complexity of users’ sorting algorithms. Additionally, it reports other interesting analytics about these algorithms. With its intuitive interface, plex enables its users to gain insight into the performance of their code.

Visit our application at [plexit.co](http://www.plexit.co).

# The Philosophy Behind plex

plex returns an estimate of an algorithm's average-case time complexity. This is done by randomly  generating input arrays. Each permutation of a given input array is as likely to appears as another randomly generated input array, therefore we can say we return the average-case time complexity.

# Clone the Repository

To get the code for plex onto your local machine you must clone the repository:

```
$ https://github.com/plexit/plex.git
```

# Install

To run plex on your machine you must have the following dependencies globally installed:

  * Node.js
  * Git
  * npm
  * webpack
  * MongoDB

To install these dependencies consult each dependency's respective installation documentation. The remaining dependencies can be easily installed using npm. Just enter the following into the terminal once inside the plex root directory:

```
$ npm install
```

# Usage

To run our application locally you must configure the server, database and webpack module bundler. Steps for these processes follow.

## Setting Up the Server and webpack

In order to run our code, navigate to the plex directory. You must first create a webpack bundle file. This is done by running the following from the root directory:

```
$ webpack --watch
```

Next, you must run the server. We recommend using nodemon. To do this, first navigate to the root directory, then run:

```
$ nodemon server/server.js
```

## Configuring the Database

To run the database locally, you first must create a database directory in the root directory:

```
$ mkdir database
```

To start the mongo server, run:

```
$ mongod --dbpath database
```

This keeps the database server running in the terminal. To quit the database, type `Control-C`: ^c.

To modify and view the database, open a new terminal window:

```
$ [Command-N]
```

In this new terminal window, run:

```
$ mongo
```

After instantiating your database, if you see the error:

> WARNING: soft rlimits too low. Number of files is 256, should be at least 1000.

quit mongod and run:

```
$ ulimit -n 2048
```

In the mongo command line client, to get the list of available commands, run:

```
$ help
```

To exit the mongo command line, run:

```
$ exit
```

# Team

This application was built with love and care by:
* Stephanie Raad || GitHub: [Stephyraad](https://github.com/Stephyraad) ||  [LinkedIn](https://www.linkedin.com/in/stephanieraad)
* Jonathan Tamsut || GitHub: [jtamsut](https://github.com/jtamsut) ||  [LinkedIn](https://www.linkedin.com/in/jtamsut)
* Michael Martin || GitHub: [martinms-usc](https://github.com/martinms-usc) || [LinkedIn](https://www.linkedin.com/in/martinms)
* Matthew Murkidjanian || GitHub: [mmurkidjanian](https://github.com/mmurkidjanian) || [LinkedIn](https://www.linkedin.com/in/matthewmurkidjanian)
