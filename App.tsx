import React, { SetStateAction, useState } from 'react';
import {
  Button,
  FlatList,
  ListRenderItem,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import GoalItem from './src/components/GoalItem';
import IGoal from './src/models/IGoal';
import GoalInput from './src/components/GoalInput';

function App(): JSX.Element {
  const [goals, setGoals] = useState<IGoal[]>([]);
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

  const createGoalHandler = (callback: SetStateAction<IGoal[]>): void => setGoals(callback);
  const removeGoalHandler = (id: string): void => setGoals((prevState) => prevState.filter(el => el.id !== id));

  const renderItem: ListRenderItem<IGoal> = ({ item: { id, goal } }): JSX.Element => <GoalItem id={id} goal={goal}
                                                                                               onRemoveGoal={removeGoalHandler} />;

  const visibleModalHandler = (): void => setModalIsVisible((prevState) => !prevState);

  const keyExtractor = (item: IGoal): string => item.id;

  const renderEmpty = (): JSX.Element => <Text style={styles.emptyText}>List is empty...</Text>;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={'#311b6b'} barStyle='light-content' />
      <View style={styles.appContainer}>
        <GoalInput onCreateGoal={createGoalHandler} modalIsVisible={modalIsVisible}
                   visibleModalHandler={visibleModalHandler} />
        <Button title={'Add New Goal'} color={Platform.OS === 'android' ? '#5e0acc' : '#a971ff'}
                onPress={visibleModalHandler} />
        <View style={styles.goalsContainer}>
          <FlatList data={goals} renderItem={renderItem} keyExtractor={keyExtractor} ListEmptyComponent={renderEmpty}
                    showsVerticalScrollIndicator={false} alwaysBounceVertical={false} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#311b6b',
  },
  appContainer: {
    flex: 1,
    ...Platform.select({
      android: {
        paddingTop: 20,
      },
    }),
    paddingHorizontal: 16,
    flexDirection: 'column',
  },
  goalsContainer: {
    paddingTop: 10,
  },
  emptyText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default App;
