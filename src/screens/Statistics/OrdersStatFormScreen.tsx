import { useState } from "react";
import { Button, CustomPicker, Error, Loading, Screen, Text } from "../../components";
import { StyleSheet, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { useFetch, useFetchWithAuth } from "../../hooks";
import { apiUrl } from "../../config";
import { AvailableProduct, MoreMenuStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GlobalStyles } from "../../styles/global";

type rangeDate = { minDate: Date | undefined; maxDate: Date | undefined };

type Props = NativeStackScreenProps<MoreMenuStackParamList, "OrdersStatForm">;

const OrdersStatFormScreen = ({ navigation }: Props) => {
    const [date, setDate] = useState<rangeDate>({ minDate: undefined, maxDate: undefined });
    const [area, setArea] = useState<string>("");
    const [product, setProduct] = useState<string>("");
    const fetchWithAuth = useFetchWithAuth();

    const { data: dataArea, isLoading: isLoadingArea, error: errorArea } = useFetch(`${apiUrl}/orders/allAreas`);
    const { data: dataProducts, isLoading: isLoadingProduct, error: errorProduct } = useFetch(`${apiUrl}/products/`);

    const handleChangeDate = (date: Date, type: string) => {
        if (type === "END_DATE") {
            setDate(prev => ({ ...prev, maxDate: date }));
        } else {
            setDate(prev => ({ ...prev, minDate: date }));
        }
    };

    const handleSubmit = async () => {
        const filters = {
            beginAt: date.minDate ? date.minDate?.toString() : "",
            endAt: date.maxDate ? date.maxDate?.toString() : "",
            area,
            product,
        };

        const urlfilter = Object.entries(filters)
            .filter(v => v[1] && v[1] != "Tout")
            .map(v => v[0] + "=" + v[1])
            .join("&");

        const url = `${apiUrl}/orders/filter?${urlfilter}`;

        const response = await fetchWithAuth(url);

        const data = await response.json();

        if (data.result) {
            navigation.navigate("OrdersStatResult", { orders: data.data, filters });
        } else {
            console.error("Connexion problem :", data.error);
        }
    };

    if (isLoadingArea || isLoadingProduct) return <Loading />;
    if (errorArea || errorProduct) return <Error err={errorArea || errorProduct} />;

    return (
        <Screen
            title="Statistiques commandes"
            hasHeaderBar
            style={styles.container}
        >
            <View style={styles.calendar}>
                <CalendarPicker
                    onDateChange={handleChangeDate}
                    allowRangeSelection
                    startFromMonday
                    maxDate={new Date()}
                    weekdays={["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]}
                    months={[
                        "Janvier",
                        "Février",
                        "Mars",
                        "Avril",
                        "Mais",
                        "Juin",
                        "Juillet",
                        "Août",
                        "Septembre",
                        "Octobre",
                        "Novembre",
                        "Décembre",
                    ]}
                    previousTitle="Précédent"
                    nextTitle="Suivant"
                    selectMonthTitle={"Selectionnez le mois en "}
                    selectYearTitle="Selectionnez l'année"
                    scaleFactor={450}
                    textStyle={GlobalStyles.globalFontFamily}
                />
            </View>
            <View style={styles.pickerContainer}>
                <Text>Zone : </Text>
                <CustomPicker
                    values={dataArea && ["Tout", ...dataArea.areas]}
                    selectedValue={area}
                    setSelectedValue={setArea}
                    placeholder="Selectionnez"
                />
            </View>
            <View style={styles.pickerContainer}>
                <Text>Produits : </Text>
                <CustomPicker
                    values={dataProducts && ["Tout", ...dataProducts.products?.map((v: AvailableProduct) => v.name)]}
                    selectedValue={product}
                    setSelectedValue={setProduct}
                    placeholder="Selectionnez"
                />
            </View>

            <Button
                title="Recherche"
                onPress={handleSubmit}
            />
        </Screen>
    );
};

export { OrdersStatFormScreen };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
    },
    pickerContainer: {
        flex: 1,
        justifyContent: "center",
    },
    calendar: {
        flex: 3,
    }
});
