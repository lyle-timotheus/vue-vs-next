import Image from 'next/image';
import Link from 'next/link';
import AddReview from './AddReview';

export default async function page({ params }) {
  const { movie } = params;
  const image_path = 'https://image.tmdb.org/t/p/original/';
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    { next: { revalidate: 60 } }
  );
  const res = await data.json();

  const backgroundImageStyle = {
    backgroundImage: `url(${image_path + res.backdrop_path})`,
  };

  return (
    <div
      className="bg-cover bg-center h-screen relative"
      style={{ ...backgroundImageStyle }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60">
        <div className="m-40">
          <Link
            href={'/'}
            className="rounded-md bg-blue-200 text-blue-700 text-sm p-2"
          >
            HOME
          </Link>
          <h2 className="text-3xl font-bold mt-8">{res.title}</h2>
          <h2 className="text-md text-stone-400 italic mb-4">
            "{res.tagline}"
          </h2>
          <h2 className="text-lg">
            Release Date: <span className="font-bold">{res.release_date}</span>
          </h2>
          <h2 className="text-lg">
            Runtime: <span className="font-bold">{res.runtime} minutes</span>
          </h2>
          <div>
            <h2 className="bg-green-600	inline-block my-2 py-2 px-4 rounded-md text-sm">
              {res.status}
            </h2>
            <AddReview movie={movie} />
          </div>
          <h2 className="text-sm">{res.overview}</h2>
        </div>
      </div>
    </div>
  );
}
