import { Suspense } from "react";
import SearchResultComponent from "./components/search-result.component";

export default function SearchPage() {
  return (
    <Suspense>
      <SearchResultComponent />
    </Suspense>
  );
}
