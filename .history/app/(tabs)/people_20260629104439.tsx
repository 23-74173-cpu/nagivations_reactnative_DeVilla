import { useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const DOCS = [
  {
    id: 'doc-calvin',
    name: 'Doc Calvin',
    specialization: 'Cardiologist',
    isOnline: true,
  },
  {
    id: 'doc-harrold',
    name: 'Doc Harrold',
    specialization: 'Neurologist',
    isOnline: false,
  },
  {
    id: 'doc-oliver',
    name: 'Doc Oliver',
    specialization: 'Pediatrician',
    isOnline: true,
  },
];

export default function PeopleScreen() {
  const [search, setSearch] = useState('');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const filtered = DOCS.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={colors.icon} />
        <TextInput
          style={[
            styles.searchInput,
            {
              color: colors.text,
              backgroundColor:
                colorScheme === 'dark' ? '#1c1c1e' : '#f0f0f0',
            },
          ]}
          placeholder="Search by name or specialization..."
          placeholderTextColor={colors.icon}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.docItem}>
            <View style={styles.avatarContainer}>
              <View style={[styles.avatar, { backgroundColor: colors.tint }]}>
                <ThemedText style={styles.avatarText}>
                  {item.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </ThemedText>
              </View>
              {item.isOnline && <View style={styles.onlineBadge} />}
            </View>
            <View style={styles.docInfo}>
              <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
              <ThemedText style={styles.specialization}>
                {item.specialization}
              </ThemedText>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <ThemedText style={styles.emptyText}>No results found.</ThemedText>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  avatarContainer: {
    width: 52,
    height: 52,
    position: 'relative',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#34C759',
    borderWidth: 2,
    borderColor: '#fff',
  },
  docInfo: {
    flex: 1,
  },
  specialization: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 2,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.5,
  },
});
