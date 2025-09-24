export interface CollectionItem {
  id: string;
  userId: string;
  title: string;
  description: string;
}

export interface CollectionMovie {
  id: string;
  collectionId: string;
  movieId: number;
}

export interface CollectionDetail {
  id: string;
  userId: string;
  title: string;
  description: string;
  movies: CollectionMovie[];
}
