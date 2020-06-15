<script>
    import Joke from '../Joke/Joke.svelte';
    import { getJoke, getRandomJoke } from '../../services/joke-service.js';
    import { get, set, remove } from '../../services/local-storage-service.js';
    import { Constants } from '../../constants.js';

    let jokeList = new Set();
    let myJokes = new Set(get(Constants.KEY_SAVED_JOKES));
    let searchInput = '';
    let displayList = false;
    let displayMyList = false;
    let searching = false;

    const searchJoke = async () => {
        const text = searchInput;
        if (text === '') {
            console.log('texto vacio');
            return;
        }
        searching = true;
        const check = await getJoke(text);
        if (check.error) {
            console.log('error');
            searching = false;
            displayList = true;
            return;
        }
        for (let index = 0; index < 5; index++) {
            getJoke(text)
                .then(
                    res => {
                        if (res.error) {
                            console.log('se acabaron los chistes');
                            displayList = true;
                            searching = false;
                            return;
                        }
                        jokeList.add(res.joke);
                        jokeList = jokeList; // Svelte no actualiza la vista si no hay reasignación
                    },
                    error => {
                        console.log('error de request:');
                        console.log(error);
                        displayList = true;
                        searching = false;
                    }
                );
        }
        displayList = true;
        return true;
    };

    const randomJoke = () => {
        getRandomJoke()
            .then(
                res => {
                if (!res.error) {
                    displayList = true;
                    jokeList.add(res.joke);
                    jokeList = jokeList; // Svelte no actualiza la vista si no hay reasignación
                }
                },
                error => {
                    console.log(error);
                }
            );
    };

    const getSavedJokes = () => {
        displayMyList = true;
    };

    const clearSearch = () => {
        displayList = false;
        jokeList = new Set();
        searching = false;
        myJokes = new Set(get(Constants.KEY_SAVED_JOKES));
    };

    const exitMyList = () => {
        displayMyList = false;
        myJokes = new Set(get(Constants.KEY_SAVED_JOKES));
    };

    

</script>

