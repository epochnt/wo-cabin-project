import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { insertEditCabin } from "../../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: insert } = useMutation({
    mutationFn: (cabin) => insertEditCabin(cabin),
    onSuccess: () => {
      toast.success("New Cabin added successfully !");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, insert };
}
