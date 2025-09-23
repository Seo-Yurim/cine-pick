import { User } from "./users.type";

export interface ReviewItem {
  id: string;
  movieId: number;
  userId: string;
  rating: number;
  content: string;
  createdAt: string;
  user: Omit<User, "id" | "password">;
}
