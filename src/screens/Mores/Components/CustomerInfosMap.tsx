import { View, Text, StyleSheet } from "react-native";
import { Button, CustomModal } from "../../../components";
import { Customer, MoreMenuStackParamList } from "../../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
    navigate: NativeStackNavigationProp<MoreMenuStackParamList, "CustomersMap">["navigate"];
    customer: Customer | undefined;
    visible: boolean;
    setIsVisible: (v: boolean) => void;
};

const CustomerInfosMap = ({ navigate, customer,visible,setIsVisible }: Props) => {
    const handleGoToUpdatePage = () => {
        customer && navigate("DetailCustomer", customer);
        setIsVisible(false)
    };

    return (
        <CustomModal
            style={styles.modal}
            visible={visible}
            handleCloseModal={() => setIsVisible(false)}
        >
            <View>
                {customer ? (
                    <>
                        <Text style={styles.text}>Nom : {customer.name}</Text>
                        <Text style={styles.text}>Numéro de téléphone : {customer.phoneNumber}</Text>
                        <Text style={styles.text}>Email : {customer.email}</Text>
                        <Text style={styles.text}>Lieu : {customer.location.name}</Text>
                        <Text style={styles.text}>Zone : {customer.location.area}</Text>
                        <Button
                            title="Mettre à jour"
                            onPress={handleGoToUpdatePage}
                        />
                    </>
                ) : (
                    <Text>Customer est undefined</Text>
                )}
            </View>
        </CustomModal>
    );
};

export { CustomerInfosMap };

const styles = StyleSheet.create({
    text: {
        marginBottom: 10,
    },
    modal: {
        marginVertical: 200,
    },
});
