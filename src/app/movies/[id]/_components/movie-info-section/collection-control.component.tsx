import { CollectionFormModal } from "@/app/mypage/collections/_components/collection-form-modal.component";
import toast from "react-hot-toast";
import { FaFolderPlus } from "react-icons/fa";
import { CollectionList } from "@/types/collections.type";
import { MovieItem } from "@/types/movie.type";
import { useModalStore } from "@/stores/modal.store";
import { usePatchCollectionMovie } from "@/queries/collections.query";
import { ButtonComponent } from "@/components";
import { TooltipComponent } from "@/components/tooltip/tooltip.component";

interface CollectionControlProps {
  userId: string;
  movieData: MovieItem;
  collectionList: CollectionList[];
}

export function CollectionControlComponent({
  userId,
  movieData,
  collectionList,
}: CollectionControlProps) {
  const { modals, openModal, closeModal, toggleModal } = useModalStore();
  const addCollectionMovie = usePatchCollectionMovie();

  const handleSelectCollection = (collection: CollectionList) => {
    if (!collection) return toast.error("영화를 추가할 컬렉션을 선택해주세요!");

    const alreadyExists = collection.movies?.some((movie) => movie.movieId === movieData.id);

    if (alreadyExists) {
      return toast.error("이미 컬렉션에 추가된 영화입니다.");
    }

    const collectionMovie = {
      collectionId: collection.id,
      movieId: movieData.id,
    };

    const updatedMovies = [...collection.movies, collectionMovie];

    addCollectionMovie.mutate(
      { collectionId: collection.id, collectionMovie: updatedMovies },
      {
        onSuccess: () => {
          toast.success("컬렉션에 영화를 추가했어요!");
        },
      },
    );
  };

  return (
    <div className="relative">
      <TooltipComponent text="컬렉션 추가" bgColor="#696969">
        <ButtonComponent>
          <div
            onClick={() => toggleModal("collectionList")}
            className="rounded-full border-2 p-3 transition-all duration-300 hover:scale-105"
          >
            <FaFolderPlus size={30} className="text-white" />
          </div>
        </ButtonComponent>
      </TooltipComponent>

      {modals.collectionList && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => closeModal("collectionList")} />
          <div
            className="absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 rounded-xl bg-text-bg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex w-full items-center justify-between">
              <h2 className="text-xl font-semibold">컬렉션 목록</h2>
              <ButtonComponent
                onClick={() => openModal("collectionForm")}
                className="rounded-xl bg-point-color"
              >
                컬렉션 추가
              </ButtonComponent>
            </div>

            <div className="mt-4 flex flex-col border">
              {collectionList.map((collection) => (
                <ButtonComponent
                  onClick={() => handleSelectCollection(collection)}
                  key={collection.id}
                  className="border-b last:border-b-0 hover:bg-white/30"
                >
                  {collection.title}
                </ButtonComponent>
              ))}
            </div>
          </div>
        </>
      )}

      {modals.collectionForm && (
        <CollectionFormModal
          isOpen={modals.collectionForm}
          onClose={() => {
            closeModal("collectionForm");
          }}
          userId={userId}
          defaultValue={null}
        />
      )}
    </div>
  );
}
