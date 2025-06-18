import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderCreationScreen from "./src/screens/OrderCreation/OrderCreationScreen";
import OrdersScreen from "./src/screens/Orders/OrdersScreen";
import DetailOrderScreen from "./src/screens/Orders/DetailOrderScreen";
import DeliveriesScreen from "./src/screens/Deliveries/DeliveriesScreen";
import DetailDeliveriesScreen from "./src/screens/Deliveries/DetailDeliveryScreen";
import BeginDeliveryScreen from "./src/screens/MakeDelivery/BeginDeliveryScreen";
import PrepareDeliveryScreen from "./src/screens/MakeDelivery/PrepareDeliveryScreen";
import MapScreen from "./src/screens/MakeDelivery/MapScreen";
import DeliverOrderScreen from "./src/screens/MakeDelivery/DeliverOrderScreen";
import MoreMenuScreen from "./src/screens/Mores/MoreMenuScreen";
import CustomersScreen from "./src/screens/Mores/CustomersScreen";
import StatisticsScreen from "./src/screens/Mores/StatisticsScreen";
import DetailCustomerScreen from "./src/screens/Mores/DetailCustomerScreen";
import {
    DeliveriesStackParamList,
    OrderStackParamList,
    MakeDeliveryStackParamList,
    MoreMenuStackParamList,
} from "./src/types/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { DeliveryProvider } from "./src/context/orderContext";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faServer } from "@fortawesome/free-solid-svg-icons";
import { faMap } from "@fortawesome/free-solid-svg-icons";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

const OrderStack = createNativeStackNavigator<OrderStackParamList>();
const DeliveriesStack = createNativeStackNavigator<DeliveriesStackParamList>();
const MakeDeliveryStack = createNativeStackNavigator<MakeDeliveryStackParamList>();
const MoreMenuStack = createNativeStackNavigator<MoreMenuStackParamList>();

const Tab = createBottomTabNavigator();

const iconsByRouteName: { [name: string]: IconDefinition } = {
    OrderCreation: faHouse,
    Orders: faServer,
    Deliveries: faMap,
    MakeDelivery: faTruck,
    MoreMenu: faBars,
};

const headerReturnTab = {
    headerShown: true,
    title: "",
    headerBackTitle: "Retour",
    headerTintColor: "#fff",
    headerStyle: { backgroundColor: "lightblue" },
}

const Orders = () => {
    return (
        <OrderStack.Navigator screenOptions={{ headerShown: false }}>
            <OrderStack.Screen
                name="AllOrders"
                component={OrdersScreen}
            />
            <OrderStack.Screen
                name="DetailOrder"
                component={DetailOrderScreen}
                options={headerReturnTab}
            />
        </OrderStack.Navigator>
    );
};

const Deliveries = () => {
    return (
        <DeliveriesStack.Navigator screenOptions={{ headerShown: false }}>
            <DeliveriesStack.Screen
                name="AllDeliveries"
                component={DeliveriesScreen}
            />
            <DeliveriesStack.Screen
                name="DetailDelivery"
                component={DetailDeliveriesScreen}
                options={headerReturnTab}
            />
        </DeliveriesStack.Navigator>
    );
};

const MakeDelivery = () => {
    return (
        <DeliveryProvider>
            <MakeDeliveryStack.Navigator screenOptions={{ headerShown: false }}>
                <MakeDeliveryStack.Screen
                    name="BeginDelivery"
                    component={BeginDeliveryScreen}
                />
                <MakeDeliveryStack.Screen
                    name="PrepareDelivery"
                    component={PrepareDeliveryScreen}
                />
                <MakeDeliveryStack.Screen
                    name="Map"
                    component={MapScreen}
                />
                <MakeDeliveryStack.Screen
                    name="DeliverOrder"
                    component={DeliverOrderScreen}
                />
            </MakeDeliveryStack.Navigator>
        </DeliveryProvider>
    );
};

const MoreMenu = () => {
    return (
        <MoreMenuStack.Navigator screenOptions={{ headerShown: false }}>
            <MoreMenuStack.Screen
                name="Menu"
                component={MoreMenuScreen}
            />

            <MoreMenuStack.Screen
                name="Customers"
                component={CustomersScreen}
                options={headerReturnTab}
            />
            <MoreMenuStack.Screen
                name="Statistics"
                component={StatisticsScreen}
                options={headerReturnTab}
            />
            <MoreMenuStack.Screen
                name="DetailCustomer"
                component={DetailCustomerScreen}
                options={headerReturnTab}
            />
        </MoreMenuStack.Navigator>
    );
};

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon
                            icon={iconsByRouteName[route.name]}
                            size={size}
                            color={color}
                        />
                    ),
                    headerShown: false,
                    tabBarActiveTintColor: "#2196f3",
                    tabBarInactiveTintColor: "gray",
                })}
            >
                <Tab.Screen
                    name="OrderCreation"
                    component={OrderCreationScreen}
                    options={{ title: "Ajout" }}
                />
                <Tab.Screen
                    name="Orders"
                    component={Orders}
                    options={{ title: "Commandes" }}
                />
                <Tab.Screen
                    name="Deliveries"
                    component={Deliveries}
                    options={{ title: "Livraisons" }}
                />
                <Tab.Screen
                    name="MakeDelivery"
                    component={MakeDelivery}
                    options={{ title: "Départ" }}
                />
                <Tab.Screen
                    name="MoreMenu"
                    component={MoreMenu}
                    options={{ title: "Autre" }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
