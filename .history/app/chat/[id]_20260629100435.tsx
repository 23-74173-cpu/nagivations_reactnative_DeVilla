import { useLocalSearchParams } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';

const CHATS = [
  { id: 'doc-calvin', name: 'Doc Felman' },
  { id: 'doc-harrold', name: 'Doc Andre' },
  { id: 'doc-oliver', name: 'Doc Joed' },
];

export default function ChatRoomScreen() {
  const { id } = useLocalSearchParams();
  const chat = CHATS.find((c) => c.id === id);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{chat?.name ?? 'Chat'}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
