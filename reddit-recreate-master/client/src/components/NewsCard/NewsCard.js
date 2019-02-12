import React from 'react'
import PropTypes from 'prop-types'

const NewsCard = ({ news, display }) => (
  
  <div className={`news-card shadow ${display ? 'show' : 'hide'}`}>
    <div className="author-image">
      { news.data != null ?  
        news.data.thumbnail.trim() === "" ? null : <img src={news.data.thumbnail} alt={`${news.data.author} thumbnail`} /> : null
      }
    </div>
    <div className="news-body">      
      <div className="news-header">
        <h5 className="news-author">Posted by <span>{
          news.data != null ? news.data.author : null }&nbsp;&nbsp;{ news.data != null ? news.data.created_diff : null }</span></h5>
      </div>
      <div className="news-info">
        <a className="news-title" href={`https://www.reddit.com${ news.data != null ? news.data.permalink : null }`} >{ news.data != null ? news.data.title : null}</a>
        <p><a className="news-url" href={ news.data != null ? news.data.url : null }>{ news.data != null ? news.data.url_short : null}</a></p>        
      </div>
    </div>
  </div>
)

NewsCard.propTypes = {
  news: PropTypes.object.isRequired,
  display: PropTypes.bool.isRequired
}

NewsCard.defaultProps = {
  news: {},
  display: false
}

export default NewsCard
