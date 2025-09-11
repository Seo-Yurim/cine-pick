import { getAccount, getAccountDetail } from "@/services/account.service";
import { useQuery } from "@tanstack/react-query";

export function useAccount() {
  return useQuery({
    queryKey: ["account-data"],
    queryFn: () => getAccount(),
  });
}

export function useAccountDetail(accountId: string) {
  return useQuery({
    queryKey: ["account", accountId],
    queryFn: () => getAccountDetail(accountId),
  });
}
