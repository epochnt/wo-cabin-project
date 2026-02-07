import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { insertEditCabin } from "../../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { isPending: isEditing, mutate: edit } = useMutation({
    mutationFn: ({ cabin, id }) => insertEditCabin(cabin, id),
    onSuccess: () => {
      toast.success("Cabin edited successfully !");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, edit };
}
