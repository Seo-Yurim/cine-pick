import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth.store";

export function useHasHydrated() {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });

    if (useAuthStore.persist.hasHydrated()) {
      setHasHydrated(true);
    }

    return unsub;
  }, []);

  return hasHydrated;
}
