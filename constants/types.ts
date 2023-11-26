export interface ICardSmall {
  id: string;
  image: {
    medium: string,
    original: string
  },
  title: string;
  user?: ICardUser;
}

export interface ICardUser {
  id: string;
  name: string;
  rating: number;
  avatar: string;
}

enum EShowStatus {
  "Running", "Ended"
}

export interface IShow {
  image: {
    medium: string,
    original: string
  },
  _id: string,
  tvmazeId: number,
  title: string,
  description: string,
  genres: string[],
  network: string,
  dateStarted: string,
  dateEnded: string | null,
  averageRuntime: number,
  imdbId: string,
  thetvdb: string,
  status: EShowStatus,
  country: string,
  episodes: string[];
};

export interface IEpisode {
  image: {
    medium: string,
    original: string
  },
  _id: string,
  tvmazeId: number,
  season: number,
  number: number,
  name: string,
  runtime: number,
  airdate: string,
  summary: string,
  type: string,
  show: string,
};