const url = 'https://sv443.net/jokeapi/v2';


export const getJoke = (text) => {
    const category = 'Any';
    const format = 'json';
    const type = 'single';
    const jokeUrl = `${url}/joke/${category}?contains=${text}&format=${format}}&idRange=0-185&type=${type}`;
    return fetch(jokeUrl).then(res => res.json());
};

export const getRandomJoke = () => {
    const category = 'Any';
    const format = 'json';
    const type = 'single';
    const jokeUrl = `${url}/joke/${category}?&format=${format}}&type=${type}`;
    return fetch(jokeUrl).then(res => res.json());
};