export default class Posts {
  save(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
  }

  load() {
    const allPosts = JSON.parse(localStorage.getItem('posts'));
    return allPosts;
  }
}
