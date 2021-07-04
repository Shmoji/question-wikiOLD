/* We’ll use this to set and delete the Authorization header for our axios requests 
 * depending on whether a user is logged in or not (remember in Part 1 how we set an 
 * Authorization header in Postman when testing our private api route?)...
 * I do not remember this */

import client from "./client";

const setAuthToken = token => {
  if (token) {
    // Apply authorization token to every request if logged in
    client.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete client.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;