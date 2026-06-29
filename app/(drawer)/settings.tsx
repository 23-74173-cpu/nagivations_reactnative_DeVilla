import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';

const PROFILE = {
  name: 'John Doe',
  subtitle: 'john.doe@example.com',
  initials: 'JD',
};

interface SettingsItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  badgeColor: string;
  destructive?: boolean;
}

interface SettingsSection {
  title: string;
  items: SettingsItem[];
}

const PREFERENCES: SettingsSection = {
  title: 'PREFERENCES',
  items: [
    { id: 'notifications', label: 'Notifications & Sounds', icon: 'notifications-outline', badgeColor: '#FF3B30' },
    { id: 'darkmode', label: 'Dark Mode', icon: 'moon-outline', badgeColor: '#48484A' },
    { id: 'datasaver', label: 'Data Saver', icon: 'leaf-outline', badgeColor: '#34C759' },
  ],
};

const ACCOUNT_LEGAL: SettingsSection = {
  title: 'ACCOUNT & LEGAL',
  items: [
    { id: 'account', label: 'Account Settings', icon: 'person-outline', badgeColor: '#8E8E93' },
    { id: 'report', label: 'Report Technical Problem', icon: 'warning-outline', badgeColor: '#FF9500' },
    { id: 'legal', label: 'Legal & Policies', icon: 'document-text-outline', badgeColor: '#8E8E93' },
  ],
};

const LOGOUT_ITEM: SettingsItem = {
  id: 'logout', label: 'Logout', icon: 'log-out-outline', badgeColor: '#FF3B30', destructive: true,
};

function Badge({ icon, color }: { icon: keyof typeof Ionicons.glyphMap; color: string }) {
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Ionicons name={icon} size={17} color="#FFFFFF" />
    </View>
  );
}

function SettingsRow({ item, isLast }: { item: SettingsItem; isLast: boolean }) {
  const colorScheme = useColorScheme();
  const cardBorder = colorScheme === 'dark' ? '#2c2c2e' : '#e8e8e8';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        !isLast && {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: cardBorder,
        },
        pressed && { opacity: 0.6 },
      ]}
    >
      <Badge icon={item.icon} color={item.badgeColor} />
      <ThemedText
        style={[
          styles.label,
          item.destructive && { color: '#FF3B30' },
        ]}
      >
        {item.label}
      </ThemedText>
      {!item.destructive && (
        <Ionicons name="chevron-forward" size={18} color="#C7C7CC" style={styles.chevron} />
      )}
    </Pressable>
  );
}

function SettingsCard({ title, items }: SettingsSection) {
  const colorScheme = useColorScheme();
  const cardBg = colorScheme === 'dark' ? '#1c1c1e' : '#ffffff';
  const cardBorder = colorScheme === 'dark' ? '#2c2c2e' : '#e8e8e8';

  return (
    <View>
      <ThemedText style={styles.sectionHeader}>{title}</ThemedText>
      <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
        {items.map((item, idx) => (
          <SettingsRow key={item.id} item={item} isLast={idx === items.length - 1} />
        ))}
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const cardBg = colorScheme === 'dark' ? '#1c1c1e' : '#ffffff';
  const cardBorder = colorScheme === 'dark' ? '#2c2c2e' : '#e8e8e8';

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Pressable
          style={({ pressed }) => [
            styles.profileCard,
            { backgroundColor: cardBg, borderColor: cardBorder },
            pressed && { opacity: 0.6 },
          ]}
        >
          <View style={styles.profileAvatar}>
            <ThemedText style={styles.profileInitials}>{PROFILE.initials}</ThemedText>
          </View>
          <View style={styles.profileInfo}>
            <ThemedText style={styles.profileName}>{PROFILE.name}</ThemedText>
            <ThemedText style={styles.profileSubtitle}>{PROFILE.subtitle}</ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
        </Pressable>

        <View style={styles.sectionGap}>
          <SettingsCard title={PREFERENCES.title} items={PREFERENCES.items} />
        </View>

        <View style={styles.sectionGap}>
          <SettingsCard title={ACCOUNT_LEGAL.title} items={ACCOUNT_LEGAL.items} />
        </View>

        <View style={styles.sectionGap}>
          <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <SettingsRow item={LOGOUT_ITEM} isLast />
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 32,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
  },
  profileAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#0a7ea4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitials: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 14,
  },
  profileName: {
    fontSize: 17,
    fontWeight: '600',
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionGap: {
    marginTop: 24,
  },
  card: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 17,
    marginLeft: 12,
    flex: 1,
  },
  chevron: {
    marginLeft: 8,
  },
});
