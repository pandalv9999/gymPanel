## SF Gym Club
<a href="https://youtu.be/9Ul97YAKMmA">Youtube Demo for assignment 2</a><br/>
<a href="https://youtu.be/xgSCvyJn590">Youtube Demo for assignment 3</a><br/>
<a href="https://polar-temple-47959.herokuapp.com/">Website</a><br/>
<a href="https://docs.google.com/presentation/d/1aLgb-3wJHX8IDEnb9rr-5JSSapzeFSYZ8bLq8nqbzNY/edit?usp=sharing">Presentation slides</a>

* **Author:**  
Rujun Yao, Yiman Liu
<img src="https://raw.githubusercontent.com/yimanliu0/yimanliu0.github.io/master/images/Homepage.png" alt="homepage">

## About this class
* **Class link:**  
<a href="https://johnguerra.co/classes/webDevelopment_fall_2020/">CS 5610 Web Development Northeastern University Bay Area</a> 

* **Project Objective:**  
Build a gym online dashboard containing the following major features:
  - User login/logout
  - User can see his/her current schedule for any registered courses or private training. 
  - User can view/edit his/her profile.
  - User can register for any public fitness courses if there is available slot.  
    User can unregister any registered courses.
  - User can make appointments with fitness trainer.  
    User can see available time slots for any fitness trainer and can make an appointment.  
    User can cancel any existing appointments.

## Screenshots 
<img src="https://raw.githubusercontent.com/yimanliu0/yimanliu0.github.io/master/images/schedule.png" alt="schedule">
<img src="https://raw.githubusercontent.com/yimanliu0/yimanliu0.github.io/master/images/courses.png" alt="courses">
<img src="https://raw.githubusercontent.com/yimanliu0/yimanliu0.github.io/master/images/trainers.png" alt="trainers">

## Updates for assignment 3
<ul>
    <li>Add some text hints and restrictions for user when they are registering</li>
    <li>Add Passport authentication to authenticate user and express session to maintain user session</li>
    <li>Add a admin page for administrator to manage existing courses and trainers, and add new courses or trainer</li>
    <li>Modified some of the text color and extinguish colors of success method calls and fail ones</li>
</ul>

## Instructions to build  
_node and npm installed_
* Eslint and prettier config:
  - npm init -y npm install —save-dev live-server
  - npm install —save-dev eslint prettier eslint-config-prettier
  - eslint—init
* Create express app
  - npx express-generator
* Create react app
  - npx create-react-app 
  
## Test account
In Order to see the admin page to modify existing courses and trainers in database, please use the following credential to login:
username: testaccount
password:11111111
