import { auth, db, signOut } from './firebaseConfig'; // Adjust the path based on your file structure
import { ref, set, remove, onValue } from "firebase/database";

// Function to generate a new key and store it in Firebase
export function generateKey() {
  const newKey = Math.random().toString(36).substr(2, 10); // Generate a random 10-character key
  const userId = auth.currentUser ? auth.currentUser.uid : 'guest_user'; // Use the current user's ID

  // Save the key to Firebase under the user's ID
  set(ref(db, 'keys/' + userId), newKey)
    .then(() => {
      console.log('Key generated and saved:', newKey);
      alert('Key generated: ' + newKey);
    })
    .catch((error) => {
      console.error('Error saving key:', error);
    });
}

// Function to delete a key from Firebase
export function deleteKey() {
  const userId = auth.currentUser ? auth.currentUser.uid : 'guest_user';
  remove(ref(db, 'keys/' + userId))
    .then(() => {
      console.log('Key deleted successfully');
      alert('Key deleted');
    })
    .catch((error) => {
      console.error('Error deleting key:', error);
    });
}

// Function to monitor real-time changes and auto-logout if the key is deleted
export function monitorKeyDeletion() {
  const userId = auth.currentUser ? auth.currentUser.uid : 'guest_user';
  const userKeyRef = ref(db, 'keys/' + userId);

  onValue(userKeyRef, (snapshot) => {
    if (!snapshot.exists()) {
      alert('Your key has been deleted. Logging out...');
      signOut(auth).catch(error => console.error('Sign-out error:', error));
    }
  });
}
