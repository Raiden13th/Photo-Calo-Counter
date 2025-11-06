import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, Divider, Button, Text, Avatar } from 'react-native-paper';
import { useAuthStore } from '@store';
import { COLORS, SPACING, FONT_SIZES } from '@constants';
import { LoadingSpinner } from '@components/common';

export default function ProfileScreen() {
  const { user, isLoading, signOut } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading profile..." />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text
          size={80}
          label={user?.email?.charAt(0).toUpperCase() || 'U'}
          style={styles.avatar}
        />
        <Text style={styles.email}>{user?.email || 'Not signed in'}</Text>
      </View>

      <List.Section>
        <List.Subheader>Account</List.Subheader>
        <List.Item
          title="Email"
          description={user?.email || 'Not available'}
          left={(props) => <List.Icon {...props} icon="email" />}
        />
        <Divider />
        <List.Item
          title="Full Name"
          description={user?.full_name || 'Not set'}
          left={(props) => <List.Icon {...props} icon="account" />}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>Nutrition Goals</List.Subheader>
        <List.Item
          title="Daily Calorie Goal"
          description="2000 kcal"
          left={(props) => <List.Icon {...props} icon="fire" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
        <Divider />
        <List.Item
          title="Macro Targets"
          description="Protein, Carbs, Fat"
          left={(props) => <List.Icon {...props} icon="chart-pie" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>Settings</List.Subheader>
        <List.Item
          title="Notifications"
          left={(props) => <List.Icon {...props} icon="bell" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
        <Divider />
        <List.Item
          title="Privacy"
          left={(props) => <List.Icon {...props} icon="shield-account" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
        <Divider />
        <List.Item
          title="About"
          left={(props) => <List.Icon {...props} icon="information" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
      </List.Section>

      <View style={styles.signOutContainer}>
        <Button
          mode="outlined"
          onPress={handleSignOut}
          style={styles.signOutButton}
          textColor={COLORS.error}
        >
          Sign Out
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.surface,
  },
  avatar: {
    backgroundColor: COLORS.primary,
    marginBottom: SPACING.md,
  },
  email: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
  },
  signOutContainer: {
    padding: SPACING.xl,
  },
  signOutButton: {
    borderColor: COLORS.error,
  },
});

