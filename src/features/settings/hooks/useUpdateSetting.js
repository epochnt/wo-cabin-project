import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: update } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Settings updated successfully !");
      queryClient.invalidateQueries({
        queryKey: ["setttings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, update };
}
