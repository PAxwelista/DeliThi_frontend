import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MoreMenuStackParamList } from "../types";
import {
    CustomersScreen,
    DetailCustomerScreen,
    MoreMenuScreen,
    ProductsScreen,
    StatisticsScreen,
    CustomersStatScreen,
    OrdersStatFormScreen,
    ProductsStatScreen,
    CustomersMapScreen,
    OrdersStatResultScreen,
} from "../screens";
import { headerReturnTab } from "./config";
import { DetailProductScreen } from "../screens/Mores/DetailProductScreen";

const MoreMenuStack = createNativeStackNavigator<MoreMenuStackParamList>();

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
                name="CustomersMap"
                component={CustomersMapScreen}
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
            <MoreMenuStack.Screen
                name="Products"
                component={ProductsScreen}
                options={headerReturnTab}
            />
            <MoreMenuStack.Screen
                name="DetailProduct"
                component={DetailProductScreen}
                options={headerReturnTab}
            />
            <MoreMenuStack.Screen
                name="CustomersStat"
                component={CustomersStatScreen}
                options={headerReturnTab}
            />
            <MoreMenuStack.Screen
                name="OrdersStatForm"
                component={OrdersStatFormScreen}
                options={headerReturnTab}
            />
            <MoreMenuStack.Screen
                name="OrdersStatResult"
                component={OrdersStatResultScreen}
                options={headerReturnTab}
            />
            <MoreMenuStack.Screen
                name="ProductsStat"
                component={ProductsStatScreen}
                options={headerReturnTab}
            />
        </MoreMenuStack.Navigator>
    );
};

export { MoreMenu };
