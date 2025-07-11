import { View, StyleSheet, TouchableOpacity, Text, Modal } from "react-native";

type Props = { children: React.ReactNode; visible: boolean; handleCloseModal: () => void };

const CustomModal = ({ children, visible, handleCloseModal }: Props) => {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
        >
            <View style={styles.modal}>
                <View style={styles.closeBtnContainer}>
                    <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={handleCloseModal}
                    >
                        <Text style={styles.textCloseBtn}>X</Text>
                    </TouchableOpacity>
                </View>
                {children}
            </View>
        </Modal>
    );
};

export { CustomModal };

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 100,
        padding: 30,
        borderRadius: 20,
        backgroundColor: "white",
        borderWidth: 1,
    },
    closeBtnContainer: {
        alignItems: "flex-end",
    },
    closeBtn: {
        backgroundColor: "lightgrey",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        width: 40,
        borderRadius: "50%",
    },
    textCloseBtn: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
