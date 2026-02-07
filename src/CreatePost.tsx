import { useState } from "react";
import { savePost } from "./storage";

export default function CreatePost({ profile, onPost }: any) {
  const [image, setImage] = useState("");
  const [text, setText] = useState("");

  function publish() {
    if (!image) {
      alert("Ingresá una imagen");
      return;
    }

    savePost({
      id: Date.now(),
      username: profile.username,
      photo: profile.photo,
      image,
      text,
      likes: 0,
      likedBy: [],
    });

    setImage("");
    setText("");
    onPost();
  }

  return (
    <div>
      <input
        placeholder="URL de imagen"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <input
        placeholder="Texto (opcional)"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={publish}>Publicar</button>
    </div>
  );
}
