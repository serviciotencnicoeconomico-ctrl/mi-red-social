import { useState } from "react";

export default function Profile({
  profile,
  viewedProfile,
  setProfile,
  goFeed,
  logout,
}: any) {
  const user = viewedProfile || profile;
  const isOwnProfile = profile.email === user.email;

  const [photo, setPhoto] = useState(user.photo || "");
  const [file, setFile] = useState<File | null>(null);

  function getFollowers(email: string): string[] {
    const saved = localStorage.getItem("followers_" + email);
    return saved ? JSON.parse(saved) : [];
  }

  function saveFollowers(email: string, followers: string[]) {
    localStorage.setItem("followers_" + email, JSON.stringify(followers));
  }

  const followers = getFollowers(user.email);
  const isFollowing = followers.includes(profile.email);

  function toggleFollow() {
    const updated = isFollowing
      ? followers.filter((e) => e !== profile.email)
      : [...followers, profile.email];

    saveFollowers(user.email, updated);
  }

  function savePhoto() {
    const updated = { ...profile, photo };
    localStorage.setItem("profile", JSON.stringify(updated));
    setProfile(updated);
  }

  function publish() {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const posts = JSON.parse(localStorage.getItem("posts") || "[]");

      posts.unshift({
        id: Date.now(),
        url: reader.result,
        type: file.type.startsWith("video") ? "video" : "image",
        author: profile.username,
        authorEmail: profile.email,
        authorPhoto: profile.photo,
        likes: [],
        comments: [],
      });

      localStorage.setItem("posts", JSON.stringify(posts));
      goFeed();
    };

    reader.readAsDataURL(file);
  }

  const allPosts = JSON.parse(localStorage.getItem("posts") || "[]");
  const userPosts = allPosts.filter((p: any) => p.authorEmail === user.email);

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: 10 }}>
      {/* PERFIL */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <img
          src={user.photo || "https://via.placeholder.com/100"}
          width={100}
          height={100}
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />
        <h2>@{user.username}</h2>
        <p>{followers.length} seguidores</p>

        {!isOwnProfile && (
          <button onClick={toggleFollow}>
            {isFollowing ? "Dejar de seguir" : "Seguir"}
          </button>
        )}
      </div>

      {/* PUBLICAR */}
      {isOwnProfile && (
        <>
          <input
            placeholder="Foto de perfil (URL)"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
          <button onClick={savePhoto}>Guardar foto</button>

          <hr />

          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <button onClick={publish}>Publicar</button>
        </>
      )}

      <hr />

      {/* GRILLA */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 6,
        }}
      >
        {userPosts.map((p: any) =>
          p.type === "video" ? (
            <video
              key={p.id}
              src={p.url}
              style={{ width: "100%", borderRadius: 6 }}
            />
          ) : (
            <img
              key={p.id}
              src={p.url}
              style={{
                width: "100%",
                aspectRatio: "1/1",
                objectFit: "cover",
                borderRadius: 6,
              }}
            />
          )
        )}
      </div>

      <hr />

      <button onClick={goFeed}>⬅ Volver al feed</button>
      {isOwnProfile && <button onClick={logout}>🚪 Cerrar sesión</button>}
    </div>
  );
}
