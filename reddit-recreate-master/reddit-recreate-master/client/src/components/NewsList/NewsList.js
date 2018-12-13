import React from 'react'
import NewsCard from '../NewsCard/NewsCard'
import PropTypes from 'prop-types'

const NewsList = props => {
  const { newsList } = props  

  return (
    <div className="users-list">
      <ul>
        {newsList.map(news => 
          <NewsCard 
            key={news.data.id }
            news={news}
            display={true}            
          />
        )}
      </ul>
    </div>
  )
}

NewsList.propTypes = {
  newsList: PropTypes.array.isRequired  
}

NewsList.defaultProps = {
  newsList: []
}

export default NewsList
