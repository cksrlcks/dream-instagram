import { createPortal } from "react-dom";

export default function PortalModal({ children }: { children: React.ReactNode }) {
    if (typeof window === "undefined") {
        return null;
    }
    const node = document.querySelector("#portal") as Element;
    return createPortal(children, node);
}
