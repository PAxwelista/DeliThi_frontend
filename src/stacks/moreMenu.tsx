import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MoreMenuStackParamList } from "../types";
import { CustomersScreen, DetailCustomerScreen, MoreMenuScreen, ProductsScreen, StatisticsScreen } from "../screens";
import { headerReturnTab } from "./config";

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
        </MoreMenuStack.Navigator>
    );
};

export {MoreMenu}