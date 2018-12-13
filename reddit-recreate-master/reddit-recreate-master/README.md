# Simple realtime react reddit recreataion.

This project is a simple realtime reddit site using react.js.

## Installation

Open a new terminal to the reddit-recreate directory

cd reddit-recreate to move project(server.js path)

```
npm install
npm start
```

cd reddit-recreate/client to move client path

```
npm install
npm start
```

then, you see app running at localhost:3000.

If you want the test, might type as following.

cd reddit-recreate/client to move client path
yarn(or npm) test


## Program function

 - a subreddit viewer that displays a list of posts in any subreddit, 25 at a time
 - Each news post include the news title, a link to the news, a thumbnail if it exists,
the author who posted news, time submitted, and a link to the comments on reddit.
 - The viewer automatically refresh the data every minute without losing
position of the page.

In other words, Though you don't refresh, you can see refreshed news at realtime. 

## Important Schemas:
There are 3 important components.
  - App - api part to process and response the user's request.
  - NewsList - display news list.
  - NewsCard - a news post.
 
## Rendering of view
The App component fetch news datas from reddit for user request using reddit api, and transmit news list to NewsList component.
The NewsList component create and display the list of NewsCard according to given news list.
Finally. The App component render NewsCard(news) list created by NewsList.

## Realtime change of screen
The App component fetch news datas equal to current news's count from reddit every minutes.
These is saved to state value for news list.
While the React components observate the state values, if the state is changed,  automatically refresh the screen by it's reactive function.


