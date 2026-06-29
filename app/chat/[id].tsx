import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
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
    { id: 'c1', text: 'Doc, na review mo na ba yung report?', time: '9:38 AM', isUser: true },
    { id: 'c2', text: 'Oo, medyo marami pa tayong kailangan baguhin.', time: '9:39 AM', isUser: false },
    { id: 'c3', text: 'Sige, anong mga dapat i-update?', time: '9:40 AM', isUser: true },
    { id: 'c4', text: 'Ayan, mas mabuti para mabilis natin ma finalize.', time: '9:41 AM', isUser: false },
  ],
  'doc-harrold': [
    { id: 'h1', text: 'Doc Harrold, na receive mo ba yung file?', time: '10:12 AM', isUser: true },
    { id: 'h2', text: 'Oo, pero may need pang konting revisions.', time: '10:13 AM', isUser: false },
    { id: 'h3', text: 'Sige, send ko nalang yung updated version.', time: '10:14 AM', isUser: true },
    { id: 'h4', text: 'Sige, isend mo nalang sa email ko yung draft.', time: '10:15 AM', isUser: false },
  ],
  'doc-oliver': [
    { id: 'o1', text: 'Doc Oliver, tuloy ba yung meeting mamaya?', time: '3:17 PM', isUser: true },
    { id: 'o2', text: 'Sorry, may emergency ako. Cancel muna.', time: '3:18 PM', isUser: false },
    { id: 'o3', text: 'Sige, kelan tayo pwede mag reschedule?', time: '3:19 PM', isUser: true },
    { id: 'o4', text: 'Naka leave ako bukas, sa webes na natin ituloy.', time: '3:20 PM', isUser: false },
  ],
};

function formatTime(): string {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

export default function ChatRoomScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const listRef = useRef<FlatList>(null);
  const [input, setInput] = useState('');

  const docId = typeof id === 'string' ? id : '';
  const doc = DOCS.find((d) => d.id === docId);
  const initial = MOCK_MESSAGES[docId] ?? [];
  const [messages, setMessages] = useState(initial);

  const messageCounterRef = useRef(messages.length);

  useEffect(() => {
    navigation.setOptions({ title: doc?.name ?? 'Chat' });
  }, [doc?.name, navigation]);

  useEffect(() => {
    const next = MOCK_MESSAGES[docId] ?? [];
    setMessages(next);
    messageCounterRef.current = next.length;
  }, [docId]);

  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    messageCounterRef.current += 1;
    const newMsg = {
      id: `user-${messageCounterRef.current}`,
      text,
      time: formatTime(),
      isUser: true,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
  }, [input]);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ThemedView style={styles.container}>
        <FlatList
          ref={listRef}
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
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <Pressable onPress={sendMessage}>
            <Ionicons name="send" size={24} color={colors.tint} style={styles.sendIcon} />
          </Pressable>
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
