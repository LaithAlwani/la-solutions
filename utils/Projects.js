const react = "/icons/react.png";
const firebase = "/icons/firebase.png";
const mui = "/icons/mui.png";
const css = "/icons/css.png";
const next = "/icons/next.png"
// const express = "/icons/exjs.png";
// const bootstrap = "/icons/bootstrap.png";
// const mongo = "/icons/mongo.png";
// const node = "/icons/node.png";
// const javaScript = "/icons/javascript.png";
// const uikit = "/icons/uikit.png";
// const html = "/icons/html.png";


export const projects = [
  {
    id:1,
    title: "Score Renovations",
    pathname: "score-renovations",
    image: "/images/score.webp",
    description:
      "a construction company based in Ottawa ON.",
    technologies: [next, mui],
    appLink: "https://www.scorerenovation.com/",
    repoLink: "https://github.com/LaithAlwani/score-renovation",
  },
  {
    id:2,
    title: "Wealthy Planet",
    pathname: "wp",
    image: "/images/wp.webp",
    description: "Company website",
    technologies: [next, css],
    appLink: "https://wealthyplanet.com/",
    repoLink: "",
  },
  {
    id:3,
    title: "Chats 'R' Us",
    pathname: "chatsrus",
    image: "/images/chatsRUs.webp",
    description: "Real time chat app",
    technologies: [react, firebase, mui],
    appLink: "https://chats-r-us.firebaseapp.com/",
    repoLink: "https://github.com/LaithAlwani/react-ChatRUs",
  },
];

export const languages = [
  "HTML", "CSS", "JavaScript", "Node.js"
]

export const frameworks = [
  "React.js", "Next.js", "Material-UI",  "Bootstrap", "Tailwind", "Express.js", "Handlebars"
]

export const databases = ["MongoDB", "Firestore", "MySQL"]

export const devOps = ["Firebase", "Google Cloud"]
