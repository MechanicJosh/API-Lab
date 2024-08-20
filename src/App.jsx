import React, { useEffect, useState } from 'react';


const App = () => {

    const [films, setFilms] = useState([]);
    const [showFilms, setShowFilms] = useState(false);

    const [people, setPeople] = useState([]);
    const [showPeople, setShowPeople] = useState(false);

    const [areButtonsVisible, setAreButtonsVisible] = useState(true);
    
    useEffect(() => {
        fetch('https://api-ghibli.herokuapp.com/films')
        .then(res => res.json())
        .then(allFilms => setFilms(allFilms))
        .catch(error => console.error(`error fetching films ${error}`));
    },[]);

    useEffect(() => {
        fetch('https://api-ghibli.herokuapp.com/people')
        .then(res => res.json())
        .then(allPeople => setPeople(allPeople))
        .catch(error => console.error(`error fetching people ${error}`));
    },[]);

    const loadFilms = () => {
        setShowFilms(true);
        hideButton();
    };

    const loadPeople = () => {
        setShowPeople(true);
        hideButton();
    };

    const hideButton = () => {
        setAreButtonsVisible(false);
    }

    return (
        <div>
            <h1 className='d-flex justify-content-center mt-3' >Studio Ghibli</h1>
            <div className='d-flex justify-content-center mt-5'>
                {areButtonsVisible && (
                    <div> 
                      <button className='btn-primary rounded mr-3' onClick={loadFilms}>Load Films</button>
                      <button className='btn-primary rounded' onClick={loadPeople}>Load People</button>
                    </div>
                )}
                {showFilms && (
                    <div>
                        <h2 className='d-flex justify-content-center mb-5'>Films</h2>
                        <div className='row justify-content-center'>
                            {films.map(film => (
                                <div className='col-md-8' key={`user-id-${film.id}`}>
                                    <div className="card shadow my-2">
                                        <div className="card-body">
                                            <h4 className='card-title'>{film.title}</h4>
                                            <p>{film.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                  {showPeople && (
                    <div>
                        <h2 className='d-flex justify-content-center mb-5'>People</h2>
                        <div className='row justify-content-center'>
                        {people.map(person => (
                            <div className='col-md-5' key={`user-id-${person.id}`}>
                                <div className="card shadow my-2">
                                    <div className="card-body">
                                        <h3 className='card-title'>{person.name}</h3>
                                        <h5>{person.gender}</h5>
                                        <h5>{person.age} Years Old</h5>
                                        <h5>Hair Color: {person.hair_color}</h5>
                                        <h5>Eye Color: {person.eye_color}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;