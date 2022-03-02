# new-project
Flow of the app:
On app loading, the user is directed to home page from where he is asked to log in if he is not logged in yet.
If the user is new, he can register for new account.
The registration form is provided with all the validations including file upload which takes in only png or jpeg images.
The login form is provided with all the validations too.
 Once the user is logged in, he can view all the users signed in on the app.
 But he can edit or delete his/her own info only. Once the user delete his own info, he is logged out of the appy, since he is no longer a part of database.
The user can search himself or other users using the search bar provided at the top, which searches by username or user interest.
Pagination is provided at the bottom of page to navigate through all records. The top of the page displays the page number.
Both, Pagination and Search bar are implemented end to end.
user's password is first hashed and then it is stored in the database, so it is known to him/her only.
All the important routes such as get all users, edit user and delete user are protected using JWT authentication. Only signed in users can access these routes.
The data for 50 users is provided in backend/data/users.json
