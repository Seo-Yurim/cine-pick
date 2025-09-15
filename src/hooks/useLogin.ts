import { getRequestToken } from "@/services/authenticate.service";

export const useLogin = () => {
  const handleLogin = async () => {
    const res = await getRequestToken();
    const requestToken = res.request_token;

    const redirectUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${encodeURIComponent(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    )}`;

    window.location.href = redirectUrl;
  };

  return { handleLogin };
};
