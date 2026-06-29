import { FlatList, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const SETTINGS = [
  { id: 'profile', label: 'Profile', icon: 'person-outline' as const },
  { id: 'notifications', label: 'Notifications', icon: 'notifications-outline' as const },
  { id: 'privacy', label: 'Privacy', icon: 'lock-closed-outline' as const },
  { id: 'help', label: 'Help & Support', icon: 'help-circle-outline' as const },
  { id: 'logout', label: 'Logout', icon: 'log-out-outline' as const },
];

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={SETTINGS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Ionicons name={item.icon} size={24} color={colors.tint} />
            <ThemedText style={styles.label}>{item.label}</ThemedText>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  label: {
    fontSize: 17,
  },
});
