import React, { Component } from 'react'
import NewsList from './components/NewsList/NewsList'
import throttle from 'lodash.throttle'
import logo from './logo.png'; 

import './App.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      limit: 25,
      after_news: "",
      newsList: [],     
      loading: false,
      intervalID: 0,
      news_count: 0
    }
    this.handleScroll = throttle(this.handleScroll, 300)
  }

  componentDidMount = () => {
    document.addEventListener('scroll', this.handleScroll)
    this.fetchNews(this.state.after_news)

    let self = this;
    let timer_id = setInterval(function(){      
      self.fetchPeriod();
    }, 60 * 1000);

    this.setState({intervalID: timer_id});
  }

  fetchPeriod = async() => {
    this.setState({ loading: true })
    let count = this.state.news_count;
    let api_path = "https://www.reddit.com/r/news.json?limit=" + count;

    const res = await fetch(api_path)
    const parseRes = await res.json()

    let curDate = new Date(); 
    let curTimestamp = curDate.getTime() / 1000;
   
    for(let i = 0; i < parseRes.data.children.length; i++){                   
      let created_utc = parseRes.data.children[i].data.created_utc;      
      parseRes.data.children[i].data.created_diff = this.timeDifference(curTimestamp, created_utc);  

      let url = parseRes.data.children[i].data.url;
      
      url = url.indexOf("https://www.") > -1 ? url.replace("https://www.", "") : url;
      url = url.indexOf("https://") > -1 ? url.replace("https://", "") : url;
      url = url.indexOf("http://") > -1 ? url.replace("http://", "") : url;
      url = url.indexOf("www.") > -1 ? url.replace("www.", "") : url;

      let pos = url.indexOf("/");      
      parseRes.data.children[i].data.url_short = url.substring(0, pos) + url.substring(pos, pos + 7) + "...";
    }

    this.setState(prevState => ({    
      after_news: parseRes.data.after,  
      newsList: parseRes.data.children,
      loading: false,
      news_count: count
    }))

  }

  componentWillUnmount = () => {
    document.removeEventListener('scroll', this.handleScroll)

    clearInterval(this.state.intervalID);
  }

  timeDifference = (timestamp1, timestamp2) => {
    let difference = timestamp1 - timestamp2;

    let daysDifference = Math.floor(difference/60/60/24);
    difference -= daysDifference*1000*60*60*24

    let hoursDifference = Math.floor(difference/60/60);
    difference -= hoursDifference*1000*60*60

    let minutesDifference = Math.floor(difference/60);
    difference -= minutesDifference*1000*60

    let secondsDifference = Math.floor(difference);

    if(daysDifference > 0) {    
      return daysDifference + " days ago"
    }else if(hoursDifference > 0) {
      return hoursDifference + " hours ago"
    }else if(minutesDifference > 0) {
      return minutesDifference + " minutes ago"
    }else if(secondsDifference > 0) {
      return secondsDifference + " seconds ago"
    }
     return ""
  }

  fetchNews = async after_news => {
    this.setState({ loading: true })

    let after = this.state.after_news === "" ? "" : "&after=" + this.state.after_news;
    let api_path = "https://www.reddit.com/r/news.json?limit=" + this.state.limit + after;

    const res = await fetch(api_path)
    const parseRes = await res.json()

    let curDate = new Date(); 
    let curTimestamp = curDate.getTime() / 1000;
   
    for(let i = 0; i < parseRes.data.children.length; i++){                   
      let created_utc = parseRes.data.children[i].data.created_utc;      
      parseRes.data.children[i].data.created_diff = this.timeDifference(curTimestamp, created_utc);  

      let url = parseRes.data.children[i].data.url;
      
      url = url.indexOf("https://www.") > -1 ? url.replace("https://www.", "") : url;
      url = url.indexOf("https://") > -1 ? url.replace("https://", "") : url;
      url = url.indexOf("http://") > -1 ? url.replace("http://", "") : url;
      url = url.indexOf("www.") > -1 ? url.replace("www.", "") : url;

      let pos = url.indexOf("/");      
      parseRes.data.children[i].data.url_short = url.substring(0, pos) + url.substring(pos, pos + 7) + "...";
    }
    let count = this.state.news_count + 25;
    this.setState(prevState => ({
      after_news: parseRes.data.after,
      newsList: [...prevState.newsList, ...parseRes.data.children],
      loading: false,
      news_count: count
    }))

  }

  handleScroll = () => {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 550) {
      if (!this.state.loading) {
        this.fetchNews(this.state.after_news)
      }
    }
  }

  render() {
    return (
      <div className="App">       
        <div className="header">
          <img src={logo} alt="logo" />
        </div>
        <div className="container">         
          <NewsList {...this.state} />
        </div>
      </div>
    )
  }
}