<div>
    <h1>JokesOnYou</h1>

    <div class="header">
        <div class="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
            <a class="pure-menu-heading">JokesOnYou</a>

            <ul class="pure-menu-list">
                <li class="pure-menu-item pure-menu-selected"><a href="#" class="pure-menu-link">Home</a></li>
                <li class="pure-menu-item"><a class="pure-menu-link">About Us</a></li>
            </ul>
        </div>
    </div>

    <div class="splash-container">
        <div class="splash">
            <div class="pure-g">
                <div class="l-box-lrg pure-u-1 pure-u-md-2-5 submit-form">
                    {#if !displayList && !displayMyList}
                        <h1 class="content-head is-center">JokesOnYou</h1>
                        <div class="l-box-lrg pure-u-1 pure-u-md-2-5">
                            <form class="pure-form pure-form-stacked">
                                <fieldset>
                                    <label for="search"></label>
                                    <input type="text" id="search" required bind:value={searchInput} name={searchInput} placeholder="palabra en chiste" />
                                </fieldset>
                            </form>
                        </div>
                        <div class="inline">
                            <a on:click={searchJoke} class="pure-button pure-button-primary btn-fixed-size inline">Buscar chiste</a>
                            <a on:click={randomJoke} class="pure-button pure-button-primary btn-fixed-size inline">Chiste aleatorio</a>
                        </div>
                        <a on:click={getSavedJokes} class="pure-button pure-button-primary btn-fixed-size">Mis chistes</a>
                        <br>
                        <br>
                        <span>
                            <p class="splash-subhead">
                                Mas Información de la API de chistes en 
                            </p>
                            <a href="https://sv443.net/jokeapi/v2">
                                https://sv443.net/jokeapi/v2
                            </a>
                        </span>
                    {/if}
                    {#if displayList}
                        {#if jokeList.size === 0 && !searching}
                            <h4>No se encontraron chistes</h4>
                        {/if}
                        {#if jokeList.size !== 0}
                            <ul>
                                {#each [...jokeList.keys()] as joke}
                                    <li class="nobull">
                                        <Joke joke={joke} myJokes={myJokes} savedList={displayMyList}/>
                                    </li>
                                {/each}
                            </ul>
                        {/if}
                        <p>
                            <a on:click={clearSearch} class="pure-button pure-button-primary btn-fixed-size">Volver</a>
                        </p>
                    {/if}
                    {#if displayMyList}
                        {#if myJokes.size === 0}
                            <h4>No tienes chistes guardados</h4>
                        {/if}
                        {#if myJokes.size !== 0}
                            <ul>
                                {#each [...myJokes.keys()] as joke}
                                    <li class="nobull inline">
                                        <Joke joke={joke} myJokes={myJokes} savedList={displayMyList}/>
                                    </li>
                                {/each}
                            </ul>
                        {/if}
                        <p>
                            <a on:click={exitMyList} class="pure-button pure-button-primary btn-fixed-size">Volver</a>
                        </p>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    body {
        line-height: 1.7em;
        color: #7f8c8d;
        font-size: 13px;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    label {
        color: #26384b;
        font-size: 40px;
    }

    .l-box-lrg {
        padding-right: 2em;
        padding-left: 2em;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .is-center {
        text-align: center;
    }

    .pure-form label {
        margin: 1em 0 0;
        font-weight: bold;
        font-size: 100%;
    }

    .pure-form input[type] {
        border: 2px solid #ddd;
        box-shadow: none;
        font-size: 100%;
        width: 100%;
        margin-bottom: 1em;
    }

    .pure-button {
        background-color: #1f8dd6;
        color: white;
        padding: 0.5em 2em;
        border-radius: 5px;
    }

    a.pure-button-primary {
        background: white;
        color: #1f8dd6;
        border-radius: 5px;
        font-size: 120%;
    }

    .home-menu {
        padding: 0.5em;
        text-align: center;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.10);
    }

    .home-menu {
        background: #325274;
    }

    .pure-menu.pure-menu-fixed {
        border-bottom: none;
        z-index: 4;
    }

    .home-menu .pure-menu-heading {
        color: white;
        font-weight: 400;
        font-size: 120%;
    }

    .home-menu .pure-menu-selected a {
        color: white;
    }

    .home-menu a {
        color: #6FBEF3;
    }

    .home-menu li a:hover,
    .home-menu li a:focus {
        background: none;
        border: none;
        color: #AECFE5;
    }

    .splash-container {
        background: #1f8dd6;
        z-index: 1;
        overflow: hidden;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: fixed !important;
    }

    .splash {
        width: 100%;
        height: 50%;
        margin: 0 auto;
        position: absolute;
        top: 100px;
        left: 0;
        bottom: 0;
        right: 0;
        text-align: center;
        text-transform: uppercase;
    }

    .splash-subhead {
        color: white;
        letter-spacing: 0.05em;
        opacity: 0.8;
    }

    .content-head {
        font-weight: 400;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin: 2em 0 1em;
    }

    .btn-fixed-size {
        width: 50% !important;
    }

    .nobull {
        list-style-type: none;
    }

    .joke-item {
        font-size: 18px;
        margin-top: 2px;
        color: white;
    }

    .inline {
        display: inline-flex;
        margin: 5px;
    }

    .inline-btn {
        display: inline-flex;
        height: 10% !important;
        margin: 5px;
    }

    /*
    Tablets
    */

    @media (min-width: 48em) {
        body {
            font-size: 16px;
        }
        .home-menu {
            text-align: left;
        }
        .home-menu ul {
            float: right;
        }
        .splash {
            width: 50%;
            height: 50%;
        }
        .splash-head {
            font-size: 250%;
        }
        .l-box-lrg {
            border: none;
        }
    }

    @media (min-width: 78em) {
        .splash-head {
            font-size: 300%;
        }
    }
</style>