import { useEffect, useState} from 'react';
import axios from 'axios';

// originally wrote to handle all axios requests, probably doesnt work well with post/put/delete
// TODO: rewrite hook to handle those methods
const useAxios = (url, method) => {  
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
  
        axios({
            method,
            url,
            })
        .then((response) => {
            setData(response.data);
            setLoading(false);
            setError(null);
        }).catch((e) => {
            setLoading(false);
            setError(`Error performing ${method} to ${url}: ${e}`);
        });
      };

      fetchData();
    }, [url, method]);
    return { data, loading, error };

}

export { useAxios };