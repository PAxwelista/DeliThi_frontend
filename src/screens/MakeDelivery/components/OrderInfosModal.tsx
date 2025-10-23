import { useEffect, useState } from "react";
import { Button, CustomModal, Input, Text } from "../../../components";
import { Order } from "../../../types";
import { useDelivery } from "../../../context/orderContext";

type Props = {
    order: Order | undefined;
    deliverySequence: number | undefined;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    setRefreshDirection: (fn: (prev: boolean) => boolean) => void;
};

export const OrderInfosModal = ({ order, deliverySequence, visible, setVisible, setRefreshDirection }: Props) => {
    const delivery = useDelivery();
    const [numberDelivered, setNumberDelivered] = useState<number|"">(deliverySequence || 0);

    useEffect(() => {
        setNumberDelivered(deliverySequence || 0);
    }, [deliverySequence]);

    const maxNbDelivered: number = delivery?.delivery?.orders.length || 0;

    const handleChangeOrder = () => {
        delivery?.setDelivery(prev => {
            if (!prev || !deliverySequence || !numberDelivered) return prev;
            const newOrder = [...prev.orders];
            const movingOrder = newOrder.splice(deliverySequence - 1, 1);
            newOrder.splice(numberDelivered - 1, 0, movingOrder[0]);
            return { ...prev, orders: newOrder };
        });

        setRefreshDirection(prev => !prev);
        setVisible(false);
    };

    const buttonDisable = deliverySequence === numberDelivered;

    return (
        <CustomModal
            visible={visible}
            handleCloseModal={() => setVisible(false)}
        >
            {order ? (
                <>
                    <Text>Client : {order.customer.name}</Text>
                    <Text>Order de livraison : </Text>
                    <Input
                        value={numberDelivered.toString()}
                        onChangeText={text =>
                            setNumberDelivered(
                                text === "" ? text :
                                parseInt(text) > maxNbDelivered ? maxNbDelivered : parseInt(text) ? parseInt(text) : 1
                            )
                        }
                    />
                    <Button
                        title={"Changer l'ordre"}
                        onPress={handleChangeOrder}
                        disable={buttonDisable}
                        style={buttonDisable ? { backgroundColor: "grey" } : {}}
                    />
                </>
            ) : (
                <Text>Aucune info disponible</Text>
            )}
        </CustomModal>
    );
};
