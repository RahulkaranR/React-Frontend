import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export  const DataProvider = ({ children }) => {
    const [post, setPost] = useState([])
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { data, fetchError, isLoading } = useAxiosFetch("http://localhost:3500/posts");
    useEffect(() => {
        setPost(data);
    }, [data]) 
    useEffect(() => {
        const filteredResults = post.filter(post => ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()) || ((post.titlecolor).toLowerCase()).includes(search.toLowerCase())); 
        setSearchResults(filteredResults.reverse());
    }, [post, search])
    return (
        <DataContext.Provider value={{
            search, setSearch, searchResults, fetchError, isLoading,
             post, setPost
        }}>
            {children} 
        </DataContext.Provider>
    )
}

export default DataContext;
