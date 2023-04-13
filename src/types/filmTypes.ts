export interface Film {
  id: number;
  label: string;
  children?: FilmChild[];
}

export interface FilmChild {
  id: number;
  label: string;
  children: ChildChild[];
}

export interface ChildChild {
  id: number;
  label: string;
}
