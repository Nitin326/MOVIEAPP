import React,{useState,useEffect} from 'react';
import "./Search.css"
import {
  Button,
  createMuiTheme,
  Tabs,
  Tab,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import CustomPagination from "../../components/Pagination/Custompagination";
import SingleContent from "../../components/Singlecontent/Singlecontent";





function Search() {

  const darkTheme = createMuiTheme ({
    palette:{
      type:"dark",
      primary:{
        main:"#fff",
      },
    },
  })

  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();


  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=43fcf06b3a8055aefc5d265cde17b06f&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);



    return (
  
      <div>
        <ThemeProvider theme= {darkTheme}>
          <div style= {{display:"flex", margin:"15px 0"}}>
           <TextField 
           style = {{flex:1}} 
           className = "searchbox" 
           label="Search" 
           onChange ={(e) => setSearchText(e.target.value)}
           />
           <Button variant ="contained" style= {{marginleft:10}} onClick={fetchSearch} ><SearchIcon/> </Button>
           </div>

           <Tabs value = {type} 
           indicatorColor= 'primary' 
           textcolor='primary'
           onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
           >
           <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
           </Tabs>
           </ThemeProvider>


           <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
      
    );
  }
  
  export default Search;
  