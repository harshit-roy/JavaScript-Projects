const apikey = '0c74e5054d58424a944e1525c90f2925';

const blogContainer = document.getElementById("blog-container");

const searchField = document.getElementById("search-input");
const button = document.getElementById("search-button");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apikey=${apikey}`
        const response = await fetch(apiUrl)
        const data = await response.json();
        return data.articles
    }
    catch (error) {
        console.error("Error Fetching News",error)
        return []
    }
}

button.addEventListener("click", async () => {
    const query = searchField.value.trim()
    if (query !== "")
    {
        try {
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)
        } catch(error) {
            console.log("Error fetching news by query",error)
        }
        }
})
async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`
        const response = await fetch(apiUrl)
        const data = await response.json();
        return data.articles
    }
    catch (error) {
        console.error("Error Fetching News",error)
        return []
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = ""
    articles.forEach((articles) => {
        const blogcard = document.createElement("div")
        blogcard.classList.add("blog-card");
        const img = document.createElement("img")
        img.src = articles.urlToImage
        img.alt = articles.title
        const title = document.createElement("h2")
        const truncatedtitle = articles.title.length > 30 ?
            articles.title.slice(0, 30) + "..." : articles.title;
        title.textContent = truncatedtitle
        const description = document.createElement("p")
        const truncateddesp = articles.description.length > 30 ?
            articles.description.slice(0, 100) + "..." : articles.description;
        description.textContent = truncateddesp
        blogcard.appendChild(img)
        blogcard.appendChild(title)
        blogcard.appendChild(description)
        blogContainer.appendChild(blogcard)
        blogcard.addEventListener("click", () => {
            window.open(articles.url, "_blank");
        });
    });
}


(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles)
    }
    catch (error) {
        console.error("Error Fetching News", error)
    }
})();