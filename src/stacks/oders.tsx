import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OrderStackParamList } from "../types";
import { DetailOrderScreen, OrdersScreen } from "../screens";
import { headerReturnTab } from "./config";


const OrderStack = createNativeStackNavigator<OrderStackParamList>();

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

export {Orders}