//!1. Authentication Controllers>
////      signup(req, res): Handles user registration.
//  //    login(req, res): Authenticates users and returns a JWT token.
//  //    logout(req, res): Logs users out by invalidating the session or JWT.
//  ?    refreshToken(req, res): Provides a new JWT using a refresh token.
//! 2. User Management Controllers
//   ?   getUserProfile(req, res): Retrieves the profile of a specific user.
//    ?  updateUserProfile(req, res): Allows the user to update their profile (username, bio,    avatar).
//   ?   searchUsers(req, res): Search for users by username or query.
//! 3. Channel/Room Controllers
//      createRoom(req, res): Creates a new chat room or server.
//              getRoomDetails(req, res): Fetches details of a specific room (members, description).
//      joinRoom(req, res): Adds a user to a specific room.
//      leaveRoom(req, res): Removes a user from a room.
//! 4. Messaging Controllers
//      sendMessage(req, res): Sends a message to a specific room.
//      getMessages(req, res): Retrieves a list of messages for a specific room, with pagination.
// pinMessage(req, res): Pins a message in a room for emphasis.
//! 5. Media Sharing Controllers
//      uploadMedia(req, res): Handles file uploads (images, videos, documents).
//      sendMediaMessage(req, res): Sends media messages in a room (links to uploaded files).
//! 6. WebSocket Event Handlers
//      handleJoinRoom(socket, data): Manages real-time room joining through WebSockets.
//      handleLeaveRoom(socket, data): Handles users leaving rooms via WebSockets.
//      handleSendMessage(socket, data): Sends real-time messages through WebSockets.
//      handleTypingStatus(socket, data): Broadcasts the typing status of users.
//      handleNewMessageBroadcast(socket, data): Broadcasts newly received messages to all room members.
//      handleMessageReadStatus(socket, data): Sends read receipts to users in a room.
//      handleUserJoinedNotification(socket, data): Notifies other users when a new user joins the room.
//      handleUserLeftNotification(socket, data): Notifies when a user leaves the room.
