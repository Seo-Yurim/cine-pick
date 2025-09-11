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
      <h2 className="my-4">리뷰 목록</h2>
      {dummyData.map((data, idx) => (
        <div key={idx} className="flex flex-col gap-4 border-t p-4 last:border-y">
          <div className="flex items-center justify-between">
            <p>{data.author}</p>
            <p>{data.author_details.rating}</p>
          </div>
          <p>{data.content}</p>
        </div>
      ))}
    </div>
  );
}
