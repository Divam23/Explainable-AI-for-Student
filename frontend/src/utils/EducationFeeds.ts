type educationFeeds = {
    name:string,
    url:string,
    category:string

}

const educationFeeds:educationFeeds[] = [
  {
    name: "EdWeek",
    url: "https://www.edweek.org/feed",
    category: "Education News"
  },
  {
    name: "Edutopia",
    url: "https://www.edutopia.org/rss.xml",
    category: "Teaching & Learning"
  },
  {
    name: "The Hechinger Report",
    url: "https://hechingerreport.org/feed/",
    category: "Student Success"
  },
  {
    name: "Mind/Shift",
    url: "https://www.kqed.org/mindshift/rss",
    category: "Learning Science"
  },
  {
    name: "James Clear",
    url: "https://jamesclear.com/feed",
    category: "Habits & Performance"
  },
  {
    name: "Inside Higher Ed",
    url: "https://www.insidehighered.com/rss/all-news",
    category: "Higher Education"
  }
];

export {educationFeeds}