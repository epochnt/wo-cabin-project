import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../../services/apiAuth";

export function useSignUp() {
  const { mutate: signUp, isPending: isCreating } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success(
        "Account Created Successfully, Please verfiy new email before logging in",
      );
    },
  });

  return { signUp, isCreating };
}
