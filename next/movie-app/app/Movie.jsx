import Link from 'next/link';
import Image from 'next/image';

const Movie = ({ title, id, poster_path, release_date, vote }) => {
  const image_path = 'https://image.tmdb.org/t/p/original/';
  return (
    <div>
      <h1>{title}</h1>
      <h2 className="text-xs">{release_date}</h2>
      <p className="flex justify-center relative top-10 w-1/5 text-center px-2 py-2 font-semibold text-sm bg-green-500 text-white rounded-full shadow-sm">
        {vote} <span className="ml-0.5">⭐️</span>
      </p>
      <div>
        <Link href={`/${id}`}>
          <Image
            src={image_path + poster_path}
            width={800}
            height={800}
            alt={title}
          />
        </Link>
      </div>
    </div>
  );
};

export default Movie;
