import axios from 'axios';
import { useEffect, useState } from 'react';
import Singlecontent from '../../components/Singlecontent/Singlecontent.js';
import Custompagination from "../../components/Pagination/Custompagination.js";

function Movies() {

const [page, setPage] = useState(1);
const [content, setContent] = useState([]);
const [numofPages, setNumofPages] = useState([]);


const fetchMovies = async () => {
  const {data} = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=43fcf06b3a8055aefc5d265cde17b06f&page=${page}`);
  setContent(data.results);
  setNumofPages(data.total_pages);
}

useEffect (() =>{
  fetchMovies();
   // eslint-disable-next-line
},[page])

    return (
  
<div>
        <span className="pageTitle">Movies</span>
        
        <div className = 'trending'>
          {
            content && content.map((c) => < Singlecontent 
            key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
              /> )}
        </div>
        {numofPages > 1 &&(
        <Custompagination setPage= {setPage} numofPages = {numofPages}/>
        )}
    </div>
      
    );
  }
  
  export default Movies;
  