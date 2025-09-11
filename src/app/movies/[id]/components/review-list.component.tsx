import { IoPersonCircleSharp } from "react-icons/io5";

const dummyData = [
  {
    author: "movieFan123",
    author_details: {
      rating: 8.0,
    },
    content: "정말 재미있게 봤습니다. 연출도 훌륭하고 배우들도 연기를 잘했어요!",
  },
  {
    author: "cinemaLover",
    author_details: {
      rating: 9.0,
    },
    content: "정말 재미있게 봤습니다. 연출도 훌륭하고 배우들도 연기를 잘했어요!",
  },
  {
    author: "noobCritic",
    author_details: {
      rating: 6.5,
    },
    content: "정말 재미있게 봤습니다. 연출도 훌륭하고 배우들도 연기를 잘했어요!",
  },
  {
    author: "filmJunkie",
    author_details: {
      rating: 7.5,
    },
    content: "정말 재미있게 봤습니다. 연출도 훌륭하고 배우들도 연기를 잘했어요!",
  },
  {
    author: "dramaQueen",
    author_details: {
      rating: 5.0,
    },
    content: "정말 재미있게 봤습니다. 연출도 훌륭하고 배우들도 연기를 잘했어요!",
  },
];

export function ReviewListComponent() {
  return (
    <div className="flex w-full flex-col">
      {dummyData.map((data, idx) => (
        <div key={idx} className="flex flex-col gap-4 border-t p-4 last:border-y">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-1 text-background">
              <IoPersonCircleSharp className="h-8 w-8" />
              <p>{data.author}</p>
            </div>
            <p>{data.author_details.rating}</p>
          </div>
          <p>{data.content}</p>
        </div>
      ))}
    </div>
  );
}
