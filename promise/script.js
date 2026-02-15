// const fetchData = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const data = {
//         id: 1,
//         firstName: "Alexander",
//       };
//       reject(data);
//     }, 2000);
//   });
// };

// fetchData()
//   .then((data) => {
//     console.log("Полученные данные: ", data);
//   })

// const step1 = new Promise((res) =>
//   setTimeout(() => res("Шаг 1 выполнен"), 1000),
// );
// const step2 = new Promise((res) =>
//   setTimeout(() => res("Шаг 2 выполнен"), 2000),
// );
// const step3 = new Promise((res) =>
//   setTimeout(() => res("Шаг 3 выполнен"), 3000),
// );

// step1
//     .then((result) => {
//         console.log(result);
//         return step2;
//     })
//     .then((result) => {
//         console.log(result);
//         return step3;
//     })
//     .then((result) => {
//         console.log(result);
//         console.log("Все шаги выполнены!");
//     })
//     .catch((error) => console.error(error));

// const step4 = new Promise((_, rej) =>
//   setTimeout(() => rej("Шаг 4 сломался"), 3000),
// );

// Promise.all([step1, step2, step3)
//   .then((result) => {
//     console.log("[Promise.all]", result);
//   })
//   .catch((error) => console.error("[Promise.all] ошибка", error));

// const step4 = new Promise((_, rej) =>
//   setTimeout(() => rej("Шаг 4 сломался"), 3000),
// );

// Promise.allSettled([step1, step2, step3,step4])
//   .then((result) => {
//     console.log("[Promise.allSettled]", result);
//   })
//   .catch((error) => console.error("[Promise.allSettled] ошибка", error));

// ------------------- Fetch ------------------------

// fetch('https://jsonplaceholder.typicode.com/posts?_limit=10',{
//     method: "GET",
// })
//       .then(response => response.json())
//       .then(posts => renderPosts(posts))

// const renderPosts = (posts) => {
//   posts.forEach((post) => {
//     const postContainer = document.createElement("div");
//     const postTitle = document.createElement("h3");
//     const postBody = document.createElement("p");

//     postTitle.textContent = post.title;
//     postBody.textContent = post.body;

//     postContainer.append(postTitle, postBody);
//     document.body.append(postContainer);
//   });
// };

// --------------- Render Async, await --------------------

// const renderPostsAsync = async () => {

//     const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
//     const posts = await response.json();

//   posts.forEach((post) => {
//     const postContainer = document.createElement("div");
//     const postTitle = document.createElement("h3");
//     const postBody = document.createElement("p");

//     postTitle.textContent = post.title;
//     postBody.textContent = post.body;

//     postContainer.append(postTitle, postBody);
//     document.body.append(postContainer);
//   });
// };

// renderPostsAsync();

// ------------------try catch finally-------------

const renderPostsAsync = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=10",
    );
    const posts = await response.json();

    posts.forEach((post) => {
      const postContainer = document.createElement("div");
      const postTitle = document.createElement("h3");
      const postBody = document.createElement("p");

      postTitle.textContent = post.title;
      postBody.textContent = post.body;

      postContainer.append(postTitle, postBody);
      document.body.append(postContainer);
    });
  } catch (error) {
    console.log("Ошибка:", error.message);
  } finally {
    console.log("Finish")
  }
};

renderPostsAsync();
