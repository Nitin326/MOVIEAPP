import { useEffect, useState } from "react";
import axios from 'axios';
import './Trending.css';
import Singlecontent from '../../components/Singlecontent/Singlecontent.js';
import Custompagination from "../../components/Pagination/Custompagination.js";

function Trending() {

const [page, setPage] = useState(1);
const [content, setContent] = useState([]);

const fetchtrending = async () => {
  const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=43fcf06b3a8055aefc5d265cde17b06f&page=${page}`);

  console.log(data);
  setContent(data.results);
}

useEffect (() => {
  fetchtrending();
   // eslint-disable-next-line
},[page]);
 
  return (

    <div>
        <span className="pageTitle">Trending</span>
        <div className = 'trending'>
          {
            content && content.map((c) => < Singlecontent 
            key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
              /> )}
        </div>
        <Custompagination setPage= {setPage}/>
    </div>
    
  );
}

export default Trending;
