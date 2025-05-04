import { createContext, ReactNode, useContext, useState } from "react";
import { Delivery } from "../types/delivery";

type DeliveryContextType = {
    delivery: Delivery | null;
    setDelivery: (delivery: Delivery | null) => void;
  };

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);


export const DeliveryProvider = ({ children }: { children: ReactNode }) => {
    const [delivery, setDelivery] = useState<Delivery | null>(null);

    return <DeliveryContext.Provider value={{ delivery, setDelivery }}>{children}</DeliveryContext.Provider>;
};

export const useDelivery = () => useContext(DeliveryContext);