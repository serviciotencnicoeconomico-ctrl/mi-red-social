export function getProfile() {
  const data = localStorage.getItem("brhuntux_profile");
  return data ? JSON.parse(data) : null;
}

export function saveProfile(profile: any) {
  localStorage.setItem("brhuntux_profile", JSON.stringify(profile));
}

export function getPosts() {
  const data = localStorage.getItem("brhuntux_posts");
  return data ? JSON.parse(data) : [];
}

export function savePost(post: any) {
  const posts = getPosts();
  posts.unshift(post);
  localStorage.setItem("brhuntux_posts", JSON.stringify(posts));
}
