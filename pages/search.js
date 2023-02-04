import React, { useState, useEffect } from 'react';
import Result from 'components/search/result.js';
import Fuse from 'fuse.js';
import { useRecoilValue } from 'recoil';
import { searchedStringState } from 'pages/_state.js';

export default function Search(props) {

  const searchedString = useRecoilValue(searchedStringState);

  const [result,setResult] = useState([]);
  const [fuse,setFuse] = useState(null);
  const [allQuestions,setAllQuestions] = useState([]);

  const fetchDataset = async () => {   
    let dataset = await fetch(props.dataset);
    return dataset.json();
  };
    
  const initFuse = () => {
    fetchDataset()
    .then(dataset => {
      setAllQuestions(dataset.tasks);
      setFuse(new Fuse(dataset.tasks, {
        isCaseSensitive: false,
        includeScore: true,
        minMatchCharLength: 0,
        shouldSort: true,
        findAllMatches: true,
        ignoreLocation: true,
        keys: [{ name: 'title', weight: 2 }, 'answers.correct']
      }));
    })
    
    .catch(function(err) {
      console.log(`Error: ${err}`)
    });
  }

  let debouncer;
  const Search = async() => {
    clearTimeout(debouncer);
    if (fuse && allQuestions) {
      if (searchedString === "" ) {
        let mappedArray = [];
        allQuestions.forEach(question => mappedArray.push({ item: question }));
        setResult(mappedArray);
      } else
        setResult(fuse.search(searchedString));
    }

      props.contentRef.current.scrollTo(0, 0);
  }

  useEffect(() => {
    Search();
  }, [fuse, searchedString]);

  useEffect(() => {
    initFuse();
  }, []);
    
  return (<>
    { result && result.map((res, index) => <Result key={index} res={res}/>) }
  </>)
}