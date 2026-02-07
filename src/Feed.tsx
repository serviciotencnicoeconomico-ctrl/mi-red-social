import { useEffect, useState } from "react";

type Comment = {
  user: string;
  text: string;
};

type Post = {
  id: number;
  url: string;
  type: "image" | "video";
  likes: string[];
  comments: Comment[];
  author: string;
  authorPhoto: string;
  authorEmail: string;
};

export default function Feed({
  profile,
  goProfile,
  openProfile,
}: {
  profile: any;
  goProfile: () => void;
  openProfile: (user: any) => void;
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [commentText, setCommentText] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const saved = localStorage.getItem("posts");
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  function savePosts(newPosts: Post[]) {
    setPosts(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
  }

  function toggleLike(id: number) {
    const updated = posts.map((p) => {
      if (p.id !== id) return p;

      const liked = p.likes.includes(profile.email);

      return {
        ...p,
        likes: liked
          ? p.likes.filter((e) => e !== profile.email)
          : [...p.likes, profile.email],
      };
    });

    savePosts(updated);
  }

  function addComment(id: number) {
    if (!commentText[id]) return;

    const updated = posts.map((p) =>
      p.id === id
        ? {
            ...p,
            comments: [
              ...p.comments,
              { user: profile.username, text: commentText[id] },
            ],
          }
        : p
    );

    setCommentText({ ...commentText, [id]: "" });
    savePosts(updated);
  }

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: 10 }}>
      <button onClick={goProfile}>👤 Mi perfil</button>

      {posts.map((post) => {
        const liked = post.likes.includes(profile.email);

        return (
          <div
            key={post.id}
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 12,
              marginTop: 20,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            {/* 👤 AUTOR */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 10,
                cursor: "pointer",
              }}
              onClick={() =>
                openProfile({
                  username: post.author,
                  photo: post.authorPhoto,
                  email: post.authorEmail,
                })
              }
            >
              <img
                src={post.authorPhoto}
                width={36}
                height={36}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: 10,
                }}
              />
              <strong>@{post.author}</strong>
            </div>

            {/* 🖼 IMAGEN / VIDEO */}
            {post.type === "video" ? (
              <video
                src={post.url}
                controls
                style={{
                  width: "100%",
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              />
            ) : (
              <img
                src={post.url}
                style={{
                  width: "100%",
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              />
            )}

            {/* ❤️ LIKES */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                onClick={() => toggleLike(post.id)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 22,
                  cursor: "pointer",
                }}
              >
                {liked ? "❤️" : "🤍"}
              </button>
              <span>{post.likes.length} likes</span>
            </div>

            {/* 💬 COMENTARIOS */}
            <div style={{ marginTop: 10 }}>
              {post.comments.map((c, i) => (
                <p key={i}>
                  <strong>{c.user}:</strong> {c.text}
                </p>
              ))}

              <input
                placeholder="Agregar comentario..."
                value={commentText[post.id] || ""}
                onChange={(e) =>
                  setCommentText({
                    ...commentText,
                    [post.id]: e.target.value,
                  })
                }
              />
              <button onClick={() => addComment(post.id)}>Enviar</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
