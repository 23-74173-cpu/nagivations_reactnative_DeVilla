import { useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const DOCS = [
  { id: 'doc-calvin', name: 'Doc Calvin' },
  { id: 'doc-harrold', name: 'Doc Harrold' },
  { id: 'doc-oliver', name: 'Doc Oliver' },
];

const MOCK_MESSAGES: Record<
  string,
  { id: string; text: string; time: string; isUser: boolean }[]
> = {
  'doc-calvin': [
    { id: 'c1', text: 'Hello Doc Calvin!', time: '9:30 AM', isUser: true },
    { id: 'c2', text: 'Hi! How can I help you?', time: '9:31 AM', isUser: false },
    { id: 'c3', text: 'I wanted to discuss the patient report.', time: '9:32 AM', isUser: true },
    { id: 'c4', text: 'Sure, I have it ready.', time: '9:33 AM', isUser: false },
  ],
  'doc-harrold': [
    { id: 'h1', text: 'Good morning!', time: '8:00 AM', isUser: true },
    { id: 'h2', text: 'Morning! Did you review the MRI results?', time: '8:05 AM', isUser: false },
    { id: 'h3', text: 'Yes, I did. Looks good overall.', time: '8:10 AM', isUser: true },
  ],
  'doc-oliver': [
    { id: 'o1', text: 'Are we still on for tomorrow?', time: '7:45 PM', isUser: true },
    { id: 'o2', text: 'Yes, see you at 10 AM.', time: '7:46 PM', isUser: false },
    { id: 'o3', text: "Perfect, I'll prepare the documents.", time: '7:47 PM', isUser: true },
  ],
};

export default function ChatRoomScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [input, setInput] = useState('');

  const docId = typeof id === 'string' ? id : '';
  const doc = DOCS.find((d) => d.id === docId);
  const messages = MOCK_MESSAGES[docId] ?? [];

  useEffect(() => {
    navigation.setOptions({ title: doc?.name ?? 'Chat' });
  }, [doc?.name, navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ThemedView style={styles.container}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={[styles.bubbleRow, item.isUser ? styles.userRow : styles.docRow]}>
              <View
                style={[
                  styles.bubble,
                  item.isUser ? styles.userBubble : styles.docBubble,
                ]}
              >
                <Text
                  style={[
                    styles.bubbleText,
                    item.isUser ? styles.userBubbleText : styles.docBubbleText,
                  ]}
                >
                  {item.text}
                </Text>
              </View>
              <Text style={[styles.timestamp, item.isUser ? styles.userTimestamp : styles.docTimestamp]}>
                {item.time}
              </Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.empty}>
              <Text style={[styles.emptyText, { color: colors.icon }]}>No messages yet.</Text>
            </View>
          )}
        />
        <View
          style={[
            styles.inputBar,
            { borderTopColor: colorScheme === 'dark' ? '#333' : '#e0e0e0' },
          ]}
        >
          <TextInput
            style={[
              styles.input,
              {
                color: colors.text,
                backgroundColor:
                  colorScheme === 'dark' ? '#1c1c1e' : '#f0f0f0',
              },
            ]}
            placeholder="Type a message..."
            placeholderTextColor={colors.icon}
            value={input}
            onChangeText={setInput}
          />
          <Ionicons name="send" size={24} color={colors.tint} style={styles.sendIcon} />
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bubbleRow: {
    marginBottom: 16,
  },
  userRow: {
    alignItems: 'flex-end',
  },
  docRow: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '78%',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  userBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  docBubble: {
    backgroundColor: '#E5E5EA',
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userBubbleText: {
    color: '#FFFFFF',
  },
  docBubbleText: {
    color: '#000000',
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
  },
  userTimestamp: {
    color: '#8E8E93',
  },
  docTimestamp: {
    color: '#8E8E93',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    gap: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  sendIcon: {
    paddingHorizontal: 4,
  },
});
