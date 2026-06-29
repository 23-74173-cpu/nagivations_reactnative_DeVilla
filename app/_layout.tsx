import 'react-native-reanimated';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Drawer>
          <Drawer.Screen
            name="(tabs)"
            options={{
              drawerLabel: 'Home',
              title: 'Navigations',
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="(drawer)/settings"
            options={{
              drawerLabel: 'Settings',
              title: 'Settings',
            }}
          />
          <Drawer.Screen
            name="chat"
            options={{
              drawerItemStyle: { display: 'none' },
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="modal"
            options={{
              drawerItemStyle: { display: 'none' },
              title: 'Modal',
              headerShown: false,
            }}
          />
        </Drawer>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
