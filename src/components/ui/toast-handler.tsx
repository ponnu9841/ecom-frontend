import { cn } from "@/lib/utils";
import { Check, CircleX, Info, OctagonAlert } from "lucide-react";
import { toast } from "sonner";

export type ToastVariant = "success" | "error" | "warning" | "info";

const toastConfig = {
	success: {
		className: "bg-success",
		icon: <Check size={18} />,
	},
	error: {
		className: "bg-destructive",
		icon: <CircleX />,
	},
	warning: {
		className: "bg-warning text-black",
		icon: <OctagonAlert size={20} />,
	},
	info: {
		className: "bg-primary",
		icon: <Info />,
	},
};

export const handleToast = ({
	message,
	variant = "success",
	timeout = 3000,
}: {
	message: string;
	variant?: ToastVariant;
	timeout?: number;
}) => {
	const { className, icon } = toastConfig[variant];
	toast("", {
		unstyled: true,
		description: message,
		duration: timeout,
		position: "bottom-left",
		classNames: {
			toast: cn(
				"rounded-md text-white p-5 py-3 relative flex gap-x-2 items-center",
				className,
			),
			title: "",
			description: "",
			closeButton: "absolute top-2 right-2",
			actionButton: "absolute top-2 right-2",
			cancelButton: "absolute top-2 right-2",
		},
		icon,
	});
};