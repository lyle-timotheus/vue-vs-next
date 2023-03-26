import Movie from './Movie';

export default async function Home() {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const res = await data.json();
  console.log(res);

  return (
    <main className="mx-32 my-12">
      <h1 className="text-3xl text-stone-400 font-bold text-center mb-8">
        Movie Database App
      </h1>
      <div className="grid grid-rows-4 grid-cols-4 gap-8">
        {res.results.map((movie) => {
          return (
            <Movie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              release_date={movie.release_date}
              vote={movie.vote_average}
            />
          );
        })}
      </div>
    </main>
  );
}
