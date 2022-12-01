import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, getUserDoc } from '../Firebase';

export default function useUserData() {
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      (async () => {
        const userDoc = await getUserDoc(user.displayName);

        if (userDoc) {
          const data = userDoc.data();

          setName(data.name);
          setProfilePic(data.image);
        } else {
          setName(user?.displayName);
          setProfilePic(user?.photoURL);
        }
      })();
    });
  }, []);

  return [name, profilePic];
}
