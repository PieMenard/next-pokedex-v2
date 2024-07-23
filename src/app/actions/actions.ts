async function getPokemon({ query, page = 1, limit = 1500 }:
    { query?: string, page?: number, limit: number }) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(page - 1) * 24}`


}