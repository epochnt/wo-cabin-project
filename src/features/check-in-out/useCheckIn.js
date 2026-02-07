import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { updateBooking } from "../../services/apiBookings";

export function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: checkIn,
    isPending: isCheckingIn,
    error,
  } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`The booking of id ${data.id} is successfully checked-in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (err) => {
      toast.success(`There was and error while checking-in booking`);
      console.log(err);
    },
  });
  return { checkIn, isCheckingIn, error };
}
