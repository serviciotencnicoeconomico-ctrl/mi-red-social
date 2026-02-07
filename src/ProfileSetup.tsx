import { useState } from "react";
import { saveProfile } from "./storage";

export default function ProfileSetup({ onDone }: any) {
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState("");

  function createProfile() {
    if (!username) return alert("Poné un nombre");

    const profile = {
      username,
      photo: photo || "https://i.imgur.com/6VBx3io.png",
    };

    saveProfile(profile);
    onDone(profile);
  }

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h2>Crear perfil en BRHUNTUX</h2>

      <input
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="URL de foto (opcional)"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
      />

      <button onClick={createProfile}>Entrar</button>
    </div>
  );
}
