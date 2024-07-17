import React, { useState } from 'react'
import { Row, Button } from 'react-bootstrap'
import RoomCard from './RoomCard'
import RoomPaginator from './RoomPaginator'

const RoomSearchResult = ({ results, onClearSearch }) => {
  // State to keep track of the current page
  const [currentPage, setCurrentPage] = useState(1)
  
  // Define how many results to show per page
  const resultsPerPage = 3
  
  // Calculate total number of results and pages
  const totalResults = results.length
  const totalPages = Math.ceil(totalResults / resultsPerPage)

  // Function to handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * resultsPerPage
  const endIndex = startIndex + resultsPerPage
  
  // Slice the results array to get only the results for the current page
  const paginatedResults = results.slice(startIndex, endIndex)

  return (
    <>
      {results.length > 0 ? (
        <>
          <h5 className="text-center mt-5">Search Results</h5>
          <Row>
            {/* Map through the paginated results and render a RoomCard for each */}
            {paginatedResults.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </Row>
          <Row>
            {/* Only show the paginator if there are more results than can fit on one page */}
            {totalResults > resultsPerPage && (
              <RoomPaginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
            {/* Button to clear the search results */}
            <Button variant="secondary" onClick={onClearSearch}>
              Clear Search
            </Button>
          </Row>
        </>
      ) : (
        // If there are no results, render an empty paragraph
        <p></p>
      )}
    </>
  )
}

export default RoomSearchResult