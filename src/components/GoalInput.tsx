import React, { FC, SetStateAction, useState } from 'react';
import {
  Alert,
  Button,
  Modal,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import _ from 'lodash';
import IGoal from '../models/IGoal';

interface IGoalInput {
  readonly onCreateGoal: (callback: SetStateAction<IGoal[]>) => void;
  readonly modalIsVisible: boolean;
  readonly visibleModalHandler: () => void;
}

const GoalInput: FC<IGoalInput> = ({ onCreateGoal, modalIsVisible, visibleModalHandler }): JSX.Element => {
  const [userGoal, setUserGoal] = useState<string>('');

  const createAlert = (): void =>
    Alert.alert('Error', 'Field can\'t be empty', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);

  const goalInputHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => setUserGoal(e.nativeEvent.text);

  const addGoalHandler = (): void => {
    if (userGoal.length === 0) {
      createAlert();
    } else {
      onCreateGoal((prevState) => [...prevState, { goal: userGoal, id: _.uniqueId() }]);
      setUserGoal('');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Modal visible={modalIsVisible} animationType='slide'>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.textInput} placeholder={'Your course goal!'} onChange={goalInputHandler}
                       value={userGoal} />
          </View>
          <View style={styles.buttonGroup}>
            <Button title={'Add Goal'} onPress={addGoalHandler} />
            <Button title={'Cansel'} onPress={visibleModalHandler} />
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  inputContainer: {
    width: '100%',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    borderRadius: 8,
  },
  buttonGroup: {
    marginTop: 10,
    width: 160,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-end'
  },
});


export default GoalInput;
