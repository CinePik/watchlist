// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// async function seed() {
//   console.log('Seeding database...');

//   // Delete all entries
//   const movieTableExists = await prisma.movie.findFirst();
//   const seriesTableExists = await prisma.series.findFirst();
//   // const schema = process.env.DB_SCHEMA || 'public';

//   if (movieTableExists) {
//     await prisma.movie.deleteMany();
//     console.log('Deleted movie records in the database.');

//     // const sequenceName = `"${schema}.Movie_id_seq"`;
//     // const resetSequenceQuery = `ALTER SEQUENCE ${sequenceName} RESTART WITH 1`;
//     // await prisma.$executeRawUnsafe(resetSequenceQuery);
//     // console.log('Reset movie auto increment to 1');
//   }

//   if (seriesTableExists) {
//     await prisma.series.deleteMany();
//     console.log('Deleted series records in the database.');

//     // const sequenceName = `"${schema}.Series_id_seq"`;
//     // const resetSequenceQuery = `ALTER SEQUENCE ${sequenceName} RESTART WITH 1`;
//     // await prisma.$executeRawUnsafe(resetSequenceQuery);
//     // console.log('Reset series auto increment to 1');
//   }

//   // Create movies
//   const movies = [
//     {
//       title: 'Inception',
//       description:
//         'A thief who steals corporate secrets through the use of dream-sharing technology.',
//       releaseDate: new Date('2010-07-16'),
//       director: 'Christopher Nolan',
//       genres: ['Action', 'Adventure', 'Sci-Fi'],
//       rating: 8.8,
//       runtimeMinutes: 148,
//     },
//     {
//       title: 'Interstellar',
//       description:
//         "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
//       releaseDate: new Date('2014-11-07'),
//       director: 'Christopher Nolan',
//       genres: ['Adventure', 'Drama', 'Sci-Fi'],
//       rating: 8.6,
//       runtimeMinutes: 169,
//     },
//   ];

//   await prisma.movie.createMany({
//     data: movies,
//   });

//   console.log('Added movie data.');

//   // Create series
//   const series = [
//     {
//       title: 'Stranger Things',
//       description:
//         'When a young boy vanishes, a small town uncovers a mystery involving secret experiments.',
//       releaseDate: new Date('2016-07-15'),
//       creator: 'The Duffer Brothers',
//       genres: ['Drama', 'Fantasy', 'Horror'],
//       seasons: 4,
//       episodes: 34,
//       rating: 8.7,
//       runtimeMinutes: 2041,
//     },
//   ];

//   await prisma.series.createMany({
//     data: series,
//   });

//   console.log('Added series data.');
//   console.log('Seeding completed.');
// }

// seed()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
