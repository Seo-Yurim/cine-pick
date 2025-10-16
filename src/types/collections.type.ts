export interface CollectionItem {
  id: string;
  userId: string;
  title: string;
  description: string;
}

export interface CollectionMovie {
  collectionId: string;
  movieId: number;
}

export interface CollectionList extends CollectionItem {
  id: string;
  userId: string;
  title: string;
  description: string;
  movies: CollectionMovie[];
}
