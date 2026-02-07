import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";

export function useCheckOut() {
  const queryClient = useQueryClient();
  const {
    mutate: checkOut,
    isPending: isCheckingOut,
    error,
  } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`The booking of id ${data.id} is successfully checked-out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => {
      toast.success(`There was and error while checking-in booking`);
      console.log(err);
    },
  });
  return { checkOut, isCheckingOut, error };
}
