1. # Task-Manager
Task Manager is a simple application that allows users to manage their tasks.

2. Features included
a.) User authentication (Sign up and Log in).
b.) CRUD operations on tasks (Create, Read, Update, Delete).
c.) Fetching overdue tasks by status(not completed ones will be fetched).

3.) Technologies Used
Front end  language: React
Backend Api and logic: Ruby on Rails
Database: PostgreSQL


Steps to run locally.

Node should be  installed.
1.Open React/my-app then npm install 
2.In the same path  i.e in React/my-app type npm start (runs in port 4000 (http://localhost:4000/))
3.Open cmd for  task_management folder and type bundle install .
4.In the same cmd do rails s (runs in localhost:3000)
5.Install postgress 11 or 12 


For Pgadmin table
tables created are user, task
1.) Open the task_management folder
2.) Give rails db:create 
3.) Give rails db:migrate


In the project there is are there buttons 
1.Create Task for creating task 
2.Logout button for loging out the user.
3.Overdue task for  listing out the overdue tasks in the list

Note(envornment varibales should be set for the following)
Examples
C:\Ruby30-x64\bin
C:\Users\user\AppData\Roaming\npm
C:\Program Files\Git\bin
C:\Program Files\PostgreSQL\12\bin







