import { auth, db } from './firebaseConfig'; // Ensure this path is correct
import { ref, set, remove } from "firebase/database";

// Function to generate a new key and store it in Firebase
export async function generateKey() {
  const newKey = Math.random().toString(36).substr(2, 10); // Generate a random 10-character key
  const userId = auth.currentUser ? auth.currentUser.uid : 'guest_user'; // Use the current user's ID

  try {
    // Save the key to Firebase under the user's ID
    await set(ref(db, 'keys/' + userId), newKey);
    console.log('Key generated and saved:', newKey);
    return newKey; // Return the generated key
  } catch (error) {
    console.error('Error saving key:', error);
    return null; // Return null if there is an error
  }
}

// Function to delete a key from Firebase
export async function deleteKey() {
  const userId = auth.currentUser ? auth.currentUser.uid : 'guest_user';
  try {
    await remove(ref(db, 'keys/' + userId));
    console.log('Key deleted successfully');
  } catch (error) {
    console.error('Error deleting key:', error);
  }
}
