import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot, doc } from 'firebase/firestore';
import { auth, usersRef } from '../Firebase';

export default function useUserData() {
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      (async () => {
        if (!user) {
          setName(undefined);
          setProfilePic(undefined);
          return;
        }

        onSnapshot(doc(usersRef, user.uid), doc => {
          const data = doc.data();

          setName(data.name);
          setProfilePic(data.image);
        });
      })();
    });
  }, []);

  return [name, profilePic];
}
