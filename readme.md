To create the MERN backend architecture and API endpoints for the Japanese Vocabulary Learning App based on the provided requirements, I will draft a scalable and modular design. It will include the following:

API Endpoints

1. Authentication
   POST /api/auth/register
   Registers a new user.

Body: { name, email, photo, password }
POST /api/auth/login
Logs in a user.

Body: { email, password } 2. User Management (Admin)
GET /api/users
Retrieve all users. (Admin only)

PATCH /api/users/:id/role
Update a user’s role.

Body: { role } 3. Lessons
GET /api/lessons
Retrieve all lessons.

POST /api/lessons
Create a new lesson. (Admin only)

Body: { name, number }
PATCH /api/lessons/:id
Update a lesson. (Admin only)

Body: { name, number }
DELETE /api/lessons/:id
Delete a lesson. (Admin only)

4. Vocabularies
   GET /api/vocabularies
   Retrieve all vocabularies, with optional filtering by lesson number (lessonNo query).

POST /api/vocabularies
Add a new vocabulary. (Admin only)

Body: { word, pronunciation, whenToSay, lessonNo, adminEmail }
PATCH /api/vocabularies/:id
Update vocabulary details. (Admin only)

Body: { word, pronunciation, meaning, whenToSay, lessonNo }
DELETE /api/vocabularies/:id
Delete a vocabulary. (Admin only)

5. User Features
   GET /api/user/lessons
   Retrieve lessons available to the user.

GET /api/user/vocabularies/:lessonNo
Retrieve vocabularies for a specific lesson, with pagination.

GET /api/user/tutorials
Retrieve embedded tutorial links.

6. Additional Features
   GET /api/user/profile
   Retrieve the logged-in user's profile.

PATCH /api/user/profile
Update user profile.

Body: { name, photo }
Middleware
authMiddleware.js: Protects routes, checks user roles.
errorHandler.js: Centralized error handling.
