import { useEffect, useState } from "react";
import Feed from "./Feed";
import Profile from "./Profile";

import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

export default function App() {
  const [profile, setProfile] = useState<any>(null);
  const [view, setView] = useState<"login" | "feed" | "profile">("login");
  const [viewedProfile, setViewedProfile] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("profile");
    if (saved) {
      setProfile(JSON.parse(saved));
      setView("feed");
    }
  }, []);

  function loginWithGoogle() {
    signInWithPopup(auth, googleProvider).then((res) => {
      const user = res.user;

      const profileData = {
        username: user.displayName,
        photo: user.photoURL,
        email: user.email,
      };

      localStorage.setItem("profile", JSON.stringify(profileData));
      setProfile(profileData);
      setView("feed");
    });
  }

  function logout() {
    signOut(auth);
    localStorage.removeItem("profile");
    setProfile(null);
    setView("login");
  }

  if (view === "login") {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h2>BRHUNTUX</h2>
        <button onClick={loginWithGoogle}>Entrar con Google</button>
      </div>
    );
  }

  if (view === "feed") {
    return (
      <Feed
        profile={profile}
        goProfile={() => {
          setViewedProfile(null);
          setView("profile");
        }}
        openProfile={(user) => {
          setViewedProfile(user);
          setView("profile");
        }}
      />
    );
  }

  return (
    <Profile
      profile={profile}
      viewedProfile={viewedProfile}
      setProfile={setProfile}
      goFeed={() => setView("feed")}
      logout={logout}
    />
  );
}
