import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage
{
    static async setItem(key, value)
    {
        try {
            await AsyncStorage.setItem(
              key,
              value,
            );
          } catch (error) {
            console.error(error);
          }
    }

    static async getItem(key)
    {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
          } catch (error) {
            console.error(error);
          }
    }

    static async removeItem(key)
    {
        try {
            const value = await AsyncStorage.removeItem(key);
          } catch (error) {
            console.error(error);
          }
    }
}