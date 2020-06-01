import { Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions'

const NOTIFICATION_STORAGE_KEY = 'MobileFlashcards:Notification';

export async function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_STORAGE_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync())
}

export function createNotification() {
    return {
        title: 'Flashcards',
        body: ' Don\`t forget to do a quiz today',
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    };
}

export async function setLocalNotification() {
    const json = await AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY);
    const data = JSON.parse(json);

    if (data === null) {
        const status = await Permissions.askAsync(Permissions.NOTIFICATIONS);

        if (status === 'granted') {
            await Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(11);
            tomorrow.setMinutes(0);
            tomorrow.setSeconds(0);

            Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                    time: tomorrow,
                    repeat: 'day'
                }
            );

            AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(true));
        }
    }
}

