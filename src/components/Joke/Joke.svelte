<script>

    export let joke;
    export let myJokes;
    const saveJoke = (joke) => {
        return true;
    };

    const openDialog = (joke) => {
        return true;
    };

</script>

<div>
    {#if !myJokes.has(joke)}
        <div class="inline">
            <a on:click={saveJoke(joke)} class="pure-button pure-button-primary inline-btn">Guardar</a>
            <a on:click={openDialog(joke)} class="pure-button pure-button-primary inline-btn">Compartir</a>
            <h6 class="joke-item inline"> {joke} </h6>
        </div>
    {/if}
    {#if myJokes.has(joke)}
        <div class="inline">
            <a class="pure-button pure-button-primary inline-btn">Guardado</a>
            <a on:click={openDialog(joke)} class="pure-button pure-button-primary inline-btn">Compartir</a>
            <h6 class="joke-item inline"> {joke} </h6>
        </div>
    {/if}
</div>

<style>
    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
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
        font-size: 100%;
    }

    .joke-item {
        font-size: 20px;
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

</style>