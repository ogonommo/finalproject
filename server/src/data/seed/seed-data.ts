import { config } from '../../config/db-config';
import { createConnection } from 'typeorm';
import { Quote } from '../entities/quote.entity';

const main = async () => {
  const connection = await createConnection(config);
  const quotesRepo = connection.getRepository(Quote);

  const data: Partial<Quote>[] = [
    {
      text: `I'm sorry, Dave. I'm afraid I can't do that.`,
      movie: `Hal, '2001: A Space Odyssey'`,
    },
    {
      text: `Luke: Your thoughts betray you, Father. I feel the good in you, the conflict.

Darth Vader: There is no conflict.

Luke: You couldn't bring yourself to kill me before and I don't believe you'll destroy me now.

Darth Vader: You underestimate the power of the Dark Side. If you will not fight, then you will meet your destiny.`,
      movie: `'Star Wars: Return of the Jedi'`,
    },
    {
      text: `Ever have that feeling where you're not sure if you're awake or dreaming?`,
      movie: `Neo, 'The Matrix'`,
    },
    {
      text: `Let's face it, this is not the worst thing you've caught me doing.`,
      movie: `Tony Stark, 'Iron Man'`,
    },
    {
      text: `The one thing that this job has taught me is that truth is stranger than fiction.`,
      movie: `The Bartender, 'Predestination'`,
    },
    {
      text: `Marty! What in the name of Sir Isaac H. Newton happened here?`,
      movie: `Dr. Emmett Brown, 'Back To The Future II'`,
    },
    {
      text: `You shall not pass.`,
      movie: `'The Lord of the Rings: The Fellowship of the Ring', also some unit tests`,
    },
    {
      text: `Luke, I AM your father.`,
      movie: `Darth Vader, 'The Empire Strikes Back'`,
    },
    {
      text: `Klaatu barada nikto.`,
      movie: `'The Day the Earth Stood Still'`,
    },
    {
      text: `The needs of the many outweigh ... the needs of the few... Or the one.`,
      movie: `Spock, 'Star Trek II: The Wrath of Khan'`,
    },
  ];

  try {
    const quotes = data.map((partialQuote) => quotesRepo.create(partialQuote));
    await quotesRepo.save(quotes);

    console.log(`Data written successfully!`);
  } catch (e) {
    console.log(`Error writing data: ${e.message}`, e.stack);
  }

  connection.close();
};

main().catch(console.log);
