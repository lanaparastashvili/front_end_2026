export interface MovieItem {
  title: string;
  type: string;
  year: number;
  rating: string;
  image?: string;
}

export interface MoviesData {
  trending: MovieItem[];
  recommended_for_you: MovieItem[];
}
