import React from "react";
import "./App.css";

import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { ApolloClient, gql, InMemoryCache, HttpLink } from "apollo-boost";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://poke.mikepawlak.com"
});

const client = new ApolloClient({
  cache,
  link
});

const ALL_POKEMON = gql(`{
  pokemon {
    name id sprites { front_default }
  }
}`);

function PokemonList() {
  const { loading, error, data } = useQuery(ALL_POKEMON);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.pokemon.map(({ name, id, sprites }) => (
    <div key={id}>
      <p>{name}</p>
      <img src={sprites.front_default} alt={name} />
    </div>
  ));
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app 🚀</h2>
        <PokemonList />
      </div>
    </ApolloProvider>
  );
}

export default App;
