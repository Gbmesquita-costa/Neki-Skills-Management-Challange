import { toast } from "sonner";

const toastMapping: { [key: number]: (message: string) => void } = {
  200: toast.success,
  201: toast.success,
  400: toast.warning,
  409: toast.warning,
  500: toast.error,
};

export { toastMapping };
