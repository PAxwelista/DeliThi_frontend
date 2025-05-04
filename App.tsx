import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens//Home/HomeScreen";
import OrdersScreen from "./src/screens/Orders/OrdersScreen";
import DetailOrderScreen from "./src/screens/Orders/DetailOrderScreen";
import DeliveriesScreen from "./src/screens/Deliveries/DeliveriesScreen";
import DetailDeliveriesScreen from "./src/screens/Deliveries/DetailDeliveryScreen";
import BeginDeliveryScreen from "./src/screens/MakeDelivery/BeginDeliveryScreen";
import PrepareDeliveryScreen from "./src/screens/MakeDelivery/PrepareDeliveryScreen";
import MapScreen from "./src/screens/MakeDelivery/MapScreen";
import DeliverOrderScreen from "./src/screens/MakeDelivery/DeliverOrderScreen";
import { DeliveriesStackParamList, OrderStackParamList, MakeDeliveryStackParamList } from "./src/types/navigation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { DeliveryProvider } from "./src/context/orderContext";

const OrderStack = createNativeStackNavigator<OrderStackParamList>();
const DeliveriesStack = createNativeStackNavigator<DeliveriesStackParamList>();
const MakeDeliveryStack = createNativeStackNavigator<MakeDeliveryStackParamList>();

const Tab = createBottomTabNavigator();

const iconsByRouteName = { Home: "home", Orders: "server", Deliveries: "map-signs", MakeDelivery: "truck" };

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
                options={{
                    headerShown:true,
                    title: '',
                    headerBackTitle: 'Retour',
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: 'lightblue' }
                  }}
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
                options={{
                    headerShown:true,
                    title: '',
                    headerBackTitle: 'Retour',
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: 'lightblue' }
                  }}
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

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome
                            name={iconsByRouteName[route.name]}
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
                    name="Home"
                    component={HomeScreen}
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
            </Tab.Navigator>
        </NavigationContainer>
    );
}
