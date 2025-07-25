import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Deliveries, MakeDelivery, MoreMenu, Orders } from ".";
import { OrderCreationScreen } from "../screens";
import { faHouse, faServer, faMap, faTruck, faBars, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { GlobalStyles } from "../styles/global";

const Tab = createBottomTabNavigator();

const iconsByRouteName: { [name: string]: IconDefinition } = {
    OrderCreation: faHouse,
    Orders: faServer,
    Deliveries: faMap,
    MakeDelivery: faTruck,
    MoreMenu: faBars,
};

const Main = () => {
    return (
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
                options={{ title: "Ajout", tabBarLabelStyle: GlobalStyles.globalFontFamily }}
            />
            <Tab.Screen
                name="Orders"
                component={Orders}
                options={{ title: "Commandes", tabBarLabelStyle: GlobalStyles.globalFontFamily }}
            />
            <Tab.Screen
                name="Deliveries"
                component={Deliveries}
                options={{ title: "Livraisons", tabBarLabelStyle: GlobalStyles.globalFontFamily }}
            />
            <Tab.Screen
                name="MakeDelivery"
                component={MakeDelivery}
                options={{ title: "Départ", tabBarLabelStyle: GlobalStyles.globalFontFamily }}
            />
            <Tab.Screen
                name="MoreMenu"
                component={MoreMenu}
                options={{ title: "Menu", tabBarLabelStyle: GlobalStyles.globalFontFamily }}
            />
        </Tab.Navigator>
    );
};

export { Main };
