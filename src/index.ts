import "./styles/main.scss";

let postsFetcher = fetch("https://jsonplaceholder.typicode.com/posts");

interface PostType {
  title: string,
  body: string,
  renderPost: () => void;
};

async function fetcher() {
  const posts: PostType[] = []
  const postsFetcher = await (await fetch("https://jsonplaceholder.typicode.com/posts")).json();
  posts.concat(postsFetcher);
  return posts;
}


const notesHTML = document.querySelector(".notes .row");
const addBtn = document.querySelector("#addBtn");
const modal = document.getElementById("modalId");

class Post implements PostType {
  public title: string;
  public body: string;

  constructor(title: string, body: string) {
    this.title = title;
    this.body = body;
  }

  public renderPost() {
    const post: HTMLDivElement = document.createElement("div");
    post.className = "col-md-4 col-sm-6 content-card";

    post.innerHTML = `
          <div
            class="card border border-2 border-dark p-4 card-just-text"
            data-background="color"
            data-color="blue"
            data-radius="none"
          >
            <div class="content">
              <h4 class="title">
              <a class="card-link" href="#">${this.title}</a>
              </h4>
              <p class="description">${this.body}</p>
            </div>
          </div>
        </div>`;

    notesHTML.appendChild(post);
  }
}

class PostsApp {
  public posts: PostType[] = [];
  constructor(posts: PostType[] = []) {
    this.posts = posts;
  }

  public async init() {
    const res = await fetcher();
    return new PostsApp(res);
  }

  public addNote(post: PostType | PostType[]): void {
    // Проверка на массив
    if (Array.isArray(post)) {
      this.posts = [...post];
    } else {
      this.posts.push(post);
    }
  }

  public renderAddNewNoteCars() {
    const card: HTMLDivElement = document.createElement("div");
    card.className = "col-md-4 col-sm-6 content-card";

    card.innerHTML = `
          <div
            class="card border border-2 border-dark p-4 card-just-text d-flex justify-content-center align-items-center "
            data-background="color"
            data-color="blue"
            data-radius="none"
            data-bs-toggle="modal" 
            data-bs-target="#modalId"
          >
            <div class="content">
              <h4 class="title text-primary ">
                Add new note
              </h4>
            </div>
          </div>
        </div>`;

    notesHTML.appendChild(card);
  }

  public renderNotes() {
    this.posts.forEach((post) => {
      post.renderPost();
    });
    this.renderAddNewNoteCars();
  }
}

const newNote = new Post(
  "Main title note",
  "Next we load the CSS and import Bootstraps JavaScript. Add the following to src/js/main.js to load the CSS and import all of Bootstraps JS. Popper will be imported automatically through Bootstrap."
);
const newNote2 = new Post(
  "Main title note 2",
  "Next we load the CSS and import Bootstraps JavaScript. Add the following to src/js/main.js to load the CSS and import all of Bootstraps JS. Popper will be imported automatically through Bootstrap."
);
const newNote3 = new Post(
  "Main title note 3",
  "Next we load the CSS and import Bootstraps JavaScript. Add the following to src/js/main.js to load the CSS and import all of Bootstraps JS. Popper will be imported automatically through Bootstrap."
);
const newNote4 = new Post(
  "Main title note 4",
  "Next we load the CSS and import Bootstraps JavaScript. Add the following to src/js/main.js to load the CSS and import all of Bootstraps JS. Popper will be imported automatically through Bootstrap."
);

const notes = new PostsApp();

console.log(notes.init);


addBtn.addEventListener("click", () => {
  const titleControl = <HTMLInputElement>(
    document.getElementById("titleControl")
  );
  const textControl = <HTMLTextAreaElement>(
    document.getElementById("textControl")
  );

  // notes.addNote(new Post(titleControl.value, textControl.value));
  notesHTML.innerHTML = "";
  titleControl.value = "";
  textControl.value = "";
  // notes.renderNotes();
});
