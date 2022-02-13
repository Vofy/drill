import React, { useState, useEffect } from 'react';
import Result from './result.js';
import Fuse from 'fuse.js';

export default function Exam(props) {
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
      setAllQuestions(dataset.questions);
      setFuse(new Fuse(dataset.questions, {
        isCaseSensitive: false,
        includeScore: true,
        minMatchCharLength: 0,
        shouldSort: true,
        findAllMatches: true,
        ignoreLocation: true,
        keys: [{ name: 'question', weight: 2 }, 'answers.correct']
      }));
    })
    
    .catch(function(err) {
      console.log(`Error: ${err}`)
    });
  }

    useEffect(() => {
  
      const Search = async () => {
        if (fuse && allQuestions) {
          if (props.searchedString === "") {
            let mappedArray = [];
            allQuestions.forEach(question => mappedArray.push({ item: question }));
            setResult(mappedArray);
          } else {
            setResult(fuse.search(props.searchedString));
          }
  
          props.contentRef.current.scrollTo(0, 0);
        }
      };

      Search();
      
    }, [fuse, props.searchedString]);

    useEffect(() => {
      initFuse();
      props.setMode('search');
    }, []);
    return (
        <>
        { result && result.map((res, index) => <Result key={index} res={res}/>) }
        </>
    )
}