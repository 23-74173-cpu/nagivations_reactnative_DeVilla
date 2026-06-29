import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const CHATS = [
  {
    id: 'doc-calvin',
    name: 'Doc Calvin',
    lastMessage: 'Ayan, mas mabuti para mabilis natin ma finalize.',
    lastMessageTime: '9:41 AM',
  },
  {
    id: 'doc-harrold',
    name: 'Doc Harrold',
    lastMessage: 'Sige, isend mo nalang sa email ko yung draft.',
    lastMessageTime: 'Yesterday',
  },
  {
    id: 'doc-oliver',
    name: 'Doc Oliver',
    lastMessage: "Naka leave ako bukas, sa webes na natin ituloy.",
    lastMessageTime: 'Yesterday',
  },
];

export default function ChatsScreen() {
  const [search, setSearch] = useState('');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const filtered = CHATS.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={colors.icon} />
        <TextInput
          style={[
            styles.searchInput,
            { color: colors.text, backgroundColor: colorScheme === 'dark' ? '#1c1c1e' : '#f0f0f0' },
          ]}
          placeholder="Search chats..."
          placeholderTextColor={colors.icon}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.chatItem,
              pressed && (colorScheme === 'dark' ? styles.pressedDark : styles.pressedLight),
            ]}
            onPress={() => router.push(`/chat/${item.id}`)}
          >
            <View style={[styles.avatar, { backgroundColor: colors.tint }]}>
              <ThemedText style={styles.avatarText}>
                {item.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </ThemedText>
            </View>
            <View style={styles.chatInfo}>
              <View style={styles.chatHeader}>
                <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
                <ThemedText style={styles.timeText}>{item.lastMessageTime}</ThemedText>
              </View>
              <ThemedText style={styles.preview} numberOfLines={1}>
                {item.lastMessage}
              </ThemedText>
            </View>
          </Pressable>
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
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
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
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 13,
    opacity: 0.6,
  },
  preview: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 2,
  },
  pressedLight: {
    backgroundColor: '#e8e8e8',
  },
  pressedDark: {
    backgroundColor: '#2c2c2e',
  },
});
