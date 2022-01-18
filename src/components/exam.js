import React, { useState, useEffect } from 'react';
import Result from './result.js';
import Fuse from 'fuse.js';

export default function Exam(props) {
    props.setHeaderMode('search');

    const [result,setResult] = useState("");
    const [fuse,setFuse] = useState("");
    const [allQuestions,setAllQuestions] = useState([]);

    const fetchAllDatasets = async () => {    
        return Promise.all(props.datasets.map(url => fetch(url)))
        .then(responses => Promise.all(responses.map(dataset => dataset.json())))
      };
    
      const initFuse = () => {
        fetchAllDatasets()
    
        .then((datasets) => {
          var allques = [];
          datasets.forEach(dataset => dataset.questions.forEach(question => allques.push(question)));
          setAllQuestions(allques);
    
          setFuse(new Fuse(allques, {
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
      });

    return (
        <>
        { result && result.map((res, index) => <Result key={index} res={res}/>) }
        </>
    )
}