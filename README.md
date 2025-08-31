# Book-Finder
Book Finder
Book Finder is a small web app I built to make searching for books quick and simple. It uses React with TypeScript, Tailwind CSS for styling, and the Open Library API to fetch book data. The main goal was to keep it clean, responsive, and easy to use.
What it does
* Lets you search for books by title
* Shows up to 20 results with cover image, title, author, and first published year
* Works smoothly on desktop and mobile
* Handles loading and error states so the user always knows what’s happening
 How it’s built
* React + TypeScript for structure and reliability
* Tailwind CSS for fast, modern styling
* Vite as the build tool for quick development
* Open Library API as the data source
Example API call:
```
https://openlibrary.org/search.json?title=harry+potter
```
Running the project
1. Install dependencies with `npm install`
2. Start the dev server with `npm run dev`
3. Build for production with `npm run build`
Ideas for the future
* Search by author or ISBN
* Add pagination 
* Save favorite books locally
* Show more details like subjects and descriptions
 Why this app
The app was designed with a persona called Alex, a college student who often needs to look up books for both study and leisure. With Alex in mind, the interface is uncluttered and focused on giving quick, useful results.
 Book Finder is a simple project, but it shows how to combine clean code, API integration, and user-friendly design into something useful.
